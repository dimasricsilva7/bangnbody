"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export async function toggleSectionAction(sectionId: string, enabled: boolean) {
  const session = await getAdminSession();
  if (!session) return;

  try {
    await prisma.homepageSection.update({ where: { id: sectionId }, data: { enabled } });
    await prisma.adminAuditLog.create({
      data: { adminId: session.id, action: "ALTERAR_SECAO_HOME", entity: "HomepageSection", entityId: sectionId },
    });
  } catch {
    // Banco não conectado — no-op silencioso, a UI já mostra o banner de aviso.
  }

  revalidatePath("/admin/home");
}
