import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'
import { getCurrentUserFromCookies } from '@/lib/auth'
import { parsePositiveInt } from '@/app/api/utils/validation'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const id = parsePositiveInt(productId)
    if (!id) {
      return errorResponse('id invalide', 400)
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    const reviews = await prisma.review.findMany({
      where: { productId: id },
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
    const id = parsePositiveInt(productId)
    if (!id) {
      return errorResponse('id invalide', 400)
    }
    const body = await request.json()

    const user = await getCurrentUserFromCookies()
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    if (!body.rating) {
      return errorResponse('rating est requis', 400)
    }

    if (body.rating < 1 || body.rating > 5) {
      return errorResponse('rating doit être entre 1 et 5', 400)
    }

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    // Vérifier que l'utilisateur existe
    const dbUser = await prisma.user.findUnique({
      where: { id: user.userId },
    })

    if (!dbUser) {
      return errorResponse('Utilisateur non trouvé', 404)
    }

    const review = await prisma.review.create({
      data: {
        userId: user.userId,
        productId: id,
        rating: body.rating,
        title: body.title,
        comment: body.comment,
        isVerified: false,
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
