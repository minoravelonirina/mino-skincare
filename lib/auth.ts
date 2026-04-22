import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { JWTPayload } from "./types";

const secretKey = process.env.JWT_SECRET!;
const refreshSecretKey = process.env.JWT_REFRESH_SECRET!;
const key = new TextEncoder().encode(secretKey);
const refreshKey = new TextEncoder().encode(refreshSecretKey);

// pourquoi mettre async dans la definition d'une fonction ?
// Et pourquoi mettre promise, que veut dire promise ?

// Generate Access token
export async function generateAccessToken(payload: JWTPayload): Promise<string> {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(key);
}

// Generate Refresh token
export async function generateRefreshToken(payload: JWTPayload):Promise<string>{
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(refreshKey);
}

export async function verifyAccessToken(token: string): Promise<JWTPayload | null> {
    try {
        const verified = await jwtVerify(token, key);
        return verified.payload as JWTPayload;
    } catch (error) {
        return null;
    }
}

export async function verifyRefreshToken(token: string): Promise<JWTPayload | null> {
    try {
        const verified = await jwtVerify(token, refreshKey);
        return verified.payload as JWTPayload;
    } catch (error) {
        return null;
    }
}

export function getTokenFromHeaders(request: NextRequest): string | null {
    const authHeader = request.headers.get('authorisation');
    if (authHeader && authHeader.startsWith('Bearer ')){
        return authHeader.substring(7);
    }
    return null;
}

export async function getCurrentUser (request: NextRequest): Promise<JWTPayload | null>{
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value || getTokenFromHeaders (request);

    if (!token) return null;
    return await verifyAccessToken(token);
}

export async function setAuthCookies(accessToken: string, refreshToken: string){
    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 15, 
        path: '/'
    });

    cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days 
        path: '/'
    });
}

export async function clearAuthCookies() {
    const cookieStore = await cookies();
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
}





