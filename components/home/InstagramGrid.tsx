import Image from "next/image";
import Link from "next/link";
import { instagramPosts } from "@/lib/demo-data";

export function InstagramGrid() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-8">
      <div className="mb-8 text-center">
        <h2 className="font-display text-3xl font-medium text-ink md:text-4xl">Siga-nos no Instagram</h2>
        <p className="mt-2 text-sm text-ink-soft">@bangn.body</p>
      </div>
      <div className="grid grid-cols-3 gap-2 md:grid-cols-6 md:gap-4">
        {instagramPosts.map((post, i) => (
          <Link key={i} href={post.href} target="_blank" className="group relative block aspect-square overflow-hidden">
            <Image
              src={post.image}
              alt="Post do Instagram"
              fill
              sizes="200px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
