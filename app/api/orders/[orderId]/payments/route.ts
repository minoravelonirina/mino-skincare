import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, ApiError } from '@/app/api/utils/responses'

// GET all payments for an order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params
    const id = parseInt(orderId)

    const order = await prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      return notFoundResponse('Commande')
    }

    const payments = await prisma.payment.findMany({
      where: { orderId: id },
      include: {
        order: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(payments)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

// POST create a payment
export async function POST(
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

    if (!body.method || !body.amount) {
      return errorResponse(new ApiError(400, 'Méthode et montant requis', 'VALIDATION_ERROR'))
    }

    const payment = await prisma.payment.create({
      data: {
        orderId: id,
        method: body.method,
        amount: body.amount,
        status: 'PENDING',
        transactionId: body.transactionId,
      },
      include: {
        order: true,
      },
    })

    return successResponse(payment, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
