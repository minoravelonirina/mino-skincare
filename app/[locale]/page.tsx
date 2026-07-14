import { getIntlayer } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import Footer from "../components/Footer";

import {
  getCategories,
  getFeaturedProducts,
  getOtherProducts,
  getReviews,
} from "@/lib/home";

import Header from "../components/home/Header";
import HeroSection from "../components/home/HeroSection";
import PromiseBar from "../components/home/PromiseBar";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import MoreProductsSection from "../components/home/MoreProductsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import NewsletterSection from "../components/home/NewsletterSection";

export default async function Home() {
  const locale = await getLocale();
  const content = getIntlayer("page", locale);
  const isFrench = locale === "fr";
  let categories = [] as any[];
  let featuredProducts = [] as any[];
  let otherProducts = [] as any[];
  let reviews = [] as any[];

  try {
    [categories, featuredProducts, otherProducts, reviews] = await Promise.all([
      getCategories(),
      getFeaturedProducts(),
      getOtherProducts(),
      getReviews(),
    ]);
  } catch (err) {
    console.error("Home data fetch failed:", err);

    return (
      <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
        <Header content={content.navigation} />
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
            <pre className="mt-6 overflow-auto rounded-lg bg-[#faf5f5] p-3 text-xs text-[#a64a4a]">
              {String(err)}
            </pre>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
      <Header content={content.navigation} />
      <HeroSection content={content.hero} />
      <PromiseBar content={content.promises} />
      <CategoriesSection categories={categories} content={content.categories} />
      <FeaturedProductsSection products={featuredProducts} content={content.featuredProducts} />
      <MoreProductsSection products={otherProducts} saleBadge={content.featuredProducts.saleBadge} />
      <TestimonialsSection reviews={reviews} content={content.testimonials} />
      <NewsletterSection content={content.newsletter} />
      <Footer />
    </main>
  );
}