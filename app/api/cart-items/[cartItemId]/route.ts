import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ cartItemId: string }> }
) {
  try {
    const { cartItemId } = await params
    const id = parseInt(cartItemId)
    const body = await request.json()

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    })

    if (!cartItem) {
      return notFoundResponse('Article du panier')
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
    const { cartItemId } = await params
    const id = parseInt(cartItemId)

    const cartItem = await prisma.cartItem.findUnique({
      where: { id },
    })

    if (!cartItem) {
      return notFoundResponse('Article du panier')
    }

    await prisma.cartItem.delete({
      where: { id },
    })

    return successResponse(null, 204)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
