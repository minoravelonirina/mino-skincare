import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { successResponse, errorResponse } from '@/app/api/utils/responses'
import { validateEmail, validatePassword } from '@/app/api/utils/validation'
import { generateAccessToken, generateRefreshToken, setAuthCookies } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.email || !body.password)
      return errorResponse('email et password sont requis', 400)

    if (!validateEmail(body.email)) 
      return errorResponse('email invalide', 400)

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (!user)
      return errorResponse('Email ou mot de passe invalide', 401)

    const isMatch = await bcrypt.compare(body.password, user.password)
    if (!isMatch) 
      return errorResponse('Email ou mot de passe invalide', 401)

    const payload = {
      userId: user.id,
      email: user.email
    };

    const accessToken = await generateAccessToken(payload);
    const  refreshToken = await generateRefreshToken(payload);

    await setAuthCookies(accessToken, refreshToken);

    return successResponse({
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        role: user.role,
      },
      message: "Connexion reussi!"
    })
  } catch (error) {
    return errorResponse(error as Error)
  }
}
