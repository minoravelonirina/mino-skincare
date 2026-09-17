'use client';								
								
import { useState, useEffect } from 'react';								
import { useRouter } from 'next/navigation';	
import { getLocaleFromPath } from 'intlayer';	
import type { UserData } from './types';							
								
export function useAuth() {								
  const [user, setUser] = useState<UserData | null>(null);								
  const [loading, setLoading] = useState(true);								
  const router = useRouter();		
  const locale = getLocaleFromPath()						

  const checkAuth = async () => {								
    try {								
      const response = await fetch('/api/protected');								
      const data = await response.json();								
								
      if (data.success) {								
        setUser(data.user);								
      } else {								
        setUser(null);								
      }								
    } catch {								
      setUser(null);								
    } finally {								
      setLoading(false);								
    }								
  };								

  useEffect(() => {								
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void checkAuth();								
  }, []);								
								
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
    router.push(`/${locale}/login`);								
  };								
								
  const refreshToken = async () => {								
    try {								
      const response = await fetch('/api/auth/refresh', {								
        method: 'POST',								
      });								
								
      const data = await response.json();								
      return data.success;								
    } catch {								
      return false;								
    }								
  };								
								
  return { user, loading, login, logout, refreshToken };								
}