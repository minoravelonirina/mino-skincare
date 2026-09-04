import Link from "next/link";
import { getIntlayer } from "next-intlayer";
import { getLocale } from "next-intlayer/server";

export default async function AboutPage() {
  const locale = await getLocale();
  const content = getIntlayer("about", locale);

  const hero = content.hero;
  const story = content.story;
  const mission = content.mission;
  const numbers = content.numbers;
  const cta = content.cta;

  return (
    <main className="bg-[#FAFAF7] text-[#1a1a1a] antialiased">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7f3ed] via-[#faf8f5] to-[#f0ede6]" />
        <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:px-8 lg:pt-28 lg:pb-32">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8BAF7C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8BAF7C]">
                {content.hero.eyebrow}
              </span>
              <span className="h-px w-8 bg-[#8BAF7C]" />
            </div>

            <h1 className="font-serif text-[40px] leading-[1.05] tracking-tight sm:text-[56px] lg:text-[64px]">
              {content.title}
              <span className="mt-2 block font-serif italic text-[#2d5a3d]">
                {hero.titleAccent}
              </span>
            </h1>

            <p className="max-w-xl text-[15px] leading-[1.8] text-[#6b6b6b]">
              {content.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#eef3e8] to-[#f5ede4] opacity-60 blur-3xl" />
            <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] bg-[#eef3e8]">
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="font-serif text-5xl font-semibold text-[#2d5a3d]">Mino</div>
                  <div className="font-serif text-5xl font-light italic text-[#8BAF7C]">Skincare</div>
                  <div className="mx-auto mt-6 h-px w-16 bg-[#8BAF7C]/40" />
                  <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-[#6b6b6b]">
                    {story.eyebrow}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#8BAF7C]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8BAF7C]">
                {story.eyebrow}
              </span>
            </div>

            <h2 className="font-serif text-[32px] leading-[1.15] tracking-tight sm:text-[42px]">
              {story.title}{" "}
              <span className="font-serif italic text-[#2d5a3d]">{story.titleAccent}</span>
            </h2>

            <div className="space-y-4 text-[15px] leading-[1.8] text-[#6b6b6b]">
              <p>{story.p1}</p>
              <p>{story.p2}</p>
              <p>{story.p3}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-[#2d5a3d] py-20 lg:py-24">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#8BAF7C]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8BAF7C]">
              {mission.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#8BAF7C]" />
          </div>

          <h2 className="mt-6 font-serif text-3xl leading-[1.15] tracking-tight text-white sm:text-[40px]">
            {mission.title}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-[1.8] text-[#eef3e8]">
            {mission.description}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.values.map((value) => (
            <div
              key={value.title}
              className="group rounded-[2rem] border border-[#e0ddd5] bg-white p-8 transition-all duration-500 hover:-translate-y-1 hover:border-[#8BAF7C] hover:shadow-xl hover:shadow-[#2d5a3d]/10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef3e8] text-[#2d5a3d]">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L15 8.5L22 9.3L17 14.1L18.2 21L12 17.8L5.8 21L7 14.1L2 9.3L9 8.5L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <h3 className="mt-6 font-serif text-xl font-semibold text-[#1a1a1a]">
                {value.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.7] text-[#6b6b6b]">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y border-[#e0ddd5] bg-[#f8f6f3] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-[#8BAF7C]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8BAF7C]">
              {numbers.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#8BAF7C]" />
          </div>

          <div className="mt-12 grid gap-10 text-center sm:grid-cols-2 lg:grid-cols-4">
            {numbers.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <span className="font-serif text-4xl font-semibold text-[#2d5a3d] lg:text-5xl">
                  {stat.value}
                </span>
                <span className="text-[13px] uppercase tracking-wider text-[#777]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f7f3ed] via-[#faf8f5] to-[#f0ede6]" />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#8BAF7C]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#8BAF7C]">
              {cta.eyebrow}
            </span>
            <span className="h-px w-8 bg-[#8BAF7C]" />
          </div>

          <h2 className="font-serif text-3xl leading-[1.15] tracking-tight sm:text-[40px]">
            {cta.title}
          </h2>

          <p className="max-w-xl text-[15px] leading-[1.8] text-[#6b6b6b]">
            {cta.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={`/${locale}/catalogue`}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#2d5a3d] px-8 py-4 text-[14px] font-medium text-white transition-all duration-500 hover:bg-[#1e3d2a] hover:shadow-xl hover:shadow-[#2d5a3d]/20"
            >
              {cta.button}
            </Link>
            <Link
              href={`/${locale}/catalogue`}
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#e0ddd5] bg-white px-8 py-4 text-[14px] font-medium text-[#2d5a3d] transition-all duration-300 hover:border-[#2d5a3d]"
            >
              {cta.secondaryButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
