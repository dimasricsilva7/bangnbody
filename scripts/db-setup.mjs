// Roda schema sync + seed no build da Vercel, sem nunca derrubar o build do Next.js.
// Usa "prisma db push" em vez de "migrate deploy": migrate usa um advisory lock
// (SELECT pg_advisory_lock) que ficou preso na primeira tentativa de migration que
// falhou no meio, e continuou travando tentativas seguintes mesmo via conexão direta.
// db push sincroniza o schema diretamente, sem depender dessa trava.
import { execSync } from "node:child_process";

function run(command, env) {
  execSync(command, { stdio: "inherit", env: { ...process.env, ...env } });
}

function main() {
  const pooledUrl = process.env.DATABASE_URL;

  if (!pooledUrl) {
    console.log("DATABASE_URL não configurada — pulando db push/seed, site roda em modo demo.");
    return;
  }

  const directUrl = process.env.DATABASE_URL_UNPOOLED ?? pooledUrl.replace("-pooler.", ".");

  try {
    run("npx prisma db push --accept-data-loss --skip-generate", { DATABASE_URL: directUrl });
    run("npx tsx prisma/seed.ts", { DATABASE_URL: pooledUrl });

    console.log("Banco sincronizado e populado com sucesso.");
  } catch (err) {
    console.error("Falha ao sincronizar/popular o banco — build continua em modo demo.", err.message);
  }
}

main();
