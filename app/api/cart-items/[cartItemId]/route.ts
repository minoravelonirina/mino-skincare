import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/app/api/utils/responses'
import { requireAuth } from '@/lib/auth'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const user = await requireAuth(request)
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    const { cartItemId } = await params
    const id = parseInt(cartItemId)
    const body = await request.json()

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    })

    if (!cartItem) {
      return notFoundResponse('Article du panier')
    }

    if (cartItem.userId !== user.userId) {
      return forbiddenResponse()
    }

    const updatedItem = await prisma.cartItem.update({
      where: { id },
      data: {
        quantity: body.quantity,
      },
      include: {
        product: true,
      },
    })

    return successResponse(updatedItem)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const user = await requireAuth(request)
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    const { cartItemId } = await params
    const id = parseInt(cartItemId)

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    })

    if (!cartItem) {
      return notFoundResponse('Article du panier')
    }

    if (cartItem.userId !== user.userId) {
      return forbiddenResponse()
    }

    await prisma.cartItem.delete({
      where: { id },
    })

    return successResponse(null, 204)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
