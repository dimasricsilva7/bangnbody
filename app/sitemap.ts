import type { MetadataRoute } from "next";
import { catalog } from "@/lib/catalog";
import { categoryDefs } from "@/lib/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticRoutes = ["", "/produtos", "/rotina"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));

  const categoryRoutes = categoryDefs.map((c) => ({
    url: `${base}/categoria/${c.slug}`,
    lastModified: new Date(),
  }));

  const productRoutes = catalog.map((item) => ({
    url: `${base}/produto/${item.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
