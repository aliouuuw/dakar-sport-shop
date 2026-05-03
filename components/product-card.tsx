import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

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
      <div className="h-full flex flex-col bg-white overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_oklch(0.1_0.02_265/0.08)]">
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden bg-[oklch(0.97_0.005_265)]">
          {/* Intense brand wash on hover — Expressive motion */}
          <div className="absolute inset-0 bg-[#1E40AF]/0 group-hover:bg-[#1E40AF] mix-blend-multiply transition-colors duration-500 z-10" />
          {isNew && (
            <span className="absolute top-3 left-3 z-20 text-[9px] font-bold uppercase tracking-[0.25em] text-white bg-[#1E40AF] px-2 py-1">
              Nouveau
            </span>
          )}
          {compareAtPrice && compareAtPrice > price && (
            <span className="absolute top-3 right-3 z-20 text-[9px] font-bold uppercase tracking-[0.25em] text-white bg-[#DC2626] px-2 py-1">
              Promo
            </span>
          )}
          {image ? (
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF]/10 to-[#1E40AF]/5" />
          )}
        </div>

        {/* Info area */}
        <div className="p-4 flex flex-col flex-1">
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            {category}
          </span>
          <h3 className="font-sans font-semibold text-[oklch(0.15_0.02_265)] text-sm leading-snug line-clamp-2 mb-3 group-hover:text-[#1E40AF] transition-colors duration-300">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100">
            <div className="flex flex-col gap-0.5">
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-[10px] text-slate-400 line-through">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
              <span className="font-heading font-bold italic text-xl text-[oklch(0.15_0.02_265)] leading-none tracking-tight">
                {formatPrice(price)}
              </span>
            </div>
            <HugeiconsIcon
              icon={ArrowRight01Icon}
              size={14}
              className="text-slate-300 group-hover:text-[#DC2626] transition-all duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>
        {/* Expressive motion edge */}
        <div className="h-1 w-full bg-[#1E40AF] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </Link>
  );
}
