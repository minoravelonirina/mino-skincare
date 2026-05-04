import prisma from '@/lib/prisma'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AddToCartForm from '../../components/AddToCartForm'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const id = parseInt(params.productId, 10)
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      brand: true,
    },
  })

  if (!product) {
    return notFound()
  }

  const productImage = (() => {
    if (product.images) {
      try {
        const images = JSON.parse(product.images)
        return images[0] || '/placeholder-product.jpg'
      } catch {
        return '/placeholder-product.jpg'
      }
    }
    return '/placeholder-product.jpg'
  })()

  const priceFormatted = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(product.price)
    .replace('€', 'Ar')

  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href="/catalogue" className="text-sm text-[#555] transition hover:text-[#2d5a3d]">
              ← Retour au catalogue
            </Link>
            <h1 className="mt-3 text-3xl font-serif text-[#1a1a1a]">{product.name}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#555]">
            {product.brand && <span className="rounded-full bg-[#eef3e8] px-3 py-1">{product.brand.name}</span>}
            {product.category && <span className="rounded-full bg-[#f5ede4] px-3 py-1">{product.category.name}</span>}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-sm">
            <div className="mb-6 overflow-hidden rounded-[28px] bg-[#eef3e8]">
              <div className="aspect-4/3 flex items-center justify-center text-[5rem]">{productImage === '/placeholder-product.jpg' ? '🧴' : '🖼️'}</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 rounded-3xl bg-[#fafaf7] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8BAF7C]">Prix</p>
                <p className="text-3xl font-semibold text-[#2d5a3d]">{priceFormatted}</p>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <p className="text-sm text-[#999] line-through">
                    {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })
                      .format(product.compareAtPrice)
                      .replace('€', 'Ar')}
                  </p>
                )}
              </div>
              <div className="space-y-2 rounded-3xl bg-[#fafaf7] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8BAF7C]">Stock</p>
                <p className="text-lg font-semibold text-[#1a1a1a]">{product.stock}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-7 text-[#555]">
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#1a1a1a]">Description</h2>
                <p>{product.description || 'Description du produit non disponible.'}</p>
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#1a1a1a]">Ingrédients</h2>
                <p>{product.ingredients || 'Informations non renseignées.'}</p>
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#1a1a1a]">Conseils d’utilisation</h2>
                <p>{product.usage || 'Mode d’utilisation à découvrir.'}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AddToCartForm productId={product.id} />
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">Pourquoi choisir ce produit ?</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#555]">
                <li>• Formule naturelle et contrôlée</li>
                <li>• Élaboré pour tous les types de peau</li>
                <li>• Fabriqué et vendu par Mino Skincare</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
