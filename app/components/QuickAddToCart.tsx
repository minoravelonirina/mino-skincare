"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useLocale } from "next-intlayer"

export default function QuickAddToCart({
  productId,
  addLabel,
}: {
  productId: number
  addLabel: string
}) {
  const router = useRouter()
  const { locale } = useLocale()
  const [loading, setLoading] = useState(false)
  const [added, setAdded] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/cart-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      })

      if (response.status === 401) {
        router.push(`/${locale}/login`)
        return
      }

      if (!response.ok) throw new Error("add_failed")

      setAdded(true)
      window.dispatchEvent(new CustomEvent("cart-updated"))
      setTimeout(() => setAdded(false), 1500)
    } catch {
      setAdded(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-xl bg-chocolate px-4 py-2 text-sm font-semibold text-white transition hover:bg-chocolate-dark group-hover:bg-chocolate-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? "…" : added ? "✓" : addLabel}
    </button>
  )
}