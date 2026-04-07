import { NextRequest } from 'next/server'
import { ApiError } from './responses'

export interface PaginationParams {
  page: number
  limit: number
}

export interface ProductFilters extends PaginationParams {
  categoryId?: number
  brandId?: number
  search?: string
  skinType?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  onSale?: boolean
  sort?: 'price_asc' | 'price_desc' | 'newest' | 'popularity'
}

export const getPaginationParams = (request: NextRequest): PaginationParams => {
  const url = new URL(request.url)
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'))
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '20')))

  return { page, limit }
}

export const getProductFilters = (request: NextRequest): ProductFilters => {
  const url = new URL(request.url)
  const { page, limit } = getPaginationParams(request)

  return {
    page,
    limit,
    categoryId: url.searchParams.get('categoryId')
      ? parseInt(url.searchParams.get('categoryId')!)
      : undefined,
    brandId: url.searchParams.get('brandId')
      ? parseInt(url.searchParams.get('brandId')!)
      : undefined,
    search: url.searchParams.get('search') || undefined,
    skinType: url.searchParams.get('skinType') || undefined,
    minPrice: url.searchParams.get('minPrice')
      ? parseFloat(url.searchParams.get('minPrice')!)
      : undefined,
    maxPrice: url.searchParams.get('maxPrice')
      ? parseFloat(url.searchParams.get('maxPrice')!)
      : undefined,
    featured: url.searchParams.get('featured') === 'true',
    onSale: url.searchParams.get('onSale') === 'true',
    sort: (url.searchParams.get('sort') as any) || undefined,
  }
}

export const validateEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return regex.test(email)
}

export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

export const validateRequired = (value: any, fieldName: string): void => {
  if (!value || (typeof value === 'string' && !value.trim())) {
    throw new ApiError(400, `${fieldName} est requis`)
  }
}
