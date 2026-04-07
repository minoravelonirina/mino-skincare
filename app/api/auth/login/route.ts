import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'
import { validateEmail, validatePassword } from '@/app/api/utils/validation'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !body.password) {
      return errorResponse('email et password sont requis', 400)
    }

    if (!validateEmail(body.email)) {
      return errorResponse('email invalide', 400)
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (!user) {
      return errorResponse('Email ou mot de passe invalide', 401)
    }

    // NOTE: En production, utiliser bcrypt pour la comparaison
    // Pour la démo, on compare directement
    if (user.password !== body.password) {
      return errorResponse('Email ou mot de passe invalide', 401)
    }

    // Générer un token JWT simple (à implémenter correctement en production)
    const token = Buffer.from(
      JSON.stringify({ userId: user.id, email: user.email })
    ).toString('base64')

    return successResponse({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
    })
  } catch (error) {
    return errorResponse(error as Error)
  }
}
