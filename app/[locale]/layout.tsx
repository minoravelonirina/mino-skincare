import type { NextLayoutIntlayer } from "next-intlayer";

export { generateStaticParams } from "next-intlayer";

const LocaleLayout: NextLayoutIntlayer = async ({ children }) => {
  return <>{children}</>;
};

export default LocaleLayout;
