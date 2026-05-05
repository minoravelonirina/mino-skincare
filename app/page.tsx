import Link from 'next/link'
import Image from 'next/image'
import Footer from "./components/Footer";
import prisma from "@/lib/prisma";

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

async function getFeaturedProducts() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: {
      brand: true,
      category: true,
    },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return products;
}

async function getOtherProducts() {
  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: false,
    },
    include: {
      brand: true,
      category: true,
    },
    take: 2,
    orderBy: { createdAt: 'desc' },
  });

  return products;
}

async function getReviews() {
  const reviews = await prisma.review.findMany({
    where: {
      isVerified: true,
    },
    include: {
      user: true,
      product: true,
    },
    take: 3,
    orderBy: { createdAt: 'desc' },
  });

  return reviews;
}

export default async function Home() {
  const [categories, featuredProducts, otherProducts, reviews] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getOtherProducts(),
    getReviews(),
  ]);

  const getProductImage = (product: any) => {
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

  return (
    <main className=" bg-[#fde8e8] text-[#1a1a1a] antialiased">
      <header className="sticky top-0 z-30 border-b border-[#e8e4dc] bg-[#fde8e8] backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="font-serif text-xl font-semibold text-[#2d5a3d]">
            Mino<span className="italic text-[#8BAF7C]">Skincare</span>
          </div>
          <nav className="hidden items-center gap-8 text-sm text-[#555] md:flex">
            <a href="#vitrine" className="transition hover:text-[#2d5a3d]">Vitrine</a>
            <a href="/catalogue" className="transition hover:text-[#2d5a3d]">Catalogue</a>
            <a href="#categories" className="transition hover:text-[#2d5a3d]">Catégories</a>
            <a href="#avis" className="transition hover:text-[#2d5a3d]">Avis</a>
          </nav>
          <div className="flex items-center gap-4 text-sm text-[#555]">
            <Link href="/login" className="rounded-full border border-[#d8d4ca] px-4 py-2 transition hover:border-[#2d5a3d] hover:text-[#2d5a3d]">
              Connexion
            </Link>
            <Link href="/cart" className="flex items-center gap-2 rounded-full bg-[#2d5a3d] px-4 py-2 text-white transition hover:bg-[#23472e]">
              Panier <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">3</span>
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16 ">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <div className="flex flex-col justify-center gap-6">
            <span className="text-xs uppercase tracking-[0.3em] text-[#8BAF7C]">Nouveau — Collection Printemps</span>
            <h1 className="text-4xl font-serif leading-tight text-[#1a1a1a] sm:text-5xl">
              Prendre soin de soi,
              <span className="block italic text-[#2d5a3d]">naturellement.</span>
            </h1>
            <p className="max-w-xl text-sm leading-7 text-[#555] sm:text-base">
              Mino Skincare est une boutique mixte dédiée aux soins naturels et aux marques partenaires. Retrouvez notre vitrine de produits signés Mino et une sélection e-commerce de cosmétiques soigneusement choisis.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="/catalogue" className="inline-flex items-center justify-center rounded-md bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]">
                Découvrir le catalogue
              </a>
              <a href="#vitrine" className="inline-flex items-center justify-center rounded-md border border-[#2d5a3d] bg-white px-6 py-3 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]">
                Notre vitrine
              </a>
            </div>
          </div>

          {/* bg-[#FAFAF7]
          <div className="relative overflow-hidden rounded-[30px] bg-[#EEF3E8] p-10 shadow-[0_24px_60px_rgba(45,90,61,0.12)]">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#c8deb4] opacity-60 blur-[0px]"></div>
            <div className="relative flex h-full items-center justify-center">
              <div className="relative w-full h-full min-h-100 rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/u_ff2b6ic1rv-cosmetics-7713225_1920.png"
                  alt="Femme avec une peau soyeuse et rayonnante - Mino Skincare"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-3xl bg-white/95 backdrop-blur-sm px-6 py-4 text-center shadow-sm">
                    <p className="text-xs uppercase tracking-[0.3em] text-[#2d5a3d]">100% naturel</p>
                    <p className="mt-2 text-sm font-medium text-[#1a1a1a]">Formules maison développées par Mino Skincare</p>
                  </div>
                </div>
              </div>
            </div>
            shadow-[0_24px_60px_rgba(45,90,61,0.12)]
          </div> */}

        <div className=''>
          <Image
            src="/téléchargement-removebg-preview.png"
            alt="Femme avec une peau soyeuse et rayonnante - Mino Skincare"
            width={800}
            height={600}
            className="w-full h-auto object-cover object-center "
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw'
            priority
          />
        </div>

        </div>
      </section>

      <section className="bg-[#2d5a3d] py-8 text-white">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-6 px-4 text-xs uppercase tracking-[0.3em] sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">✓</span>
            Livraison en 24h
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">✓</span>
            Paiement sécurisé
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">✓</span>
            Retour gratuit 30j
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-sm">✓</span>
            Produits 100% naturels
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-serif text-[#1a1a1a]">Nos catégories</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#555] sm:text-base">
            Explorez nos catégories de soins naturels pour le visage, le corps, les cheveux et le maquillage.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => {
            const categoryIcons = ['🧴', '🛁', '💄', '💇‍♀️'];
            const categoryColors = ['#eef3e8', '#f5ede4', '#e8eef5', '#f5eee4'];

            return (
              <Link key={category.id} href={`/catalogue?category=${category.slug}`}>
                <article className="rounded-3xl bg-[#f6f3f3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md cursor-pointer">
                  <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[${categoryColors[index % categoryColors.length]}] text-4xl`}>
                    {categoryIcons[index % categoryIcons.length]}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">{category.name}</h3>
                  <p className="mt-2 text-sm text-[#555]">{category.description}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">
                    {category._count.products} produit{category._count.products > 1 ? 's' : ''}
                  </p>
                </article>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="vitrine" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-serif text-[#1a1a1a]">Produits en vedette</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#555] sm:text-base">
              Découvrez notre sélection de produits phares : soins naturels, maquillage premium et rituels bien-être pour prendre soin de votre peau.
            </p>
          </div>
          <Link href="/catalogue" className="rounded-full border border-[#d8d4ca] bg-[#f6f3f3] px-5 py-3 text-sm text-[#555] shadow-sm transition hover:border-[#2d5a3d] hover:text-[#2d5a3d]">
            Voir tous les produits
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/catalogue/${product.id}`}>
              <article className="rounded-3xl bg-[#f6f3f3] p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md cursor-pointer">
                <div className="mb-4 inline-flex rounded-3xl bg-[#eef3e8] p-4 text-3xl">
                  {product.category?.name === 'Soins du visage' ? '🧴' :
                   product.category?.name === 'Soins du corps' ? '🛁' :
                   product.category?.name === 'Maquillage' ? '💄' :
                   product.category?.name === 'Soins capillaires' ? '💇‍♀️' : '🌿'}
                </div>
                <h3 className="text-lg font-semibold text-[#1a1a1a]">{product.name}</h3>
                <p className="mt-2 text-sm text-[#555] line-clamp-2">{product.description}</p>
                <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
                  <div className="flex flex-col">
                    <span>{product.price.toFixed(2)} €</span>
                    {product.compareAtPrice && (
                      <span className="text-xs text-[#999] line-through">{product.compareAtPrice.toFixed(2)} €</span>
                    )}
                  </div>
                  <span className="rounded-full bg-[#eef3e8] px-3 py-1 text-xs">
                    {product.brand?.name}
                  </span>
                </div>
                {product.isOnSale && (
                  <div className="mt-2 inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">
                    En promotion
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      </section>

      <section id="avis" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            {otherProducts.map((product) => (
              <Link key={product.id} href={`/catalogue/${product.id}`}>
                <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 inline-flex rounded-3xl bg-[#eef3e8] p-4 text-3xl">
                    {product.category?.name === 'Soins du visage' ? '🧴' :
                     product.category?.name === 'Soins du corps' ? '🛁' :
                     product.category?.name === 'Maquillage' ? '💄' :
                     product.category?.name === 'Soins capillaires' ? '💇‍♀️' : '🌿'}
                  </div>
                  <h3 className="text-lg font-semibold text-[#1a1a1a]">{product.name}</h3>
                  <p className="mt-2 text-sm text-[#555] line-clamp-2">{product.description}</p>
                  <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
                    <span>{product.price.toFixed(2)} €</span>
                    <span className="rounded-full bg-[#eef3e8] px-3 py-1 text-xs">
                      {product.brand?.name}
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>
          </div>
        </section>

      <section id="testimonials" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-[#1a1a1a]">Ce que disent nos clients</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#555] sm:text-base">
              Découvrez les avis de nos clients satisfaits sur nos produits de soins naturels.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-3xl bg-[#FAFAF7] p-6 shadow-sm">
                <p className="mb-4 text-sm font-semibold text-[#E6A817]">
                  {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                </p>
                <p className="mb-3 text-sm font-semibold text-[#1a1a1a]">{review.title}</p>
                <p className="mb-6 text-sm leading-7 text-[#555] italic">"{review.comment}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3e8] text-sm font-semibold text-[#2d5a3d]">
                    {review.user?.firstName?.charAt(0)}{review.user?.lastName?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]">{review.user?.firstName} {review.user?.lastName}</p>
                    <p className="text-xs text-[#999]">À propos: {review.product?.name}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-4xl bg-[#fde8e8] px-6 py-10 sm:px-10 sm:py-14">
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
    <Footer/>
    </main>
  )
}
