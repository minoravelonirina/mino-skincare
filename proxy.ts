import { NextResponse, NextRequest } from 'next/server'
import { verifyAccessToken } from './lib/auth';
import { intlayerProxy } from "next-intlayer/proxy";

const LOCALES = ['fr', 'en']
const DEFAULT_LOCALE = 'fr'

function isPublicFile(pathname: string) {
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname === '/favicon.ico') return true;
  return /\.[a-zA-Z0-9]+$/.test(pathname);
}

function stripLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0])) {
    return '/' + parts.slice(1).join('/');
  }
  return pathname;
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Skip middleware for public files and next internals
  if (isPublicFile(pathname)) {
    return NextResponse.next();
  }

  // Locale handling: if no locale prefix, redirect to preferred (or default)
  // NOTE: only redirect the root path `/` to a locale. Keep other
  // non-prefixed paths (like `/login`, `/cart`, etc.) intact so existing
  // app routes continue to work.
  const parts = pathname.split('/').filter(Boolean);
  const first = parts[0];
  if (!LOCALES.includes(first)) {
    // only redirect when requesting the site root (no path segments)
    if (parts.length === 0) {
      const accept = request.headers.get('accept-language') || '';
      const preferred = accept.toLowerCase().startsWith('en') ? 'en' : DEFAULT_LOCALE;
      const target = '/' + preferred;
      return NextResponse.redirect(new URL(target + url.search, request.url));
    }
    // otherwise continue without forcing a locale prefix
  }

  // If the request includes a locale prefix (e.g. /fr/catalogue),
  // rewrite the pathname to the internal non-prefixed route so the
  // existing pages (e.g. /catalogue) are served while keeping the
  // URL visible to the user.
  if (LOCALES.includes(first) && parts.length > 1) {
    const rewritten = stripLocale(pathname) || '/';
    url.pathname = rewritten;
    return NextResponse.rewrite(url);
  }

  // Auth logic: operate on path without locale prefix
  const token = request.cookies.get('accessToken')?.value;
  const pathNoLocale = stripLocale(pathname);

  // Protected routes (without locale prefix)
  const protectedPaths = ["/dashboard", "/profile", "/settings"];
  const isProtectedPath = protectedPaths.some(path => pathNoLocale.startsWith(path));

  // Public auth routes
  const authPaths = ["/login", "/register"];
  const isAuthPath = authPaths.some(path => pathNoLocale.startsWith(path));

  if (isProtectedPath) {
    if (!token) {
      // redirect to localized login
      const loginUrl = '/' + [parts[0], 'login'].join('/');
      return NextResponse.redirect(new URL(loginUrl, request.url));
    }

    const user = await verifyAccessToken(token || '');
    if (!user) {
      const response = NextResponse.redirect(new URL('/' + [parts[0], 'login'].join('/'), request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }
  }

  if (isAuthPath && token) {
    const user = await verifyAccessToken(token);
    if (user) {
      // redirect to localized dashboard
      const dashUrl = '/' + [parts[0], 'dashboard'].join('/');
      return NextResponse.redirect(new URL(dashUrl, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: 
    "/((?!api|static|assets|robots|sitemap|sw|service-worker|manifest|.*\\..*|_next).*)"
}



export const proxy = intlayerProxy;


