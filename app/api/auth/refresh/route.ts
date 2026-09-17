import { cookies } from "next/headers";
import { internalServerResponse, successResponse, unauthorizedResponse } from "../../utils/responses";
import { generateAccessToken, generateRefreshToken, setAuthCookies, verifyRefreshToken } from "@/lib/auth";

export async function POST() {
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
            role: payload.role,
        });

        const newRefreshToken = await generateRefreshToken({
            userId: payload.userId,
            email: payload.email,
            role: payload.role,
        });

        await setAuthCookies(newAccessToken, newRefreshToken);

        return successResponse({
            message: "Token rafreshi ok!",
            accessToken: newAccessToken
        })
    }
    catch {
        return internalServerResponse('Rafraichissement du token echoue');
    }
} 