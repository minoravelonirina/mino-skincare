import Link from "next/link";
import Image from "next/image";
import { getCategoryVisual, formatPrice, getProductImage, placeholderProductImage } from "@/lib/home";
import { getLocaleFromPath } from "intlayer";
export default async function ProductCard({ product, saleBadge, showCompareAtPrice = false, variant = "default", viewDetails, inStock, outOfStock }: any) {
  const locale = await getLocaleFromPath()
  const visual = getCategoryVisual(product.category?.name);
  const isCompact = variant === "compact";

  const imageUrl = getProductImage(product.images) ?? placeholderProductImage;

  return (
    <Link href={`/${locale}/catalogue/${product.id}`}>
      <article className={`group relative cursor-pointer overflow-hidden rounded-3xl transition-all duration-500 ${
        isCompact
          ? "bg-white ring-1 ring-[#e8e4dc] hover:ring-[#2d5a3d]/30 hover:shadow-xl hover:shadow-[#2d5a3d]/5"
          : "bg-white ring-1 ring-[#e8e4dc] hover:ring-[#2d5a3d]/30 hover:shadow-xl hover:shadow-[#2d5a3d]/5"
      }`}>
        <div className={`relative overflow-hidden ${isCompact ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.name || "product"}
              width={800}
              height={600}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          
          <div className={`absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider ${
            visual.className
          }`}>
            {visual.label}
          </div>

          {product.isOnSale && (
            <div className="absolute top-4 right-4 inline-flex items-center rounded-full bg-[#c44d4d] px-3 py-1.5 text-[11px] font-semibold text-white shadow-lg">
              {saleBadge}
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-[12px] font-medium text-[#2d5a3d] shadow-lg backdrop-blur-sm">
              {viewDetails ?? "View Details"}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-3 flex items-start justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-[#1a1a1a] transition-colors duration-300 group-hover:text-[#2d5a3d]">
              {product.name}
            </h3>
            {product.brand?.name && (
              <span className="flex-shrink-0 rounded-full bg-[#f8f6f3] px-2.5 py-1 text-[10px] font-medium text-[#888]">
                {product.brand.name}
              </span>
            )}
          </div>
          
          {product.description && (
            <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-[#888]">
              {product.description}
            </p>
          )}

          <div className="flex items-end justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-[18px] font-semibold text-[#2d5a3d]">
                {formatPrice(product.price)}
              </span>
              {showCompareAtPrice && product.compareAtPrice && (
                <span className="text-[13px] text-[#bbb] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>
            
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
              product.stock > 0 
                ? "bg-[#eef7ed] text-[#2d5a3d]" 
                : "bg-red-50 text-red-600"
            }`}>
              {product.stock > 0 ? inStock ?? "In stock" : outOfStock ?? "Out of stock"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
