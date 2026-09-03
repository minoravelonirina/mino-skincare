import Link from "next/link";
import SectionHeader from "./SectionHeader";
import ProductCard from "./ProductCard";
import { getLocaleFromPath } from "intlayer";

export default function FeaturedProductsSection({ products, content }: { products: any[]; content: any }) {
  const locale = getLocaleFromPath()
  const title = content.title ?? content.heading ?? "Featured products";
  const description = content.description ?? content.subtitle ?? "";
  const seeAll = content.seeAll ?? content.cta ?? "See all";

  return (
    <section id="vitrine" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2d5a3d]/5 px-4 py-2 text-[12px] font-medium text-[#2d5a3d]">
            Featured
          </span>
          <h2 className="mt-5 font-serif text-[32px] tracking-tight text-[#1a1a1a] sm:text-[40px]">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#888]">
            {description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} saleBadge={content.saleBadge} showCompareAtPrice viewDetails={content.viewDetails} inStock={content.inStock} outOfStock={content.outOfStock} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href={`/${locale}/catalogue`}
            className="group inline-flex items-center gap-3 rounded-full border border-[#e0ddd5] bg-white px-8 py-4 text-[14px] font-medium text-[#2d5a3d] transition-all duration-300 hover:border-[#2d5a3d] hover:shadow-lg hover:shadow-[#2d5a3d]/10"
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
