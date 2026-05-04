"use client"

import { useMemo, useState } from "react"

interface CartProduct {
  id: number
  name: string
  price: number
}

export interface CartItemData {
  id: number
  quantity: number
  product: CartProduct
}

interface CheckoutFormProps {
  cartItems: CartItemData[]
  totalAmount: number
}

export default function CheckoutForm({ cartItems, totalAmount }: CheckoutFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "CREDIT_CARD",
  })
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string | null>(null)

  const orderItems = useMemo(
    () =>
      cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    [cartItems]
  )

  const handleChange = (field: string, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setStatus(null)
    setOrderNumber(null)

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          orderItems,
          billingAddress: {
            fullName: formData.fullName,
            email: formData.email,
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
            paymentMethod: formData.paymentMethod,
          },
          shippingAddress: {
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          taxAmount: Math.round(totalAmount * 0.1),
          shippingAmount: 12000,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Impossible de valider la commande")
      }

      const result = await response.json()
      setOrderNumber(result.data.orderNumber || null)
      setStatus("Commande validée avec succès !")
    } catch (error) {
      setStatus((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-3xl border border-[#e8e4dc] bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Paiement et livraison</h2>
      <p className="mt-2 text-sm text-[#555]">Entrez vos informations pour finaliser votre commande.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm text-[#555]">
            Nom complet
            <input
              type="text"
              value={formData.fullName}
              onChange={(event) => handleChange("fullName", event.target.value)}
              className="w-full rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
              required
            />
          </label>
          <label className="space-y-2 text-sm text-[#555]">
            Email
            <input
              type="email"
              value={formData.email}
              onChange={(event) => handleChange("email", event.target.value)}
              className="w-full rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
              required
            />
          </label>
        </div>

        <div className="space-y-4">
          <label className="space-y-2 text-sm text-[#555]">
            Adresse
            <input
              type="text"
              value={formData.street}
              onChange={(event) => handleChange("street", event.target.value)}
              className="w-full rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
              required
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-3">
            <label className="space-y-2 text-sm text-[#555]">
              Ville
              <input
                type="text"
                value={formData.city}
                onChange={(event) => handleChange("city", event.target.value)}
                className="w-full rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#555]">
              Code postal
              <input
                type="text"
                value={formData.postalCode}
                onChange={(event) => handleChange("postalCode", event.target.value)}
                className="w-full rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-[#555]">
              Pays
              <input
                type="text"
                value={formData.country}
                onChange={(event) => handleChange("country", event.target.value)}
                className="w-full rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] px-4 py-3 text-sm outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
                required
              />
            </label>
          </div>
        </div>

        <div className="space-y-3 rounded-3xl border border-[#e8e4dc] bg-[#fafaf7] p-4">
          <p className="text-sm font-semibold text-[#1a1a1a]">Mode de paiement</p>
          <label className="flex items-center gap-3 text-sm text-[#555]">
            <input
              type="radio"
              name="payment"
              value="CREDIT_CARD"
              checked={formData.paymentMethod === "CREDIT_CARD"}
              onChange={(event) => handleChange("paymentMethod", event.target.value)}
              className="accent-[#2d5a3d]"
            />
            Paiement par carte
          </label>
          <label className="flex items-center gap-3 text-sm text-[#555]">
            <input
              type="radio"
              name="payment"
              value="CASH_ON_DELIVERY"
              checked={formData.paymentMethod === "CASH_ON_DELIVERY"}
              onChange={(event) => handleChange("paymentMethod", event.target.value)}
              className="accent-[#2d5a3d]"
            />
            Paiement à la livraison
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-3xl bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e] disabled:cursor-not-allowed disabled:bg-[#95a28f]"
        >
          {loading ? "Validation en cours..." : "Valider ma commande"}
        </button>
      </form>

      {status && (
        <div className="mt-4 rounded-3xl bg-[#eef3e8] p-4 text-sm text-[#1a1a1a]">
          <p>{status}</p>
          {orderNumber && <p className="mt-2 font-semibold">Numéro de commande : {orderNumber}</p>}
        </div>
      )}
    </div>
  )
}
