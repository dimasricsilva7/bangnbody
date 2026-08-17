import { Leaf, Rabbit, Droplet, MapPin } from "lucide-react";

const values = [
  {
    icon: Leaf,
    title: "Natural",
    description:
      "Criamos produtos limpos, naturais e orgânicos que beneficiam sua pele. Você não vai encontrar silicones, parabenos, sulfatos (SLS/SLES), transgênicos, óleos minerais, PEGs, filtros UV químicos, petrolato ou corantes sintéticos nos nossos produtos.",
  },
  {
    icon: Rabbit,
    title: "Vegano e Livre de Crueldade",
    description: "Os animais foram feitos para serem amados, não testados. Somos 100% livres de crueldade.",
  },
  {
    icon: Droplet,
    title: "Sustentável",
    description:
      "Nosso ciclo de embalagens é uma promessa contínua de evoluir e reduzir o espaço ocupado nas prateleiras e o desperdício enviado para aterros sanitários.",
  },
  {
    icon: MapPin,
    title: "Fabricado no Brasil",
    description: "Temos orgulho de ser uma empresa brasileira, com produção nacional e ingredientes de origem local.",
  },
];

export function BrandValues() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-[1400px] px-4 py-16 md:px-8">
        <h2 className="mb-12 text-center font-display text-3xl font-medium text-ink md:text-4xl">Temos Orgulho de Ser...</h2>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          {values.map((value) => (
            <div key={value.title} className="flex flex-col items-center text-center">
              <value.icon size={40} className="text-ink" strokeWidth={1.5} />
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-wide text-ink">{value.title}</h3>
              <p className="mt-3 max-w-[240px] text-[12px] leading-relaxed text-ink-soft">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
