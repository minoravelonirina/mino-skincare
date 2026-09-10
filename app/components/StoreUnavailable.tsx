interface StoreUnavailableProps {
  locale: string;
}

export default function StoreUnavailable({ locale }: StoreUnavailableProps) {
  const isFrench = locale === "fr";

  return (
    <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#f1c5c5] bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#b45b5b]">
            {isFrench ? "Momentané" : "Temporary"}
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[#1f1f1f]">
            {isFrench ? "Nous préparons votre expérience" : "We’re preparing your experience"}
          </h2>
          <p className="mt-3 text-base leading-7 text-[#555]">
            {isFrench
              ? "La boutique est en cours de synchronisation. Merci de patienter quelques instants pendant que les contenus se chargent."
              : "The storefront is syncing its latest content. Please wait a moment while the experience is loading."}
          </p>
          <div className="mt-6 rounded-xl bg-[#fdf3f3] p-4 text-sm text-[#333]">
            <p className="font-semibold">
              {isFrench ? "Ce que vous pouvez vérifier" : "What you can check"}
            </p>
            <ul className="mt-2 ml-5 list-disc space-y-1">
              <li>
                {isFrench
                  ? "Votre configuration de base de données est bien renseignée."
                  : "Your database configuration is properly set up."}
              </li>
              <li>
                {isFrench
                  ? "Les migrations Prisma ont bien été appliquées."
                  : "The Prisma migrations have been applied successfully."}
              </li>
              <li>
                {isFrench
                  ? "Le serveur de développement a été redémarré après la mise à jour."
                  : "The development server was restarted after the update."}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}