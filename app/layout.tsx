// import './globals.css'
 
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body suppressHydrationWarning={true}>{children}</body>
//     </html>
//   )
// }

import "./globals.css";
import { IntlayerClientProvider, type NextLayoutIntlayer } from "next-intlayer";

const RootLayout: NextLayoutIntlayer = async ({ children, params }) => {
  const { locale } = await params;

  return (
    <IntlayerClientProvider locale={locale}>{children}</IntlayerClientProvider>
  );
};

export default RootLayout;
