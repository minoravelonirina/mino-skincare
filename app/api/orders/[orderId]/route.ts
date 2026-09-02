import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/app/api/utils/responses'
import { requireAuth, requireAdmin } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const user = await requireAuth(request)
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

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

    if (order.userId !== user.userId && user.role !== 'ADMIN') {
      return forbiddenResponse()
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
    const user = await requireAdmin(request)
    if (!user) {
      return errorResponse('Non autorisé', 403)
    }

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
