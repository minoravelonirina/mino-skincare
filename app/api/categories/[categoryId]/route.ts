import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  try {
    const { categoryId } = await params
    const id = parseInt(categoryId)

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          take: 10,
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
