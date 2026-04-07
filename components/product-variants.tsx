"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { WhatsappIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Variant {
  id: string;
  name: string;
  priceOffset?: number; // Added to base price
}

interface ProductVariantsProps {
  product: {
    id: string;
    name: string;
    price: number;
    slug: string;
  };
  sizes?: Variant[];
  colors?: Variant[];
}

export function ProductVariants({ product, sizes = [], colors = [] }: ProductVariantsProps) {
  const [selectedSize, setSelectedSize] = useState<Variant | null>(sizes[0] || null);
  const [selectedColor, setSelectedColor] = useState<Variant | null>(colors[0] || null);
  const [isHovered, setIsHovered] = useState(false);

  // Calculate final price based on base price + variant offsets
  const currentPrice = 
    product.price + 
    (selectedSize?.priceOffset || 0) + 
    (selectedColor?.priceOffset || 0);

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("fr-SN", {
      style: "currency",
      currency: "XOF",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Build WhatsApp message with variant info
  const variantDetails = [
    selectedSize ? `Taille: ${selectedSize.name}` : null,
    selectedColor ? `Couleur: ${selectedColor.name}` : null
  ].filter(Boolean).join(" | ");

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé par: ${product.name}\n` +
    `${variantDetails ? `Variante: ${variantDetails}\n` : ""}` +
    `Prix: ${formatPrice(currentPrice)}\n` +
    `Lien: ${process.env.NEXT_PUBLIC_APP_URL || "https://dakarsport.sn"}/produits/${product.slug}`
  );

  const handleWhatsAppClick = async () => {
    // Lead tracking (mocked for now)
    try {
      console.log("Lead tracked:", {
        productId: product.id,
        sizeId: selectedSize?.id,
        colorId: selectedColor?.id,
        source: "product_page",
        timestamp: new Date().toISOString()
      });
      // Future: await createLeadAction(...)
    } catch (e) {
      console.error("Failed to track lead", e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Price Display (updates dynamically) */}
      <div className="border-y border-slate-200 py-6 transition-all duration-300">
        <div className="flex items-baseline gap-4">
          <span className="text-5xl font-black tracking-tight text-slate-900 transition-all duration-500">
            {formatPrice(currentPrice)}
          </span>
        </div>
      </div>

      {/* Variant Selectors */}
      <div className="space-y-5">
        {sizes.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Taille
              </label>
              <span className="text-sm font-medium text-slate-500">
                {selectedSize?.name || "Sélectionnez une taille"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size.id}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    "flex h-12 min-w-[3rem] items-center justify-center rounded-xl border-2 px-4 text-sm font-bold transition-all",
                    selectedSize?.id === size.id
                      ? "border-[#1E40AF] bg-[#1E40AF] text-white shadow-md scale-105"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {colors.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Couleur
              </label>
              <span className="text-sm font-medium text-slate-500">
                {selectedColor?.name || "Sélectionnez une couleur"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "flex h-12 items-center justify-center rounded-xl border-2 px-4 text-sm font-bold transition-all",
                    selectedColor?.id === color.id
                      ? "border-[#1E40AF] bg-[#1E40AF] text-white shadow-md scale-105"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                  )}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="pt-2">
        <Button
          asChild
          size="lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleWhatsAppClick}
          className={cn(
            "w-full bg-green-500 hover:bg-green-600 text-white h-16 text-lg font-bold rounded-2xl shadow-lg transition-all duration-300",
            isHovered && "shadow-green-500/30 -translate-y-1"
          )}
        >
          <a
            href={`https://wa.me/22177634511?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full"
          >
            <HugeiconsIcon 
              icon={WhatsappIcon} 
              size={24} 
              className={cn("mr-3 transition-transform duration-300", isHovered && "scale-110")} 
            />
            Commander via WhatsApp
          </a>
        </Button>
        <p className="text-center text-sm text-slate-500 font-medium mt-4">
          Paiement à la livraison • Retour sous 14 jours
        </p>
      </div>
    </div>
  );
}
