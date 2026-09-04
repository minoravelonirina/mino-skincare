import { type Dictionary, t } from "intlayer";

const catalogueContent = {
  key: "catalogue",
  content: {
    hero: {
      title: t({ en: "Our Catalogue", fr: "Notre Catalogue" }),
      description: t({
        en: "Discover our full selection of natural cosmetic products, from Mino skincare to trusted partner brands.",
        fr: "Découvrez notre sélection complète de produits cosmétiques naturels, des soins Mino aux marques partenaires de confiance.",
      }),
    },
    searchPlaceholder: t({
      en: "Search for a product...",
      fr: "Rechercher un produit...",
    }),
    all: t({ en: "All", fr: "Tous" }),
    sortBy: {
      label: t({ en: "Sort by: Relevance", fr: "Trier par : Pertinence" }),
      priceAsc: t({ en: "Price: low to high", fr: "Prix croissant" }),
      priceDesc: t({ en: "Price: high to low", fr: "Prix décroissant" }),
      newest: t({ en: "Newest", fr: "Nouveautés" }),
      popular: t({ en: "Most popular", fr: "Les plus populaires" }),
    },
    productCount: t({ en: "product(s) found", fr: "produit(s) trouvé(s)" }),
    featuredBadge: t({ en: "Featured", fr: "Vedette" }),
    promoBadge: t({ en: "Promo", fr: "Promo" }),
    addToCart: t({ en: "+ Cart", fr: "+ Panier" }),
    empty: {
      emoji: "🔍",
      title: t({ en: "No product found", fr: "Aucun produit trouvé" }),
      description: t({
        en: "Try changing your search criteria.",
        fr: "Essayez de modifier vos critères de recherche.",
      }),
      cta: t({ en: "See all products", fr: "Voir tous les produits" }),
    },
    newsletter: {
      title: t({ en: "Join our community", fr: "Rejoignez notre communauté" }),
      description: t({
        en: "Sign up to receive our exclusive offers, wellness tips and Mino Skincare news every week.",
        fr: "Inscrivez-vous pour recevoir nos offres exclusives, conseils bien-être et nouveautés Mino Skincare chaque semaine.",
      }),
      placeholder: t({ en: "Your email address...", fr: "Votre adresse email..." }),
      submit: t({ en: "Sign up", fr: "S'inscrire" }),
    },

    detail: {
      backToCatalogue: t({ en: "← Back to catalogue", fr: "← Retour au catalogue" }),
      price: t({ en: "Price", fr: "Prix" }),
      stock: t({ en: "Stock", fr: "Stock" }),
      description: t({ en: "Description", fr: "Description" }),
      descriptionUnavailable: t({
        en: "Product description not available.",
        fr: "Description du produit non disponible.",
      }),
      ingredients: t({ en: "Ingredients", fr: "Ingrédients" }),
      ingredientsUnavailable: t({
        en: "Information not provided.",
        fr: "Informations non renseignées.",
      }),
      usage: t({ en: "Usage tips", fr: "Conseils d'utilisation" }),
      usageUnavailable: t({
        en: "Usage instructions to discover.",
        fr: "Mode d'utilisation à découvrir.",
      }),
      whyChoose: t({
        en: "Why choose this product?",
        fr: "Pourquoi choisir ce produit ?",
      }),
      whyChooseItems: [
        t({ en: "Natural and controlled formula", fr: "Formule naturelle et contrôlée" }),
        t({ en: "Made for all skin types", fr: "Élaboré pour tous les types de peau" }),
        t({ en: "Made and sold by Mino Skincare", fr: "Fabriqué et vendu par Mino Skincare" }),
      ],
    },

    addToCartForm: {
      quantity: t({ en: "Quantity", fr: "Quantité" }),
      addToCart: t({ en: "Add to cart", fr: "Ajouter au panier" }),
      adding: t({ en: "Adding...", fr: "Ajout en cours..." }),
      added: t({ en: "Product added to cart 🎉", fr: "Produit ajouté au panier 🎉" }),
      error: t({
        en: "Unable to add to cart",
        fr: "Impossible d'ajouter au panier",
      }),
    },
  },
} satisfies Dictionary;

export default catalogueContent;
