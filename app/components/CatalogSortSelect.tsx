"use client";

import { useRouter, usePathname } from "next/navigation";

interface CatalogSortSelectProps {
  value: string;
  search?: string;
  category?: string;
  labels: {
    default: string;
    priceAsc: string;
    priceDesc: string;
    newest: string;
    popular: string;
  };
}

const SORT_VALUES = ["relevance", "price_asc", "price_desc", "newest", "popular"] as const;

export default function CatalogSortSelect({
  value,
  search,
  category,
  labels,
}: CatalogSortSelectProps) {
  const router = useRouter();
  const pathname = usePathname();

  const applySort = (sort: string) => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (sort && sort !== "relevance") params.set("sort", sort);
    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  };

  return (
    <select
      value={SORT_VALUES.includes(value as (typeof SORT_VALUES)[number]) ? value : "relevance"}
      onChange={(event) => applySort(event.target.value)}
      className="rounded-xl border border-[#e8e4dc] bg-white px-4 py-2 text-sm outline-none focus:border-chocolate"
    >
      <option value="relevance">{labels.default}</option>
      <option value="price_asc">{labels.priceAsc}</option>
      <option value="price_desc">{labels.priceDesc}</option>
      <option value="newest">{labels.newest}</option>
      <option value="popular">{labels.popular}</option>
    </select>
  );
}