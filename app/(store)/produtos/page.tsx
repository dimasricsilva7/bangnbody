import type { Metadata } from "next";
import { catalog } from "@/lib/catalog";
import { CatalogGrid } from "@/components/catalog/CatalogGrid";

export const metadata: Metadata = {
  title: "Todos os Produtos | Sua Marca",
  description: "Explore toda a linha de skincare natural firmadora e iluminadora.",
};

export default function ProdutosPage() {
  return (
    <main className="mx-auto max-w-[1400px] px-4 py-10 md:px-8">
      <CatalogGrid items={catalog} title="Todos os Produtos" />
    </main>
  );
}
