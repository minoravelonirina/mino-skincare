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
    confirmPassword: string;
    phone: string
}

export interface AuthResponse {
    success: boolean;
    message?: string;
    user?: Omit<User, 'password'>;
    accessToken? : string
}

export interface CartProduct {
  id: number
  name: string
  price: number
}

export interface CartItemData {
  id: number
  quantity: number
  product: CartProduct
}

export interface CheckoutFormProps {
  cartItems: CartItemData[]
  totalAmount: number
}

export interface AddToCartFormProps {
  productId: number
}

export interface UserData {																	
  userId: string;																	
  email: string;																	
  firstname: string;
  lastname: string																	
}	

export interface CataloguePageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  images: string | null;
  isFeatured: boolean;
  isOnSale: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  brand: {
    id: number;
    name: string;
  } | null;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
}