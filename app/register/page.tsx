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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">																									
      <div className="max-w-md w-full space-y-8">																									
        <div>																									
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">																									
            Create your account																									
          </h2>																									
        </div>																									
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>																									
          {error && (																									
            <div className="rounded-md bg-red-50 p-4">																									
              <p className="text-sm text-red-800">{error}</p>																									
            </div>																									
          )}																									
          <div className="rounded-md shadow-sm space-y-4">																									
            <input																									
              type="text"																									
              required																									
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"																									
              placeholder="Fisrtname"																									
              value={formData.firstname}																									
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}																									
            />	
            <input																									
              type="text"																									
              required																									
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"																									
              placeholder="Lastname"																									
              value={formData.lastname}																									
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}																									
            />																								
            <input																									
              type="email"																									
              required																									
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"																									
              placeholder="Email address"																									
              value={formData.email}																									
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}																									
            />																									
            <input																									
              type="password"																									
              required																									
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"																									
              placeholder="Password"																									
              value={formData.password}																									
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}																									
            />																									
            <input																									
              type="password"																									
              required																									
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"																									
              placeholder="Confirm Password"																									
              value={formData.confirmPassword}																									
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}																									
            />																									
          </div>																									
																									
          <button																									
            type="submit"																									
            disabled={loading}																									
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"																									
          >																									
            {loading ? 'Creating account...' : 'Register'}																									
          </button>																									
																									
          <div className="text-sm text-center">																									
            <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">											
              Already have an account? Sign in											
            </Link>											
          </div>											
        </form>											
      </div>											
    </div>											
  );											
}											
											
