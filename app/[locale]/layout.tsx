import type { Metadata } from "next";
import type { NextLayoutIntlayer } from "next-intlayer";
import { getIntlayer } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import SiteShell from "../components/SiteShell";

export { generateStaticParams } from "next-intlayer";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const metadata = getIntlayer("page-metadata", locale);
  return {
    title: metadata.title,
    description: metadata.description,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://mino-skincare.com"),
    openGraph: {
      title: metadata.openGraph.title,
      description: metadata.openGraph.description,
      type: "website",
      siteName: metadata.openGraph.siteName,
      locale: locale === "fr" ? "fr_FR" : "en_US",
    },
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
  };
}

const LocaleLayout: NextLayoutIntlayer = async ({ children }) => {
  const locale = await getLocale();
  const navigation = getIntlayer("navigation", locale);

  return (
    <SiteShell navigation={navigation}>
      {children}
    </SiteShell>
  );
};

export default LocaleLayout;
