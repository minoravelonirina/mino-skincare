"use client";

import Link from "next/link";
import { useLocale } from "next-intlayer";

export default function NotFoundPage() {
  const { locale } = useLocale();
  const isFrench = locale === "fr";

  return (
    <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#f1c5c5] bg-white p-8 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b45b5b]">404</p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
            {isFrench ? "Page introuvable" : "Page not found"}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#555]">
            {isFrench
              ? "La page que vous recherchez n'existe pas ou a été déplacée."
              : "The page you're looking for doesn't exist or has been moved."}
          </p>
          <Link
            href={`/${locale}`}
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-chocolate px-6 py-3 text-sm font-semibold text-white transition hover:bg-chocolate-dark"
          >
            {isFrench ? "Retour à l'accueil" : "Back to home"}
          </Link>
        </div>
      </div>
    </main>
  );
}