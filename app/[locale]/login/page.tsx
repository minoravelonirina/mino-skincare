"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthForm } from "../../components/auth-form";
import { AuthContainer } from "../../components/auth-container";
import { useIntlayer, useLocale } from "next-intlayer";
import { useRouter } from "next/navigation";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { locale } = useLocale();
  const content = useIntlayer("auth");
  const router = useRouter();

  const { title, subtitle, noAccount, signup, forgot, success, error } = content.login;

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: data.email, password: data.password }),
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setMessage(success.value);
        setTimeout(() => router.push(`/${locale}`), 800);
        return;
      }
      setMessage(error.value);
    } catch {
      setMessage(error.value);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer>
      <div className="relative rounded-[2rem] border border-[#e8e4dc] bg-white/90 p-8 shadow-xl shadow-[#2d5a3d]/5 backdrop-blur-xl sm:p-10">
        <div className="space-y-2 text-center">
          <div className="mb-2 font-serif text-4xl font-semibold text-[#2d5a3d]">
            Mino<span className="font-light italic text-[#8BAF7C]">Skincare</span>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-[#1a1a1a]">{title}</h1>
          <p className="text-sm text-[#888]">{subtitle}</p>
        </div>

        <div className="mt-8">
          <AuthForm
            type="login"
            loading={isLoading}
            labels={{
              email: content.login.email.value,
              emailPlaceholder: content.login.emailPlaceholder.value,
              password: content.login.password.value,
              passwordPlaceholder: content.login.passwordPlaceholder.value,
              submit: content.login.submit.value,
            }}
            onSubmit={handleLogin}
          />
        </div>

        {message && (
          <div className="mt-4 rounded-2xl bg-[#eef3e8] p-3 text-center text-sm font-medium text-[#2d5a3d]">
            {message}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <button className="w-full text-center text-sm text-[#888] transition-colors hover:text-[#2d5a3d]">
            {forgot}
          </button>
          <div className="flex items-center justify-center gap-2 border-t border-[#f0ede6] pt-5 text-sm">
            <span className="text-[#888]">{noAccount}</span>
            <Link href={`/${locale}/register`} className="font-medium text-[#2d5a3d] hover:text-[#1e3d2a]">
              {signup}
            </Link>
          </div>
        </div>
      </div>
    </AuthContainer>
  );
}
