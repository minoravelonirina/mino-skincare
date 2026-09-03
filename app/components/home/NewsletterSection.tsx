export default function NewsletterSection({ content }: { content: any }) {
  const title = content.title ?? content.heading ?? "Stay connected";
  const description = content.description ?? content.subtitle ?? "";
  const placeholder = content.placeholder ?? "Email address";
  const submit = content.submit ?? content.cta ?? "Subscribe";

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#f8f6f3] via-white to-[#f8f6f3]" />
      
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#2d5a3d] px-8 py-14 sm:px-14 sm:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#8BAF7C]/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#8BAF7C]/10 blur-3xl" />
          
          <div className="relative grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[12px] font-medium text-white/80 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#8BAF7C]" />
                Newsletter
              </span>
              <h2 className="mt-6 font-serif text-[32px] leading-tight text-white sm:text-[40px]">
                {title}
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/70">
                {description}
              </p>
            </div>
            
            <div className="relative">
              <form className="relative flex flex-col gap-3 rounded-2xl bg-white/10 p-3 backdrop-blur-md sm:flex-row">
                <input
                  type="email"
                  placeholder={placeholder}
                  className="flex-1 rounded-xl bg-white/95 px-5 py-4 text-[14px] text-[#1a1a1a] placeholder:text-[#999] outline-none transition-all duration-300 focus:ring-2 focus:ring-[#8BAF7C]/50"
                />
                <button className="rounded-xl bg-[#1e3d2a] px-8 py-4 text-[14px] font-medium text-white transition-all duration-300 hover:bg-[#153020] hover:shadow-lg hover:shadow-[#1e3d2a]/30">
                  {submit}
                </button>
              </form>
              <p className="mt-4 text-center text-[12px] text-white/50">
                No spam, unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
