import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";

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
        <SectionHeader eyebrow="More Products" title={title} description={description} />

        <div className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} saleBadge={saleBadge} variant="compact" viewDetails={viewDetails} inStock={inStock} outOfStock={outOfStock} />
          ))}
        </div>
      </div>
    </section>
  );
}
