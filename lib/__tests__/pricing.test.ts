import { describe, it, expect } from "vitest";
import { computeOrderTotals, SHIPPING_FEE, TAX_RATE } from "@/lib/pricing";

describe("computeOrderTotals", () => {
  it("applies subtotal + shipping + rounded tax", () => {
    const subtotal = 47.96;
    const totals = computeOrderTotals(subtotal);

    expect(totals.subtotal).toBe(subtotal);
    expect(totals.shippingAmount).toBe(SHIPPING_FEE);
    expect(totals.taxAmount).toBe(Math.round(subtotal * TAX_RATE));
    expect(totals.totalAmount).toBe(subtotal + SHIPPING_FEE + Math.round(subtotal * TAX_RATE));
  });

  it("rounds the tax to the nearest integer", () => {
    expect(computeOrderTotals(10).taxAmount).toBe(1); // 1.0
    expect(computeOrderTotals(11).taxAmount).toBe(1); // 1.1
    expect(computeOrderTotals(16).taxAmount).toBe(2); // 1.6
  });

  it("keeps shipping fee for an empty basket", () => {
    expect(computeOrderTotals(0)).toEqual({
      subtotal: 0,
      shippingAmount: SHIPPING_FEE,
      taxAmount: 0,
      totalAmount: SHIPPING_FEE,
    });
  });

  it("never produces NaN for valid subtotals", () => {
    const totals = computeOrderTotals(99.99);
    expect(Number.isFinite(totals.taxAmount)).toBe(true);
    expect(Number.isFinite(totals.totalAmount)).toBe(true);
  });
});