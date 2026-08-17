// Roda migrations + seed no build da Vercel, sem nunca derrubar o build do Next.js.
// Usa a conexão direta (sem pgbouncer) para migrate, porque o advisory lock do
// Prisma Migrate não funciona de forma confiável sobre pooling em modo transação.
import { execSync } from "node:child_process";

const MIGRATION_NAME = "20260817000000_init";

function run(command, env) {
  execSync(command, { stdio: "inherit", env: { ...process.env, ...env } });
}

function main() {
  const pooledUrl = process.env.DATABASE_URL;

  if (!pooledUrl) {
    console.log("DATABASE_URL não configurada — pulando migrate/seed, site roda em modo demo.");
    return;
  }

  const directUrl = process.env.DATABASE_URL_UNPOOLED ?? pooledUrl.replace("-pooler.", ".");

  try {
    try {
      run(`npx prisma migrate resolve --rolled-back ${MIGRATION_NAME}`, { DATABASE_URL: directUrl });
    } catch {
      // Sem migração travada para resolver — segue normalmente.
    }

    run("npx prisma migrate deploy", { DATABASE_URL: directUrl });
    run("npx tsx prisma/seed.ts", { DATABASE_URL: pooledUrl });

    console.log("Banco migrado e populado com sucesso.");
  } catch (err) {
    console.error("Falha ao migrar/popular o banco — build continua em modo demo.", err.message);
  }
}

main();
