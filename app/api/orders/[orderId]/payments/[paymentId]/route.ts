import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, ApiError } from '@/app/api/utils/responses'

// GET single payment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; paymentId: string }> }
) {
  try {
    const { paymentId } = await params
    const id = parseInt(paymentId)

    const payment = await prisma.payment.findUnique({
      where: { id },
      include: {
        order: true,
      },
    })

    if (!payment) {
      return notFoundResponse('Paiement')
    }

    return successResponse(payment)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

// PATCH update payment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; paymentId: string }> }
) {
  try {
    const { paymentId } = await params
    const id = parseInt(paymentId)
    const body = await request.json()

    const payment = await prisma.payment.findUnique({
      where: { id },
    })

    if (!payment) {
      return notFoundResponse('Paiement')
    }

    const validStatuses = ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED']
    if (body.status && !validStatuses.includes(body.status)) {
      return errorResponse(new ApiError(400, `Statut invalide. Doit être: ${validStatuses.join(', ')}`, 'VALIDATION_ERROR'))
    }

    const updatedPayment = await prisma.payment.update({
      where: { id },
      data: {
        status: body.status,
      },
      include: {
        order: true,
      },
    })

    return successResponse(updatedPayment)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

// DELETE payment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; paymentId: string }> }
) {
  try {
    const { paymentId } = await params
    const id = parseInt(paymentId)

    const payment = await prisma.payment.findUnique({
      where: { id },
    })

    if (!payment) {
      return notFoundResponse('Paiement')
    }

    await prisma.payment.delete({
      where: { id },
    })

    return successResponse(null, 204)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
