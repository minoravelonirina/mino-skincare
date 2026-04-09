// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isAuthenticated = false; // Logique d'auth ici
  
  if (!isAuthenticated && request.nextUrl.pathname.startsWith('/products')) {
    // Redirige vers la page de connexion
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  // Laisse la requête passer
  return NextResponse.next()
}

// Configuration pour spécifier sur quelles routes appliquer le middleware
export const config = {
  matcher: '/products/:path*',
}
