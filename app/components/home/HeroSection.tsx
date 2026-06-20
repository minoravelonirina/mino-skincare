import Image from "next/image";
import Link from "next/link";

export default function HeroSection({ content }: { content: any }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
        <div className="flex flex-col justify-center gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8BAF7C]">{content.eyebrow}</span>
          <h1 className="font-serif text-4xl leading-tight text-[#1a1a1a] sm:text-5xl">
            {content.titleStart}
            <span className="block italic text-[#2d5a3d]">{content.titleAccent}</span>
          </h1>
          <p className="max-w-xl text-sm leading-7 text-[#374151] sm:text-base">{content.description}</p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/catalogue"
              className="inline-flex items-center justify-center rounded-md bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]"
            >
              {content.catalogueCta}
            </Link>
            <Link
              href="#vitrine"
              className="inline-flex items-center justify-center rounded-md border border-[#2d5a3d] bg-white px-6 py-3 text-sm font-semibold text-[#2d5a3d] transition hover:bg-[#eef3e8]"
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M5 12h14" stroke="#2d5a3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 5l7 7-7 7" stroke="#2d5a3d" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {content.showcaseCta}
            </Link>
          </div>
        </div>

        <div>
          <Image
            src="/téléchargement-removebg-preview.png"
            alt={content.imageAlt}
            width={800}
            height={600}
            className="h-auto w-full object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 45vw"
            priority
          />
        </div>
      </div>
    </section>
  );
}
