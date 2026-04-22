import type { JWTPayload as JoseJWTPayload } from "jose";

export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    password?: string;
    phone?: string;
    role?: string;
    createdAt: Date;
    
}

export interface JWTPayload extends JoseJWTPayload {
    userId: number;
    email: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    user?: Omit<User, 'password'>;
    accessToken? : string
}