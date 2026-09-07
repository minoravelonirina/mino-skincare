import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "page-metadata",
  content: {
    title: t({
      en: "Mino Skincare | Refined care for every ritual",
      fr: "Mino Skincare | Des soins raffinés pour chaque rituel",
    }),
    description: t({
      en: "Discover skincare essentials crafted with care, performance, and respect for your skin.",
      fr: "Découvrez des essentiels de soin formulés avec soin, efficacité et respect de votre peau.",
    }),
    openGraph: {
      title: t({
        en: "Mino Skincare | Refined care for every ritual",
        fr: "Mino Skincare | Des soins raffinés pour chaque rituel",
      }),
      description: t({
        en: "Discover skincare essentials crafted with care, performance, and respect for your skin.",
        fr: "Découvrez des essentiels de soin formulés avec soin, efficacité et respect de votre peau.",
      }),
      type: "website",
      siteName: t({ en: "Mino Skincare", fr: "Mino Skincare" }),
    },
  },
} satisfies Dictionary<Metadata>;

export default metadataContent;
