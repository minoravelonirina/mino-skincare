import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, ApiError } from '@/app/api/utils/responses'

// GET single shipment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params
    const id = parseInt(shipmentId)

    const shipment = await prisma.shipment.findUnique({
      where: { id },
      include: {
        order: true,
      },
    })

    if (!shipment) {
      return notFoundResponse('Envoi')
    }

    return successResponse(shipment)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

// PATCH update shipment
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params
    const id = parseInt(shipmentId)
    const body = await request.json()

    const shipment = await prisma.shipment.findUnique({
      where: { id },
    })

    if (!shipment) {
      return notFoundResponse('Envoi')
    }

    const validStatuses = ['PENDING', 'SHIPPED', 'IN_TRANSIT', 'DELIVERED', 'CANCELLED']
    if (body.status && !validStatuses.includes(body.status)) {
      return errorResponse(new ApiError(400, `Statut invalide. Doit être: ${validStatuses.join(', ')}`, 'VALIDATION_ERROR'))
    }

    const updatedShipment = await prisma.shipment.update({
      where: { id },
      data: {
        status: body.status,
        trackingNumber: body.trackingNumber || shipment.trackingNumber,
        estimatedDelivery: body.estimatedDelivery
          ? new Date(body.estimatedDelivery)
          : shipment.estimatedDelivery,
      },
      include: {
        order: true,
      },
    })

    return successResponse(updatedShipment)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

// DELETE shipment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string; shipmentId: string }> }
) {
  try {
    const { shipmentId } = await params
    const id = parseInt(shipmentId)

    const shipment = await prisma.shipment.findUnique({
      where: { id },
    })

    if (!shipment) {
      return notFoundResponse('Envoi')
    }

    await prisma.shipment.delete({
      where: { id },
    })

    return successResponse(null, 204)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
