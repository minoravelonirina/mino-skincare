export const SHIPPING_FEE = 12000
export const TAX_RATE = 0.1

export function computeOrderTotals(subtotal: number) {
  const taxAmount = Math.round(subtotal * TAX_RATE)
  const totalAmount = subtotal + SHIPPING_FEE + taxAmount
  return { subtotal, shippingAmount: SHIPPING_FEE, taxAmount, totalAmount }
}