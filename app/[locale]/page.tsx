import { getIntlayer } from "next-intlayer";
import { getLocale } from "next-intlayer/server";

import {
  getCategories,
  getFeaturedProducts,
  getOtherProducts,
  getReviews,
  type CategoryWithCount,
  type ProductWithRelations,
  type ReviewWithRelations,
} from "@/lib/home";

import HeroSection from "../components/home/HeroSection";
import PromiseBar from "../components/home/PromiseBar";
import CategoriesSection from "../components/home/CategoriesSection";
import FeaturedProductsSection from "../components/home/FeaturedProductsSection";
import MoreProductsSection from "../components/home/MoreProductsSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import NewsletterSection from "../components/home/NewsletterSection";
import StoreUnavailable from "../components/StoreUnavailable";

export default async function Home() {
  const locale = await getLocale();
  const content = getIntlayer("page", locale);
  let categories: CategoryWithCount[] = [];
  let featuredProducts: ProductWithRelations[] = [];
  let otherProducts: ProductWithRelations[] = [];
  let reviews: ReviewWithRelations[] = [];

  try {
    [categories, featuredProducts, otherProducts, reviews] = await Promise.all([
      getCategories(),
      getFeaturedProducts(),
      getOtherProducts(),
      getReviews(),
    ]);
  } catch (err) {
    console.error("Home data fetch failed:", err);

    return <StoreUnavailable locale={locale} />;
  }

  return (
    <main className="bg-[#fde8e8] text-[#1a1a1a] antialiased">
      <HeroSection content={content.hero} locale={locale} />
      <PromiseBar content={content.promises} />
      <CategoriesSection categories={categories} content={content.categories} locale={locale} />
      <FeaturedProductsSection products={featuredProducts} content={content.featuredProducts} locale={locale} />
      <MoreProductsSection products={otherProducts} content={content.moreProducts} saleBadge={content.featuredProducts.saleBadge} locale={locale} />
      <TestimonialsSection reviews={reviews} content={content.testimonials} />
      <NewsletterSection content={content.newsletter} />
    </main>
  );
}