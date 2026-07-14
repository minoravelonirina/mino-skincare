import React, { ReactNode } from 'react'

interface AuthContainerProps {
  children: ReactNode
}

export function AuthContainer({ children }: AuthContainerProps) {
  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative overflow-hidden " style={{
      backgroundImage: 'url(/background-pink.png)',
    }}>
      {/* Overlay gradient for better readability */}
      <div className="absolute inset-0 overflow-hidden bg-transparent blur-xs" />
      {/* rgba(255,255,255,0.1) */}
      {/* Content */}
      {/* <div className="relative z-10 w-full max-w-md bg-linear-to-br from-white/10 via-white/5 to-white/10 backdrop-brightness-100 rounded-3xl"> */}
      <div className="relative z-10 w-full max-w-md   rounded-3xl">
        {children}
      </div>
    </div>
  )
}
