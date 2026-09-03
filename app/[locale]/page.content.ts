import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    hero: {
      eyebrow: t({ en: "Mino Skincare", fr: "Mino Skincare" }),
      titleStart: t({
        en: "Skincare designed",
        fr: "Des soins conçus",
      }),
      titleAccent: t({
        en: "with care and precision",
        fr: "avec élégance et précision",
      }),
      description: t({
        en: "Gentle, effective formulas for a refined daily ritual",
        fr: "Des formules douces et performantes pour un rituel quotidien raffiné",
      }),
      catalogueCta: t({ en: "Explore our collection", fr: "Découvrir la collection" }),
      showcaseCta: t({ en: "Discover more", fr: "Découvrir davantage" }),
      imageAlt: t({
        en: "Illustration of Mino Skincare products",
        fr: "Illustration des produits Mino Skincare",
      }),
    },

    promises: {
      heading: t({ en: "Our commitment", fr: "Notre engagement" }),
      delivery: t({ en: "Fast, reliable delivery", fr: "Une livraison rapide et fiable" }),
      securePayment: t({ en: "Secure payment", fr: "Paiement sécurisé" }),
      freeReturn: t({ en: "Easy returns", fr: "Retours simples" }),
      naturalProducts: t({ en: "Carefully selected ingredients", fr: "Des ingrédients sélectionnés avec soin" }),
      items: [
        t({ en: "Fast, reliable delivery", fr: "Une livraison rapide et fiable" }),
        t({ en: "Secure payment", fr: "Paiement sécurisé" }),
        t({ en: "Easy returns", fr: "Retours simples" }),
        t({ en: "Carefully selected ingredients", fr: "Des ingrédients sélectionnés avec soin" }),
      ],
    },

    categories: {
      title: t({ en: "Shop by category", fr: "Explorer par catégorie" }),
      heading: t({ en: "Shop by category", fr: "Explorer par catégorie" }),
      description: t({
        en: "Explore our essentials curated for every skincare routine.",
        fr: "Découvrez nos essentiels soigneusement sélectionnés pour chaque routine de soin.",
      }),
      seeAll: t({ en: "See all", fr: "Voir tout" }),
      productSingular: t({ en: "product", fr: "produit" }),
      productPlural: t({ en: "products", fr: "produits" }),
    },

    featuredProducts: {
      title: t({ en: "Signature essentials", fr: "Les essentiels de la marque" }),
      heading: t({ en: "Signature essentials", fr: "Les essentiels de la marque" }),
      description: t({
        en: "Discover our most loved formulas, crafted for daily comfort and visible results.",
        fr: "Découvrez nos formules les plus appréciées, conçues pour le confort quotidien et des résultats visibles.",
      }),
      seeAll: t({ en: "See all products", fr: "Voir tous les produits" }),
      saleBadge: t({ en: "-20%", fr: "-20%" }),
      viewDetails: t({ en: "View Details", fr: "Voir les détails" }),
      inStock: t({ en: "In stock", fr: "En stock" }),
      outOfStock: t({ en: "Out of stock", fr: "Rupture de stock" }),
    },

    moreProducts: {
      title: t({ en: "Discover more", fr: "Découvrez davantage" }),
      heading: t({ en: "Discover more", fr: "Découvrez davantage" }),
      description: t({
        en: "Explore additional products curated for your routine.",
        fr: "Explorez d'autres produits sélectionnés pour votre routine.",
      }),
      viewDetails: t({ en: "View Details", fr: "Voir les détails" }),
    },

    testimonials: {
      title: t({ en: "What our clients say", fr: "Ce que disent nos clientes" }),
      heading: t({ en: "What our clients say", fr: "Ce que disent nos clientes" }),
      description: t({
        en: "Real feedback from clients who trust Mino for their daily skincare ritual.",
        fr: "Des retours authentiques de clientes qui font confiance à Mino pour leur rituel de soin quotidien.",
      }),
      about: t({ en: "about", fr: "à propos de" }),
    },

    newsletter: {
      title: t({ en: "Stay connected", fr: "Restez connectées" }),
      heading: t({ en: "Stay connected", fr: "Restez connectées" }),
      description: t({
        en: "Receive skincare tips, launches, and exclusive offers",
        fr: "Recevez des conseils, des nouveautés et des offres exclusives",
      }),
      placeholder: t({ en: "Enter your email", fr: "Entrez votre adresse email" }),
      submit: t({ en: "Subscribe", fr: "S'abonner" }),
      cta: t({ en: "Subscribe", fr: "S'abonner" }),
    },
  },
} satisfies Dictionary;

export default pageContent;