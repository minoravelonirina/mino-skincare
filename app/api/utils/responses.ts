import { NextResponse } from 'next/server'

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const successResponse = <T>(
  data: T,
  statusCode: number = 200
): NextResponse<ApiResponse<T>> => {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status: statusCode }
  )
}

export const errorResponse = (
  error: ApiError | Error | string,
  statusCode: number = 400
): NextResponse<ApiResponse<null>> => {
  const message = error instanceof Error ? error.message : String(error)
  const code = error instanceof ApiError ? error.code : undefined

  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(code && { code }),
    },
    { status: statusCode }
  )
}

export const notFoundResponse = (resource: string): NextResponse<ApiResponse<null>> => {
  return errorResponse(
    new ApiError(404, `${resource} non trouvé(e)`, 'NOT_FOUND'),
    404
  )
}

export const unauthorizedResponse = (): NextResponse<ApiResponse<null>> => {
  return errorResponse(
    new ApiError(401, 'Non authentifié', 'UNAUTHORIZED'),
    401
  )
}

export const forbiddenResponse = (): NextResponse<ApiResponse<null>> => {
  return errorResponse(
    new ApiError(403, 'Non autorisé', 'FORBIDDEN'),
    403
  )
}
