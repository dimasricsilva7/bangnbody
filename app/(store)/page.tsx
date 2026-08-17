import { MarqueeBar } from "@/components/layout/MarqueeBar";
import { Hero } from "@/components/home/Hero";
import { PromoBlocks } from "@/components/home/PromoBlocks";
import { BestSellers } from "@/components/home/BestSellers";
import { PromoBanner } from "@/components/home/PromoBanner";
import { Bundles } from "@/components/home/Bundles";
import { FeaturedIn } from "@/components/home/FeaturedIn";
import { Routine } from "@/components/home/Routine";
import { Reviews } from "@/components/home/Reviews";
import { DiscoverMore } from "@/components/home/DiscoverMore";
import { BrandValues } from "@/components/home/BrandValues";
import { InstagramGrid } from "@/components/home/InstagramGrid";
import { Newsletter } from "@/components/home/Newsletter";
import { trustItems } from "@/lib/demo-data";

export default function Home() {
  return (
    <main>
      <MarqueeBar variant="trust" items={trustItems} />
      <Hero />
      <PromoBlocks />
      <BestSellers />
      <PromoBanner />
      <Bundles />
      <FeaturedIn />
      <Routine />
      <Reviews />
      <DiscoverMore />
      <BrandValues />
      <InstagramGrid />
      <Newsletter />
    </main>
  );
}
