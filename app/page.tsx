import Link from 'next/link'
import Footer from "../app/components/footer";

export default function Home() {
  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      <header className="sticky top-0 z-30 border-b border-[#e8e4dc] bg-white/95 backdrop-blur-sm">
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

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
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

          <div className="relative overflow-hidden rounded-[30px] bg-[#EEF3E8] p-10 shadow-[0_24px_60px_rgba(45,90,61,0.12)]">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#c8deb4] opacity-60 blur-[1px]"></div>
            <div className="relative flex h-full flex-col items-center justify-center gap-6">
              <div className="text-[4rem]">🌿</div>
              <div className="rounded-3xl bg-white/90 px-6 py-4 text-center shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-[#2d5a3d]">100% naturel</p>
                <p className="mt-2 text-sm font-medium text-[#1a1a1a]">Formules maison développées par Mino Skincare</p>
              </div>
            </div>
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
            Explorez des catégories pensées pour vos routines alimentaires, soin visage, soin corps et offres spéciales.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eef3e8] text-4xl">🥗</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Alimentation</h3>
            <p className="mt-2 text-sm text-[#555]">Produits naturels pour une alimentation saine et savoureuse.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">48 produits</p>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f5ede4] text-4xl">🧴</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Soin Visage</h3>
            <p className="mt-2 text-sm text-[#555]">Routines visage pour hydrater, protéger et sublimer votre peau.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">32 produits</p>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#e8eef5] text-4xl">🛁</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Soin Corps</h3>
            <p className="mt-2 text-sm text-[#555]">Soins corporels doux et nourrissants pour une peau éclatante.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">27 produits</p>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-[#f5eee4] text-4xl">🌸</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Promotions</h3>
            <p className="mt-2 text-sm text-[#555]">Offres limitées et réductions pour découvrir plus de soins naturels.</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#8BAF7C]">-20% ce mois</p>
          </article>
        </div>
      </section>

      <section id="vitrine" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-serif text-[#1a1a1a]">Vitrine Mino Skincare</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#555] sm:text-base">
              Découvrez nos créations maison : sérums, soins visage et rituels bien-être conçus par Mino Skincare pour choyer votre peau avec des ingrédients purs.
            </p>
          </div>
          <div className="rounded-full border border-[#d8d4ca] bg-white px-5 py-3 text-sm text-[#555] shadow-sm">
            Section vitrine dédiée aux produits Mino
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex rounded-3xl bg-[#eef3e8] p-4 text-3xl">🌸</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Sérum éclat Mino</h3>
            <p className="mt-2 text-sm text-[#555]">Formule riche en actifs végétaux pour illuminer et hydrater les peaux sensibles.</p>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
              <span>18 000 Ar</span>
              <span className="rounded-full bg-[#eef3e8] px-3 py-1">Mino</span>
            </div>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex rounded-3xl bg-[#f5ede4] p-4 text-3xl">🧴</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Crème de nuit régénérante</h3>
            <p className="mt-2 text-sm text-[#555]">Texture onctueuse pour nourrir, régénérer et réveiller une peau douce au réveil.</p>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
              <span>24 500 Ar</span>
              <span className="rounded-full bg-[#f5ede4] px-3 py-1 text-[#2d5a3d]">Mino</span>
            </div>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex rounded-3xl bg-[#e8eef5] p-4 text-3xl">✨</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Brume hydratante</h3>
            <p className="mt-2 text-sm text-[#555]">Spray frais pour apaiser la peau et fixer le maquillage avec un voile naturel.</p>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
              <span>12 500 Ar</span>
              <span className="rounded-full bg-[#e8eef5] px-3 py-1 text-[#2d5a3d]">Mino</span>
            </div>
          </article>
          <article className="rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="mb-4 inline-flex rounded-3xl bg-[#f5eee4] p-4 text-3xl">🌿</div>
            <h3 className="text-lg font-semibold text-[#1a1a1a]">Gommage doux</h3>
            <p className="mt-2 text-sm text-[#555]">Exfolie en douceur et révèle une peau lisse et lumineuse sans dessécher.</p>
            <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
              <span>15 000 Ar</span>
              <span className="rounded-full bg-[#f5eee4] px-3 py-1 text-[#2d5a3d]">Mino</span>
            </div>
          </article>
        </div>
      </section>

      <section id="boutique" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8 lg:pb-16">
        <div className="mb-8">
          <h2 className="text-3xl font-serif text-[#1a1a1a]">E-commerce et marques partenaires</h2>
          <p className="mt-2 max-w-2xl text-sm text-[#555] sm:text-base">
            Parcourez une sélection de produits cosmétiques de confiance, mêlant nos créations Mino et les meilleures marques naturelles du marché.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          <article className="overflow-hidden rounded-3xl border border-[#e8e4dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-44 items-center justify-center bg-[#eef3e8] text-5xl">🍯</div>
            <div className="p-6">
              <div className="mb-2 inline-flex rounded-full bg-[#2d5a3d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Bestseller</div>
              <h3 className="text-base font-semibold text-[#1a1a1a]">Miel Bio de Fleurs</h3>
              <p className="mt-2 text-sm text-[#777]">Ferme du Soleil</p>
              <div className="mt-4 flex items-center gap-2 text-[#E6A817]">★★★★★</div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-[#2d5a3d]">12 000 Ar</div>
                <button className="rounded-xl bg-[#2d5a3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23472e]">+ Panier</button>
              </div>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-[#e8e4dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-44 items-center justify-center bg-[#f5ede4] text-5xl">🌿</div>
            <div className="p-6">
              <div className="mb-2 inline-flex rounded-full bg-[#2d5a3d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">Nouveau</div>
              <h3 className="text-base font-semibold text-[#1a1a1a]">Sérum Visage Aloe</h3>
              <p className="mt-2 text-sm text-[#777]">NaturGlow</p>
              <div className="mt-4 flex items-center gap-2 text-[#E6A817]">★★★★☆</div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-[#2d5a3d]">34 000 Ar</div>
                <button className="rounded-xl bg-[#2d5a3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23472e]">+ Panier</button>
              </div>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-[#e8e4dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-44 items-center justify-center bg-[#e8eef5] text-5xl">🫐</div>
            <div className="p-6">
              <h3 className="text-base font-semibold text-[#1a1a1a]">Mix Superfruits Secs</h3>
              <p className="mt-2 text-sm text-[#777]">NutriNat</p>
              <div className="mt-4 flex items-center gap-2 text-[#E6A817]">★★★★★</div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="text-lg font-semibold text-[#2d5a3d]">8 500 Ar</div>
                <button className="rounded-xl bg-[#2d5a3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23472e]">+ Panier</button>
              </div>
            </div>
          </article>
          <article className="overflow-hidden rounded-3xl border border-[#e8e4dc] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div className="flex h-44 items-center justify-center bg-[#f5eee4] text-5xl">🧖</div>
            <div className="p-6">
              <div className="mb-2 inline-flex rounded-full bg-[#2d5a3d] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">-20%</div>
              <h3 className="text-base font-semibold text-[#1a1a1a]">Masque Argile Rose</h3>
              <p className="mt-2 text-sm text-[#777]">PureSkin</p>
              <div className="mt-4 flex items-center gap-2 text-[#E6A817]">★★★★☆</div>
              <div className="mt-4 flex items-center justify-between gap-3">
                <div>
                  <div className="text-lg font-semibold text-[#2d5a3d]">18 000 Ar</div>
                  <div className="text-xs text-[#999] line-through">22 500 Ar</div>
                </div>
                <button className="rounded-xl bg-[#2d5a3d] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#23472e]">+ Panier</button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="avis" className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-serif text-[#1a1a1a]">Ce que disent nos clients</h2>
            <p className="mt-2 max-w-2xl text-sm text-[#555] sm:text-base">
              Plus de 2 400 avis vérifiés sur notre boutique et nos produits naturels.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-3xl bg-[#FAFAF7] p-6 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-[#E6A817]">★★★★★</p>
              <p className="mb-6 text-sm leading-7 text-[#555] italic">“Le sérum visage est incroyable, ma peau est transformée en 2 semaines. Je recommande les yeux fermés !”</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3e8] text-sm font-semibold text-[#2d5a3d]">SR</div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">Sophie R.</p>
                  <p className="text-xs text-[#999]">Cliente depuis 2023</p>
                </div>
              </div>
            </article>
            <article className="rounded-3xl bg-[#FAFAF7] p-6 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-[#E6A817]">★★★★★</p>
              <p className="mb-6 text-sm leading-7 text-[#555] italic">“Livraison ultra rapide et produits de qualité. Le miel bio est excellent, toute ma famille en raffole.”</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3e8] text-sm font-semibold text-[#2d5a3d]">MH</div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">Marc H.</p>
                  <p className="text-xs text-[#999]">Acheteur vérifié</p>
                </div>
              </div>
            </article>
            <article className="rounded-3xl bg-[#FAFAF7] p-6 shadow-sm">
              <p className="mb-4 text-sm font-semibold text-[#E6A817]">★★★★☆</p>
              <p className="mb-6 text-sm leading-7 text-[#555] italic">“Très bonne sélection de produits naturels. Service client très réactif. Je reviendrai avec plaisir !”</p>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eef3e8] text-sm font-semibold text-[#2d5a3d]">AL</div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1a1a]">Aicha L.</p>
                  <p className="text-xs text-[#999]">Cliente fidèle</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

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
    <Footer/>
    </main>
  )
}
