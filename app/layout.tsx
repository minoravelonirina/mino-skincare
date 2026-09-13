import "./globals.css";
import { getHTMLTextDir } from "intlayer";
import type { NextLayoutIntlayer } from "next-intlayer";

const RootLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params as { locale?: string };
  return (
    <html lang={locale || "fr"} dir={getHTMLTextDir(locale || "fr")} data-scroll-behavior="smooth">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
