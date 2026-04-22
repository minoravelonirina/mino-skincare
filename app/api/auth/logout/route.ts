import { clearAuthCookies } from "@/lib/auth";
import { NextRequest } from "next/server";
import { internalServerResponse, successResponse } from "../../utils/responses";

export async function POST(request: NextRequest) {
    try {
        await clearAuthCookies();

        return successResponse({
            message: "Deconnexion reussi!",
        })
    } catch (error: any){
        return internalServerResponse("Deconnexion echoue");
    }
}