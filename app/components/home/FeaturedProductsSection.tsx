import Link from "next/link";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";

export default function FeaturedProductsSection({ products, content, locale }: { products: any[]; content: any; locale: string }) {
  const title = content.title ?? content.heading ?? "Featured products";
  const description = content.description ?? content.subtitle ?? "";
  const seeAll = content.seeAll ?? content.cta ?? "See all";

  return (
    <section id="vitrine" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <SectionHeader eyebrow="Featured" title={title} description={description} />

<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} saleBadge={content.saleBadge} showCompareAtPrice viewDetails={content.viewDetails} inStock={content.inStock} outOfStock={content.outOfStock} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/catalogue`}
            className="group inline-flex items-center gap-3 rounded-full border border-[#e0ddd5] bg-white px-8 py-4 text-[14px] font-medium text-chocolate transition-all duration-300 hover:border-chocolate hover:shadow-lg hover:shadow-chocolate/10"
          >
            {seeAll}
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
