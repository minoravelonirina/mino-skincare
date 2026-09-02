import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'
import { getCurrentUserFromCookies } from '@/lib/auth'

// Générer un numéro de commande unique
export async function generateOrderNumber(): Promise<string> {
  const date = new Date()
  const timestamp = date.getTime()
  const random = Math.floor(Math.random() * 1000)
  return `ORD-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${timestamp}-${random}`
}

export async function GET(request: NextRequest) {
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

    if (!body.orderItems || body.orderItems.length === 0) {
      return errorResponse(
        'orderItems (non vide) est requis',
        400
      )
    }

    // Calculer le total
    let totalAmount = 0
    for (const item of body.orderItems) {
      totalAmount += (item.price || 0) * item.quantity
    }

    const taxAmount = body.taxAmount || totalAmount * 0.1 // 10% de TVA par défaut
    const shippingAmount = body.shippingAmount || 10 // Frais de port fixes par défaut
    const discountAmount = body.discountAmount || 0

    const orderNumber = await generateOrderNumber()

    const order = await prisma.order.create({
      data: {
        userId: user.userId,
        orderNumber,
        status: 'PENDING',
        totalAmount:
          totalAmount + taxAmount + shippingAmount - discountAmount,
        taxAmount,
        shippingAmount,
        discountAmount,
        notes: body.notes,
        billingAddress: body.billingAddress ? JSON.stringify(body.billingAddress) : undefined,
        shippingAddress: body.shippingAddress ? JSON.stringify(body.shippingAddress) : undefined,
        orderItems: {
          create: body.orderItems.map((item: any) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity,
          })),
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
    await prisma.cartItem.deleteMany({
      where: { userId: user.userId },
    })

    return successResponse(order, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
