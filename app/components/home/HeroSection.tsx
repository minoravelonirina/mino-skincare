import Image from "next/image";
import Link from "next/link";
import { getLocaleFromPath } from "intlayer";

export default function HeroSection({ content }: { content: any }) {
  const locale = getLocaleFromPath()
  const eyebrow = content.eyebrow ?? "Mino Skincare";
  const titleStart = content.titleStart ?? content.title ?? "Skincare";
  const titleAccent = content.titleAccent ?? "";
  const description = content.description ?? content.subtitle ?? "";
  const catalogueCta = content.catalogueCta ?? content.cta ?? "Explore our collection";
  const showcaseCta = content.showcaseCta ?? "Discover more";
  const imageAlt = content.imageAlt ?? "Mino Skincare product illustration";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f7f3ed] via-[#faf8f5] to-[#f0ede6]" />
      
      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8BAF7C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8BAF7C]">
                {eyebrow}
              </span>
            </div>
            
            <div className="space-y-6">
              <h1 className="font-serif text-[40px] leading-[1.1] tracking-tight text-[#1a1a1a] sm:text-[56px] lg:text-[64px]">
                {titleStart}
                {titleAccent && (
                  <span className="mt-2 block font-serif italic text-[#2d5a3d]">
                    {titleAccent}
                  </span>
                )}
              </h1>
              
              <p className="max-w-lg text-[15px] leading-[1.8] text-[#6b6b6b]">
                {description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/${locale}/catalogue`}
                className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-[#2d5a3d] px-8 py-4 text-[14px] font-medium text-white transition-all duration-500 hover:bg-[#1e3d2a] hover:shadow-xl hover:shadow-[#2d5a3d]/20"
              >
                {catalogueCta}
                <svg
                  className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    d="M3 8h10M9 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              
              <Link
                href={`/${locale}#vitrine`}
                className="group inline-flex items-center justify-center gap-3 rounded-full px-8 py-4 text-[14px] font-medium text-[#2d5a3d] transition-all duration-300 hover:bg-[#2d5a3d]/5"
              >
                {showcaseCta}
                <span className="h-px w-4 bg-[#2d5a3d] transition-all duration-300 group-hover:w-6" />
              </Link>
            </div>

            <div className="mt-4 flex items-center gap-8 border-t border-[#e0ddd5] pt-8">
              <div>
                <span className="block text-2xl font-semibold text-[#2d5a3d]">100%</span>
                <span className="text-[12px] uppercase tracking-wider text-[#999]">Natural</span>
              </div>
              <div className="h-10 w-px bg-[#e0ddd5]" />
              <div>
                <span className="block text-2xl font-semibold text-[#2d5a3d]">50+</span>
                <span className="text-[12px] uppercase tracking-wider text-[#999]">Products</span>
              </div>
              <div className="h-10 w-px bg-[#e0ddd5]" />
              <div>
                <span className="block text-2xl font-semibold text-[#2d5a3d]">4.9</span>
                <span className="text-[12px] uppercase tracking-wider text-[#999]">Rating</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#eef3e8] to-[#f5ede4] opacity-40 blur-3xl" />
            
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#eef3e8]/50 to-transparent" />
              <Image
                src="/woman.png"
                alt={imageAlt}
                width={800}
                height={600}
                className="relative h-auto w-full max-w-[480px] object-contain drop-shadow-2xl lg:max-w-[560px]"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
