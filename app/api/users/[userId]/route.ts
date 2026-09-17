import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse, forbiddenResponse } from '@/app/api/utils/responses'
import { requireAuth } from '@/lib/auth'
import { parsePositiveInt } from '@/app/api/utils/validation'

export async function GET(
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

    if (authUser.userId !== id && authUser.role !== 'ADMIN') {
      return forbiddenResponse()
    }

    const dbUser = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
      },
    })

    if (!dbUser) {
      return notFoundResponse('Utilisateur')
    }

    return successResponse(dbUser)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const authUser = await requireAuth(request)
    if (!authUser) {
      return errorResponse('Non authentifié', 401)
    }

    const { userId } = await params
    const id = parsePositiveInt(userId)
    if (!id) {
      return errorResponse('id invalide', 400)
    }

    if (authUser.userId !== id && authUser.role !== 'ADMIN') {
      return forbiddenResponse()
    }

    const body = await request.json()

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return notFoundResponse('Utilisateur')
    }

    const isAdmin = authUser.role === 'ADMIN'
    const role = isAdmin ? body.role ?? user.role : user.role

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        profileImage: body.profileImage,
        role,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        profileImage: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return successResponse(updatedUser)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
