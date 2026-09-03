import ProductCard from "./ProductCard";

export default function MoreProductsSection({ products, content, saleBadge }: { products: any[]; content: any; saleBadge: any }) {
  if (!products.length) return null;

  const title = content.title ?? content.heading ?? "Discover more";
  const description = content.description ?? "";
  const viewDetails = content.viewDetails ?? "View Details";
  const inStock = content.inStock ?? "In stock";
  const outOfStock = content.outOfStock ?? "Out of stock";

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mb-12 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2d5a3d]/5 px-4 py-2 text-[12px] font-medium text-[#2d5a3d]">
            More Products
          </span>
          <h2 className="mt-5 font-serif text-[32px] tracking-tight text-[#1a1a1a] sm:text-[40px]">
            {title}
          </h2>
          {description && (
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#888]">
              {description}
            </p>
          )}
        </div>

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} saleBadge={saleBadge} variant="compact" viewDetails={viewDetails} inStock={inStock} outOfStock={outOfStock} />
          ))}
        </div>
      </div>
    </section>
  );
}
