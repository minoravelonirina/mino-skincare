import ProductCard from "./ProductCard";

export default function MoreProductsSection({ products, saleBadge }: { products: any[]; saleBadge: any }) {
  if (!products.length) return null;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} saleBadge={saleBadge} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
