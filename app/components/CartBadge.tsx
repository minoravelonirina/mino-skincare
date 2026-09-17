"use client"

import { useEffect, useState } from "react"

export default function CartBadge({ authenticated }: { authenticated: boolean }) {
  const [count, setCount] = useState<number>(0)

  useEffect(() => {
    if (!authenticated) return

    const fetchCount = async () => {
      try {
        const response = await fetch("/api/cart-items", {
          credentials: "include",
        })
        if (!response.ok) {
          setCount(0)
          return
        }
        const json = await response.json()
        const items = json.data ?? []
        setCount(items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0))
      } catch {
        setCount(0)
      }
    }

    fetchCount()
    window.addEventListener("cart-updated", fetchCount)
    return () => window.removeEventListener("cart-updated", fetchCount)
  }, [authenticated])

  if (!authenticated || count === 0) return null

  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold transition-colors duration-300 group-hover:bg-white/30">
      {count}
    </span>
  )
}