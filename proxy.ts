import { NextResponse, NextRequest } from 'next/server'
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
} from './lib/auth';
import { intlayerProxy } from "next-intlayer/proxy";
import { JWTPayload } from './lib/types';

const LOCALES = ['fr', 'en']
const DEFAULT_LOCALE = 'fr'

const PROTECTED_PATHS = ['/dashboard', '/profile', '/settings']
const AUTH_PATHS = ['/login', '/register']

const ACCESS_TOKEN_MAX_AGE = 60 * 15
const REFRESH_TOKEN_MAX_AGE = 60 * 60 * 24 * 7

function stripLocale(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length && LOCALES.includes(parts[0])) {
    return '/' + parts.slice(1).join('/');
  }
  return pathname;
}

function resolveLocale(first: string | undefined): string {
  return first && LOCALES.includes(first) ? first : DEFAULT_LOCALE;
}

function authCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge,
    path: '/',
  };
}

type RefreshedSession = {
  accessToken: string;
  refreshToken: string;
  payload: JWTPayload;
} | null;

async function refreshSessionIfPossible(request: NextRequest): Promise<RefreshedSession> {
  const refreshToken = request.cookies.get('refreshToken')?.value;
  if (!refreshToken) return null;

  const payload = await verifyRefreshToken(refreshToken);
  if (!payload) return null;

  const accessToken = await generateAccessToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  });
  const newRefreshToken = await generateRefreshToken({
    userId: payload.userId,
    email: payload.email,
    role: payload.role,
  });

  return { accessToken, refreshToken: newRefreshToken, payload };
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

  const accessToken = request.cookies.get('accessToken')?.value;
  const isProtectedPath = PROTECTED_PATHS.some(path => pathNoLocale.startsWith(path));
  const isAuthPath = AUTH_PATHS.some(path => pathNoLocale.startsWith(path));

  if (isProtectedPath) {
    const user = accessToken ? await verifyAccessToken(accessToken) : null;

    if (!user) {
      const refreshed = await refreshSessionIfPossible(request);

      if (!refreshed) {
        const loginUrl = '/' + [resolveLocale(first), 'login'].join('/');
        const response = NextResponse.redirect(new URL(loginUrl, request.url));
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        return response;
      }

      const response = await intlayerProxy(request);
      response.cookies.set('accessToken', refreshed.accessToken, authCookieOptions(ACCESS_TOKEN_MAX_AGE));
      response.cookies.set('refreshToken', refreshed.refreshToken, authCookieOptions(REFRESH_TOKEN_MAX_AGE));
      return response;
    }
  }

  if (isAuthPath) {
    const user = accessToken ? await verifyAccessToken(accessToken) : null;

    if (!user) {
      const refreshed = await refreshSessionIfPossible(request);
      if (refreshed) {
        const dashUrl = '/' + [resolveLocale(first), 'dashboard'].join('/');
        const response = NextResponse.redirect(new URL(dashUrl, request.url));
        response.cookies.set('accessToken', refreshed.accessToken, authCookieOptions(ACCESS_TOKEN_MAX_AGE));
        response.cookies.set('refreshToken', refreshed.refreshToken, authCookieOptions(REFRESH_TOKEN_MAX_AGE));
        return response;
      }
    }

    if (user) {
      const dashUrl = '/' + [resolveLocale(first), 'dashboard'].join('/');
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