import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/app/api/utils/responses'
import { requireAuth } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const user = await requireAuth(request)
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }

    const { userId } = await params
    const id = parseInt(userId)

    if (user.userId !== id && user.role !== 'ADMIN') {
      return forbiddenResponse()
    }

    // Vérifier que l'utilisateur existe
    const dbUser = await prisma.user.findUnique({
      where: { id },
    })

    if (!dbUser) {
      return notFoundResponse('Utilisateur')
    }

    const addresses = await prisma.address.findMany({
      where: { userId: id },
    })

    return successResponse(addresses)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const authUser = await requireAuth(request)
    if (!authUser) {
      return errorResponse('Non authentifié', 401)
    }

    const { userId } = await params
    const id = parseInt(userId)

    if (authUser.userId !== id) {
      return forbiddenResponse()
    }

    const body = await request.json()

    if (!body.type || !body.street || !body.city || !body.postalCode || !body.country) {
      return errorResponse(
        'type, street, city, postalCode et country sont requis',
        400
      )
    }

    // Vérifier que l'utilisateur existe
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return notFoundResponse('Utilisateur')
    }

    // Si c'est l'adresse par défaut, retirer la valeur par défaut des autres
    if (body.isDefault) {
      await prisma.address.updateMany({
        where: { userId: id, isDefault: true },
        data: { isDefault: false },
      })
    }

    const address = await prisma.address.create({
      data: {
        userId: id,
        type: body.type,
        street: body.street,
        city: body.city,
        state: body.state,
        postalCode: body.postalCode,
        country: body.country,
        isDefault: body.isDefault || false,
      },
    })

    return successResponse(address, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
