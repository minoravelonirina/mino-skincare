import fs from "node:fs";
import path from "node:path";
import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { getIntlayer } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import { CataloguePageProps, Product, Category} from "@/lib/types"
import { getProductImage, placeholderProductImage, formatPrice } from "@/lib/home";
import NewsletterSection from "@/app/components/home/NewsletterSection";

function pathExists(src: string): boolean {
  const filePath = path.join(process.cwd(), "public", src);
  return fs.existsSync(filePath);
}

async function getProducts(search?: string, category?: string) {
  const where: any = {
    isActive: true,
  };

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
      { brand: { name: { contains: search, mode: 'insensitive' } } },
    ];
  }

  if (category) {
    where.category = { slug: category };
  }

  const products = await prisma.product.findMany({
    where,
    include: {
      category: true,
      brand: true,
    },
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' },
    ],
  });

  return products;
}

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: { where: { isActive: true } } },
      },
    },
    orderBy: { name: 'asc' },
  });

  return categories;
}

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const locale = await getLocale();
  const content = getIntlayer("catalogue", locale);
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params.search, params.category),
    getCategories(),
  ]);

  const resolveProductImage = (product: Product): string => {
    const candidate = getProductImage(product.images);
    if (!candidate) return placeholderProductImage;
    if (
      candidate.startsWith("http://") ||
      candidate.startsWith("https://") ||
      candidate.startsWith("data:")
    ) {
      return candidate;
    }
    try {
      return pathExists(candidate) ? candidate : placeholderProductImage;
    } catch {
      return placeholderProductImage;
    }
  };

  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      {/* Header */}

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#1a1a1a] sm:text-4xl">{content.hero.title}</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-[#555] sm:text-base">
            {content.hero.description}
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <form className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="search"
                  name="search"
                  defaultValue={params.search}
                  placeholder={content.searchPlaceholder}
                  className="w-full rounded-3xl border border-[#e8e4dc] bg-white px-4 py-3 pl-12 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]">🔍</div>
              </div>
            </form>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/${locale}/catalogue`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  !params.category
                    ? 'bg-[#2d5a3d] text-white'
                    : 'bg-[#eef3e8] text-[#2d5a3d] hover:bg-[#d4e8c2]'
                }`}
              >
                {content.all} ({products.length})
              </Link>
              {categories.map((category:any) => (
                <Link
                  key={category.id}
                  href={`/${locale}/catalogue?category=${category.slug}`}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    params.category === category.slug
                      ? 'bg-[#2d5a3d] text-white'
                      : 'bg-[#eef3e8] text-[#2d5a3d] hover:bg-[#d4e8c2]'
                  }`}
                >
                  {category.name} ({category._count.products})
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{content.empty.title}</h3>
            <p className="text-[#555] mb-6">{content.empty.description}</p>
            <Link
              href={`/${locale}/catalogue`}
              className="inline-flex items-center justify-center rounded-md bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]"
            >
              {content.empty.cta}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-[#555]">
                {products.length} {content.productCount}
              </p>
              <select className="rounded-xl border border-[#e8e4dc] bg-white px-4 py-2 text-sm outline-none focus:border-[#2d5a3d]">
                <option>{content.sortBy.label}</option>
                <option>{content.sortBy.priceAsc}</option>
                <option>{content.sortBy.priceDesc}</option>
                <option>{content.sortBy.newest}</option>
                <option>{content.sortBy.popular}</option>
              </select>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product: any) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-3xl border border-[#e8e4dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f8f8f6]">
                    <div className="flex h-full w-full items-center justify-center text-6xl">
                      {resolveProductImage(product) === '/placeholder-product.jpg' ? (
                        <span className="text-6xl">🧴</span>) : (
                        <Image
                          src={resolveProductImage(product)}
                          alt={product.name}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover"
                          loading="eager"/>
                        )}
                    </div>
                    {product.isFeatured && (
                      <div className="absolute top-3 left-3 rounded-full bg-[#2d5a3d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                        {content.featuredBadge}
                      </div>
                    )}
                    {product.isOnSale && (
                      <div className="absolute top-3 right-3 rounded-full bg-[#E6A817] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                        {content.promoBadge}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="mb-2 flex items-center gap-2">
                      {product.brand && (
                        <span className="rounded-full bg-[#eef3e8] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#2d5a3d]">
                          {product.brand.name}
                        </span>
                      )}
                      {product.category && (
                        <span className="rounded-full bg-[#f5ede4] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">
                          {product.category.name}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-semibold text-[#1a1a1a] mb-2 line-clamp-2">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="text-sm text-[#555] mb-4 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="text-lg font-semibold text-[#2d5a3d]">
                          {formatPrice(product.price)}
                        </div>
                        {product.compareAtPrice && product.compareAtPrice > product.price && (
                          <div className="text-xs text-[#999] line-through">
                            {formatPrice(product.compareAtPrice)}
                          </div>
                        )}
                      </div>
                      <button className="rounded-xl bg-[#2d5a3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23472e] group-hover:bg-[#23472e]">
                        {content.addToCart}
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Newsletter */}
      <NewsletterSection content={content.newsletter} />
    </main>
  );
}