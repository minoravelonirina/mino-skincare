import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const id = parseInt(userId)

    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
      },
    })

    if (!user) {
      return notFoundResponse('Utilisateur')
    }

    return successResponse(user)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params
    const id = parseInt(userId)
    const body = await request.json()

    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) {
      return notFoundResponse('Utilisateur')
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        role: body.role,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
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
