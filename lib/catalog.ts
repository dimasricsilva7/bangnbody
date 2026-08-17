// Catálogo completo (DEMO) — estrutura, preços e variantes espelham o catálogo real
// do site de referência (traduzido para PT-BR/BRL). Textos de descrição são originais,
// não traduções literais da copy de marketing do site de referência.
// Editável via /admin > Produtos e /admin > Bundles.

import type { DemoBadge } from "@/lib/demo-data";

const img = (seed: string, w = 900, h = 1125) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export type Fragrance = "Tropical" | "Sem Fragrância" | "Café" | "Goiaba";

export type ProductVariant = {
  label: string;
  price: number;
  compareAtPrice: number;
  sku: string;
};

export type CatalogProduct = {
  kind: "produto";
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  fragrance: Fragrance;
  badge?: DemoBadge;
  reviewCount: number;
  image: string;
  gallery: string[];
  sizes: ProductVariant[];
  description: string;
  benefits: string[];
  howToUse: string;
  ingredients: { name: string; description: string }[];
};

export type CatalogBundle = {
  kind: "kit";
  slug: string;
  name: string;
  subtitle: string;
  fragrance: Fragrance;
  badge?: DemoBadge;
  reviewCount: number;
  price: number;
  compareAtPrice: number;
  image: string;
  gallery: string[];
  description: string;
  includes: string[];
};

export type CatalogItem = CatalogProduct | CatalogBundle;

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const galleryFor = (seed: string) => [img(seed), img(seed, 900, 1125), img(seed, 700, 875)];

// ── PRODUTOS INDIVIDUAIS ─────────────────────────────────────────────

export const products: CatalogProduct[] = [
  {
    kind: "produto",
    slug: "locao-firmadora",
    name: "Loção Firmadora",
    subtitle: "Hidratante Firmador para Rosto e Corpo",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 5413,
    image: img("photo-1556228578-8c89e6adf883"),
    gallery: galleryFor("photo-1556228578-8c89e6adf883"),
    sizes: [
      { label: "150ml", price: 105, compareAtPrice: 150, sku: "LF-150" },
      { label: "400ml (Jumbo)", price: 210, compareAtPrice: 300, sku: "LF-400" },
      { label: "Refil 400ml", price: 206, compareAtPrice: 294, sku: "LF-400-R" },
    ],
    description:
      "Um hidratante multifuncional para rosto e corpo, criado para firmar, hidratar e nutrir a pele profundamente. Textura leve, de absorção rápida e sem oleosidade.",
    benefits: [
      "Firma e tonifica a pele com uso contínuo",
      "Hidratação profunda sem sensação oleosa",
      "Ajuda a reduzir a aparência de estrias e cicatrizes",
      "Pode ser usado no rosto, corpo e mãos",
    ],
    howToUse:
      "Aplique no corpo todo pela manhã e à noite para hidratação instantânea. Para áreas de atenção, use duas vezes ao dia com movimentos circulares até absorção completa.",
    ingredients: [
      {
        name: "Extrato de Grão de Café Verde",
        description:
          "Ingrediente fito-ativo com propriedades anti-inflamatórias que ajuda a reduzir vermelhidão e apoiar a circulação, contribuindo para firmar e tonificar a pele.",
      },
      {
        name: "Óleo de Jojoba",
        description: "Similar aos óleos naturais da pele, ajuda a equilibrar a hidratação sem obstruir os poros.",
      },
      {
        name: "Extrato de Abacaxi",
        description: "Rico em enzimas que auxiliam na renovação suave da textura da pele.",
      },
      {
        name: "Manteiga de Karité",
        description: "Nutre profundamente e ajuda a restaurar a barreira de hidratação da pele.",
      },
    ],
  },
  {
    kind: "produto",
    slug: "oleo-firmador",
    name: "Óleo Firmador",
    subtitle: "Óleo Corporal Multifuncional",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 753,
    image: img("photo-1620916566398-39f1143ab7be"),
    gallery: galleryFor("photo-1620916566398-39f1143ab7be"),
    sizes: [
      { label: "100ml", price: 149, compareAtPrice: 213, sku: "OF-100" },
      { label: "Refil 100ml", price: 136, compareAtPrice: 194, sku: "OF-100-R" },
    ],
    description:
      "Óleo seco de rápida absorção que devolve elasticidade e brilho saudável à pele, sem deixar resíduo oleoso.",
    benefits: ["Absorção rápida, toque seco", "Realça o brilho natural da pele", "Ajuda a firmar áreas de flacidez"],
    howToUse: "Aplique algumas gotas na pele levemente úmida após o banho, massageando até a absorção completa.",
    ingredients: [
      { name: "Óleo de Girassol", description: "Rico em vitamina E, ajuda a proteger e suavizar a pele." },
      { name: "Óleo de Abacate", description: "Nutre profundamente e melhora a elasticidade da pele." },
    ],
  },
  {
    kind: "produto",
    slug: "oleo-firmador-com-brilho",
    name: "Óleo Firmador com Brilho",
    subtitle: "Óleo Iluminador Multifuncional",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 753,
    image: img("photo-1571781926291-c477ebfd024b"),
    gallery: galleryFor("photo-1571781926291-c477ebfd024b"),
    sizes: [{ label: "100ml", price: 158, compareAtPrice: 225, sku: "OFB-100" }],
    description: "A mesma fórmula do nosso Óleo Firmador, com um leve toque iluminador para um brilho natural na pele.",
    benefits: ["Brilho natural sem glitter", "Absorção rápida", "Realça o tom da pele"],
    howToUse: "Aplique nas áreas que deseja destacar: colo, pernas, ombros e clavículas.",
    ingredients: [{ name: "Micropartículas Iluminadoras", description: "Refletem a luz para um brilho natural e sutil." }],
  },
  {
    kind: "produto",
    slug: "sabonete-cremoso-firmador",
    name: "Sabonete Cremoso Firmador",
    subtitle: "Limpeza Suave para Corpo",
    category: "Limpeza e Esfoliação",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 99,
    image: img("photo-1556228720-195a672e8a03"),
    gallery: galleryFor("photo-1556228720-195a672e8a03"),
    sizes: [
      { label: "250ml", price: 83, compareAtPrice: 119, sku: "SCF-250" },
      { label: "Refil 250ml", price: 75, compareAtPrice: 106, sku: "SCF-250-R" },
    ],
    description: "Sabonete cremoso que limpa sem ressecar, preparando a pele para os próximos passos da rotina.",
    benefits: ["Limpeza suave, sem ressecar", "Espuma cremosa", "Prepara a pele para hidratação"],
    howToUse: "Aplique no banho, massageando suavemente, e enxágue.",
    ingredients: [{ name: "Glicerina Vegetal", description: "Atrai e retém a hidratação natural da pele." }],
  },
  {
    kind: "produto",
    slug: "locao-firmadora-iluminadora",
    name: "Loção Firmadora Iluminadora",
    subtitle: "Hidratante com Brilho Natural",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 671,
    image: img("photo-1608248543803-ba4f8c70ae0b"),
    gallery: galleryFor("photo-1608248543803-ba4f8c70ae0b"),
    sizes: [{ label: "150ml", price: 123, compareAtPrice: 175, sku: "LFI-150" }],
    description: "Combina o poder firmador da nossa loção clássica com micropartículas que iluminam suavemente a pele.",
    benefits: ["Firma e ilumina em um só passo", "Toque seco", "Brilho natural, sem glitter"],
    howToUse: "Aplique diariamente no corpo, com atenção às áreas que deseja destacar.",
    ingredients: [{ name: "Micropartículas Iluminadoras", description: "Refletem a luz para um brilho natural." }],
  },
  {
    kind: "produto",
    slug: "locao-firmadora-autobronzeadora-gradual",
    name: "Loção Firmadora Autobronzeadora Gradual",
    subtitle: "Bronzeado Gradual + Firmeza",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 467,
    image: img("photo-1598452963314-b09f397a5c48"),
    gallery: galleryFor("photo-1598452963314-b09f397a5c48"),
    sizes: [
      { label: "150ml", price: 114, compareAtPrice: 163, sku: "LFAG-150" },
      { label: "400ml (Jumbo)", price: 202, compareAtPrice: 288, sku: "LFAG-400" },
      { label: "Refil 150ml", price: 105, compareAtPrice: 150, sku: "LFAG-150-R" },
    ],
    description: "Constrói um bronzeado gradual e natural enquanto firma e hidrata a pele — sem manchas, sem odor forte.",
    benefits: ["Bronzeado gradual e uniforme", "Firma enquanto bronzeia", "Aplicação com luvas facilita o uso"],
    howToUse: "Aplique uma camada fina diariamente até atingir o tom desejado; depois, use 1-2x por semana para manutenção.",
    ingredients: [{ name: "DHA de Origem Vegetal", description: "Reage com a camada superficial da pele para criar o bronzeado." }],
  },
  {
    kind: "produto",
    slug: "essencia-de-leite-firmadora",
    name: "Essência de Leite Firmadora",
    subtitle: "Sérum Leve Multiuso",
    category: "Séruns e Máscaras",
    fragrance: "Tropical",
    reviewCount: 49,
    image: img("photo-1598452963314-b09f397a5c48"),
    gallery: galleryFor("photo-1598452963314-b09f397a5c48"),
    sizes: [{ label: "120ml", price: 96, compareAtPrice: 138, sku: "ELF-120" }],
    description: "Textura leve tipo leite que hidrata rapidamente sem pesar, ideal para dias quentes ou pele oleosa.",
    benefits: ["Textura ultraleve", "Hidratação rápida", "Não obstrui os poros"],
    howToUse: "Aplique no corpo após o banho, sobre a pele ainda levemente úmida.",
    ingredients: [{ name: "Ácido Hialurônico", description: "Atrai e retém água na pele para hidratação duradoura." }],
  },
  {
    kind: "produto",
    slug: "nevoa-de-leite-firmadora",
    name: "Névoa de Leite Firmadora",
    subtitle: "Bruma Hidratante Corporal",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    reviewCount: 46,
    image: img("photo-1608571423902-eed4a5ad8108"),
    gallery: galleryFor("photo-1608571423902-eed4a5ad8108"),
    sizes: [{ label: "150ml", price: 92, compareAtPrice: 131, sku: "NLF-150" }],
    description: "Uma bruma refrescante que pode ser borrifada a qualquer hora do dia para hidratação extra e um leve perfume.",
    benefits: ["Refrescância instantânea", "Fácil de levar na bolsa", "Hidrata sem precisar espalhar"],
    howToUse: "Borrife a 20cm de distância da pele sempre que precisar de um refresco de hidratação.",
    ingredients: [{ name: "Água de Coco", description: "Hidrata e refresca a pele naturalmente." }],
  },
  {
    kind: "produto",
    slug: "tratamento-firmador-e-iluminador",
    name: "Tratamento Firmador e Iluminador",
    subtitle: "Sérum Concentrado",
    category: "Séruns e Máscaras",
    fragrance: "Tropical",
    reviewCount: 449,
    image: img("photo-1570172619644-dfd03ed5d881"),
    gallery: galleryFor("photo-1570172619644-dfd03ed5d881"),
    sizes: [
      { label: "100ml", price: 136, compareAtPrice: 194, sku: "TFI-100" },
      { label: "Refil 100ml", price: 202, compareAtPrice: 288, sku: "TFI-100-R" },
    ],
    description: "Sérum concentrado para uso diário, formulado para firmar e uniformizar o tom da pele com o tempo.",
    benefits: ["Alta concentração de ativos", "Uniformiza o tom da pele", "Textura ligeiramente oleosa, absorção rápida"],
    howToUse: "Aplique duas vezes ao dia nas áreas de atenção antes do hidratante.",
    ingredients: [{ name: "Niacinamida", description: "Ajuda a uniformizar o tom e a textura da pele." }],
  },
  {
    kind: "produto",
    slug: "sabonete-facial-hidratante",
    name: "Sabonete Facial Hidratante",
    subtitle: "Limpeza Facial Suave",
    category: "Limpeza e Esfoliação",
    fragrance: "Sem Fragrância",
    reviewCount: 299,
    image: img("photo-1556228453-efd6c1ff04f6"),
    gallery: galleryFor("photo-1556228453-efd6c1ff04f6"),
    sizes: [
      { label: "150ml", price: 114, compareAtPrice: 163, sku: "SFH-150" },
      { label: "Refil 150ml", price: 171, compareAtPrice: 244, sku: "SFH-150-R" },
    ],
    description: "Limpeza facial suave que remove impurezas sem retirar a hidratação natural da pele.",
    benefits: ["Não resseca", "pH balanceado", "Indicado para peles sensíveis"],
    howToUse: "Massageie no rosto úmido pela manhã e à noite, enxaguando em seguida.",
    ingredients: [{ name: "Aloe Vera", description: "Acalma e hidrata durante a limpeza." }],
  },
  {
    kind: "produto",
    slug: "sabonete-refrescante-do-dia-a-dia",
    name: "Sabonete Refrescante do Dia a Dia",
    subtitle: "Gel de Banho Refrescante",
    category: "Limpeza e Esfoliação",
    fragrance: "Goiaba",
    reviewCount: 238,
    image: img("photo-1570172619644-dfd03ed5d881"),
    gallery: galleryFor("photo-1570172619644-dfd03ed5d881"),
    sizes: [{ label: "250ml", price: 83, compareAtPrice: 119, sku: "SRD-250" }],
    description: "Gel de banho de aroma frutado que limpa e revigora a pele todos os dias.",
    benefits: ["Aroma frutado refrescante", "Espuma leve", "Uso diário"],
    howToUse: "Use no banho como sabonete líquido para corpo.",
    ingredients: [{ name: "Extrato de Goiaba", description: "Antioxidante natural que revigora a pele." }],
  },
  {
    kind: "produto",
    slug: "esfoliante-pele-lisa",
    name: "Esfoliante Pele Lisa",
    subtitle: "Esfoliante Corporal",
    category: "Limpeza e Esfoliação",
    fragrance: "Café",
    badge: "MAIS_VENDIDO",
    reviewCount: 558,
    image: img("photo-1556228453-efd6c1ff04f6"),
    gallery: galleryFor("photo-1556228453-efd6c1ff04f6"),
    sizes: [{ label: "250g", price: 92, compareAtPrice: 131, sku: "EPL-250" }],
    description: "Esfoliante à base de café que remove células mortas e prepara a pele para absorver melhor os hidratantes.",
    benefits: ["Textura da pele mais lisa", "Estimula a circulação", "Prepara a pele para o hidratante"],
    howToUse: "Use 2-3 vezes por semana no banho, massageando em movimentos circulares antes de enxaguar.",
    ingredients: [{ name: "Grãos de Café Reciclados", description: "Esfoliam suavemente e ajudam a estimular a circulação." }],
  },
  {
    kind: "produto",
    slug: "oleo-de-banho-firmador",
    name: "Óleo de Banho Firmador",
    subtitle: "Óleo Firmador Pós-Banho",
    category: "Loções e Óleos",
    fragrance: "Tropical",
    badge: "MAIS_VENDIDO",
    reviewCount: 53,
    image: img("photo-1608248543803-ba4f8c70ae0b"),
    gallery: galleryFor("photo-1608248543803-ba4f8c70ae0b"),
    sizes: [{ label: "150ml", price: 92, compareAtPrice: 131, sku: "OBF-150" }],
    description: "Aplicado ainda no chuveiro, sela a hidratação e deixa a pele macia sem sensação oleosa.",
    benefits: ["Aplicação no chuveiro", "Sela a hidratação", "Não deixa resíduo"],
    howToUse: "Aplique nas costas das mãos ainda no chuveiro, massageie no corpo e enxágue levemente antes de sair.",
    ingredients: [{ name: "Óleo de Amêndoas Doces", description: "Nutre e suaviza a pele durante o banho." }],
  },
];

const glossFlavors: { flavor: string; reviewCount: number; seed: string }[] = [
  { flavor: "Caramelo Chocolate", reviewCount: 62, seed: "photo-1556228453-efd6c1ff04f6" },
  { flavor: "Chá de Pêssego", reviewCount: 5, seed: "photo-1598452963314-b09f397a5c48" },
  { flavor: "Chai Baunilha", reviewCount: 74, seed: "photo-1608571423902-eed4a5ad8108" },
  { flavor: "Framboesa", reviewCount: 112, seed: "photo-1570172619644-dfd03ed5d881" },
  { flavor: "Melancia", reviewCount: 17, seed: "photo-1556228720-195a672e8a03" },
  { flavor: "Cereja", reviewCount: 24, seed: "photo-1571781926291-c477ebfd024b" },
  { flavor: "Frutas Vermelhas", reviewCount: 4, seed: "photo-1620916566398-39f1143ab7be" },
];

for (const g of glossFlavors) {
  products.push({
    kind: "produto",
    slug: slugify(`gloss-balm-${g.flavor}`),
    name: "Gloss Balm Lábios & Bochechas",
    subtitle: g.flavor,
    category: "Gloss Balms",
    fragrance: "Tropical",
    reviewCount: g.reviewCount,
    image: img(g.seed, 900, 900),
    gallery: galleryFor(g.seed),
    sizes: [{ label: "Único", price: 62, compareAtPrice: 88, sku: `GB-${slugify(g.flavor)}` }],
    description: `Bálsamo multiuso com um leve toque de cor e brilho, sabor ${g.flavor.toLowerCase()}, para lábios e bochechas.`,
    benefits: ["Hidrata lábios e bochechas", "Brilho natural, não pegajoso", "Cabe na bolsa"],
    howToUse: "Aplique diretamente nos lábios ou toque levemente as bochechas com a ponta dos dedos.",
    ingredients: [{ name: "Manteiga de Karité", description: "Hidrata profundamente lábios e pele sensível." }],
  });
}

// ── KITS / BUNDLES ────────────────────────────────────────────────────

type BundleSeed = {
  name: string;
  subtitle: string;
  fragrance: Fragrance;
  badge?: DemoBadge;
  reviewCount: number;
  price: number;
  compareAtPrice: number;
  includes: string[];
  seed: string;
};

const bundleSeeds: BundleSeed[] = [
  { name: "Kit Dueto Firmador", subtitle: "Ultimate Skin Duo", fragrance: "Tropical", badge: "PRE_VENDA", reviewCount: 5413, price: 302, compareAtPrice: 432, includes: ["Loção Firmadora", "Óleo Firmador"], seed: "photo-1608248543803-ba4f8c70ae0b" },
  { name: "Kit Barreira Firmadora ao Leite", subtitle: "Firm & Glaze", fragrance: "Tropical", badge: "MAIS_VENDIDO", reviewCount: 20, price: 171, compareAtPrice: 244, includes: ["Essência de Leite Firmadora", "Névoa de Leite Firmadora"], seed: "photo-1571781926291-c477ebfd024b" },
  { name: "Kit Limpeza & Firmeza", subtitle: "Clean & Firm", fragrance: "Tropical", badge: "PRE_VENDA", reviewCount: 5413, price: 351, compareAtPrice: 501, includes: ["Sabonete Cremoso Firmador", "Loção Firmadora"], seed: "photo-1556228720-195a672e8a03" },
  { name: "Kit Queratose Pilar", subtitle: "KP Care", fragrance: "Sem Fragrância", reviewCount: 658, price: 258, compareAtPrice: 369, includes: ["Esfoliante Pele Lisa", "Loção Firmadora Sem Fragrância"], seed: "photo-1620916566398-39f1143ab7be" },
  { name: "Kit Favoritos Firmadores", subtitle: "All Time Faves", fragrance: "Tropical", badge: "PRE_VENDA", reviewCount: 5413, price: 399, compareAtPrice: 570, includes: ["Loção Firmadora", "Óleo Firmador", "Esfoliante Pele Lisa"], seed: "photo-1598452963314-b09f397a5c48" },
  { name: "Kit Mais Vendidos", subtitle: "Best of Bangn", fragrance: "Tropical", badge: "PRE_VENDA", reviewCount: 5413, price: 478, compareAtPrice: 683, includes: ["Loção Firmadora", "Óleo Firmador", "Sabonete Cremoso Firmador", "Esfoliante Pele Lisa"], seed: "photo-1598452963314-b09f397a5c48" },
  { name: "Kit Firma & Brilha", subtitle: "Your Best Glow Yet", fragrance: "Tropical", badge: "EDICAO_LIMITADA", reviewCount: 467, price: 228, compareAtPrice: 326, includes: ["Loção Firmadora Iluminadora", "Óleo Firmador com Brilho"], seed: "photo-1608571423902-eed4a5ad8108" },
  { name: "Kit Preparação & Bronze", subtitle: "Prep & Tan", fragrance: "Tropical", badge: "EDICAO_LIMITADA", reviewCount: 467, price: 180, compareAtPrice: 257, includes: ["Esfoliante Pele Lisa", "Loção Firmadora Autobronzeadora Gradual"], seed: "photo-1570172619644-dfd03ed5d881" },
  { name: "Kit Suave & Firme", subtitle: "Your Ticket To Glow", fragrance: "Tropical", badge: "PRE_VENDA", reviewCount: 5413, price: 382, compareAtPrice: 545, includes: ["Esfoliante Pele Lisa", "Loção Firmadora", "Óleo Firmador"], seed: "photo-1556228453-efd6c1ff04f6" },
  { name: "Kit Refresca & Firma", subtitle: "Fresh Start", fragrance: "Tropical", badge: "MAIS_VENDIDO", reviewCount: 0, price: 259, compareAtPrice: 369, includes: ["Sabonete Refrescante do Dia a Dia", "Loção Firmadora"], seed: "photo-1556228720-195a672e8a03" },
  { name: "Kit Edição Limitada Dose Dupla de Brilho", subtitle: "Double The Glow", fragrance: "Tropical", reviewCount: 297, price: 193, compareAtPrice: 276, includes: ["Óleo Firmador com Brilho", "Loção Firmadora Iluminadora"], seed: "photo-1620916566398-39f1143ab7be" },
  { name: "Kit Edição Limitada Barriga de Grávida", subtitle: "Mummy Bump", fragrance: "Tropical", reviewCount: 658, price: 189, compareAtPrice: 270, includes: ["Loção Firmadora", "Óleo Firmador"], seed: "photo-1571781926291-c477ebfd024b" },
  { name: "Kit Brilho Luminoso", subtitle: "Luminous Glow", fragrance: "Tropical", reviewCount: 551, price: 206, compareAtPrice: 295, includes: ["Loção Firmadora Iluminadora", "Névoa de Leite Firmadora"], seed: "photo-1608248543803-ba4f8c70ae0b" },
  { name: "Kit Autocuidado", subtitle: "Self Care", fragrance: "Tropical", badge: "MAIS_VENDIDO", reviewCount: 658, price: 189, compareAtPrice: 270, includes: ["Sabonete Cremoso Firmador", "Óleo de Banho Firmador"], seed: "photo-1598452963314-b09f397a5c48" },
  { name: "Kit Para Todo Corpo", subtitle: "Everybody", fragrance: "Tropical", reviewCount: 69, price: 253, compareAtPrice: 361, includes: ["Loção Firmadora", "Esfoliante Pele Lisa", "Sabonete Cremoso Firmador"], seed: "photo-1598452963314-b09f397a5c48" },
  { name: "Kit Anti-Acne", subtitle: "Breakout Care", fragrance: "Tropical", reviewCount: 55, price: 263, compareAtPrice: 376, includes: ["Sabonete Facial Hidratante", "Tratamento Firmador e Iluminador"], seed: "photo-1608571423902-eed4a5ad8108" },
  { name: "Kit Maior Brilho", subtitle: "Greatest Glow", fragrance: "Tropical", reviewCount: 368, price: 294, compareAtPrice: 420, includes: ["Óleo Firmador com Brilho", "Loção Firmadora Iluminadora", "Névoa de Leite Firmadora"], seed: "photo-1570172619644-dfd03ed5d881" },
  { name: "Kit Dose Dupla do Bem", subtitle: "Double Dose of Goodness", fragrance: "Tropical", reviewCount: 92, price: 390, compareAtPrice: 558, includes: ["Loção Firmadora", "Loção Firmadora", "Óleo Firmador"], seed: "photo-1556228453-efd6c1ff04f6" },
  { name: "Kit Descubra Você", subtitle: "Discover You", fragrance: "Tropical", reviewCount: 127, price: 294, compareAtPrice: 420, includes: ["Loção Firmadora", "Óleo Firmador", "Sabonete Cremoso Firmador"], seed: "photo-1556228720-195a672e8a03" },
  { name: "Kit Essenciais", subtitle: "The Essentials", fragrance: "Tropical", reviewCount: 226, price: 312, compareAtPrice: 445, includes: ["Loção Firmadora", "Óleo Firmador", "Sabonete Cremoso Firmador", "Esfoliante Pele Lisa"], seed: "photo-1620916566398-39f1143ab7be" },
  { name: "Kit Dueto Firmador Refil", subtitle: "Ultimate Skin Duo Refil", fragrance: "Sem Fragrância", badge: "REFIL", reviewCount: 5413, price: 289, compareAtPrice: 413, includes: ["Refil Loção Firmadora", "Refil Óleo Firmador"], seed: "photo-1571781926291-c477ebfd024b" },
];

export const bundles: CatalogBundle[] = bundleSeeds.map((b) => ({
  kind: "kit" as const,
  slug: slugify(b.name),
  name: b.name,
  subtitle: b.fragrance,
  fragrance: b.fragrance,
  badge: b.badge,
  reviewCount: b.reviewCount,
  price: b.price,
  compareAtPrice: b.compareAtPrice,
  image: img(b.seed),
  gallery: galleryFor(b.seed),
  description: `Kit com ${b.includes.length} produtos selecionados para potencializar sua rotina: ${b.includes.join(", ")}. Economize comprando junto.`,
  includes: b.includes,
}));

export const catalog: CatalogItem[] = [...products, ...bundles];

export function getCatalogItem(slug: string): CatalogItem | undefined {
  return catalog.find((item) => item.slug === slug);
}

export function relatedItems(current: CatalogItem, limit = 4): CatalogItem[] {
  return catalog.filter((item) => item.slug !== current.slug).slice(0, limit);
}

export function toCarouselItem(item: CatalogItem) {
  return {
    slug: item.slug,
    name: item.name,
    subtitle: item.subtitle,
    badge: item.badge,
    price: item.kind === "produto" ? item.sizes[0].price : item.price,
    compareAtPrice: item.kind === "produto" ? item.sizes[0].compareAtPrice : item.compareAtPrice,
    reviewCount: item.reviewCount,
    image: item.image,
  };
}
