"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export type BannerFormState = { error?: string; success?: boolean };

export async function createBannerAction(_prev: BannerFormState, formData: FormData): Promise<BannerFormState> {
  const session = await getAdminSession();
  if (!session) return { error: "Sessão expirada." };

  const imageDesktop = String(formData.get("imageDesktop") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const link = String(formData.get("link") ?? "").trim();

  if (!imageDesktop) return { error: "A imagem desktop é obrigatória." };

  try {
    const banner = await prisma.banner.create({
      data: { imageDesktop, title: title || null, link: link || null, order: 0 },
    });
    await prisma.adminAuditLog.create({
      data: { adminId: session.id, action: "CRIAR_BANNER", entity: "Banner", entityId: banner.id },
    });
  } catch {
    return { error: "Banco de dados não conectado. Configure DATABASE_URL para salvar banners." };
  }

  revalidatePath("/admin/banners");
  return { success: true };
}
