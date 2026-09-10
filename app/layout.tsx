import "./globals.css";
import { getHTMLTextDir } from "intlayer";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const RootLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params as { locale?: string };
  return (
    <html lang={locale || "fr"} dir={getHTMLTextDir(locale || "fr")} data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
