import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'
import { getCurrentUserFromCookies } from '@/lib/auth'

export async function GET() {
  try {
    const user = await getCurrentUserFromCookies()
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: user.userId },
      include: {
        product: true,
      },
    })

    return successResponse(cartItems)
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

    const productId = Number(body.productId)
    const quantity = Number(body.quantity)

    if (!Number.isInteger(productId) || productId <= 0 || !Number.isInteger(quantity) || quantity <= 0) {
      return errorResponse('productId et quantity doivent être des entiers positifs', 400)
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return errorResponse('Produit non trouvé', 404)
    }

    // Upsert atomique (contrainte unique userId_productId) :
    // accroît la quantité si déjà présent, sinon crée la ligne. Aucune course possible.
    const cartItem = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: user.userId,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        userId: user.userId,
        productId,
        quantity,
      },
      include: {
        product: true,
      },
    })

    return successResponse(cartItem, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
