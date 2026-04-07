import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { successResponse, errorResponse, notFoundResponse } from '@/app/api/utils/responses'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const id = parseInt(productId)

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        brand: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        },
      },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    return successResponse(product)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const id = parseInt(productId)
    const body = await request.json()

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    // Vérifier que le SKU n'existe pas pour un autre produit
    if (body.sku && body.sku !== product.sku) {
      const existingSku = await prisma.product.findUnique({
        where: { sku: body.sku },
      })
      if (existingSku) {
        return errorResponse('Ce SKU existe déjà', 400)
      }
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        compareAtPrice: body.compareAtPrice,
        costPrice: body.costPrice,
        sku: body.sku,
        stock: body.stock,
        isActive: body.isActive,
        isFeatured: body.isFeatured,
        isOnSale: body.isOnSale,
        weight: body.weight,
        dimensions: body.dimensions,
        tags: body.tags ? JSON.stringify(body.tags) : undefined,
        images: body.images ? JSON.stringify(body.images) : undefined,
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

    return successResponse(updatedProduct)
  } catch (error) {
    return errorResponse(error as Error)
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params
    const id = parseInt(productId)

    // Vérifier que le produit existe
    const product = await prisma.product.findUnique({
      where: { id },
    })

    if (!product) {
      return notFoundResponse('Produit')
    }

    // Supprimer les références aux items du panier
    await prisma.cartItem.deleteMany({
      where: { productId: id },
    })

    // Supprimer le produit
    await prisma.product.delete({
      where: { id },
    })

    return successResponse(null, 204)
  } catch (error) {
    return errorResponse(error as Error)
  }
}
