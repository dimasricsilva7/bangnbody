"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, ADMIN_COOKIE } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "Preencha e-mail e senha." };

  let admin;
  try {
    admin = await prisma.admin.findUnique({ where: { email } });
  } catch {
    return {
      error:
        "Banco de dados não configurado. Adicione DATABASE_URL nas variáveis de ambiente e rode o seed antes de fazer login.",
    };
  }

  if (!admin || !admin.active) return { error: "E-mail ou senha inválidos." };

  const valid = await bcrypt.compare(password, admin.passwordHash);
  if (!valid) return { error: "E-mail ou senha inválidos." };

  const token = signSession({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  await prisma.adminAuditLog.create({
    data: { adminId: admin.id, action: "LOGIN", entity: "Admin", entityId: admin.id },
  });

  redirect("/admin/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
