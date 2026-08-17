# Sua Marca — E-commerce (reconstrução de referência)

Loja completa em Next.js 16 + Prisma 7 + PostgreSQL, com painel admin, carrinho, checkout
via link de pagamento por produto e estrutura pronta para deploy na Vercel.

## Stack

- Next.js 16 (App Router, Turbopack)
- Tailwind CSS v4
- Prisma 7 + `@prisma/adapter-pg` (PostgreSQL)
- Zustand (carrinho/UI)
- Autenticação admin: JWT em cookie httpOnly + `proxy.ts` protegendo `/admin/*`

## Rodando localmente

```bash
npm install
cp .env.example .env
# preencha DATABASE_URL com um Postgres real (Neon, Vercel Postgres, Supabase, Prisma Postgres...)
npx prisma migrate dev --name init
npx prisma db seed   # ou: npm run db:seed
npm run dev
```

Login do admin demo criado pelo seed: `admin@suamarca.com` / `TrocarSenha123!` — **troque a senha
antes de ir para produção.**

## Estado atual

- Vitrine (home, catálogo, produto, carrinho) funciona **sem banco**, usando os dados demo de
  `lib/catalog.ts` — isso é intencional, para o site nunca quebrar sem `DATABASE_URL`.
- O painel `/admin` já lê e grava no Postgres via Prisma. Sem `DATABASE_URL` configurada, cada
  página mostra um aviso e continua funcionando em modo somente-leitura.
- O seed (`prisma/seed.ts`) importa o mesmo catálogo demo para o banco, então depois de rodá-lo
  o admin tem os mesmos produtos que aparecem no site.
- Checkout: cada produto tem um campo `checkoutUrl` (editável em `/admin/produtos/[slug]`) com o
  link de pagamento gerado pelo gateway. O carrinho aceita **um produto por vez** — ao clicar em
  "Finalizar Compra" o cliente é redirecionado para esse link.

## Variáveis de ambiente

Veja `.env.example`. As essenciais para o site funcionar:

- `DATABASE_URL` — Postgres (necessário para o admin)
- `AUTH_SECRET` — segredo para assinar o cookie de sessão do admin
- `NEXT_PUBLIC_SITE_URL` — usado no sitemap/robots/SEO

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Adicione as variáveis de ambiente do `.env.example` no painel do projeto.
3. Build command: `npm run build` (padrão). Após o primeiro deploy, rode as migrations:
   `npx prisma migrate deploy` (pode ser feito localmente apontando para o Postgres de produção,
   ou via um passo de CI).
4. Rode o seed uma vez contra o banco de produção se quiser os dados demo iniciais.

## Próximos passos sugeridos

- Conectar a vitrine (home/catálogo/produto) ao Prisma como fonte de dados primária, mantendo o
  catálogo estático como fallback de demonstração.
- Trocar os links de checkout fixos por integração via API do gateway (Mercado Pago Preferences)
  para suportar carrinho com múltiplos produtos.
- Substituir os placeholders de logo e "Featured In" pelos ativos reais da marca via
  `/admin/configuracoes` e `/admin/home`.
