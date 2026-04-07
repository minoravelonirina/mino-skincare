import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    const id = parseInt(orderId)

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payments: true,
        shipments: true,
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    if (!order) {
      return notFoundResponse('Commande')
    }

    return successResponse(order)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    const id = parseInt(orderId)
    const body = await request.json()

    const order = await prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      return notFoundResponse('Commande')
    }

    if (!body.status) {
      return errorResponse('status est requis', 400)
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: body.status,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        payments: true,
        shipments: true,
      },
    })

    return successResponse(updatedOrder)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
