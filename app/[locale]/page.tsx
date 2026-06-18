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
    // Log the error server-side for diagnosis and return a safe fallback UI.
    // Common cause: database not migrated / tables missing (Prisma P2021).
    // Keep the page loadable so dev can see instructions.
    // eslint-disable-next-line no-console
    console.error("Home data fetch failed:", err);

    return (
      <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
        <Header content={content.navigation} />
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-red-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-red-700">Erreur de base de données</h2>
            <p className="mt-2 text-sm text-[#555]">
              L'application n'a pas pu charger les données. Il est probable que la base de
              données n'ait pas été initialisée ou que les migrations n'aient pas été appliquées.
            </p>
            <div className="mt-4 text-sm text-[#333]">
              <p className="font-semibold">Actions recommandées :</p>
              <ol className="ml-4 list-decimal">
                <li>Vérifier que `DATABASE_URL` est défini dans votre environnement.</li>
                <li>Exécuter les migrations Prisma : <code>npx prisma migrate dev</code> ou <code>npx prisma db push</code>.</li>
                <li>Relancer le serveur de développement : <code>pnpm dev</code>.</li>
              </ol>
            </div>
            <pre className="mt-4 overflow-auto bg-[#fafafa] p-2 text-xs text-red-600">{String(err)}</pre>
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
