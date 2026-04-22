import { getCurrentUser } from "@/lib/auth";
import { unauthorized } from "next/navigation";
import { NextRequest } from "next/server";
import { internalServerResponse, successResponse } from "../utils/responses";

export async function GET (request: NextRequest){
    try {
        const user = await getCurrentUser(request);

        if (!user)
            return unauthorized();

        return successResponse({
            message: 'Ceci est un donnee securise.',
            user,
            data: {
                secretInfo: 'Seul les utilisateurs authentifies qui ont acces a ceci.',
                timestamp: new Date().toISOString(),
            }
        })
    } catch (error: any) {
        return internalServerResponse("Erreur serveur");
    }
}