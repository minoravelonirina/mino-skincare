import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🧹 Nettoyage de la base...");

  await prisma.review.deleteMany();
  await prisma.shipment.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.user.deleteMany();

  console.log("✅ Base nettoyée");
  console.log("🌱 Insertion des données de test...");

  // ─── Catégories ─────────────────────────────────────────────
  const categoryVisage = await prisma.category.create({
    data: { name: "Soins du visage", slug: "soins-du-visage", description: "Nettoyants, crèmes et sérums pour le visage" },
  });
  const categoryMaquillage = await prisma.category.create({
    data: { name: "Maquillage", slug: "maquillage", description: "Fond de teint, rouges à lèvres et produits de beauté" },
  });
  const categoryCapillaires = await prisma.category.create({
    data: { name: "Soins capillaires", slug: "soins-capillaires", description: "Shampoings, après-shampoings et masques" },
  });
  const categoryCorps = await prisma.category.create({
    data: { name: "Soins du corps", slug: "soins-du-corps", description: "Crèmes hydratantes et soins corporels" },
  });

  // ─── Marques ────────────────────────────────────────────────
  const brandCeraVe = await prisma.brand.create({
    data: {
      name: "CeraVe",
      description: "Marque dermatologique connue pour ses produits enrichis en céramides.",
      logo: "cerave.png",
      website: "https://www.cerave.com",
    },
  });
  const brandEucerin = await prisma.brand.create({
    data: {
      name: "Eucerin",
      description: "Marque allemande reconnue pour ses produits dermatologiques.",
      logo: "eucerin.png",
      website: "https://www.eucerin.com",
    },
  });
  const brandNeutrogena = await prisma.brand.create({
    data: {
      name: "Neutrogena",
      description: "Marque offrant une large gamme de produits pour tous types de peau.",
      logo: "neutrogena.png",
      website: "https://www.neutrogena.com",
    },
  });

  // ─── Produits ───────────────────────────────────────────────
  const product1 = await prisma.product.create({
    data: {
      name: "Hydrating Facial Cleanser",
      description: "Nettoyant doux pour peaux normales à sèches.",
      price: 12.99,
      compareAtPrice: 15.99,
      costPrice: 8.0,
      sku: "CER-CL-001",
      stock: 100,
      isActive: true,
      isFeatured: true,
      isOnSale: false,
      weight: 355,
      dimensions: JSON.stringify([15, 5, 5]),
      tags: JSON.stringify(["cleanser", "hydration"]),
      images: JSON.stringify(["/images/products/Hydration Cream.webp"]),
      skinType: "dry, normal",
      ingredients: "céramides, acide hyaluronique",
      usage: "Appliquer matin et soir sur peau humide.",
      benefits: "Hydrate et nettoie sans agresser la peau",
      categoryId: categoryVisage.id,
      brandId: brandCeraVe.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Moisturizing Cream",
      description: "Crème hydratante riche pour peaux sèches.",
      price: 14.99,
      compareAtPrice: 18.99,
      costPrice: 9.0,
      sku: "CER-MO-002",
      stock: 80,
      isActive: true,
      isFeatured: true,
      isOnSale: false,
      weight: 340,
      dimensions: JSON.stringify([10, 10, 5]),
      tags: JSON.stringify(["moisturizer"]),
      images: JSON.stringify(["/images/products/Moisturizing Crème.webp"]),
      skinType: "dry",
      ingredients: "céramides, glycérine",
      usage: "Appliquer après nettoyage matin et soir.",
      benefits: "Répare la barrière cutanée",
      categoryId: categoryVisage.id,
      brandId: brandCeraVe.id,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: "Foaming Facial Cleanser",
      description: "Nettoyant moussant pour peaux grasses.",
      price: 13.99,
      compareAtPrice: 16.99,
      costPrice: 8.5,
      sku: "CER-CL-003",
      stock: 120,
      isActive: true,
      isFeatured: false,
      isOnSale: true,
      weight: 355,
      dimensions: JSON.stringify([15, 5, 5]),
      tags: JSON.stringify(["cleanser", "oily"]),
      images: JSON.stringify(["/images/products/Professional Grade.webp"]),
      skinType: "oily",
      ingredients: "niacinamide, céramides",
      usage: "Matin et soir.",
      benefits: "Réduit l'excès de sébum",
      categoryId: categoryVisage.id,
      brandId: brandCeraVe.id,
    },
  });

  const product4 = await prisma.product.create({
    data: {
      name: "Sun Face Fluid SPF50+",
      description: "Fluide solaire haute protection pour le visage.",
      price: 19.99,
      compareAtPrice: 24.99,
      costPrice: 12.0,
      sku: "EUC-SUN-001",
      stock: 60,
      isActive: true,
      isFeatured: true,
      isOnSale: true,
      weight: 50,
      dimensions: JSON.stringify([4, 4, 11]),
      tags: JSON.stringify(["spf", "sun", "protection"]),
      images: JSON.stringify(["/images/products/Fond De Teint Éclat.webp"]),
      skinType: "all",
      ingredients: "filtres UV, vitamine E",
      usage: "Appliquer généreusement avant exposition.",
      benefits: "Protège des UVA et UVB",
      categoryId: categoryVisage.id,
      brandId: brandEucerin.id,
    },
  });

  const product5 = await prisma.product.create({
    data: {
      name: "Hydro Boost Water Gel",
      description: "Gel hydratant léger à l'acide hyaluronique.",
      price: 17.49,
      compareAtPrice: 20.99,
      costPrice: 10.5,
      sku: "NEU-HB-001",
      stock: 90,
      isActive: true,
      isFeatured: true,
      isOnSale: false,
      weight: 48,
      dimensions: JSON.stringify([5, 5, 12]),
      tags: JSON.stringify(["hydration", "gel"]),
      images: JSON.stringify(["/images/products/Rare Beauty Blush.webp"]),
      skinType: "normal, combination",
      ingredients: "acide hyaluronique, glycérine",
      usage: "Appliquer matin et soir sur peau propre.",
      benefits: "Hydrate intensément sans effet gras",
      categoryId: categoryVisage.id,
      brandId: brandNeutrogena.id,
    },
  });

  const product6 = await prisma.product.create({
    data: {
      name: "Gentle Hydrating Shampoo",
      description: "Shampoing doux sans sulfates pour tous types de cheveux.",
      price: 11.99,
      compareAtPrice: 14.99,
      costPrice: 6.5,
      sku: "CER-SH-001",
      stock: 140,
      isActive: true,
      isFeatured: false,
      isOnSale: false,
      weight: 400,
      dimensions: JSON.stringify([8, 8, 18]),
      tags: JSON.stringify(["shampoo", "hair"]),
      images: JSON.stringify(["/images/products/Hair care.webp"]),
      skinType: "all",
      ingredients: "céramides, panthénol",
      usage: "Massage sur cuir chevelu humide, rincer.",
      benefits: "Nettoie en douceur sans dessécher",
      categoryId: categoryCapillaires.id,
      brandId: brandCeraVe.id,
    },
  });

  // ─── Utilisateurs ───────────────────────────────────────────
  const adminPassword = await bcrypt.hash("admin123", 10);
  const customerPassword = await bcrypt.hash("customer123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@mino.com",
      password: adminPassword,
      firstName: "Admin",
      lastName: "Mino",
      phone: "+261340000000",
      role: "ADMIN",
      addresses: {
        create: [
          {
            type: "shipping",
            street: "10 Rue de la Beauté",
            city: "Antananarivo",
            state: "Analamanga",
            postalCode: "101",
            country: "Madagascar",
            isDefault: true,
          },
        ],
      },
    },
  });

  const customer = await prisma.user.create({
    data: {
      email: "customer@mino.com",
      password: customerPassword,
      firstName: "Customer",
      lastName: "Test",
      phone: "+261341111111",
      role: "CUSTOMER",
      addresses: {
        create: {
          type: "shipping",
          street: "25 Avenue de la Liberté",
          city: "Toamasina",
          state: "Atsinanana",
          postalCode: "501",
          country: "Madagascar",
          isDefault: true,
        },
      },
    },
  });

  // ─── Panier (customer) ──────────────────────────────────────
  await prisma.cartItem.create({
    data: { userId: customer.id, productId: product1.id, quantity: 2 },
  });
  await prisma.cartItem.create({
    data: { userId: customer.id, productId: product4.id, quantity: 1 },
  });

  // ─── Avis ───────────────────────────────────────────────────
  await prisma.review.create({
    data: {
      userId: customer.id,
      productId: product1.id,
      rating: 5,
      title: "Excellent nettoyant",
      comment: "Ma peau est nettoyée sans tiraillements. Je recommande !",
      isVerified: true,
    },
  });
  await prisma.review.create({
    data: {
      userId: customer.id,
      productId: product2.id,
      rating: 4,
      title: "Très hydratante",
      comment: "Bonne crème, mais un peu riche pour ma peau mixte.",
      isVerified: true,
    },
  });
  await prisma.review.create({
    data: {
      userId: admin.id,
      productId: product5.id,
      rating: 5,
      title: "Parfait pour l'été",
      comment: "Seau léger et efficace, la peau reste hydratée toute la journée.",
      isVerified: true,
    },
  });

  // ─── Commande (customer) ────────────────────────────────────
  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      orderNumber: "MINO-2026-0001",
      status: "DELIVERED",
      totalAmount: 45.97,
      taxAmount: 4.2,
      shippingAmount: 5.0,
      discountAmount: 0,
      notes: "Commande de test livrée",
      billingAddress: { street: "25 Avenue de la Liberté", city: "Toamasina", country: "Madagascar" },
      shippingAddress: { street: "25 Avenue de la Liberté", city: "Toamasina", country: "Madagascar" },
      orderItems: {
        create: [
          { productId: product1.id, quantity: 2, price: 12.99, total: 25.98 },
          { productId: product2.id, quantity: 1, price: 19.99, total: 19.99 },
        ],
      },
      payments: {
        create: {
          amount: 45.97,
          method: "CASH_ON_DELIVERY",
          status: "COMPLETED",
          transactionId: "TXN-TEST-001",
          paymentDate: new Date(),
        },
      },
      shipments: {
        create: {
          trackingNumber: "TRK-TEST-001",
          carrier: "Colis Express",
          status: "DELIVERED",
          shippedAt: new Date(Date.now() - 86400000),
          deliveredAt: new Date(),
          estimatedDelivery: new Date(),
        },
      },
    },
  });

  console.log("✅ Seed terminé avec succès");
  console.log("─────────────────────────────────────────────");
  console.log("👤 Utilisateurs de test :");
  console.log(`   Admin    → admin@mino.com     / admin123`);
  console.log(`   Customer → customer@mino.com  / customer123`);
  console.log(`   Commande → ${order.orderNumber}`);
  console.log("─────────────────────────────────────────────");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
