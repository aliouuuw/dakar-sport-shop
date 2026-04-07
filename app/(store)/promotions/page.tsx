import { Suspense } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { DiscountTag01Icon, Time01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";

// Mock data for promotions
const MOCK_PROMOTIONS = [
  {
    id: "promo-1",
    title: "Vente Flash Ramadan",
    description: "Jusqu'à -30% sur une sélection d'articles de football et de fitness. Offre valable jusqu'à la fin du mois.",
    discountType: "percentage",
    discountValue: 30,
    code: "RAMADAN30",
    endsAt: "2024-04-15T23:59:59Z",
    products: [
      {
        id: "1",
        name: "Maillot Domicile Equipe Nationale Sénégal 2024",
        slug: "maillot-senegal-2024",
        price: 35000,
        compareAtPrice: 45000,
        category: "Football",
        image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "10",
        name: "Chaussures de Football Crampons Moulés",
        slug: "crampons-moules",
        price: 55000,
        compareAtPrice: 70000,
        category: "Football",
        image: "https://images.unsplash.com/photo-1511886929837-354d827aafe2?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "4",
        name: "Haltères Réglables 20kg (Set de 2)",
        slug: "halteres-20kg-set",
        price: 45000,
        compareAtPrice: 55000,
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=600&auto=format&fit=crop",
      }
    ]
  },
  {
    id: "promo-2",
    title: "Pack Rentrée Sportive",
    description: "Équipez-vous pour la rentrée ! Réductions exceptionnelles sur les chaussures et accessoires.",
    discountType: "fixed",
    discountValue: 10000,
    code: "RENTREE24",
    endsAt: "2024-05-01T23:59:59Z",
    products: [
      {
        id: "2",
        name: "Chaussures de Running Pro X-Vite",
        slug: "running-pro-x-vite",
        price: 55000,
        compareAtPrice: 65000,
        category: "Running",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "8",
        name: "Sac de Sport Imperméable 50L",
        slug: "sac-sport-50l",
        price: 15000,
        compareAtPrice: 18000,
        category: "Accessoires",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "3",
        name: "Ballon de Basket Officiel Taille 7",
        slug: "ballon-basket-t7",
        price: 25000,
        compareAtPrice: 30000,
        category: "Basketball",
        image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop",
      }
    ]
  }
];

export const metadata = {
  title: "Promotions | Dakar Sport",
  description: "Découvrez nos offres spéciales et promotions sur les équipements sportifs. Jusqu'à -50% de réduction.",
};

export default function PromotionsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-SN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-[#DC2626] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="inline-flex items-center justify-center p-4 bg-white/20 rounded-full mb-6 backdrop-blur-sm">
            <HugeiconsIcon icon={DiscountTag01Icon} size={48} className="text-white" />
          </div>
          <h1 className="text-5xl font-black tracking-tight sm:text-6xl mb-4">
            Nos Promotions
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-red-100 font-medium">
            Équipez-vous avec les meilleures marques à prix réduits. Offres valables dans la limite des stocks disponibles.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="flex flex-col gap-12">
          {MOCK_PROMOTIONS.map((promo) => (
            <div key={promo.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              {/* Promo Banner */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="bg-[#DC2626] text-white px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                      {promo.discountType === "percentage" ? `-${promo.discountValue}%` : `-${promo.discountValue / 1000}k FCFA`}
                    </span>
                    <span className="flex items-center text-slate-300 text-sm font-medium">
                      <HugeiconsIcon icon={Time01Icon} size={16} className="mr-1.5" />
                      Finit le {formatDate(promo.endsAt)}
                    </span>
                  </div>
                  <h2 className="text-3xl font-extrabold tracking-tight mb-2">
                    {promo.title}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed max-w-3xl">
                    {promo.description}
                  </p>
                </div>
                {promo.code && (
                  <div className="shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-center min-w-[200px]">
                    <span className="block text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                      Code Promo
                    </span>
                    <span className="block text-2xl font-black font-mono tracking-wider text-amber-400">
                      {promo.code}
                    </span>
                  </div>
                )}
              </div>

              {/* Promo Products */}
              <div className="p-6 sm:p-8 bg-slate-50/50">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {promo.products.map((product) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      slug={product.slug}
                      price={product.price}
                      compareAtPrice={product.compareAtPrice}
                      category={product.category}
                      image={product.image}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
