export const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export function formatPrice(price: number) {
  return priceFormatter.format(price).replace("€", "Ar");
}
