"use client"

import { useState } from "react"

interface AddToCartFormProps {
  productId: number
}

export default function AddToCartForm({ productId }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1)
  const [status, setStatus] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch("/api/cart-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: 1,
          productId,
          quantity,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Impossible d'ajouter au panier")
      }

      setStatus("Produit ajouté au panier 🎉")
    } catch (error) {
      setStatus((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 rounded-3xl border border-[#e8e4dc] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium text-[#1a1a1a]" htmlFor="quantity">
          Quantité
        </label>
        <div className="flex items-center gap-2 rounded-full border border-[#e8e4dc] bg-[#fafaf7] p-1">
          <button
            type="button"
            className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          >
            -
          </button>
          <span className="min-w-8 text-center text-sm font-semibold text-[#1a1a1a]">{quantity}</span>
          <button
            type="button"
            className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]"
            onClick={() => setQuantity((current) => current + 1)}
          >
            +
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={addToCart}
        disabled={loading}
        className="w-full rounded-3xl bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e] disabled:cursor-not-allowed disabled:bg-[#95a28f]"
      >
        {loading ? "Ajout en cours..." : "Ajouter au panier"}
      </button>
      {status && <p className="text-sm text-[#555]">{status}</p>}
    </div>
  )
}
