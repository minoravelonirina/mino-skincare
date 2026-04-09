import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    // const id = parseInt(productId)

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    const reviews = await prisma.review.findMany({
      where: { id: parseInt(productId) },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return successResponse(reviews)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const id = parseInt(productId)
    const body = await request.json()

    if (!body.userId || !body.rating) {
      return errorResponse('userId et rating sont requis', 400)
    }

    if (body.rating < 1 || body.rating > 5) {
      return errorResponse('rating doit être entre 1 et 5', 400)
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id: parseInt(productId) },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id: body.userId },
    })

    if (!user) {
      return errorResponse('Utilisateur non trouvé', 404)
    }

    const review = await prisma.review.create({
      data: {
        userId: body.userId,
        productId: parseInt(productId),
        rating: body.rating,
        title: body.title,
        comment: body.comment,
        isVerified: body.isVerified || false,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    return successResponse(review, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
