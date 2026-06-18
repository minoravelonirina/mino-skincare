import Link from "next/link";
import LanguageSwitcher from "../LanguageSwitcher";

export default function Header({ content }: { content: any }) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#e8e4dc] bg-[#fde8e8]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-xl font-semibold text-[#2d5a3d]">
          Mino<span className="italic text-[#8BAF7C]">Skincare</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-[#555] md:flex">
          <Link href="#vitrine" className="transition hover:text-[#2d5a3d]">
            {content.showcase}
          </Link>
          <Link href="/catalogue" className="transition hover:text-[#2d5a3d]">
            {content.catalogue}
          </Link>
          <Link href="#categories" className="transition hover:text-[#2d5a3d]">
            {content.categories}
          </Link>
          <Link href="#testimonials" className="transition hover:text-[#2d5a3d]">
            {content.reviews}
          </Link>
        </nav>

        <div className="flex items-center gap-3 text-sm text-[#555]">
          <LanguageSwitcher />
          <Link
            href="/login"
            className="rounded-full border border-[#d8d4ca] px-4 py-2 transition hover:border-[#2d5a3d] hover:text-[#2d5a3d]"
          >
            {content.login}
          </Link>
          <Link
            href="/cart"
            className="flex items-center gap-2 rounded-full bg-[#2d5a3d] px-4 py-2 text-white transition hover:bg-[#23472e]"
          >
            {content.cart}
            <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-semibold">3</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
