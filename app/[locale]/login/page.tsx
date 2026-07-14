'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthForm } from "../../components/auth-form"
import { AuthContainer } from '../../components/auth-container'
import { getLocaleFromPath } from 'intlayer'
import { useRouter } from 'next/navigation'
import { LoginCredentials } from '@/lib/types'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const locale = getLocaleFromPath()
  const router = useRouter()

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoading(true)
    setMessage('')

    try {

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(data),
        })

        const dataResponse = await response.json();
        if (dataResponse.success) {
            setMessage('✓ Login successful!')
            router.push(`/${locale}/fr`)
        } 

    } catch (error) {
      setMessage('✗ Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContainer>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl space-y-8 hover:bg-white/15 transition-colors duration-500">
        {/* Header */}
        <div className="space-y-2 text-center mt-2">																									
          <div className="font-serif text-5xl font-semibold text-[#2d5a3d] mb-2">																									
            Mino<span className="italic text-[#8BAF7C] font-bold">Skincare</span>																									
          </div>																																																
        </div>
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold textwhite text-[#6B5651] drop-shadow-lg">Welcome Back</h1>
          <p className="textwhite/70 text-[#9B8E87] text-sm">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <AuthForm type="login" onSubmit={handleLogin} />

        {/* Status Message */}
        {message && (
          <div className={`text-center text-sm font-medium p-3 rounded-lg ${
            message.includes('✓')
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}>
            {message}
          </div>
        )}

        {/* Footer Links */}
        <div className="space-y-4">
          <button className="w-full textwhite/60 text-[#9B8E87] hover:text-white/90 text-sm transition-colors">
            Forgot password?
          </button>
          <div className="flex items-center justify-center gap-2">
            <span className="textwhite/60 text-[#9B8E87] text-sm">Don't have an account?</span>
            <Link
              href={`/${locale}/register`}
              className="text-[#6c8860] hover:text-[#a0c98f] font-semibold transition-colors"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  )
}
