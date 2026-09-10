import { NextResponse, NextRequest } from 'next/server'
import { verifyAccessToken } from './lib/auth';
import { intlayerProxy } from "next-intlayer/proxy";

const LOCALES = ['fr', 'en']
const DEFAULT_LOCALE = 'fr'

const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings']
const AUTH_PATHS = ['/login', '/register']

function stripLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0])) {
    return '/' + parts.slice(1).join('/');
  }
  return pathname;
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  const pathNoLocale = stripLocale(pathname);

  // Root path: redirect to preferred locale (default FR)
  if (pathname === '/') {
    const accept = request.headers.get('accept-language') || '';
    const preferred = accept.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LOCALE;
    return NextResponse.redirect(new URL('/' + preferred + url.search, request.url));
  }

  // Auth logic: operate on path without locale prefix
  const token = request.cookies.get('accessToken')?.value;
  const isProtectedPath = PROTECTED_PATHS.some(path => pathNoLocale.startsWith(path));
  const isAuthPath = AUTH_PATHS.some(path => pathNoLocale.startsWith(path));

  if (isProtectedPath) {
    if (!token) {
      const loginUrl = '/' + [first ?? DEFAULT_LOCALE, 'login'].join('/');
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }

    const user = await verifyAccessToken(token || '');
    if (!user) {
      const response = NextResponse.redirect(new URL('/' + [first ?? DEFAULT_LOCALE, 'login'].join('/'), request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  if (isAuthPath && token) {
    const user = await verifyAccessToken(token);
    if (user) {
      const dashUrl = '/' + [first ?? DEFAULT_LOCALE, 'dashboard'].join('/');
      return NextResponse.redirect(new URL(dashUrl, request.url));
    }
  }

  // Internationalization handling (locale detection, redirects and rewrites)
  return intlayerProxy(request);
}

export const config = {
  matcher:
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)",
};