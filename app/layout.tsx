import "./globals.css";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const RootLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = params as { locale?: string };
  return (<IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>);
};

export default RootLayout;
