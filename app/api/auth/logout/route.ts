import { clearAuthCookies } from "@/lib/auth";
import { internalServerResponse, successResponse } from "../../utils/responses";

export async function POST() {
    try {
        await clearAuthCookies();

        return successResponse({
            message: "Deconnexion reussi!",
        })
    } catch {
        return internalServerResponse("Deconnexion echoue");
    }
}