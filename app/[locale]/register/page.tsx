"use client";

import { useState } from "react";
import Link from "next/link";
import { AuthForm } from "../../components/auth-form";
import { AuthContainer } from "../../components/auth-container";
import { useIntlayer, useLocale } from "next-intlayer";
import { useRouter } from "next/navigation";

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { locale } = useLocale();
  const content = useIntlayer("auth");
  const router = useRouter();

  const { title, subtitle, hasAccount, signin, mismatch, success, error } = content.register;

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setMessage("");

    try {
      if (data.password !== data.confirmPassword) {
        setMessage(mismatch.value);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
        }),
      });

      const dataResponse = await response.json();
      if (dataResponse.success) {
        setMessage(success.value);
        setTimeout(() => router.push(`/${locale}/login?registered=true`), 800);
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
            type="register"
            loading={isLoading}
            labels={{
              firstName: content.register.firstName.value,
              lastName: content.register.lastName.value,
              email: content.register.email.value,
              emailPlaceholder: content.register.emailPlaceholder.value,
              password: content.register.password.value,
              passwordPlaceholder: content.register.passwordPlaceholder.value,
              confirmPassword: content.register.confirmPassword.value,
              submit: content.register.submit.value,
            }}
            onSubmit={handleRegister}
          />
        </div>

        {message && (
          <div className="mt-4 rounded-2xl bg-[#eef3e8] p-3 text-center text-sm font-medium text-[#2d5a3d]">
            {message}
          </div>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#f0ede6] pt-5 text-sm">
          <span className="text-[#888]">{hasAccount}</span>
          <Link href={`/${locale}/login`} className="font-medium text-[#2d5a3d] hover:text-[#1e3d2a]">
            {signin}
          </Link>
        </div>
      </div>
    </AuthContainer>
  );
}
