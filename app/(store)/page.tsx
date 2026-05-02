import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";
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
      <section className="relative noise-overlay bg-[oklch(0.1_0.02_265)] text-white overflow-hidden h-[92vh] min-h-[640px]">
        {/* Background image — local gradient fallback, external image optional */}
        <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.25_0.15_265)] via-[oklch(0.15_0.12_265)] to-[oklch(0.08_0.08_265)]">
          {/* Attempt to load external image, but don't block on timeout */}
          <Image
            src="https://images.unsplash.com/photo-1518605368461-1e1252220a22?q=80&w=1920&auto=format&fit=crop"
            alt="Football au Sénégal"
            fill
            priority
            className="object-cover object-center opacity-80"
          />
          {/* Two-layer overlay: deep blue tint + bottom vignette */}
          <div className="absolute inset-0 bg-[oklch(0.2_0.12_265/0.55)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.1_0.02_265)] via-transparent to-transparent" />
        </div>

        {/* Edition label — top right */}
        <div className="absolute top-6 right-6 z-20 hidden sm:block">
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            Dakar · Sénégal · Est. 2010
          </span>
        </div>

        {/* Content — bottom-left anchored */}
        <div className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 lg:px-14 pb-12 lg:pb-20 max-w-screen-xl mx-auto w-full">

          {/* Eyebrow */}
          <div className="clip-reveal clip-reveal-delay-1 mb-4 flex items-center gap-3">
            <span className="block h-px w-8 bg-[#DC2626]" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
              Spécialiste Sport — Dakar
            </span>
          </div>

          {/* Headline — the type IS the design */}
          <h1 className="clip-reveal clip-reveal-delay-2 font-heading font-bold italic leading-[0.88] mb-8">
            <span className="block text-white text-[clamp(4.5rem,13vw,11rem)] tracking-tight">
              Dakar
            </span>
            <span className="block text-[#DC2626] text-[clamp(4.5rem,13vw,11rem)] tracking-tight">
              Sport
            </span>
          </h1>

          {/* Sub + CTAs in one row */}
          <div className="clip-reveal clip-reveal-delay-3 flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12">
            <p className="text-sm sm:text-base text-white/60 max-w-xs font-medium leading-relaxed">
              L&apos;équipementier de référence pour les clubs et passionnés de sport au Sénégal.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/221770414930"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-[oklch(0.1_0.02_265)] px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-[#DC2626] hover:text-white"
              >
                Commander
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <Link
                href="/produits"
                className="inline-flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors duration-300"
              >
                Catalogue
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="clip-reveal clip-reveal-delay-4 absolute bottom-8 right-6 sm:right-14 flex flex-col items-center gap-2 opacity-40">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] rotate-90 origin-center translate-x-5">Scroll</span>
            <span className="block w-px h-10 bg-white/40" />
          </div>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <Marquee items={["Livraison gratuite dès 50 000 FCFA", "Paiement à la livraison", "Équipements officiels", "Clubs & Associations"]} />

      {/* ── CATEGORIES ───────────────────────────────────────────────── */}
      {categories.length > 0 && (
        <section className="py-20 lg:py-28 bg-white">
          <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14">

            {/* Section label */}
            <ScrollReveal>
              <div className="flex items-center justify-between mb-10">
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                  01 — Catégories
                </span>
                <Link
                  href="/produits"
                  className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
                >
                  Tout voir <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
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
                    <div className="absolute inset-0 bg-[#1E40AF]/0 group-hover:bg-[#1E40AF]/20 transition-colors duration-500 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] to-[oklch(0.2_0.12_265)]" />
                    {categories[0].image && (
                      <Image src={categories[0].image} alt={categories[0].name} fill className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 33vw" />
                    )}
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-7">
                      <h3 className="font-heading font-bold italic text-4xl lg:text-5xl text-white leading-tight tracking-tight">
                        {categories[0].name}
                      </h3>
                      <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 group-hover:text-white/80 transition-colors duration-300 flex items-center gap-2">
                        Explorer <HugeiconsIcon icon={ArrowRight01Icon} size={10} />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              )}

              {/* Two stacked cells */}
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.slice(1).map((cat, idx) => (
                  <ScrollReveal key={cat.slug} delay={(idx + 1) * 60}>
                    <Link
                      href={`/produits?category=${cat.slug}`}
                      className="group relative overflow-hidden block h-[220px] bg-slate-100"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent z-10" />
                      <div className="absolute inset-0 bg-[#1E40AF]/0 group-hover:bg-[#1E40AF]/20 transition-colors duration-500 z-10" />
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] to-[oklch(0.2_0.12_265)]" />
                      {cat.image && (
                        <Image src={cat.image} alt={cat.name} fill className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 25vw" />
                      )}
                      <div className="absolute inset-0 z-20 flex flex-col justify-end p-5">
                        <h3 className="font-heading font-bold italic text-2xl lg:text-3xl text-white leading-tight tracking-tight">
                          {cat.name}
                        </h3>
                      </div>
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
        <section className="py-20 lg:py-28 bg-[oklch(0.97_0.005_265)]">
          <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14">

            {/* Section label row */}
            <ScrollReveal>
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
                    02 — Tendances
                  </span>
                  <h2 className="font-heading font-bold italic text-5xl lg:text-6xl text-slate-900 leading-none tracking-tight">
                    Sélection du moment
                  </h2>
                </div>
                <Link
                  href="/produits"
                  className="hidden md:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Tout le catalogue <HugeiconsIcon icon={ArrowRight01Icon} size={12} />
                </Link>
              </div>
            </ScrollReveal>

            {/* Editorial product layout: 1 large + 4 standard */}
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
                className="flex items-center justify-center gap-2 w-full border border-slate-200 py-4 text-xs font-bold uppercase tracking-widest text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all duration-300"
              >
                Voir tout le catalogue <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── STAT STRIP ───────────────────────────────────────────────── */}
      <section className="bg-[oklch(0.1_0.02_265)] text-white">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10">
            {[
              { stat: "150+",  label: "Clubs équipés" },
              { stat: "24h",   label: "Livraison Dakar" },
              { stat: "Lun–Sam", label: "09h – 19h30" },
              { stat: "Av. G. Pompidou", label: "En face Ali Baba, Dakar" },
            ].map(({ stat, label }, idx) => (
              <ScrollReveal key={idx} delay={idx * 70}>
                <div className="py-10 px-6 lg:px-10 flex flex-col gap-1">
                  <span className="font-heading font-bold italic text-3xl lg:text-4xl text-white tracking-tight leading-none">
                    {stat}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 mt-1">
                    {label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
