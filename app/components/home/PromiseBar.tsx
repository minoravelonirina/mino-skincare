export default function PromiseBar({ content }: { content: any }) {
  const promiseItems = Array.isArray(content.items)
    ? content.items
    : [
        content.delivery,
        content.securePayment,
        content.freeReturn,
        content.naturalProducts,
      ];

  return (
    <section className="bg-[#2d5a3d] py-8 text-white">
      <div className="mx-auto flex max-w-8xl flex-wrap justify-center gap-6 px-4 text-xs uppercase tracking-[0.3em] sm:px-6 lg:px-8 ">
        {promiseItems.map((promise: any, index: number) => (
          <div key={index} className="flex items-center gap-2 ">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-xs">✓</span>
            {promise}
          </div>
        ))}
      </div>
    </section>
  );
}
