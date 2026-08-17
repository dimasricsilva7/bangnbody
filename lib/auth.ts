import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET ?? "dev-secret-change-me";

export type AdminSession = {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "ADMIN" | "EDITOR";
};

export function signSession(session: AdminSession): string {
  return jwt.sign(session, SECRET, { expiresIn: "7d" });
}

export function verifySession(token: string): AdminSession | null {
  try {
    return jwt.verify(token, SECRET) as AdminSession;
  } catch {
    return null;
  }
}

export const ADMIN_COOKIE = "bnb_admin_session";

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return token ? verifySession(token) : null;
}
