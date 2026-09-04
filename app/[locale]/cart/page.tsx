import Link from 'next/link'
import Image from 'next/image'
import prisma from '@/lib/prisma'
import { getIntlayer } from 'next-intlayer'
import { getLocale } from 'next-intlayer/server'
import { getCurrentUserFromCookies } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getProductImage, placeholderProductImage, formatPrice } from '@/lib/home'

interface CartItem {
  id: number
  quantity: number
  product: {
    id: number
    name: string
    price: number
    images: string | null
  }
}

export default async function CartPage() {
  const locale = await getLocale()
  const content = getIntlayer("cart", locale).cart
  const user = await getCurrentUserFromCookies()
  if (!user) redirect(`/${locale}/login`)
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: user.userId },
    include: {
      product: true,
    },
  })

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0)

  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif text-[#1a1a1a]">{content.title}</h1>
            <p className="mt-2 text-sm text-[#555]">{content.subtitle}</p>
          </div>
          <Link
            href={`/${locale}/catalogue`}
            className="inline-flex items-center justify-center rounded-full border border-[#d8d4ca] bg-white px-5 py-3 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]"
          >
            {content.continueShopping}
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-[#1a1a1a]">{content.empty.title}</p>
            <p className="mt-3 text-sm text-[#555]">{content.empty.description}</p>
            <Link
              href={`/${locale}/catalogue`}
              className="mt-6 inline-flex rounded-full bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]"
            >
              {content.empty.cta}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl bg-[#eef3e8]">
                      <Image
                        src={getProductImage(item.product.images) ?? placeholderProductImage}
                        alt={item.product.name}
                        width={112}
                        height={112}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base font-semibold text-[#1a1a1a]">{item.product.name}</h2>
                      <p className="mt-2 text-sm text-[#555]">{content.quantity} : {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-[#2d5a3d]">{formatPrice(item.product.price)}</p>
                      <p className="text-sm text-[#999]">{content.total} : {formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-[#555]">
                  <span>{content.subtotal}</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#555]">
                  <span>{content.shipping}</span>
                  <span>{formatPrice(12000)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#555]">
                  <span>{content.tax}</span>
                  <span>{formatPrice(Math.round(total * 0.1))}</span>
                </div>
                <div className="border-t border-[#e8e4dc] pt-4 text-lg font-semibold text-[#1a1a1a]">
                  {content.orderTotal}
                  <span className="float-right">{formatPrice(total + 12000 + Math.round(total * 0.1))}</span>
                </div>
                <Link
                  href={`/${locale}/checkout`}
                  className="block rounded-3xl bg-[#2d5a3d] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#23472e]"
                >
                  {content.checkout}
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}
