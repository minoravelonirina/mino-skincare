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
  const login = content.login ?? "Login";
  const cart = content.cart ?? "Cart";

  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // close on ESC or outside click
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

  // prevent body scroll when open and keep page width stable
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
    <header className="sticky top-0 z-40 border-b border-[#e8e4dc] bg-[#fde8e8]/95 backdrop-blur-sm ">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="font-serif text-xl font-semibold text-[#2d5a3d] border-0">
          Mino<span className="italic text-[#8BAF7C]">Skincare</span>
        </Link> 

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-[#555] md:flex">
          <Link href={`/${locale}#vitrine`} className="transition hover:text-[#2d5a3d]">
            {showcase}
          </Link>
          <Link href={`/${locale}/catalogue`} className="transition hover:text-[#2d5a3d]">
            {catalogue}
          </Link>
          <Link href={`/${locale}#categories`} className="transition hover:text-[#2d5a3d]">
            {categories}
          </Link>
          <Link href={`/${locale}#testimonials`} className="transition hover:text-[#2d5a3d]">
            {reviews}
          </Link>
        </nav>

        {/* actions + mobile toggle */}
        <div className="flex items-center gap-3 text-sm text-[#555]">
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link
              href={`/${locale}/login`}
              className="rounded-full border border-[#d8d4ca] px-4 py-2 transition hover:border-[#2d5a3d] hover:text-[#2d5a3d]"
            >
              {login}
            </Link>
            <Link
              href={`/${locale}/cart`}
              className="flex items-center gap-2 rounded-full bg-[#2d5a3d] px-4 py-2 text-white transition hover:bg-[#23472e]"
            >
              {cart}
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">3</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-md bg-white/80 text-[#2d5a3d] shadow-sm ring-1 ring-[#e8e4dc] hover:bg-white"
          >
            <span className="sr-only">Toggle menu</span>
            {open ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2zm0 4h14a1 1 0 010 2H3a1 1 0 110-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`fixed inset-0 z-30 md:hidden overflow-hidden transition-all duration-300 border border-gray-900 ${open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'}`}>
        <div className={`absolute inset-0 bg-[#2d5a3d]/25 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div
          ref={panelRef}
          className={`absolute right-0 top-0 h-full w-full max-w-xs transform bg-[#FAFAF7] shadow-2xl p-6 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex items-center justify-between">
            <Link href={`/${locale}`} className="font-serif text-lg font-semibold text-[#d5a3d]">
              Mino<span className="italic text-[#8BAF7C]">Skincare</span>
            </Link>
            <button aria-label="Close menu" onClick={() => setOpen(false)} className="rounded-full bg-[#eef3e8] p-2 text-[#2d5a3d] transition hover:bg-[#d4e8c2]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col gap-3 text-lg text-[#1a1a1a]">
            <Link href={`/${locale}#vitrine`} onClick={() => setOpen(false)} className="rounded-3xl px-4 py-3 transition hover:bg-[#eef3e8] hover:text-[#2d5a3d]">
              {showcase}
            </Link>
            <Link href={`/${locale}/catalogue`} onClick={() => setOpen(false)} className="rounded-3xl px-4 py-3 transition hover:bg-[#eef3e8] hover:text-[#2d5a3d]">
              {catalogue}
            </Link>
            <Link href={`/${locale}#categories`} onClick={() => setOpen(false)} className="rounded-3xl px-4 py-3 transition hover:bg-[#eef3e8] hover:text-[#2d5a3d]">
              {categories}
            </Link>
            <Link href={`/${locale}#testimonials`} onClick={() => setOpen(false)} className="rounded-3xl px-4 py-3 transition hover:bg-[#eef3e8] hover:text-[#2d5a3d]">
              {reviews}
            </Link>
          </nav>

          <div className="mt-8 flex flex-col gap-3">
            <LanguageSwitcher />
            <Link href={`/${locale}/login`} onClick={() => setOpen(false)} className="rounded-full border border-[#d8d4ca] bg-white px-4 py-3 text-center text-[#2d5a3d] transition hover:border-[#2d5a3d] hover:text-[#2d5a3d]">
              {login}
            </Link>
            <Link href={`/${locale}/cart`} onClick={() => setOpen(false)} className="rounded-full bg-[#2d5a3d] px-4 py-3 text-center text-white transition hover:bg-[#23472e]">
              {cart}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
