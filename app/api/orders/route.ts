import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'
import { getCurrentUserFromCookies } from '@/lib/auth'
import { computeOrderTotals } from '@/lib/pricing'

function insufficientStockError(productId: number): Error & { code: string } {
  const error = new Error(`Stock insuffisant pour le produit n°${productId}`) as Error & { code: string }
  error.code = 'INSUFFICIENT_STOCK'
  return error
}

// Générer un numéro de commande unique
async function generateOrderNumber(): Promise<string> {
  const date = new Date()
  const timestamp = date.getTime()
  const random = Math.floor(Math.random() * 1000)
  return `ORD-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${timestamp}-${random}`
}

export async function GET() {
  try {
    const user = await getCurrentUserFromCookies()
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    const orders = await prisma.order.findMany({
      where: { userId: user.userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payments: true,
        shipments: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return successResponse(orders)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUserFromCookies()
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    const body = await request.json()

    if (!Array.isArray(body.orderItems) || body.orderItems.length === 0) {
      return errorResponse(
        'orderItems (non vide) est requis',
        400
      )
    }

    const requestedItems: { productId: number; quantity: number }[] = body.orderItems.map(
      (item: { productId?: unknown; quantity?: unknown }) => ({
        productId: Number(item.productId),
        quantity: Number(item.quantity),
      })
    )

    if (requestedItems.some((item) => !Number.isInteger(item.productId) || item.productId <= 0 || !Number.isInteger(item.quantity) || item.quantity <= 0)) {
      return errorResponse('productId et quantity doivent être des entiers positifs', 400)
    }

    // Récupérer les prix depuis la base — les prix envoyés par le client sont ignorés
    const products = await prisma.product.findMany({
      where: { id: { in: requestedItems.map((item) => item.productId) } },
    })

    if (products.length !== new Set(requestedItems.map((item) => item.productId)).size) {
      return errorResponse('Un ou plusieurs produits n\'existent pas', 400)
    }

    const prices = new Map(products.map((product) => [product.id, product.price]))

    let subtotal = 0
    const orderItemsToCreate = requestedItems.map((item) => {
      const price = prices.get(item.productId)!
      subtotal += price * item.quantity
      return {
        productId: item.productId,
        quantity: item.quantity,
        price,
        total: price * item.quantity,
      }
    })

    const { shippingAmount, taxAmount, totalAmount } = computeOrderTotals(subtotal)

    const orderNumber = await generateOrderNumber()

    const order = await prisma.$transaction(async (tx) => {
      // Décrémenter le stock (agrégat par produit), en refusant la vente si stock insuffisant
      const qtyByProduct = new Map<number, number>()
      for (const item of orderItemsToCreate) {
        qtyByProduct.set(item.productId, (qtyByProduct.get(item.productId) ?? 0) + item.quantity)
      }

      for (const [productId, quantity] of qtyByProduct) {
        const updated = await tx.product.updateMany({
          where: { id: productId, stock: { gte: quantity } },
          data: { stock: { decrement: quantity } },
        })
        if (updated.count === 0) {
          throw insufficientStockError(productId)
        }
      }

      const created = await tx.order.create({
        data: {
          userId: user.userId,
          orderNumber,
          status: 'PENDING',
          totalAmount,
          taxAmount,
          shippingAmount,
          discountAmount: 0,
          notes: body.notes,
          billingAddress: body.billingAddress ?? undefined,
          shippingAddress: body.shippingAddress ?? undefined,
          orderItems: {
            create: orderItemsToCreate,
          },
        },
        include: {
          orderItems: {
            include: {
              product: true,
            },
          },
        },
      })

      // Nettoyer le panier après la création de la commande
      await tx.cartItem.deleteMany({
        where: { userId: user.userId },
      })

      return created
    })

    return successResponse(order, 201)
  } catch (error) {
    if ((error as Error & { code?: string }).code === 'INSUFFICIENT_STOCK') {
      return errorResponse((error as Error).message, 400)
    }
    return errorResponse(error as Error)
  }
}
