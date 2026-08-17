// Dados de demonstração (DEMO) — substituíveis via /admin.
// Estrutura espelha o schema Prisma; usada até o banco estar conectado.

export type DemoBadge =
  | "MAIS_VENDIDO"
  | "PRE_VENDA"
  | "EDICAO_LIMITADA"
  | "REFIL"
  | "NOVO"
  | "OFERTA";

export const badgeLabels: Record<DemoBadge, string> = {
  MAIS_VENDIDO: "Mais Vendido",
  PRE_VENDA: "Pré-Venda",
  EDICAO_LIMITADA: "Edição Limitada",
  REFIL: "Refil",
  NOVO: "Novidade",
  OFERTA: "Oferta",
};

const img = (seed: string, w = 800, h = 1000) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

// Configurável via /admin > Configurações. Quando vazio, mostramos o wordmark placeholder.
export const siteSettings = {
  logoUrl: "" as string,
  storeName: "Sua Marca",
};

export const trustItems = [
  "Dermatologicamente Testado",
  "Produção Nacional",
  "Vegano & Cruelty Free",
  "Natural, Sem Toxinas",
];

export const navLinks = [
  { label: "Crie sua Rotina", href: "/rotina" },
  { label: "Compre em Conjunto e Economize", href: "/categoria/kits-ofertas" },
  { label: "Mais Vendidos", href: "/categoria/mais-vendidos" },
];

export const megaMenu = {
  loja: {
    label: "Comprar",
    columns: [
      {
        title: "Por Produto",
        links: [
          { label: "Loções e Óleos", href: "/categoria/locoes-oleos" },
          { label: "Limpeza e Esfoliação", href: "/categoria/limpeza-esfoliacao" },
          { label: "Séruns e Máscaras", href: "/categoria/serums-mascaras" },
          { label: "Refis", href: "/categoria/refis" },
          { label: "Sem Fragrância", href: "/categoria/sem-fragrancia" },
          { label: "Gloss Balms", href: "/categoria/gloss-balms" },
          { label: "Gift Cards", href: "/produto/vale-presente" },
          { label: "Todos os Produtos", href: "/produtos" },
        ],
      },
      {
        title: "Coleções",
        links: [
          { label: "Monte sua Rotina", href: "/rotina" },
          { label: "Kits e Ofertas", href: "/categoria/kits-ofertas" },
          { label: "Mais Vendidos", href: "/categoria/mais-vendidos" },
        ],
      },
    ],
  },
  sobre: {
    label: "Sobre Nós",
    columns: [
      {
        title: "Sobre Nós",
        links: [
          { label: "Nossa História", href: "/sobre/nossa-historia" },
          { label: "Resultados de Clientes", href: "/sobre/resultados" },
          { label: "Nossos Ingredientes", href: "/sobre/ingredientes" },
          { label: "Blog", href: "/blog" },
        ],
      },
    ],
  },
};

export const routine = [
  {
    step: 1,
    title: "Limpar",
    description: "Remova impurezas e prepare a pele com um sabonete de limpeza suave.",
    productName: "Sabonete Facial Hidratante",
    price: 89.0,
    image: img("photo-1556228453-efd6c1ff04f6"),
  },
  {
    step: 2,
    title: "Esfoliar",
    description: "Renove a textura da pele com esfoliação suave e uniforme.",
    productName: "Esfoliante Pele Lisa",
    price: 99.0,
    image: img("photo-1608571423902-eed4a5ad8108"),
  },
  {
    step: 3,
    title: "Tratar",
    description: "Firme e ilumine com o sérum concentrado de uso diário.",
    productName: "Sérum Firmador",
    price: 149.0,
    image: img("photo-1598452963314-b09f397a5c48"),
  },
  {
    step: 4,
    title: "Hidratar",
    description: "Sele a rotina com a loção firmadora de assinatura.",
    productName: "Loção Firmadora",
    price: 159.0,
    image: img("photo-1556228578-8c89e6adf883"),
  },
] as const;

export const reviews = [
  {
    title: "INCRÍVEL PARA CICATRIZES E PELE LISA!",
    comment:
      "Uso a Loção Firmadora e o Esfoliante Pele Lisa juntos há algumas semanas, e os resultados foram incríveis! Minha pele está mais macia, firme e uniforme, e as cicatrizes desapareceram visivelmente.",
    author: "Compradora Verificada",
    category: "Cicatrizes",
    productsUsed: ["Loção Firmadora", "Esfoliante Pele Lisa"],
    verified: true,
    rating: 5,
  },
  {
    title: "FINALMENTE ENCONTREI MINHA ROTINA IDEAL!",
    comment:
      "Eu era cética sobre experimentar produtos novos, mas depois de usar o Sabonete Facial, o Esfoliante e a Loção por algumas semanas, estou impressionada! Minha acne reduziu significativamente.",
    author: "Compradora Verificada",
    category: "Acne",
    productsUsed: ["Kit Rotina Completa"],
    verified: true,
    rating: 5,
  },
  {
    title: "AJUDOU A CURAR MINHA CICATRIZ CIRÚRGICA!",
    comment: "O creme literalmente ajudou a cicatrizar minha cicatriz de cirurgia e as queimaduras da radioterapia!!! Incrível!",
    author: "Compradora Verificada",
    category: "Queimaduras",
    productsUsed: ["Loção Firmadora Jumbo", "Kit Dueto Firmador"],
    verified: true,
    rating: 5,
  },
  {
    title: "ESTOU COMPLETAMENTE IMPRESSIONADA COM ESSE PRODUTO",
    comment:
      "Sinceramente muito feliz! Estou completamente impressionada com esse produto, ele salvou minha autoestima depois que tive um bebê.",
    author: "Compradora Verificada",
    category: "Estrias",
    productsUsed: ["Loção Firmadora", "Esfoliante Pele Lisa"],
    verified: true,
    rating: 5,
  },
  {
    title: "ESTOU HONESTAMENTE IMPRESSIONADA!!!",
    comment:
      "Uso os produtos consistentemente há uma semana e olha a diferença nas minhas estrias de gravidez! Estou honestamente impressionada!!!",
    author: "Compradora Verificada",
    category: "Estrias",
    productsUsed: ["Esfoliante Pele Lisa", "Loção Firmadora"],
    verified: true,
    rating: 5,
  },
  {
    title: "TÃO FELIZ COM MEUS RESULTADOS!",
    comment:
      "Sofri com queratose pilar nos braços por anos, e nada parecia funcionar. Depois de usar a Loção Firmadora por algumas semanas, minha pele está mais lisa e a vermelhidão reduziu drasticamente.",
    author: "Sara J.",
    category: "Textura",
    productsUsed: ["Loção Firmadora Jumbo", "Esfoliante Pele Lisa"],
    verified: true,
    rating: 5,
  },
] as const;

// Fotos DEMO (banco de imagens livre) — substitua por fotos reais de clientes (com consentimento) em /admin > Avaliações.
const reviewPhotoSeeds: [string, string][] = [
  ["photo-1556228453-efd6c1ff04f6", "photo-1620916566398-39f1143ab7be"],
  ["photo-1571781926291-c477ebfd024b", "photo-1556228720-195a672e8a03"],
  ["photo-1608248543803-ba4f8c70ae0b", "photo-1571781926291-c477ebfd024b"],
  ["photo-1556228720-195a672e8a03", "photo-1556228578-8c89e6adf883"],
  ["photo-1570172619644-dfd03ed5d881", "photo-1608571423902-eed4a5ad8108"],
  ["photo-1598452963314-b09f397a5c48", "photo-1556228453-efd6c1ff04f6"],
];

export const reviewsWithPhotos = reviews.map((review, i) => {
  const [before, after] = reviewPhotoSeeds[i % reviewPhotoSeeds.length];
  return {
    ...review,
    photoBefore: img(before, 500, 500),
    photoAfter: img(after, 500, 500),
  };
});

export const discoverMore = [
  {
    title: "Cuidados com a Pele",
    description: "Descubra os fundamentos de uma rotina de skincare que realmente funciona.",
    href: "/blog/cuidados-com-a-pele",
    image: img("photo-1570172619644-dfd03ed5d881"),
  },
  {
    title: "Monte sua Rotina",
    description: "Escolha os produtos certos para o seu tipo de pele em poucos passos.",
    href: "/rotina",
    image: img("photo-1608571423902-eed4a5ad8108"),
  },
  {
    title: "Blog Bangn Body",
    description: "Dicas, resultados reais e novidades direto da nossa comunidade.",
    href: "/blog",
    image: img("photo-1598452963314-b09f397a5c48"),
  },
] as const;


export const featuredIn = [
  "Vogue", "Elle", "Marie Claire", "Glamour", "Capricho", "Boa Forma",
];

const instagramSeeds = [
  "photo-1556228720-195a672e8a03",
  "photo-1571781926291-c477ebfd024b",
  "photo-1620916566398-39f1143ab7be",
  "photo-1608248543803-ba4f8c70ae0b",
  "photo-1556228720-195a672e8a03",
  "photo-1556228578-8c89e6adf883",
];

export const instagramPosts = instagramSeeds.map((seed) => ({
  image: img(seed, 600, 600),
  href: "https://instagram.com",
}));
