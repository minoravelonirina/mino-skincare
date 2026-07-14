'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AuthForm } from "../../components/auth-form"
import { AuthContainer } from '../../components/auth-container'
import { getLocaleFromPath } from 'intlayer'
import { RegisterData } from '@/lib/types'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const locale = getLocaleFromPath()
  const router = useRouter()

  const handleRegister = async (data: RegisterData) => {
    setIsLoading(true)
    setMessage('')

    try {
      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match')
      }

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.email,
            password: data.password,
        })
      })

      const dataResponse = await response.json();
      if (dataResponse.success){
        setMessage('✓ Account created successfully!')
        router.push(`/${locale}/login?registered=true`)
      } 
    } catch (error) {
      setMessage(error instanceof Error ? `✗ ${error.message}` : '✗ Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContainer>
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl space-y-8 hover:bg-white/15 transition-colors duration-500">
        {/* Header */}

        <div className="space-y-2 text-center">																									
          <div className="font-serif text-5xl font-semibold text-[rgb(45,90,61)] mb-2">																									
            Mino<span className="italic text-[#8BAF7C] font-bold">Skincare</span>																									
          </div>																																																
        </div>


        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold textwhite text-[#6B5651] drop-shadow-lg">Create Account</h1>
          <p className="textwhite/70 text-[#9B8E87] text-sm">Join us and start exploring</p>
        </div>

        {/* Form */}
        <AuthForm type="register" onSubmit={handleRegister} />

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
        <div className="flex items-center justify-center gap-2">
          <span className="textwhite/60 text-[#9B8E87] text-sm">Already have an account?</span>
          <Link
            href={`/${locale}/login`}
            className="text-[#6c8860] hover:text-[#a0c98f] font-semibold transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </AuthContainer>
  )
}
