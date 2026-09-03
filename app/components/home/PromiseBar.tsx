export default function PromiseBar({ content }: { content: any }) {
  const promiseItems = Array.isArray(content.items)
    ? content.items
    : [
        content.delivery,
        content.securePayment,
        content.freeReturn,
        content.naturalProducts,
      ];

  const icons = [
    <svg key="1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 3h15v13H1z" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>,
    <svg key="2" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>,
    <svg key="3" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>,
    <svg key="4" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8C8 10 5.9 16.17 3.82 21.34l1.89.66.95-2.3c.48.17.98.3 1.34.3C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75" />
    </svg>,
  ];

  return (
    <section className="relative border-y border-[#e0ddd5] bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {promiseItems.map((promise: any, index: number) => (
            <div
              key={index}
              className="group flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-300 hover:bg-[#f8f6f3]"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[#2d5a3d]/5 text-[#2d5a3d] transition-colors duration-300 group-hover:bg-[#2d5a3d] group-hover:text-white">
                {icons[index % icons.length]}
              </span>
              <span className="text-[13px] font-medium text-[#4a4a4a]">
                {promise}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
