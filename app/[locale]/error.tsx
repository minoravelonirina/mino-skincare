"use client";

import { useEffect } from "react";
import { useLocale } from "next-intlayer";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { locale } = useLocale();
  const isFrench = locale === "fr";

  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#f1c5c5] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b45b5b]">
            {isFrench ? "Erreur" : "Error"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
            {isFrench ? "Un problème est survenu" : "Something went wrong"}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#555]">
            {isFrench
              ? "Une erreur inattendue s'est produite pendant le chargement de la page."
              : "An unexpected error occurred while loading the page."}
          </p>
          <div className="mt-6">
            <button
              onClick={reset}
              className="rounded-xl bg-chocolate px-6 py-3 text-sm font-semibold text-white transition hover:bg-chocolate-dark"
            >
              {isFrench ? "Réessayer" : "Try again"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}