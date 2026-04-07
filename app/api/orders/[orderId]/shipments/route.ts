import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

// GET all shipments for an order
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

    const shipments = await prisma.shipment.findMany({
      where: { orderId: id },
      include: {
        order: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return successResponse(shipments)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

// POST create a shipment
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

    if (!body.carrier || !body.trackingNumber) {
      return errorResponse(
        new Error('Transporteur et numéro de suivi requis'),
        400
      )
    }

    const shipment = await prisma.shipment.create({
      data: {
        orderId: id,
        carrier: body.carrier,
        trackingNumber: body.trackingNumber,
        status: 'PENDING',
        estimatedDelivery: body.estimatedDelivery ? new Date(body.estimatedDelivery) : null,
      },
      include: {
        order: true,
      },
    })

    return successResponse(shipment, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
