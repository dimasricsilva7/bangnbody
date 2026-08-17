import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/db-safe";
import { DbBanner } from "@/components/admin/DbBanner";
import { SectionToggle } from "@/components/admin/SectionToggle";

const defaultSections = [
  "Cart Drawer",
  "Header",
  "Hero",
  "Blocos Promocionais",
  "Trust Bar",
  "Mais Vendidos",
  "Banner Promocional",
  "Kits e Ofertas",
  "Featured In",
  "Rotina",
  "Avaliações",
  "Descubra Mais",
  "Benefícios",
  "Instagram",
  "Newsletter",
];

export default async function AdminHomePage() {
  const { data: sections, connected } = await safeQuery(
    () => prisma.homepageSection.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <h1 className="mb-2 text-xl font-semibold uppercase tracking-wide text-ink">Home</h1>
      <p className="mb-6 text-[13px] text-ink-soft">Ative, desative e reordene as seções da homepage.</p>
      <DbBanner connected={connected} />

      <div className="overflow-hidden rounded-xl border border-border-soft bg-white">
        {connected && sections.length > 0
          ? sections.map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between border-b border-border-soft px-5 py-4 last:border-none"
              >
                <div>
                  <p className="text-[13px] font-medium text-ink">{section.title ?? section.key}</p>
                  <p className="text-[11px] text-ink-soft">Ordem: {section.order}</p>
                </div>
                <SectionToggle sectionId={section.id} enabled={section.enabled} />
              </div>
            ))
          : defaultSections.map((label, i) => (
              <div
                key={label}
                className="flex items-center justify-between border-b border-border-soft px-5 py-4 last:border-none"
              >
                <div>
                  <p className="text-[13px] font-medium text-ink">{label}</p>
                  <p className="text-[11px] text-ink-soft">Ordem: {i + 1}</p>
                </div>
                <span className="rounded-full bg-cream px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide text-ink">
                  Padrão
                </span>
              </div>
            ))}
      </div>
    </div>
  );
}
