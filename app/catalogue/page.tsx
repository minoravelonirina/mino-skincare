import prisma from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  images: string | null;
  isFeatured: boolean;
  isOnSale: boolean;
  category: {
    id: number;
    name: string;
    slug: string;
  } | null;
  brand: {
    id: number;
    name: string;
  } | null;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  _count: {
    products: number;
  };
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

interface CataloguePageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
  }>;
}

export default async function CataloguePage({ searchParams }: CataloguePageProps) {
  const params = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(params.search, params.category),
    getCategories(),
  ]);

  const getProductImage = (product: Product) => {
    if (product.images) {
      try {
        const images = JSON.parse(product.images);
        return images[0] || '/placeholder-product.jpg';
      } catch {
        return '/placeholder-product.jpg';
      }
    }
    return '/placeholder-product.jpg';
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
    }).format(price).replace('€', 'Ar');
  };

  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#e8e4dc] bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-serif text-xl font-semibold text-[#2d5a3d]">
            Mino<span className="italic text-[#8BAF7C]">Skincare</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-[#555] md:flex">
            <Link href="/" className="transition hover:text-[#2d5a3d]">Accueil</Link>
            <Link href="/catalogue" className="font-semibold text-[#2d5a3d]">Catalogue</Link>
            <Link href="#categories" className="transition hover:text-[#2d5a3d]">Catégories</Link>
            <Link href="#avis" className="transition hover:text-[#2d5a3d]">Avis</Link>
          </nav>
          <div className="flex items-center gap-4 text-sm text-[#555]">
            <button className="rounded-full border border-[#d8d4ca] px-4 py-2 transition hover:border-[#2d5a3d] hover:text-[#2d5a3d]">
              Connexion
            </button>
            <button className="flex items-center gap-2 rounded-full bg-[#2d5a3d] px-4 py-2 text-white transition hover:bg-[#23472e]">
              Panier <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">0</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-[#1a1a1a] sm:text-4xl">Notre Catalogue</h1>
          <p className="mt-4 max-w-2xl mx-auto text-sm text-[#555] sm:text-base">
            Découvrez notre sélection complète de produits cosmétiques naturels, des soins Mino aux marques partenaires de confiance.
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
                  placeholder="Rechercher un produit..."
                  className="w-full rounded-3xl border border-[#e8e4dc] bg-white px-4 py-3 pl-12 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
                />
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#999]">🔍</div>
              </div>
            </form>

            {/* Categories Filter */}
            <div className="flex flex-wrap gap-2">
              <Link
                href="/catalogue"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  !params.category
                    ? 'bg-[#2d5a3d] text-white'
                    : 'bg-[#eef3e8] text-[#2d5a3d] hover:bg-[#d4e8c2]'
                }`}
              >
                Tous ({products.length})
              </Link>
              {categories.map((category:any) => (
                <Link
                  key={category.id}
                  href={`/catalogue?category=${category.slug}`}
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
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">Aucun produit trouvé</h3>
            <p className="text-[#555] mb-6">Essayez de modifier vos critères de recherche.</p>
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-md bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]"
            >
              Voir tous les produits
            </Link>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-[#555]">
                {products.length} produit{products.length > 1 ? 's' : ''} trouvé{products.length > 1 ? 's' : ''}
              </p>
              <select className="rounded-xl border border-[#e8e4dc] bg-white px-4 py-2 text-sm outline-none focus:border-[#2d5a3d]">
                <option>Trier par : Pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Nouveautés</option>
                <option>Les plus populaires</option>
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
                      {getProductImage(product) === '/placeholder-product.jpg' ? (
                        <span className="text-6xl">🧴</span>) : (
                        <Image
                          src={getProductImage(product)}
                          alt={product.name}
                          className="h-full w-full object-cover"/>
                        )}
                    </div>
                    {product.isFeatured && (
                      <div className="absolute top-3 left-3 rounded-full bg-[#2d5a3d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                        Vedette
                      </div>
                    )}
                    {product.isOnSale && (
                      <div className="absolute top-3 right-3 rounded-full bg-[#E6A817] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                        Promo
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
                        + Panier
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
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-4xl bg-[#EEF3E8] px-6 py-10 sm:px-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
            <div>
              <h2 className="text-3xl font-serif text-[#1a1a1a]">Rejoignez notre communauté</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#555] sm:text-base">
                Inscrivez-vous pour recevoir nos offres exclusives, conseils bien-être et nouveautés Mino Skincare chaque semaine.
              </p>
            </div>
            <form className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
              <input
                type="email"
                placeholder="Votre adresse email..."
                className="flex-1 rounded-3xl border border-[#c8deb4] bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
              />
              <button className="rounded-3xl bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]">
                S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a1a1a] text-[#ccc]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="font-serif text-2xl text-[#8BAF7C]">Mino Skincare</div>
            <p className="mt-4 text-sm leading-7 text-[#999]">
              Boutique de cosmétiques naturels, mêlant nos produits maison et une sélection de marques partenaires pour une routine de beauté complète.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[#777]">
              <span className="rounded-full bg-[#333] px-3 py-1">Visa</span>
              <span className="rounded-full bg-[#333] px-3 py-1">Mastercard</span>
              <span className="rounded-full bg-[#333] px-3 py-1">Mobile Money</span>
            </div>
          </div>

          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Boutique</div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>Alimentation</li>
              <li>Beauté</li>
              <li>Nouveautés</li>
              <li>Promotions</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Info</div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>À propos</li>
              <li>Blog</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Legal</div>
            <ul className="space-y-2 text-sm text-[#999]">
              <li>CGV</li>
              <li>Confidentialité</li>
              <li>Livraison</li>
              <li>Retours</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#222] bg-[#111] px-4 py-4 text-xs text-[#555] sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
            <span>© 2026 Mino Skincare — Tous droits réservés</span>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">f</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">in</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">ig</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}