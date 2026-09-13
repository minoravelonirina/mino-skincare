import type { Metadata } from "next";
import type { NextLayoutIntlayer } from "next-intlayer";
import { getIntlayer, IntlayerClientProvider } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import SiteShell from "../components/SiteShell";

interface PageMetadataContent {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    type: string;
    siteName: string;
  };
}

export { generateStaticParams } from "next-intlayer";

function toText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  const node = value as { props?: { children?: unknown } };
  if (node.props && node.props.children !== undefined) return toText(node.props.children);
  return String(value);
}

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mino-skincare.com";

  let locale = "fr";
  let metadata: PageMetadataContent;

  try {
    locale = await getLocale();
    metadata = getIntlayer("page-metadata", locale);
  } catch (err) {
    console.error("Metadata generation failed:", err);
    return {
      title: "Mino Skincare",
      description: "Mino Skincare",
      metadataBase: new URL(siteUrl),
    };
  }

  return {
    title: toText(metadata.title),
    description: toText(metadata.description),
    metadataBase: new URL(siteUrl),
    openGraph: {
      title: toText(metadata.openGraph.title),
      description: toText(metadata.openGraph.description),
      type: "website",
      siteName: toText(metadata.openGraph.siteName),
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
  const navigationSource = getIntlayer("navigation", locale);

  const navigation = {
    siteTitle: navigationSource.siteTitle,
    home: navigationSource.home,
    showcase: navigationSource.showcase,
    catalogue: navigationSource.catalogue,
    categories: navigationSource.categories,
    reviews: navigationSource.reviews,
    about: navigationSource.about,
    login: navigationSource.login,
    cart: navigationSource.cart,
    dashboard: navigationSource.dashboard,
  } as Record<string, string>;

  return (
    <SiteShell navigation={navigation}>
      <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
    </SiteShell>
  );
};

export default LocaleLayout;
