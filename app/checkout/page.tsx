import Link from 'next/link'
import prisma from '@/lib/prisma'
import CheckoutForm, { CartItemData } from '../../app/components/CheckoutForm'

function formatPrice(price: number) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  })
    .format(price)
    .replace('€', 'Ar')
}

export default async function CheckoutPage() {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: 1 },
    include: {
      product: true,
    },
  })

  const mappedCartItems: CartItemData[] = cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    product: {
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
    },
  }))

  const subtotal = cartItems.reduce((sum, item) => sum + item.quantity * item.product.price, 0)
  const shippingAmount = 12000
  const taxAmount = Math.round(subtotal * 0.1)
  const totalAmount = subtotal + shippingAmount + taxAmount

  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-serif text-[#1a1a1a]">Paiement</h1>
            <p className="mt-2 text-sm text-[#555]">Complétez vos informations pour confirmer l’achat.</p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center rounded-full border border-[#d8d4ca] bg-white px-5 py-3 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]"
          >
            Retour au panier
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <CheckoutForm cartItems={mappedCartItems} totalAmount={totalAmount} />
          </div>

          <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-[#1a1a1a]">Récapitulatif de la commande</h2>
            {cartItems.length === 0 ? (
              <p className="text-sm text-[#555]">Votre panier est vide. Ajoutez des produits pour passer commande.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="rounded-3xl bg-[#fafaf7] p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-[#1a1a1a]">{item.product.name}</p>
                        <p className="text-sm text-[#555]">Quantité : {item.quantity}</p>
                      </div>
                      <p className="text-sm font-semibold text-[#2d5a3d]">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
                <div className="space-y-3 border-t border-[#e8e4dc] pt-4 text-sm text-[#555]">
                  <div className="flex items-center justify-between">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Livraison</span>
                    <span>{formatPrice(shippingAmount)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>TVA estimée</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#e8e4dc] pt-4 text-lg font-semibold text-[#1a1a1a]">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  )
}
