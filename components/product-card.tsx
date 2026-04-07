import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ShoppingBag01Icon } from "@hugeicons/core-free-icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice?: number | null;
  category: string;
  image: string;
  isNew?: boolean;
}

export function ProductCard({
  name,
  slug,
  price,
  compareAtPrice,
  category,
  image,
  isNew,
}: ProductCardProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Link href={`/produits/${slug}`} className="group block h-full">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 border-slate-100 bg-white rounded-2xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
          <div className="absolute inset-0 bg-black/40 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          {isNew && (
            <Badge className="absolute top-3 left-3 z-20 bg-blue-600 text-white border-none text-xs font-black uppercase tracking-wider px-2.5 py-1">
              Nouveau
            </Badge>
          )}
          {compareAtPrice && compareAtPrice > price && (
            <Badge className="absolute top-3 right-3 z-20 bg-red-600 text-white border-none text-xs font-black uppercase tracking-wider px-2.5 py-1">
              Promo
            </Badge>
          )}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-5 flex flex-col flex-1 bg-white">
          <div className="text-[10px] font-black text-slate-400 mb-2 uppercase tracking-[0.15em]">
            {category}
          </div>
          <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 min-h-[2.5rem] mb-4 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xs text-slate-400 line-through font-semibold">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
              <span className="font-black text-lg text-slate-900 leading-none">
                {formatPrice(price)}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#1E40AF] group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
              <HugeiconsIcon icon={ShoppingBag01Icon} size={18} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
