'use client';																	
																	
import { useEffect, useState } from 'react';																	
import { useRouter } from 'next/navigation';																	
																	
interface UserData {																	
  userId: string;																	
  email: string;																	
  firstname: string;
  lastname: string																	
}																	
																	
export default function DashboardPage() {																	
  const router = useRouter();																	
  const [userData, setUserData] = useState<UserData | null>(null);																	
  const [protectedData, setProtectedData] = useState<any>(null);																	
  const [loading, setLoading] = useState(true);																	
																	
  useEffect(() => {																	
    fetchProtectedData();																	
  }, []);																	
																	
  const fetchProtectedData = async () => {																	
    try {																	
      const response = await fetch('/api/protected');																	
      const data = await response.json();																	
																	
      if (data.success) {																	
        setUserData(data.user);																	
        setProtectedData(data.data);																	
      }																	
    } catch (error) {																	
      console.error('Error fetching protected data:', error);																	
    } finally {																	
      setLoading(false);																	
    }																	
  };																	
																	
  const handleLogout = async () => {																	
    try {																	
      await fetch('/api/auth/logout', { method: 'POST' });
      router.refresh();																		
      router.push('/login');																												
    } catch (error) {																	
      console.error('Logout error:', error);																	
    }																	
  };																	
																	
  if (loading) {																	
    return (																	
      <div className="min-h-screen flex items-center justify-center">																	
        <div className="text-xl">Loading...</div>																	
      </div>																	
    );																	
  }																	
																	
  return (																	
    <div className="min-h-screen bg-gray-50">																	
      <nav className="bg-white shadow-sm">																	
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">																	
          <div className="flex justify-between h-16">																	
            <div className="flex items-center">																	
              <h1 className="text-xl font-bold">Dashboard</h1>																	
            </div>																	
            <div className="flex items-center">																	
              <button																	
                onClick={handleLogout}																	
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"																	
              >																	
                Logout																	
              </button>																	
            </div>																	
          </div>																	
        </div>																	
      </nav>																	
																	
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">																	
        <div className="px-4 py-6 sm:px-0">																	
          <div className="bg-white shadow rounded-lg p-6 mb-6">																	
            <h2 className="text-2xl font-bold mb-4">Welcome, {userData?.firstname}!</h2>																	
            <div className="space-y-2">																	
              <p className="text-gray-600">																	
                <span className="font-semibold">Email:</span> {userData?.email}																	
              </p>																	
              <p className="text-gray-600">																	
                <span className="font-semibold">User ID:</span> {userData?.userId}																	
              </p>																	
            </div>																	
          </div>																	
																	
          <div className="bg-white shadow rounded-lg p-6">																	
            <h3 className="text-xl font-bold mb-4">Protected Data</h3>																	
            {protectedData && (																	
              <div className="space-y-2">																	
                <p className="text-gray-600">{protectedData.secretInfo}</p>																	
                <p className="text-sm text-gray-500">																	
                  Last accessed: {new Date(protectedData.timestamp).toLocaleString()}																	
                </p>																	
              </div>																	
            )}																	
          </div>																	
        </div>																	
      </main>																	
    </div>																	
  );																	
}																	
																																	
