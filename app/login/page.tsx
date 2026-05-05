'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true)
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                credentials: 'include',
                body: JSON.stringify(formData),
            });
        
            const data = await response.json ();
            if (data.success) {
                handleClick();
            }
            else {
                setError(data.message || 'Inscription echoue');
            }
        } catch (error){
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        };
    }

    const handleClick = () =>{
        window.location.href = '/dashboard';
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <div className="font-serif text-2xl font-semibold text-[#2d5a3d] mb-2">
                        Mino<span className="italic text-[#8BAF7C]">Skincare</span>
                    </div>
                    <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a]">
                        Bienvenue
                    </h2>
                    <p className="mt-2 text-sm text-[#555]">
                        Connectez-vous à votre compte
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                    Adresse email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-[#e8e4dc] placeholder-[#999] text-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-[#2d5a3d] transition-colors"
                                    placeholder="votre@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#1a1a1a] mb-2">
                                    Mot de passe
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="appearance-none relative block w-full px-4 py-3 border border-[#e8e4dc] placeholder-[#999] text-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-[#2d5a3d] transition-colors"
                                    placeholder="Votre mot de passe"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#2d5a3d] hover:bg-[#23472e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d5a3d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {loading ? 'Connexion en cours...' : 'Se connecter'}
                        </button>

                        <div className="text-sm text-center">
                            <Link href="/register" className="font-medium text-[#2d5a3d] hover:text-[#23472e] transition-colors">
                                Pas encore de compte ? S&apos;inscrire
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
};