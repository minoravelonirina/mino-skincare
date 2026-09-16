import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const authUser = await getCurrentUser(request)
    if (!authUser) {
      return errorResponse('Non authentifié', 401)
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: authUser.userId },
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

    if (!dbUser) {
      return notFoundResponse('Utilisateur')
    }

    return successResponse(dbUser)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const authUser = await getCurrentUser(request)
    if (!authUser) {
      return errorResponse('Non authentifié', 401)
    }

    const body = await request.json()

    const updatedUser = await prisma.user.update({
      where: { id: authUser.userId },
      data: {
        firstName: typeof body.firstName === "undefined" ? undefined : body.firstName,
        lastName: typeof body.lastName === "undefined" ? undefined : body.lastName,
        phone: typeof body.phone === "undefined" ? undefined : body.phone,
        profileImage: typeof body.profileImage === "undefined" ? undefined : body.profileImage,
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