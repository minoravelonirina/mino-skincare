import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'
import { getProductFilters } from '@/app/api/utils/validation'

export async function GET(request: NextRequest) {
  try {
    const filters = getProductFilters(request)
    const skip = (filters.page - 1) * filters.limit

    // Construire les conditions de filtre
    const where: any = {
      isActive: true,
    }

    if (filters.categoryId) {
      where.categoryId = filters.categoryId
    }

    if (filters.brandId) {
      where.brandId = filters.brandId
    }

    if (filters.search) {
      where.OR = [
        { name: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    if (filters.skinType) {
      where.skinType = filters.skinType
    }

    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      where.price = {}
      if (filters.minPrice !== undefined) {
        where.price.gte = filters.minPrice
      }
      if (filters.maxPrice !== undefined) {
        where.price.lte = filters.maxPrice
      }
    }

    if (filters.featured === true) {
      where.isFeatured = true
    }

    if (filters.onSale === true) {
      where.isOnSale = true
    }

    // Construire l'ordre de tri
    let orderBy: any = { createdAt: 'desc' }
    switch (filters.sort) {
      case 'price_asc':
        orderBy = { price: 'asc' }
        break
      case 'price_desc':
        orderBy = { price: 'desc' }
        break
      case 'newest':
        orderBy = { createdAt: 'desc' }
        break
      case 'popularity':
        // À implémenter avec une colonne de popularité
        orderBy = { id: 'desc' }
        break
    }

    // Récupérer les produits
    const [items, totalItems] = await Promise.all([
      prisma.product.findMany({
        where,
        skip,
        take: filters.limit,
        orderBy,
        include: {
          category: true,
          brand: true,
        },
      }),
      prisma.product.count({ where }),
    ])

    const totalPages = Math.ceil(totalItems / filters.limit)

    return successResponse({
      items,
      page: filters.page,
      limit: filters.limit,
      totalItems,
      totalPages,
      hasNextPage: filters.page < totalPages,
      hasPreviousPage: filters.page > 1,
    })
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Valider les champs requis
    if (!body.name || !body.price || !body.sku) {
      return errorResponse('name, price et sku sont requis', 400)
    }

    // Vérifier que le SKU est unique
    const existingSku = await prisma.product.findUnique({
      where: { sku: body.sku },
    })

    if (existingSku) {
      return errorResponse('Ce SKU existe déjà', 400)
    }

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        costPrice: body.costPrice,
        sku: body.sku,
        stock: body.stock || 0,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        isOnSale: body.isOnSale ?? false,
        weight: body.weight,
        dimensions: body.dimensions,
        tags: body.tags ? JSON.stringify(body.tags) : null,
        images: body.images ? JSON.stringify(body.images) : null,
        skinType: body.skinType,
        ingredients: body.ingredients,
        usage: body.usage,
        benefits: body.benefits,
        categoryId: body.categoryId,
        brandId: body.brandId,
      },
      include: {
        category: true,
        brand: true,
      },
    })

    return successResponse(product, 201)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
