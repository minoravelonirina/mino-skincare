import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'
import { parsePositiveInt } from '@/app/api/utils/validation'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params
    const id = parsePositiveInt(categoryId)
    if (!id) {
      return errorResponse('id invalide', 400)
    }

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          take: 10,
          orderBy: { name: 'asc' },
        },
      },
    })

    if (!category) {
      return notFoundResponse('Catégorie')
    }

    return successResponse(category)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
