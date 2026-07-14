'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface AuthFormProps {
    type: 'login' | 'register'
    onSubmit: (data: any) => void
}

export function AuthForm({ type, onSubmit }: AuthFormProps) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const SimpleForm = () => {
        return (
            <div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium textwhite/90 text-[#6b5f5c]">
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm textwhite text-[#918e8e] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium textwhite/90 text-[#6b5f5c]">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm textwhite text-[#918e8e] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b5f5c] hover:text-[#64534f] transition-colors"
                        >
                            {showPassword ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    const LoginForm = () => {
        return (
            <div>
                <SimpleForm />
            </div>
        );
    }

    const RegisterForm = () => {
        return (
            <div>
                <div className="grid grid-cols-2 gap-4">
                    <div className='space-y-2'>
                        <label htmlFor="firstname" className="block text-sm font-medium text-[#6b5f5c] textwhite/90">
                            Prénom
                        </label>
                        <input
                            id="firstname"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm textwhite text-[#918e8e] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                            placeholder="Votre prénom"
                            value={formData.firstname}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='space-y-2'>
                        <label htmlFor="lastname" className="block text-sm font-medium textwhite/90 text-[#6b5f5c]">
                            Nom
                        </label>
                        <input
                            id="lastname"
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm textwhite text-[#918e8e] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                            placeholder="Votre nom"
                            value={formData.lastname}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <SimpleForm />
                <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium textwhite/90 text-[#6b5f5c]">
                        Confirm Password
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 backdrop-blur-sm textwhite text-[#918e8e] placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-300"
                        required
                    />
                </div>
            </div>
        )
    }


    return (
        <form onSubmit={handleSubmit} className="w-full space-y-6">
            {type === 'login' ? <LoginForm /> : <RegisterForm />}
            <button
                type="submit"
                // className="w-full py-3 px-4 bg-linear-to-r from-cyan-400 to-blue-500 text-white font-semibold rounded-xl hover:from-cyan-300 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
                className="w-full py-3 px-4 bg-[#8BAF7C] text-white font-semibold rounded-xl hover:from-cyan-300 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
                {type === 'login' ? 'Sign In' : 'Create Account'}
            </button>
        </form>
    )
}
