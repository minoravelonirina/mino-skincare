import { type Dictionary, t } from "intlayer";

const pageContent = {
  key: "page",
  content: {
    navigation: {
      siteTitle: t({ en: "Mino Skincare",  fr: "Mino Soins" }),
      home:      t({ en: "Home",           fr: "Accueil" }),
      catalogue: t({ en: "Catalogue",      fr: "Catalogue" }),
      cart:      t({ en: "Cart",           fr: "Panier" }),
    },

    hero: {
      title:    t({ en: "Care that respects your skin",          fr: "Soins qui respectent votre peau" }),
      subtitle: t({ en: "Gentle, effective and lasting formulas", fr: "Des formules douces, efficaces et durables" }),
      cta:      t({ en: "See products",                          fr: "Voir les produits" }),
    },

    promises: {
      heading: t({ en: "Our promises", fr: "Nos promesses" }),
      items: [
        t({ en: "Natural ingredients",        fr: "Ingrédients naturels" }),
        t({ en: "Dermatologically tested",    fr: "Testé dermatologiquement" }),
        t({ en: "Fast delivery",              fr: "Livraison rapide" }),
      ],
    },

    categories: {
      heading: t({ en: "Categories", fr: "Catégories" }),
      seeAll:  t({ en: "See all",    fr: "Voir tout" }),
    },

    featuredProducts: {
      heading:   t({ en: "Featured products", fr: "Produits en vedette" }),
      saleBadge: t({ en: "-20%",              fr: "-20%" }),
    },

    testimonials: {
      heading: t({ en: "Testimonials", fr: "Témoignages" }),
    },

    newsletter: {
      heading:     t({ en: "Get our tips",              fr: "Recevez nos conseils" }),
      description: t({ en: "Subscribe to the newsletter", fr: "Inscrivez-vous à la newsletter" }),
      cta:         t({ en: "Subscribe",                 fr: "S'inscrire" }),
    },
  },
} satisfies Dictionary;

export default pageContent;