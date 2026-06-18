import { t, type Dictionary } from "intlayer";

const homePageContent = {
  key: "home-page",
  content: {
    navigation: {
      showcase: t({
        en: "Showcase",
        fr: "Vitrine",
      }),
      catalogue: t({
        en: "Catalogue",
        fr: "Catalogue",
      }),
      categories: t({
        en: "Categories",
        fr: "Catégories",
      }),
      reviews: t({
        en: "Reviews",
        fr: "Avis",
      }),
      login: t({
        en: "Sign in",
        fr: "Connexion",
      }),
      cart: t({
        en: "Cart",
        fr: "Panier",
      }),
    },
    hero: {
      eyebrow: t({
        en: "New - Spring Collection",
        fr: "Nouveau - Collection Printemps",
      }),
      titleStart: t({
        en: "Take care of yourself,",
        fr: "Prendre soin de soi,",
      }),
      titleAccent: t({
        en: "naturally.",
        fr: "naturellement.",
      }),
      description: t({
        en: "Mino Skincare is a mixed boutique dedicated to natural skincare and partner brands. Discover our Mino product showcase and a curated e-commerce selection of carefully chosen cosmetics.",
        fr: "Mino Skincare est une boutique mixte dédiée aux soins naturels et aux marques partenaires. Retrouvez notre vitrine de produits signés Mino et une sélection e-commerce de cosmétiques soigneusement choisis.",
      }),
      catalogueCta: t({
        en: "Discover the catalogue",
        fr: "Découvrir le catalogue",
      }),
      showcaseCta: t({
        en: "Our showcase",
        fr: "Notre vitrine",
      }),
      imageAlt: t({
        en: "Woman with soft, radiant skin - Mino Skincare",
        fr: "Femme avec une peau soyeuse et rayonnante - Mino Skincare",
      }),
    },
    promises: {
      delivery: t({
        en: "24h delivery",
        fr: "Livraison en 24h",
      }),
      securePayment: t({
        en: "Secure payment",
        fr: "Paiement sécurisé",
      }),
      freeReturn: t({
        en: "Free 30-day returns",
        fr: "Retour gratuit 30j",
      }),
      naturalProducts: t({
        en: "100% natural products",
        fr: "Produits 100% naturels",
      }),
    },
    categories: {
      title: t({
        en: "Our categories",
        fr: "Nos catégories",
      }),
      description: t({
        en: "Explore our natural skincare categories for face, body, hair and makeup.",
        fr: "Explorez nos catégories de soins naturels pour le visage, le corps, les cheveux et le maquillage.",
      }),
      productSingular: t({
        en: "product",
        fr: "produit",
      }),
      productPlural: t({
        en: "products",
        fr: "produits",
      }),
    },
    featuredProducts: {
      title: t({
        en: "Featured products",
        fr: "Produits en vedette",
      }),
      description: t({
        en: "Discover our selection of flagship products: natural skincare, premium makeup and wellness rituals to care for your skin.",
        fr: "Découvrez notre sélection de produits phares : soins naturels, maquillage premium et rituels bien-être pour prendre soin de votre peau.",
      }),
      seeAll: t({
        en: "See all products",
        fr: "Voir tous les produits",
      }),
      saleBadge: t({
        en: "On sale",
        fr: "En promotion",
      }),
    },
    testimonials: {
      title: t({
        en: "What our customers say",
        fr: "Ce que disent nos clients",
      }),
      description: t({
        en: "Read customer reviews about our natural skincare products.",
        fr: "Découvrez les avis de nos clients satisfaits sur nos produits de soins naturels.",
      }),
      ratingLabel: t({
        en: "out of 5",
        fr: "sur 5",
      }),
      about: t({
        en: "About:",
        fr: "À propos :",
      }),
    },
    newsletter: {
      title: t({
        en: "Join our community",
        fr: "Rejoignez notre communauté",
      }),
      description: t({
        en: "Sign up to receive exclusive offers, wellness tips and Mino Skincare news every week.",
        fr: "Inscrivez-vous pour recevoir nos offres exclusives, conseils bien-être et nouveautés Mino Skincare chaque semaine.",
      }),
      placeholder: t({
        en: "Your email address...",
        fr: "Votre adresse email...",
      }),
      submit: t({
        en: "Subscribe",
        fr: "S'inscrire",
      }),
    },
  },
} satisfies Dictionary;

export default homePageContent;
