import prisma from '@/lib/prisma'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import AddToCartForm from '../../../components/AddToCartForm'
import { getIntlayer } from 'next-intlayer'
import { getLocale } from 'next-intlayer/server'
import { getProductImage, placeholderProductImage } from '@/lib/home'
import { formatPrice } from '@/lib/format'

interface ProductPageProps {
  params: {
    productId: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  await params;
  const locale = await getLocale();
  const content = getIntlayer("catalogue", locale);
  const id = parseInt( params.productId, 10)
  console.log(id);
  
  if (!Number.isInteger(id) || id <= 0) {
    // invalid id provided in URL, treat as 404
    return notFound()
  }
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

  const productImage = getProductImage(product.images) ?? placeholderProductImage

  const priceFormatted = formatPrice(product.price)

  return (
    <main className="bg[#FAFAF7] bg-[#fde8e8]/95 text-[#1a1a1a] antialiased">
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link href={`/${locale}/catalogue`} className="text-sm text-[#555] transition hover:text-[#2d5a3d]">
              {content.detail.backToCatalogue}
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
            <div className="relative mb-6 aspect-4/3 overflow-hidden rounded-[28px] bg-[#eef3e8]">
              <Image
                src={productImage}
                alt={product.name}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 rounded-3xl bg-[#fafaf7] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8BAF7C]">{content.detail.price}</p>
                <p className="text-3xl font-semibold text-[#2d5a3d]">{priceFormatted}</p>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <p className="text-sm text-[#999] line-through">
                    {formatPrice(product.compareAtPrice)}
                  </p>
                )}
              </div>
              <div className="space-y-2 rounded-3xl bg-[#fafaf7] p-4">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8BAF7C]">{content.detail.stock}</p>
                <p className="text-lg font-semibold text-[#1a1a1a]">{product.stock}</p>
              </div>
            </div>

            <div className="mt-8 space-y-4 text-sm leading-7 text-[#555]">
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#1a1a1a]">{content.detail.description}</h2>
                <p>{product.description || content.detail.descriptionUnavailable}</p>
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#1a1a1a]">{content.detail.ingredients}</h2>
                <p>{product.ingredients || content.detail.ingredientsUnavailable}</p>
              </div>
              <div>
                <h2 className="mb-2 text-lg font-semibold text-[#1a1a1a]">{content.detail.usage}</h2>
                <p>{product.usage || content.detail.usageUnavailable}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AddToCartForm productId={product.id} />
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-[#1a1a1a]">{content.detail.whyChoose}</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#555]">
                {content.detail.whyChooseItems.map((item: any, i: number) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
