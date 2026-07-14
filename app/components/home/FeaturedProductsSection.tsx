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
    <section id="vitrine" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 ">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeader title={title} description={description} />
        <Link href={`/${locale}/catalogue`} className="rounded-full border border-[#d8d4ca] bg-[#f6f3f3] px-5 py-3 text-sm text-[#555] shadow-sm transition hover:border-[#2d5a3d] hover:text-[#2d5a3d] ">
          {seeAll}
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} saleBadge={content.saleBadge} showCompareAtPrice />
        ))}
      </div>
    </section>
  );
}
