import type { NextLayoutIntlayer } from "next-intlayer";
import { getIntlayer } from "next-intlayer";
import { getLocale } from "next-intlayer/server";
import SiteShell from "../components/SiteShell";

export { generateStaticParams } from "next-intlayer";

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
