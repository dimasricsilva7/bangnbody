// Seed inicial — popula o banco com dados de demonstração (DEMO), claramente
// identificados como tal. Não usar em produção sem revisar preços e estoque reais.
import "dotenv/config";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import { products as catalogProducts, bundles as catalogBundles } from "../lib/catalog";
import { megaMenu } from "../lib/demo-data";

async function main() {
  console.log("Seeding banco de dados...");

  const adminPasswordHash = await bcrypt.hash("TrocarSenha123!", 10);
  const admin = await prisma.admin.upsert({
    where: { email: "admin@suamarca.com" },
    update: {},
    create: {
      name: "Administrador Demo",
      email: "admin@suamarca.com",
      passwordHash: adminPasswordHash,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Admin: admin@suamarca.com / TrocarSenha123! (id ${admin.id})`);

  const categoryLinks = megaMenu.loja.columns[0].links.filter((l) => l.href.startsWith("/categoria/"));
  for (const [order, link] of categoryLinks.entries()) {
    const slug = link.href.replace("/categoria/", "");
    await prisma.category.upsert({
      where: { slug },
      update: { name: link.label, order },
      create: { slug, name: link.label, order },
    });
  }

  for (const p of catalogProducts) {
    const mainSize = p.sizes[0];
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        name: p.name,
        slug: p.slug,
        subtitle: p.subtitle,
        shortDescription: p.description,
        description: p.description,
        howToUse: p.howToUse,
        price: mainSize.price,
        compareAtPrice: mainSize.compareAtPrice,
        sku: mainSize.sku,
        stock: 100,
        minStock: 10,
        bestSeller: p.badge === "MAIS_VENDIDO",
        preOrder: p.badge === "PRE_VENDA",
        limitedEdition: p.badge === "EDICAO_LIMITADA",
        refillable: p.badge === "REFIL",
        images: { create: p.gallery.map((url, order) => ({ url, order, isPrimary: order === 0 })) },
        variants: {
          create: p.sizes.map((s, order) => ({
            name: s.label,
            sku: s.sku,
            price: s.price,
            compareAtPrice: s.compareAtPrice,
            stock: 100,
            order,
          })),
        },
      },
    });
  }

  for (const b of catalogBundles) {
    await prisma.bundle.upsert({
      where: { slug: b.slug },
      update: {},
      create: {
        name: b.name,
        slug: b.slug,
        description: b.description,
        price: b.price,
        compareAtPrice: b.compareAtPrice,
        stock: 50,
      },
    });
  }

  const sections = [
    "hero",
    "promo-blocks",
    "best-sellers",
    "promo-banner",
    "bundles",
    "featured-in",
    "routine",
    "reviews",
    "discover-more",
    "brand-values",
    "instagram",
    "newsletter",
  ];
  for (const [order, key] of sections.entries()) {
    await prisma.homepageSection.upsert({
      where: { key },
      update: {},
      create: { key, enabled: true, order },
    });
  }

  console.log("Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
