"use client";

import { useTransition } from "react";
import { toggleSectionAction } from "@/actions/homepage";

export function SectionToggle({ sectionId, enabled }: { sectionId: string; enabled: boolean }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => toggleSectionAction(sectionId, !enabled))}
      className={`rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wide transition-colors ${
        enabled ? "bg-ink text-white" : "bg-border-soft text-ink-soft"
      }`}
    >
      {enabled ? "Ativa" : "Inativa"}
    </button>
  );
}
