'use client';								
								
import { useState, useEffect } from 'react';								
import { useRouter } from 'next/navigation';								
								
interface User {								
  userId: string;								
  email: string;								
  name: string;								
}								
								
export function useAuth() {								
  const [user, setUser] = useState<User | null>(null);								
  const [loading, setLoading] = useState(true);								
  const router = useRouter();								
								
  useEffect(() => {								
    checkAuth();								
  }, []);								
								
  const checkAuth = async () => {								
    try {								
      const response = await fetch('/api/protected');								
      const data = await response.json();								
								
      if (data.success) {								
        setUser(data.user);								
      } else {								
        setUser(null);								
      }								
    } catch (error) {								
      setUser(null);								
    } finally {								
      setLoading(false);								
    }								
  };								
								
  const login = async (email: string, password: string) => {								
    const response = await fetch('/api/auth/login', {								
      method: 'POST',								
      headers: { 'Content-Type': 'application/json' },								
      body: JSON.stringify({ email, password }),								
    });								
								
    const data = await response.json();								
								
    if (data.success) {								
      setUser(data.user);								
      return { success: true };								
    }								
								
    return { success: false, message: data.message };								
  };								
								
  const logout = async () => {								
    await fetch('/api/auth/logout', { method: 'POST' });								
    setUser(null);								
    router.push('/login');								
  };								
								
  const refreshToken = async () => {								
    try {								
      const response = await fetch('/api/auth/refresh', {								
        method: 'POST',								
      });								
								
      const data = await response.json();								
      return data.success;								
    } catch (error) {								
      return false;								
    }								
  };								
								
  return { user, loading, login, logout, refreshToken };								
}								
