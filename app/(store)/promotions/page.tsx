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
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-20">
          <ScrollReveal direction="down">
            <div className="inline-flex items-center justify-center p-3 bg-[#DC2626] rounded-xl mb-6 shadow-lg shadow-red-900/50">
              <HugeiconsIcon icon={DiscountTag01Icon} size={32} className="text-white" />
            </div>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase mb-4">
              Nos <span className="text-[#DC2626]">Promotions</span>
            </h1>
            <p className="max-w-2xl text-xl text-slate-300 font-medium">
              Équipez-vous avec les meilleures marques à prix réduits. Offres valables dans la limite des stocks disponibles.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-30">
        {promotions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="inline-flex items-center justify-center p-5 bg-slate-100 rounded-full mb-6">
              <HugeiconsIcon icon={DiscountTag01Icon} size={40} className="text-slate-400" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2">Aucune promotion en cours</h2>
            <p className="text-slate-500 max-w-sm">Revenez bientôt pour découvrir nos prochaines offres.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16">
            {promotions.map((promo) => (
              <div key={promo.id} className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col">
                {/* Promo Banner */}
                <div className="bg-slate-900 text-white p-8 sm:p-10 flex flex-col lg:flex-row gap-8 justify-between items-start lg:items-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2626]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <div className="flex-1 relative z-10">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="bg-[#DC2626] text-white px-4 py-1.5 rounded-lg text-sm font-black uppercase tracking-wider">
                        {promo.discountType === "percentage"
                          ? `-${promo.discountValue}%`
                          : `-${(promo.discountValue / 1000).toFixed(0)}k FCFA`}
                      </span>
                      <span className="flex items-center text-slate-300 text-sm font-bold tracking-wide uppercase">
                        <HugeiconsIcon icon={Time01Icon} size={18} className="mr-2 text-amber-400" />
                        Finit le {formatDate(promo.endsAt)}
                      </span>
                    </div>
                    <h2 className="text-4xl sm:text-5xl font-black tracking-tighter uppercase mb-3 text-white">
                      {promo.title}
                    </h2>
                    {promo.description && (
                      <p className="text-slate-300 text-lg leading-relaxed max-w-3xl font-medium">
                        {promo.description}
                      </p>
                    )}
                  </div>
                  {promo.code && (
                    <div className="shrink-0 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 text-center min-w-[240px] relative z-10">
                      <span className="block text-xs uppercase tracking-[0.2em] text-slate-400 font-black mb-2">
                        Code Promo
                      </span>
                      <span className="block text-3xl font-black font-mono tracking-wider text-amber-400">
                        {promo.code}
                      </span>
                    </div>
                  )}
                </div>

                {/* Show featured products as promo showcase (no product-promo join table yet) */}
                {featuredProducts.length > 0 && (
                  <div className="p-8 sm:p-10 bg-white">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
