import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return errorResponse('userId est requis', 400)
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: parseInt(userId) },
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
    const body = await request.json()

    if (!body.userId || !body.productId || !body.quantity) {
      return errorResponse('userId, productId et quantity sont requis', 400)
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: body.productId },
    })

    if (!product) {
      return errorResponse('Produit non trouvé', 404)
    }

    // Vérifier s'il existe déjà dans le panier
    const existingItem = await prisma.cartItem.findUnique({
      where: {
        userId_productId: {
          userId: body.userId,
          productId: body.productId,
        },
      },
    })

    let cartItem
    if (existingItem) {
      // Mettre à jour la quantité
      cartItem = await prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: body.userId,
            productId: body.productId,
          },
        },
        data: {
          quantity: existingItem.quantity + body.quantity,
        },
        include: {
          product: true,
        },
      })
    } else {
      // Créer un nouvel item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: body.userId,
          productId: body.productId,
          quantity: body.quantity,
        },
        include: {
          product: true,
        },
      })
    }

    return successResponse(cartItem, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
