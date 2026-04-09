import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/app/api/utils/responses'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; addressId: string }> }
) {
  try {
    const { userId, addressId } = await params
    const userId_id = parseInt(userId)
    const id = parseInt(addressId)
    const body = await request.json()

    const address = await prisma.address.findUnique({
      where: { id },
    })

    if (!address) {
      return notFoundResponse('Adresse')
    }

    // Vérifier que l'adresse appartient à l'utilisateur
    if (address.userId !== userId_id) {
      return forbiddenResponse()
    }

    // Si c'est l'adresse par défaut, retirer la valeur par défaut des autres
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: userId_id, isDefault: true, id: { not: id } },
        data: { isDefault: false },
      })
    }

    const updatedAddress = await prisma.address.update({
      where: { id },
      data: {
        type: body.type,
        street: body.street,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country,
        isDefault: body.isDefault,
      },
    })

    return successResponse(updatedAddress)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; addressId: string }> }
) {
  try {
    const { userId, addressId } = await params
    const userId_id = parseInt(userId)
    const id = parseInt(addressId)

    const address = await prisma.address.findUnique({
      where: { id },
    })

    if (!address) {
      return notFoundResponse('Adresse')
    }

    // Vérifier que l'adresse appartient à l'utilisateur
    if (address.userId !== userId_id) {
      return forbiddenResponse()
    }

    await prisma.address.delete({
      where: { id },
    })

    return successResponse(null, 204)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
