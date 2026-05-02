import { HugeiconsIcon } from "@hugeicons/react";
import { DiscountTag01Icon, Time01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getActivePromotions } from "@/lib/actions/promotions";
import { getProducts } from "@/lib/actions/products";

export const metadata = {
  title: "Promotions | Dakar Sport",
  description: "Découvrez nos offres spéciales et promotions sur les équipements sportifs. Jusqu'à -50% de réduction.",
};

export const dynamic = "force-dynamic";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("fr-SN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function PromotionsPage() {
  const [promotions, featuredProducts] = await Promise.all([
    getActivePromotions(),
    getProducts({ active: true, featured: true, limit: 6 }),
  ]);

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[oklch(0.1_0.02_265)] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent z-10" />
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 py-20 lg:py-28 relative z-20">
          <ScrollReveal direction="down">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 mb-4">
              Offres spéciales
            </span>
            <h1 className="font-heading font-bold italic text-6xl lg:text-7xl text-white leading-none tracking-tight mb-3">
              Promotions
            </h1>
            <p className="max-w-2xl text-sm text-white/60 font-medium">
              Équipez-vous avec les meilleures marques à prix réduits. Offres valables dans la limite des stocks disponibles.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 py-16 relative z-30">
        {promotions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <HugeiconsIcon icon={DiscountTag01Icon} size={48} className="text-slate-200 mb-6" />
            <h2 className="font-heading font-bold italic text-3xl text-slate-900 mb-2 leading-none">Aucune promotion</h2>
            <p className="text-sm text-slate-500 max-w-sm mt-2">Revenez bientôt pour découvrir nos prochaines offres spéciales.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-white border border-slate-200 overflow-hidden flex flex-col">
                {/* Promo Banner */}
                <div className="bg-[oklch(0.1_0.02_265)] text-white p-8 sm:p-10 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center relative overflow-hidden">
                  <div className="flex-1 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-[#DC2626] text-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]">
                        {promo.discountType === "percentage"
                          ? `-${promo.discountValue}%`
                          : `-${(promo.discountValue / 1000).toFixed(0)}k FCFA`}
                      </span>
                      <span className="flex items-center text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase">
                        <HugeiconsIcon icon={Time01Icon} size={14} className="mr-1.5 text-white/60" />
                        Finit le {formatDate(promo.endsAt)}
                      </span>
                    </div>
                    <h2 className="font-heading font-bold italic text-4xl sm:text-5xl tracking-tight text-white leading-none mb-3">
                      {promo.title}
                    </h2>
                    {promo.description && (
                      <p className="text-sm text-white/60 max-w-3xl">
                        {promo.description}
                      </p>
                    )}
                  </div>
                  {promo.code && (
                    <div className="shrink-0 bg-white/5 p-6 border border-white/10 text-center min-w-[200px] relative z-10">
                      <span className="block text-[9px] uppercase tracking-[0.25em] text-white/40 font-bold mb-2">
                        Code Promo
                      </span>
                      <span className="block font-heading font-bold italic text-3xl tracking-wider text-[#DC2626]">
                        {promo.code}
                      </span>
                    </div>
                  )}
                </div>

                {/* Show featured products as promo showcase (no product-promo join table yet) */}
                {featuredProducts.length > 0 && (
                  <div className="p-8 sm:p-10 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {featuredProducts.slice(0, 3).map((product, pIdx) => (
                        <ScrollReveal key={product.id} delay={(pIdx % 3) * 100} direction="up" className="h-full">
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
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
