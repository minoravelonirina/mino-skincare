// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyAccessToken } from './lib/auth';

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;

  // Protected routes:
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  // Public routes that should redirect if authentificated:
  const authPaths = ["/login", "/register"];
  const isAuthPath = authPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath){
    if (!token)
      return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isProtectedPath){
    const user = await verifyAccessToken(token || "");
    if (!user){
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }
  

  if (isAuthPath && token) {
    const user = await verifyAccessToken(token);
    if (user)
      return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Laisse la requête passer
  return NextResponse.next()
}

// Configuration pour spécifier sur quelles routes appliquer le middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/products/:path*',
    '/profile/:path*',
    '/settings/:path*'
  ]
}
