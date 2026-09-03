"use client";

import { usePathname } from "next/navigation";
import Header from "./home/Header";
import Footer from "./Footer";

const NO_NAV_PATHS = ["/login", "/register"];

export default function SiteShell({ navigation, children }: { navigation: any; children: React.ReactNode }) {
  const pathname = usePathname();
  const showNav = !NO_NAV_PATHS.some((p) => pathname?.includes(p));

  return (
    <div className="flex min-h-screen flex-col">
      {showNav && <Header content={navigation} />}
      <main className="flex-1">{children}</main>
      {showNav && <Footer />}
    </div>
  );
}
