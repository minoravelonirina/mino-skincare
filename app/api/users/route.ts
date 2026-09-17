import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, forbiddenResponse } from '@/app/api/utils/responses'
import { getCurrentUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request)
    if (!user) {
      return errorResponse('Non authentifié', 401)
    }
    if (user.role !== 'ADMIN') {
      return forbiddenResponse()
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    })

    return successResponse(users)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
