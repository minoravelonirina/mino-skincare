import Link from "next/link";
import { categoryVisuals } from "@/lib/home";

export default function CategoriesSection({ categories, content }: { categories: any[]; content: any }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div>
        <h2 className="font-serif text-3xl text-[#1a1a1a]">{content.title}</h2>
        <p className="mt-2 max-w-2xl text-sm text-[#374151] sm:text-base">{content.description}</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category, index) => {
          const visual = categoryVisuals[index % categoryVisuals.length];
          const productLabel = category._count.products > 1 ? content.productPlural : content.productSingular;

          return (
            <Link key={category.id} href={`/catalogue?category=${category.slug}`}>
              <article className="cursor-pointer rounded-3xl bg-[#f6f3f3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl text-sm font-semibold text-[#2d5a3d] ${visual.className}`}>
                  {visual.label}
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{category.name}</h3>
                {category.description && <p className="mt-2 text-sm text-[#555]">{category.description}</p>}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">{category._count.products} {productLabel}</p>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
