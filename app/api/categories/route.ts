import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    return successResponse(categories)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
