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
    <Link href={`/produits/${slug}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-slate-200">
        <div className="relative aspect-square overflow-hidden bg-slate-100">
          {isNew && (
            <Badge className="absolute top-2 left-2 z-10 bg-blue-600 hover:bg-blue-700">
              Nouveau
            </Badge>
          )}
          {compareAtPrice && compareAtPrice > price && (
            <Badge className="absolute top-2 right-2 z-10 bg-red-600 hover:bg-red-700">
              Promo
            </Badge>
          )}
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
        <CardContent className="p-4">
          <div className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">
            {category}
          </div>
          <h3 className="font-semibold text-slate-900 line-clamp-2 min-h-[3rem] mb-2 group-hover:text-blue-800 transition-colors">
            {name}
          </h3>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex flex-col">
              <span className="font-bold text-lg text-slate-900">
                {formatPrice(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-sm text-slate-500 line-through">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full bg-slate-100 text-slate-900 hover:bg-blue-800 hover:text-white transition-colors"
            >
              <HugeiconsIcon icon={ShoppingBag01Icon} size={16} />
              <span className="sr-only">Ajouter au panier</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
