/** Executa uma query Prisma; se o banco não estiver configurado, retorna o fallback em vez de derrubar a página. */
export async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<{ data: T; connected: boolean }> {
  try {
    const data = await query();
    return { data, connected: true };
  } catch {
    return { data: fallback, connected: false };
  }
}
