import { type Dictionary, t } from "intlayer";

const aboutContent = {
  key: "about",
  content: {
    title: t({ en: "Our Story", fr: "Notre histoire" }),
    subtitle: t({
      en: "Born from a passion for natural beauty and mindful skincare",
      fr: "Née d'une passion pour la beauté naturelle et les soins conscients",
    }),

    hero: {
      eyebrow: t({ en: "About Mino", fr: "À propos de Mino" }),
      title: t({ en: "Where nature", fr: "Là où la nature" }),
      titleAccent: t({ en: "meets care", fr: "rencontre l'attention" }),
      description: t({
        en: "Mino Skincare was born from a simple belief: your skin deserves the purest ingredients, thoughtfully formulated into rituals you'll love.",
        fr: "Mino Skincare est née d'une conviction simple : votre mérite les ingrédients les plus purs, judicieusement formulés en des rituels que vous adorerez.",
      }),
    },

    story: {
      eyebrow: t({ en: "Our Journey", fr: "Notre parcours" }),
      title: t({ en: "A story rooted", fr: "Une histoire ancrée" }),
      titleAccent: t({ en: "in nature", fr: "dans la nature" }),
      p1: t({
        en: "Mino Skincare started with a frustration: too many products filled with synthetic chemicals, promising results but delivering irritation. We knew there had to be a better way.",
        fr: "Mino Skincare a commencé par une frustration : trop de produits remplis de produits chimiques synthétiques, promettant des résultats mais délivrant de l'irritation. Nous savions qu'il devait y avoir une meilleure façon.",
      }),
      p2: t({
        en: "We traveled to source the finest botanical ingredients — shea butter from West Africa, argan oil from Morocco, aloe vera from Madagascar. Every ingredient tells a story of communities we work with directly.",
        fr: "Nous avons voyagé pour sourcer les meilleurs ingrédients botaniques — beurre de karité d'Afrique de l'Ouest, huile d'argan du Maroc, aloe vera de Madagascar. Chaque ingrédient raconte l'histoire des communautés avec lesquelles nous travaillons directement.",
      }),
      p3: t({
        en: "Today, Mino is more than a brand. It's a commitment to clean beauty that honors both your skin and the earth.",
        fr: "Aujourd'hui, Mino est plus qu'une marque. C'est un engagement envers une beauté propre qui honore votre peau et la terre.",
      }),
    },

    mission: {
      eyebrow: t({ en: "Our Mission", fr: "Notre mission" }),
      title: t({ en: "What we stand for", fr: "Ce que nous défendons" }),
      description: t({
        en: "We believe skincare should be simple, honest, and effective. No empty promises — just formulas that let your natural beauty shine through.",
        fr: "Nous croyons que les soins de la peau devraient être simples, honnêtes et efficaces. Pas de promesses vides — juste des formules qui laissent votre beauté naturelle briller.",
      }),
    },

    values: [
      {
        title: t({ en: "Clean Ingredients", fr: "Ingrédients purs" }),
        description: t({
          en: "Every product is free from parabens, sulfates, and synthetic fragrances. We use only what nature provides.",
          fr: "Chaque produit est exempt de parabènes, sulfates et parfums synthétiques. Nous n'utilisons que ce que la nature offre.",
        }),
      },
      {
        title: t({ en: "Ethical Sourcing", fr: "Approvisionnement éthique" }),
        description: t({
          en: "We partner directly with communities who grow and harvest our botanical ingredients, ensuring fair wages and sustainable practices.",
          fr: "Nous nous associons directement aux communautés qui cultivent et récoltent nos ingrédients botaniques, garantissant des salaires équitables et des pratiques durables.",
        }),
      },
      {
        title: t({ en: "Visible Results", fr: "Des résultats visibles" }),
        description: t({
          en: "Clinical-grade formulations that deliver real, measurable improvements to your skin's health and radiance.",
          fr: "Des formulations de qualité clinique qui apportent des améliorations réelles et mesurables à la santé et l'éclat de votre peau.",
        }),
      },
      {
        title: t({ en: "Sustainable Beauty", fr: "Beauté durable" }),
        description: t({
          en: "Recyclable packaging, carbon-neutral shipping, and a commitment to reducing our environmental footprint.",
          fr: "Emballages recyclables, livraison carbone neutre et engagement à réduire notre empreinte environnementale.",
        }),
      },
    ],

    numbers: {
      eyebrow: t({ en: "Mino by the numbers", fr: "Mino en chiffres" }),
      stats: [
        { value: "100%", label: t({ en: "Natural ingredients", fr: "Ingrédients naturels" }) },
        { value: "50+", label: t({ en: "Products crafted", fr: "Produits créés" }) },
        { value: "15K+", label: t({ en: "Happy clients", fr: "Clientes satisfaites" }) },
        { value: "12", label: t({ en: "Countries sourced", fr: "Pays d'origine" }) },
      ],
    },

    cta: {
      eyebrow: t({ en: "Join the ritual", fr: "Rejoignez le rituel" }),
      title: t({ en: "Ready to discover Mino?", fr: "Prêt à découvrir Mino ?" }),
      description: t({
        en: "Explore our collection and find the perfect products for your skincare ritual.",
        fr: "Explorez notre collection et trouvez les produits parfaits pour votre rituel de soin.",
      }),
      button: t({ en: "Shop now", fr: "Acheter maintenant" }),
      secondaryButton: t({ en: "Contact us", fr: "Nous contacter" }),
    },
  },
} satisfies Dictionary;

export default aboutContent;
