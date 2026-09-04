import { type Dictionary, t } from "intlayer";

const cartContent = {
  key: "cart",
  content: {
    cart: {
      title: t({ en: "Your cart", fr: "Votre panier" }),
      subtitle: t({
        en: "Review your selected items before checking out.",
        fr: "Revoyez les articles sélectionnés avant de passer à la caisse.",
      }),
      continueShopping: t({ en: "Continue shopping", fr: "Continuer mes achats" }),
      empty: {
        title: t({ en: "Your cart is empty", fr: "Votre panier est vide" }),
        description: t({
          en: "Add products from the shop to complete your order.",
          fr: "Ajoutez des produits depuis la boutique pour finaliser votre commande.",
        }),
        cta: t({ en: "See the catalogue", fr: "Voir le catalogue" }),
      },
      quantity: t({ en: "Quantity", fr: "Quantité" }),
      total: t({ en: "Total", fr: "Total" }),
      subtotal: t({ en: "Subtotal", fr: "Sous-total" }),
      shipping: t({ en: "Shipping", fr: "Livraison" }),
      tax: t({ en: "Estimated tax", fr: "TVA estimée" }),
      orderTotal: t({ en: "Order total", fr: "Total commande" }),
      checkout: t({ en: "Check out", fr: "Passer à la caisse" }),
    },

    checkout: {
      title: t({ en: "Checkout", fr: "Paiement" }),
      subtitle: t({
        en: "Complete your information to confirm your purchase.",
        fr: "Complétez vos informations pour confirmer l'achat.",
      }),
      backToCart: t({ en: "Back to cart", fr: "Retour au panier" }),
      recapTitle: t({
        en: "Order summary",
        fr: "Récapitulatif de la commande",
      }),
      empty: t({
        en: "Your cart is empty. Add products to place an order.",
        fr: "Votre panier est vide. Ajoutez des produits pour passer commande.",
      }),
      quantity: t({ en: "Quantity", fr: "Quantité" }),
      subtotal: t({ en: "Subtotal", fr: "Sous-total" }),
      shipping: t({ en: "Shipping", fr: "Livraison" }),
      tax: t({ en: "Estimated tax", fr: "TVA estimée" }),
      total: t({ en: "Total", fr: "Total" }),
    },
  },
} satisfies Dictionary;

export default cartContent;
