"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

export type ProductFormState = { error?: string; success?: boolean };

export async function updateProductAction(
  productId: string,
  _prev: ProductFormState,
  formData: FormData
): Promise<ProductFormState> {
  const session = await getAdminSession();
  if (!session) return { error: "Sessão expirada. Faça login novamente." };

  const checkoutUrl = String(formData.get("checkoutUrl") ?? "").trim();
  const price = Number(formData.get("price"));
  const compareAtPrice = formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : null;
  const stock = Number(formData.get("stock"));
  const status = String(formData.get("status") ?? "ATIVO") as "ATIVO" | "INATIVO" | "ARQUIVADO";

  if (checkoutUrl && !/^https?:\/\//.test(checkoutUrl)) {
    return { error: "O link de checkout precisa começar com http:// ou https://" };
  }

  try {
    const current = await prisma.product.findUniqueOrThrow({ where: { id: productId } });

    if (Number(current.price) !== price) {
      await prisma.priceHistory.create({
        data: { productId, oldPrice: current.price, newPrice: price, adminId: session.id },
      });
    }

    await prisma.product.update({
      where: { id: productId },
      data: { checkoutUrl: checkoutUrl || null, price, compareAtPrice, stock, status },
    });

    await prisma.adminAuditLog.create({
      data: { adminId: session.id, action: "EDITAR_PRODUTO", entity: "Product", entityId: productId },
    });
  } catch {
    return { error: "Banco de dados não conectado. Configure DATABASE_URL para salvar alterações." };
  }

  revalidatePath("/admin/produtos");
  return { success: true };
}
