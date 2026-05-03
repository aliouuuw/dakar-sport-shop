import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";
import { HeroSection } from "@/components/hero-section";
import { StatStrip } from "@/components/stat-strip";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { cn } from "@/lib/utils";

export default async function StorePage() {
  const [featuredProducts, allCategories] = await Promise.all([
    getProducts({ active: true, featured: true, limit: 5 }),
    getCategories(),
  ]);

  const categories = allCategories.slice(0, 4);

  return (
    <div className="flex-1 bg-white">

      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <Marquee items={["Livraison gratuite dès 50 000 FCFA", "Paiement à la livraison", "Équipements officiels", "Clubs & Associations"]} />

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
          {/* Ghost section number — Swiss typographic background */}
          <span
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-bold italic leading-none select-none pointer-events-none text-slate-900/[0.025]"
            style={{ fontSize: "clamp(12rem, 25vw, 22rem)" }}
          >
            01
          </span>

          <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 relative z-10">

            {/* Section label */}
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-3">
                  <span className="block h-px w-6 bg-[#DC2626]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-900">
                    01 — Catégories
                  </span>
                </div>
                <Link
                  href="/produits"
                  className="group text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-[#DC2626] transition-colors inline-flex items-center gap-2"
                >
                  Tout voir
                  <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Asymmetric 3-col grid: tall left + two stacked right */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Large feature cell */}
              {categories[0] && (
                <ScrollReveal className="md:row-span-2 md:col-span-1" delay={0}>
                  <Link
                    href={`/produits?category=${categories[0].slug}`}
                    className="group relative overflow-hidden block h-[360px] md:h-full bg-slate-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10" />
                    <div className="absolute inset-0 bg-[#1E40AF]/0 group-hover:bg-[#1E40AF]/90 mix-blend-multiply transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] to-[oklch(0.2_0.12_265)]" />
                    {categories[0].image && (
                      <Image src={categories[0].image} alt={categories[0].name} fill className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                    )}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">
                      <h3 className="font-heading font-bold italic text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                        {categories[0].name}
                      </h3>
                      <span className="mt-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white/0 group-hover:text-white/90 transition-all duration-400 translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                        Explorer <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
                      </span>
                    </div>
                    {/* Red edge bottom — brand mark */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#DC2626] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-30" />
                  </Link>
                </ScrollReveal>
              )}

              {/* Two stacked cells */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.slice(1).map((cat, idx) => (
                  <ScrollReveal key={cat.slug} delay={(idx + 1) * 70}>
                    <Link
                      href={`/produits?category=${cat.slug}`}
                      className="group relative overflow-hidden block h-[220px] bg-slate-100"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-10" />
                      <div className="absolute inset-0 bg-[#1E40AF]/0 group-hover:bg-[#1E40AF]/90 mix-blend-multiply transition-colors duration-500 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] to-[oklch(0.2_0.12_265)]" />
                      {cat.image && (
                        <Image src={cat.image} alt={cat.name} fill className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 25vw" />
                      )}
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                        <h3 className="font-heading font-bold italic text-2xl lg:text-3xl text-white leading-tight tracking-tight">
                          {cat.name}
                        </h3>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#DC2626] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-30" />
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── FEATURED PRODUCTS ────────────────────────────────────────── */}
      {featuredProducts.length > 0 && (
        <section className="py-20 lg:py-28 bg-[#1E40AF] relative overflow-hidden">
          {/* Ghost section number */}
          <span
            aria-hidden="true"
            className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-bold italic leading-none select-none pointer-events-none text-white/[0.04]"
            style={{ fontSize: "clamp(12rem, 25vw, 22rem)" }}
          >
            02
          </span>

          <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 relative z-10">

            {/* Section label row */}
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="block h-px w-6 bg-[#DC2626]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                      02 — Tendances
                    </span>
                  </div>
                  <h2 className="font-heading font-bold italic text-5xl lg:text-6xl text-white leading-none tracking-tight">
                    Sélection du moment
                  </h2>
                </div>
                <Link
                  href="/produits"
                  className="group hidden md:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors"
                >
                  Tout le catalogue
                  <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </ScrollReveal>

            {/* Editorial product grid — white cards on blue field */}
            <div className={cn(
              "grid gap-3",
              featuredProducts.length >= 3
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                : "grid-cols-1 sm:grid-cols-2"
            )}>
              {featuredProducts.map((product, idx) => (
                <ScrollReveal
                  key={product.id}
                  delay={idx * 80}
                  direction="up"
                  className={cn("h-full", idx === 0 && featuredProducts.length >= 3 && "lg:col-span-1 lg:row-span-1")}
                >
                  <ProductCard
                    id={String(product.id)}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    compareAtPrice={product.compareAtPrice ?? undefined}
                    category={product.categoryName ?? ""}
                    image={product.images[0] ?? ""}
                  />
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 md:hidden">
              <Link
                href="/produits"
                className="flex items-center justify-center gap-2 w-full border border-white/30 py-4 text-xs font-bold uppercase tracking-widest text-white hover:bg-white hover:text-[#1E40AF] hover:border-white transition-all duration-300"
              >
                Voir tout le catalogue <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── STAT STRIP ───────────────────────────────────────────────── */}
      <StatStrip />

    </div>
  );
}
