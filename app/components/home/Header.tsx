"use client"

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";
import { getLocaleFromPath } from "intlayer";

export default function Header({ content }: { content: any }) {
  const locale = getLocaleFromPath()
  const showcase = content.showcase ?? content.home ?? "Home";
  const catalogue = content.catalogue ?? "Catalogue";
  const categories = content.categories ?? "Categories";
  const reviews = content.reviews ?? "Reviews";
  const about = content.about ?? "About";
  const login = content.login ?? "Login";
  const cart = content.cart ?? "Cart";

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  useEffect(() => {
    const body = document.body;
    if (open) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = "hidden";
      body.style.paddingRight = scrollBarWidth > 0 ? `${scrollBarWidth}px` : "";
    } else {
      body.style.overflow = "";
      body.style.paddingRight = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.paddingRight = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="group relative z-10 flex items-center gap-1">
          <span className="font-serif text-[22px] font-semibold tracking-tight text-[#2d5a3d] transition-colors duration-300 group-hover:text-[#1e3d2a]">
            Mino
          </span>
          <span className="font-serif text-[22px] font-light italic tracking-tight text-[#8BAF7C] transition-colors duration-300 group-hover:text-[#6d9460]">
            Skincare
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {[
            { href: `/${locale}#vitrine`, label: showcase },
            { href: `/${locale}/catalogue`, label: catalogue },
            { href: `/${locale}#categories`, label: categories },
            { href: `/${locale}/about`, label: about },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-[#555] transition-colors duration-300 hover:text-[#2d5a3d] after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:origin-left after:scale-x-0 after:bg-[#2d5a3d] after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 text-sm text-[#555]">
          <div className="hidden md:flex items-center gap-2">
            <LanguageSwitcher />
            <div className="mx-1 h-4 w-px bg-[#e0ddd5]" />
            <Link
              href={`/${locale}/login`}
              className="px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-[#2d5a3d]"
            >
              {login}
            </Link>
            <Link
              href={`/${locale}/cart`}
              className="group relative flex items-center gap-2 rounded-full bg-[#2d5a3d] px-5 py-2.5 text-[13px] font-medium text-white transition-all duration-300 hover:bg-[#1e3d2a] hover:shadow-lg hover:shadow-[#2d5a3d]/20"
            >
              {cart}
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-[10px] font-semibold transition-colors duration-300 group-hover:bg-white/30">
                3
              </span>
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden relative z-10 flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 hover:bg-[#f0ede6]"
          >
            <span className="sr-only">Toggle menu</span>
            <div className="flex h-5 w-5 flex-col items-center justify-center gap-1.5">
              <span
                className={`block h-px w-5 bg-[#2d5a3d] transition-all duration-300 ${
                  open ? "translate-y-[3.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[#2d5a3d] transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-[#2d5a3d] transition-all duration-300 ${
                  open ? "-translate-y-[3.5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-500 ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity duration-500 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          ref={panelRef}
          className={`absolute right-0 top-0 h-full w-full max-w-[320px] bg-[#FAFAF7] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <Link href={`/${locale}`} className="flex items-center gap-1" onClick={() => setOpen(false)}>
              <span className="font-serif text-lg font-semibold text-[#2d5a3d]">Mino</span>
              <span className="font-serif text-lg font-light italic text-[#8BAF7C]">Skincare</span>
            </Link>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0ede6] text-[#2d5a3d] transition-colors duration-300 hover:bg-[#e4e0d8]"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-4">
            {[
              { href: `/${locale}#vitrine`, label: showcase },
              { href: `/${locale}/catalogue`, label: catalogue },
              { href: `/${locale}#categories`, label: categories },
              { href: `/${locale}/about`, label: about },
            ].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-5 py-3.5 text-[15px] font-medium text-[#1a1a1a] transition-all duration-300 hover:bg-[#eef3e8] hover:text-[#2d5a3d] ${
                  open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${100 + i * 50}ms` : "0ms" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div
            className={`mt-6 flex flex-col gap-3 px-4 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: open ? "350ms" : "0ms" }}
          >
            <div className="px-2">
              <LanguageSwitcher />
            </div>
            <Link
              href={`/${locale}/login`}
              onClick={() => setOpen(false)}
              className="rounded-2xl border border-[#e0ddd5] bg-white px-5 py-3.5 text-center text-[15px] font-medium text-[#2d5a3d] transition-all duration-300 hover:border-[#2d5a3d]"
            >
              {login}
            </Link>
            <Link
              href={`/${locale}/cart`}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-[#2d5a3d] px-5 py-3.5 text-center text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#1e3d2a]"
            >
              {cart}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
