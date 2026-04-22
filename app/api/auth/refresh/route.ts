import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { errorResponse, internalServerResponse, successResponse, unauthorizedResponse } from "../../utils/responses";
import { generateAccessToken, generateRefreshToken, setAuthCookies, verifyRefreshToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;

        if (!refreshToken)
            return unauthorizedResponse();

        const payload = await verifyRefreshToken(refreshToken);
        if (!payload)
            return unauthorizedResponse();
        

        const newAccessToken = await generateAccessToken({
            userId: payload.userId,
            email: payload.email,
        });

        const newRefreshToken = await generateRefreshToken({
            userId: payload.userId,
            email: payload.email
        });

        await setAuthCookies(newAccessToken, newRefreshToken);

        return successResponse({
            message: "Token rafreshi ok!",
            accessToken: newAccessToken
        })
    }
    catch (error: any) {
        return internalServerResponse('Rafraichissement du token echoue');
    }
} 