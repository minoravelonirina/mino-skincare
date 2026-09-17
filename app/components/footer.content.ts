import { type Dictionary, t } from "intlayer";

const footerContent = {
  key: "footer",
  content: {
    description: t({
      en: "A boutique of natural cosmetics, mixing our own maison products and a selection of partner brands for a complete beauty routine.",
      fr: "Boutique de cosmétiques naturels, mêlant nos produits maison et une sélection de marques partenaires pour une routine de beauté complète.",
    }),
    paymentMethods: [
      t({ en: "Visa", fr: "Visa" }),
      t({ en: "Mastercard", fr: "Mastercard" }),
      t({ en: "Mobile Money", fr: "Mobile Money" }),
    ],
    shop: {
      title: t({ en: "Shop", fr: "Boutique" }),
      items: [
        t({ en: "Grocery", fr: "Alimentation" }),
        t({ en: "Beauty", fr: "Beauté" }),
        t({ en: "New arrivals", fr: "Nouveautés" }),
        t({ en: "Promotions", fr: "Promotions" }),
      ],
    },
    info: {
      title: t({ en: "Information", fr: "Info" }),
      about: t({ en: "About", fr: "À propos" }),
      blog: t({ en: "Blog", fr: "Blog" }),
      faq: t({ en: "FAQ", fr: "FAQ" }),
      contact: t({ en: "Contact", fr: "Contact" }),
    },
    legal: {
      title: t({ en: "Legal", fr: "Légal" }),
      items: [
        t({
          en: "Terms of service",
          fr: "CGV",
        }),
        t({
          en: "Privacy policy",
          fr: "Confidentialité",
        }),
        t({
          en: "Shipping",
          fr: "Livraison",
        }),
        t({
          en: "Returns",
          fr: "Retours",
        }),
      ],
    },
    rights: t({
      en: "All rights reserved",
      fr: "Tous droits réservés",
    }),
  },
} satisfies Dictionary;

export default footerContent;