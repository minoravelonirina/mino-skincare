import prisma from "@/lib/prisma";

export const categoryVisuals = [
  { label: "VIS", className: "bg-[#eef3e8]" },
  { label: "COR", className: "bg-[#f5ede4]" },
  { label: "MAQ", className: "bg-[#e8eef5]" },
  { label: "CAP", className: "bg-[#f5eee4]" },
] as const;

export const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

export async function getCategories() {
  return prisma.category.findMany({
    include: {
      _count: {
        select: { products: { where: { isActive: true } } },
      },
    },
    orderBy: { name: "asc" },
  });
}

export async function getFeaturedProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    include: {
      brand: true,
      category: true,
    },
    take: 4,
    orderBy: { createdAt: "desc" },
  });
}

export async function getOtherProducts() {
  return prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: false,
    },
    include: {
      brand: true,
      category: true,
    },
    take: 2,
    orderBy: { createdAt: "desc" },
  });
}

export async function getReviews() {
  return prisma.review.findMany({
    where: {
      isVerified: true,
    },
    include: {
      user: true,
      product: true,
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });
}

export type CategoryWithCount = Awaited<ReturnType<typeof getCategories>>[number];
export type ProductWithRelations = Awaited<ReturnType<typeof getFeaturedProducts>>[number];
export type ReviewWithRelations = Awaited<ReturnType<typeof getReviews>>[number];

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

export function getCategoryVisual(categoryName?: string | null) {
  const categoryIndexByName: Record<string, number> = {
    "Soins du visage": 0,
    "Soins du corps": 1,
    Maquillage: 2,
    "Soins capillaires": 3,
  };

  const index = categoryName ? categoryIndexByName[categoryName] : undefined;
  return categoryVisuals[index ?? 0];
}
