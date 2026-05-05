'use client';																									
																									
import { useState } from 'react';																									
import { useRouter } from 'next/navigation';																									
import Link from 'next/link';																									
																									
export default function RegisterPage() {																									
  const router = useRouter();																									
  const [formData, setFormData] = useState({																									
    firstname: '',
    lastname: '',																									
    email: '',																									
    password: '',																									
    confirmPassword: '',																									
  });																									
  const [error, setError] = useState('');																									
  const [loading, setLoading] = useState(false);																									
																									
  const handleSubmit = async (e: React.FormEvent) => {																									
    e.preventDefault();																									
    setError('');																									
																									
    if (formData.password !== formData.confirmPassword) {																									
      setError('Passwords do not match');																									
      return;																									
    }																									
																									
    setLoading(true);																									
																									
    try {																									
      const response = await fetch('/api/auth/register', {																									
        method: 'POST',																									
        headers: { 'Content-Type': 'application/json' },																									
        credentials: 'include',																									
        body: JSON.stringify({																									
          firstname: formData.firstname,
          lastname: formData.lastname,																									
          email: formData.email,																									
          password: formData.password,																									
        }),																									
      });																									
																									
      const data = await response.json();																									
																									
      if (data.success) {																									
        router.push('/login?registered=true');																									
      } else {																									
        setError(data.message || 'Registration failed');																									
      }																									
    } catch (error) {																									
      setError('An error occurred. Please try again.');																									
    } finally {																									
      setLoading(false);																									
    }																									
  };																									
																									
  return (																									
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAF7] py-12 px-4 sm:px-6 lg:px-8">																									
      <div className="max-w-md w-full space-y-8">																									
        <div className="text-center">																									
          <div className="font-serif text-2xl font-semibold text-[#2d5a3d] mb-2">																									
            Mino<span className="italic text-[#8BAF7C]">Skincare</span>																									
          </div>																									
          <h2 className="text-3xl font-serif font-semibold text-[#1a1a1a]">																									
            Créer un compte																									
          </h2>																									
          <p className="mt-2 text-sm text-[#555]">																									
            Rejoignez notre communauté de soins naturels																									
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
              <div className="grid grid-cols-2 gap-4">																									
                <div>																									
                  <label htmlFor="firstname" className="block text-sm font-medium text-[#1a1a1a] mb-2">																									
                    Prénom																									
                  </label>																									
                  <input																									
                    id="firstname"																									
                    type="text"																									
                    required																									
                    className="appearance-none relative block w-full px-4 py-3 border border-[#e8e4dc] placeholder-[#999] text-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-[#2d5a3d] transition-colors"																									
                    placeholder="Votre prénom"																									
                    value={formData.firstname}																									
                    onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}																									
                  />																									
                </div>																									
                <div>																									
                  <label htmlFor="lastname" className="block text-sm font-medium text-[#1a1a1a] mb-2">																									
                    Nom																									
                  </label>																									
                  <input																									
                    id="lastname"																									
                    type="text"																									
                    required																									
                    className="appearance-none relative block w-full px-4 py-3 border border-[#e8e4dc] placeholder-[#999] text-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-[#2d5a3d] transition-colors"																									
                    placeholder="Votre nom"																									
                    value={formData.lastname}																									
                    onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}																									
                  />																									
                </div>																									
              </div>																									
              <div>																									
                <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a] mb-2">																									
                  Adresse email																									
                </label>																									
                <input																									
                  id="email"																									
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
                  type="password"																									
                  required																									
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e8e4dc] placeholder-[#999] text-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-[#2d5a3d] transition-colors"																									
                  placeholder="Votre mot de passe"																									
                  value={formData.password}																									
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}																									
                />																									
              </div>																									
              <div>																									
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#1a1a1a] mb-2">																									
                  Confirmer le mot de passe																									
                </label>																									
                <input																									
                  id="confirmPassword"																									
                  type="password"																									
                  required																									
                  className="appearance-none relative block w-full px-4 py-3 border border-[#e8e4dc] placeholder-[#999] text-[#1a1a1a] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5a3d] focus:border-[#2d5a3d] transition-colors"																									
                  placeholder="Confirmez votre mot de passe"																									
                  value={formData.confirmPassword}																									
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}																									
                />																									
              </div>																									
            </div>																									

            <button																									
              type="submit"																									
              disabled={loading}																									
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-[#2d5a3d] hover:bg-[#23472e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d5a3d] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"																									
            >																									
              {loading ? 'Création du compte...' : 'S&apos;inscrire'}																									
            </button>																									

            <div className="text-sm text-center">																									
              <Link href="/login" className="font-medium text-[#2d5a3d] hover:text-[#23472e] transition-colors">											
                Déjà un compte ? Se connecter											
              </Link>											
            </div>											
          </form>											
        </div>											
      </div>											
    </div>											
  );
}											
											
