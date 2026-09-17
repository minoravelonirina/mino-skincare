"use client";

import Link from "next/link";
import { useIntlayer } from "next-intlayer";
import { useLocale } from "next-intlayer";

export default function Footer() {
  const content = useIntlayer("footer");
  const { locale } = useLocale();

  return (
    <footer className="bg-[#1a1a1a] text-[#ccc]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <div className="font-serif text-2xl text-beige">Mino Skincare</div>
          <p className="mt-4 text-sm leading-7 text-[#999]">
            {content.description.value}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.2em] text-[#777]">
            {content.paymentMethods.map((method, index) => (
              <span key={index} className="rounded-full bg-[#333] px-3 py-1">
                {method.value}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">
            {content.shop.title.value}
          </div>
          <ul className="space-y-2 text-sm text-[#999]">
            {content.shop.items.map((item, index) => (
              <li key={index}>{item.value}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">
            {content.info.title.value}
          </div>
          <ul className="space-y-2 text-sm text-[#999]">
            <li>
              <Link
                href={`/${locale}/about`}
                className="transition-colors duration-300 hover:text-white"
              >
                {content.info.about.value}
              </Link>
            </li>
            <li>{content.info.blog.value}</li>
            <li>{content.info.faq.value}</li>
            <li>{content.info.contact.value}</li>
          </ul>
        </div>

        <div>
          <div className="mb-4 text-xs uppercase tracking-[0.2em] text-white">
            {content.legal.title.value}
          </div>
          <ul className="space-y-2 text-sm text-[#999]">
            {content.legal.items.map((item, index) => (
              <li key={index}>{item.value}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-[#222] bg-[#111] px-4 py-4 text-xs text-[#555] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <span>© 2026 Mino Skincare — {content.rights.value}</span>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">f</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">in</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#333] text-[10px]">ig</span>
          </div>
        </div>
      </div>
    </footer>
  );
}