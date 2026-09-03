"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface AuthFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthFormProps {
  type: "login" | "register";
  labels: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    emailPlaceholder?: string;
    passwordPlaceholder?: string;
    submit?: string;
  };
  loading?: boolean;
  onSubmit: (data: AuthFormData) => void;
}

export function AuthForm({ type, labels, loading = false, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const inputClass =
    "w-full rounded-2xl border border-[#e8e4dc] bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none transition-all duration-300 placeholder:text-[#999] focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]";

  const fieldLabelClass = "block text-sm font-medium text-[#555]";

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {type === "register" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className={fieldLabelClass}>
              {labels.firstName}
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder={labels.firstName}
              value={formData.firstName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="lastName" className={fieldLabelClass}>
              {labels.lastName}
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder={labels.lastName}
              value={formData.lastName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className={fieldLabelClass}>
          {labels.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={labels.emailPlaceholder}
          className={inputClass}
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className={fieldLabelClass}>
          {labels.password}
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={labels.passwordPlaceholder}
            className={`${inputClass} pr-11`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8BAF7C] transition-colors hover:text-[#2d5a3d]"
          >
            {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
          </button>
        </div>
      </div>

      {type === "register" && (
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className={fieldLabelClass}>
            {labels.confirmPassword}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={labels.passwordPlaceholder}
            className={inputClass}
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[#2d5a3d] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#1e3d2a] hover:shadow-lg hover:shadow-[#2d5a3d]/20 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-[#95a28f] disabled:hover:shadow-none"
      >
        {labels.submit}
      </button>
    </form>
  );
}
