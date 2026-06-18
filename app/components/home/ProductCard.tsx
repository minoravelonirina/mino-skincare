import Link from "next/link";
import Image from "next/image";
import { getCategoryVisual, formatPrice } from "@/lib/home";

export default function ProductCard({ product, saleBadge, showCompareAtPrice = false, variant = "default" }: any) {
  const visual = getCategoryVisual(product.category?.name);
  const backgroundClass = variant === "compact" ? "bg-white" : "bg-[#f6f3f3]";

  // try to parse first image if available
  let imageUrl: string | null = null;
  try {
    if (product.images) {
      const imgs = JSON.parse(product.images);
      const pick = Array.isArray(imgs) ? imgs[0] : imgs;
      if (typeof pick === "string") imageUrl = pick;
      else if (pick && typeof pick === "object") {
        // common shape: { url: '...' }
        if (typeof pick.url === "string") imageUrl = pick.url;
      }
    }
  } catch (_) {
    imageUrl = null;
  }

  function isValidImageSrc(src: string | null) {
    if (!src || typeof src !== "string") return false;
    const s = src.trim();
    if (s.startsWith("/")) return true; // local path
    if (s.startsWith("http://") || s.startsWith("https://")) return true; // absolute url
    if (s.startsWith("data:")) return true; // data URI
    return false;
  }

  if (!isValidImageSrc(imageUrl)) {
    imageUrl = null;
  }

  return (
    <Link href={`/catalogue/${product.id}`}>
      <article className={`cursor-pointer rounded-3xl p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md duration-200 ease-out ${backgroundClass}`}>
        {imageUrl && (
          <div className="mb-4 h-44 w-full overflow-hidden rounded-2xl bg-white">
            <Image src={imageUrl} alt={product.name || "product"} width={800} height={600} className="h-full w-full object-cover" loading="lazy" sizes="(max-width: 768px) 100vw, 33vw" />
          </div>
        )}

        <div className={`mb-4 inline-flex rounded-3xl px-4 py-3 text-sm font-semibold text-[#2d5a3d] ${visual.className}`}>
          {visual.label}
        </div>
        <h3 className="text-lg font-semibold text-[#1a1a1a]">{product.name}</h3>
        {product.description && <p className="mt-2 line-clamp-2 text-sm text-[#374151]">{product.description}</p>}
        <div className="mt-6 flex items-center justify-between gap-3 text-sm font-semibold text-[#2d5a3d]">
          <div className="flex flex-col">
            <span>{formatPrice(product.price)}</span>
            {showCompareAtPrice && product.compareAtPrice && (
              <span className="text-xs text-[#999] line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
            {/* stock tag */}
            <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium ${product.stock > 0 ? "bg-[#eef7ed] text-[#2d5a3d]" : "bg-red-100 text-red-700"}`}>
              {product.stock > 0 ? `En stock (${product.stock})` : "Rupture"}
            </span>
          </div>
          {product.brand?.name && <span className="rounded-full bg-[#eef3e8] px-3 py-1 text-xs">{product.brand.name}</span>}
        </div>
        {product.isOnSale && (
          <div className="mt-2 inline-flex items-center rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-800">{saleBadge}</div>
        )}
      </article>
    </Link>
  );
}
