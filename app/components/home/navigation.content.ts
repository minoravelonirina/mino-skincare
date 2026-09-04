import { type Dictionary, t } from "intlayer";

const navigationContent = {
  key: "navigation",
  content: {
    siteTitle: t({ en: "Mino Skincare", fr: "Mino Skincare" }),
    home: t({ en: "Home", fr: "Accueil" }),
    showcase: t({ en: "Showcase", fr: "Vitrine" }),
    catalogue: t({ en: "Shop", fr: "Boutique" }),
    categories: t({ en: "Categories", fr: "Catégories" }),
    reviews: t({ en: "Reviews", fr: "Avis" }),
    about: t({ en: "About", fr: "À propos" }),
    login: t({ en: "Login", fr: "Connexion" }),
    cart: t({ en: "Cart", fr: "Panier" }),
    dashboard: t({ en: "Dashboard", fr: "Tableau de bord" }),
  },
} satisfies Dictionary;

export default navigationContent;
