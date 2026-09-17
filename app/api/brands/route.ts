import prisma from '@/lib/prisma'
import { successResponse, errorResponse } from '@/app/api/utils/responses'

export async function GET() {
  try {
    const brands = await prisma.brand.findMany({
      include: {
        _count: {
          select: { products: true },
        },
      },
    })

    return successResponse(brands)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
