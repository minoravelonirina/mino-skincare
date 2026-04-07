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

    if (!validatePassword(body.password)) {
      return errorResponse('password doit avoir au moins 6 caractères', 400)
    }

    // Vérifier que l'email n'existe pas
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return errorResponse('Un utilisateur avec cet email existe déjà', 400)
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password, // NOTE: À hasher correctement en production
        firstName: body.firstName || null,
        lastName: body.lastName || null,
        phone: body.phone || null,
        role: 'CUSTOMER',
      },
    })

    // Générer un token JWT simple (à implémenter correctement en production)
    const token = Buffer.from(
      JSON.stringify({ userId: user.id, email: user.email })
    ).toString('base64')

    return successResponse(
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
        },
      },
      201
    )
  } catch (error) {
    return errorResponse(error as Error)
  }
}
