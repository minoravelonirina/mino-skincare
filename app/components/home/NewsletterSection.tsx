"use client";

import { useState } from "react";
import { LocalizedContent, asString } from "@/lib/types";

export default function NewsletterSection({ content }: { content: LocalizedContent }) {
  const title = content.title ?? content.heading ?? "Stay connected";
  const description = content.description ?? content.subtitle ?? "";
  const placeholder = asString(content.placeholder) ?? "Email address";
  const submit = asString(content.submit) ?? content.cta ?? "Subscribe";
  const badge = asString(content.badge) ?? "Newsletter";
  const finePrint = asString(content.finePrint) ?? "No spam, unsubscribe at any time.";
  const success = asString(content.success) ?? "Thank you for subscribing!";
  const errorMessage = asString(content.error) ?? "Please enter a valid email address.";

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(errorMessage);
      return;
    }

    setError("");
    setSubscribed(true);
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f6f3] via-white to-[#f8f6f3]" />

      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-chocolate px-8 py-14 sm:px-14 sm:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-beige/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-beige/10 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-beige" />
                {badge}
              </span>
              <h2 className="mt-6 font-serif text-[32px] leading-tight text-white sm:text-[40px]">
                {title}
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
                {description}
              </p>
            </div>

            <div className="relative">
              {subscribed ? (
                <div className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-md">
                  <p className="text-lg font-medium text-white">{success}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="relative flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-md sm:flex-row"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={placeholder}
                    className="flex-1 rounded-xl bg-white/95 px-5 py-4 text-[14px] text-[#1a1a1a] placeholder:text-[#999] outline-none transition-all duration-300 focus:ring-2 focus:ring-beige/50"
                  />
                  <button className="rounded-xl bg-terracotta px-8 py-4 text-[14px] font-medium text-white transition-all duration-300 hover:bg-chocolate-dark hover:shadow-lg hover:shadow-terracotta/30">
                    {submit}
                  </button>
                </form>
              )}
              <p className="mt-4 text-center text-[12px] text-white/50">
                {error || finePrint}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}