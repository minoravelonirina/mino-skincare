"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function LanguageSwitcher({ locales = ["fr", "en"] }: { locales?: string[] }) {
  const pathname = usePathname() || "/";

  function buildHref(target: string) {
    const parts = pathname.split("/").filter(Boolean);
    // if first segment is a locale (fr|en), replace it, otherwise prefix
    const known = ["fr", "en"];
    if (parts.length && known.includes(parts[0])) {
      parts[0] = target;
    } else {
      parts.unshift(target);
    }
    return "/" + parts.join("/");
  }

  return (
    <div className="flex items-center gap-2">
      {locales.map((loc) => (
        <Link
          key={loc}
          href={buildHref(loc)}
          className="rounded-full border px-3 py-1 text-sm transition hover:bg-[#eef3e8]"
          aria-label={`Switch language to ${loc}`}
        >
          {loc.toUpperCase()}
        </Link>
      ))}
    </div>
  );
}
