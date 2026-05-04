import Link from 'next/link'
import prisma from '@/lib/prisma'

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

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(price)
    .replace('€', 'Ar')
}

export default async function CartPage() {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: 1 },
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
            <h1 className="text-3xl font-serif text-[#1a1a1a]">Votre panier</h1>
            <p className="mt-2 text-sm text-[#555]">Revoyez les articles sélectionnés avant de passer à la caisse.</p>
          </div>
          <Link
            href="/catalogue"
            className="inline-flex items-center justify-center rounded-full border border-[#d8d4ca] bg-white px-5 py-3 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]"
          >
            Continuer mes achats
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
            <p className="text-lg font-semibold text-[#1a1a1a]">Votre panier est vide</p>
            <p className="mt-3 text-sm text-[#555]">Ajoutez des produits depuis la boutique pour finaliser votre commande.</p>
            <Link
              href="/catalogue"
              className="mt-6 inline-flex rounded-full bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]"
            >
              Voir le catalogue
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="rounded-3xl bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-[#eef3e8] text-4xl">
                      {item.product.images ? '🖼️' : '🧴'}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base font-semibold text-[#1a1a1a]">{item.product.name}</h2>
                      <p className="mt-2 text-sm text-[#555]">Quantité : {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-[#2d5a3d]">{formatPrice(item.product.price)}</p>
                      <p className="text-sm text-[#999]">Total : {formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="rounded-3xl bg-white p-6 shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-[#555]">
                  <span>Sous-total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#555]">
                  <span>Livraison</span>
                  <span>{formatPrice(12000)}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-[#555]">
                  <span>TVA estimée</span>
                  <span>{formatPrice(Math.round(total * 0.1))}</span>
                </div>
                <div className="border-t border-[#e8e4dc] pt-4 text-lg font-semibold text-[#1a1a1a]">
                  Total commande
                  <span className="float-right">{formatPrice(total + 12000 + Math.round(total * 0.1))}</span>
                </div>
                <Link
                  href="/checkout"
                  className="block rounded-3xl bg-[#2d5a3d] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#23472e]"
                >
                  Passer à la caisse
                </Link>
              </div>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}
