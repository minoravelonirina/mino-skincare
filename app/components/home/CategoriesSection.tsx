import Link from "next/link";
import { categoryVisuals } from "@/lib/home";
import { getLocaleFromPath } from "intlayer";

export default function CategoriesSection({ categories, content }: { categories: any[]; content: any }) {
  const locale = getLocaleFromPath()
  const title = content.title ?? content.heading ?? "Shop by category";
  const description = content.description ?? content.subtitle ?? "";
  const productSingular = content.productSingular ?? "product";
  const productPlural = content.productPlural ?? "products";

  return (
    <section id="categories" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#faf8f5] to-white" />
      
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2d5a3d]/5 px-4 py-2 text-[12px] font-medium text-[#2d5a3d]">
            Categories
          </span>
          <h2 className="mt-5 font-serif text-[32px] tracking-tight text-[#1a1a1a] sm:text-[40px]">
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#888]">
            {description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const visual = categoryVisuals[index % categoryVisuals.length];
            const productLabel = category._count.products > 1 ? productPlural : productSingular;

            return (
              <Link key={category.id} href={`/${locale}/catalogue?category=${category.slug}`}>
                <article className="group relative overflow-hidden rounded-3xl bg-white p-6 ring-1 ring-[#e8e4dc] transition-all duration-500 hover:ring-[#2d5a3d]/30 hover:shadow-xl hover:shadow-[#2d5a3d]/5">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2d5a3d]/5 text-[11px] font-bold text-[#2d5a3d] transition-all duration-500 group-hover:bg-[#2d5a3d] group-hover:text-white">
                    {visual.label}
                  </div>
                  
                  <h3 className="text-[17px] font-semibold text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#2d5a3d]">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="mt-2 text-[13px] leading-relaxed text-[#888]">
                      {category.description}
                    </p>
                  )}
                  
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-[12px] font-medium text-[#aaa]">
                      {category._count.products} {productLabel}
                    </span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f8f6f3] text-[#2d5a3d] transition-all duration-300 group-hover:bg-[#2d5a3d] group-hover:text-white">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
