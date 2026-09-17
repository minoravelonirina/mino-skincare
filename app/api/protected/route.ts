import { getCurrentUser } from "@/lib/auth";
import { NextRequest } from "next/server";
import { internalServerResponse, successResponse, unauthorizedResponse } from "../utils/responses";

export async function GET (request: NextRequest){
    try {
        const user = await getCurrentUser(request);

        if (!user)
            return unauthorizedResponse();

        return successResponse({
            user,
            secretInfo: 'Seul les utilisateurs authentifies qui ont acces a ceci.',
            timestamp: new Date().toISOString(),
        })
    } catch {
        return internalServerResponse("Erreur serveur");
    }
}