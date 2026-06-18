export default function NewsletterSection({ content }: { content: any }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="rounded-4xl bg-[#fde8e8] px-6 py-10 sm:px-10 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <h2 className="font-serif text-3xl text-[#1a1a1a]">{content.title}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#555] sm:text-base">{content.description}</p>
          </div>
          <form className="flex flex-col gap-3 rounded-3xl bg-white p-4 shadow-sm sm:flex-row sm:items-center">
            <input
              type="email"
              placeholder={content.placeholder}
              className="flex-1 rounded-3xl border border-[#c8deb4] bg-white px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#2d5a3d] focus:ring-2 focus:ring-[#c8deb4]"
            />
            <button className="rounded-3xl bg-[#2d5a3d] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#23472e]">{content.submit}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
