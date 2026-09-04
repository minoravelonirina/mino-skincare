import { type Dictionary, t } from "intlayer";

const checkoutFormContent = {
  key: "checkoutForm",
  content: {
    title: t({ en: "Payment and delivery", fr: "Paiement et livraison" }),
    subtitle: t({
      en: "Enter your information to finalize your order.",
      fr: "Entrez vos informations pour finaliser votre commande.",
    }),
    fullName: t({ en: "Full name", fr: "Nom complet" }),
    email: t({ en: "Email", fr: "Email" }),
    street: t({ en: "Address", fr: "Adresse" }),
    city: t({ en: "City", fr: "Ville" }),
    postalCode: t({ en: "Postal code", fr: "Code postal" }),
    country: t({ en: "Country", fr: "Pays" }),
    paymentMethod: t({ en: "Payment method", fr: "Mode de paiement" }),
    cardPayment: t({ en: "Card payment", fr: "Paiement par carte" }),
    cashOnDelivery: t({ en: "Cash on delivery", fr: "Paiement à la livraison" }),
    submit: t({ en: "Confirm my order", fr: "Valider ma commande" }),
    validating: t({ en: "Validating...", fr: "Validation en cours..." }),
    success: t({
      en: "Order validated successfully!",
      fr: "Commande validée avec succès !",
    }),
    orderNumber: t({ en: "Order number", fr: "Numéro de commande" }),
    error: t({
      en: "Unable to confirm the order",
      fr: "Impossible de valider la commande",
    }),
  },
} satisfies Dictionary;

export default checkoutFormContent;
