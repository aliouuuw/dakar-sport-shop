"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use first image if no images provided
  const displayImages = images && images.length > 0 ? images : [images[0]];
  const mainImage = displayImages[selectedIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-slate-100 border border-slate-200">
        <Image
          src={mainImage}
          alt={productName}
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Thumbnails */}
      {displayImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {displayImages.map((image, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={cn(
                "relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 transition-all",
                selectedIndex === idx
                  ? "border-[#1E40AF] shadow-md"
                  : "border-slate-200 hover:border-slate-300"
              )}
            >
              <Image
                src={image}
                alt={`${productName} - Image ${idx + 1}`}
                fill
                className="object-cover object-center"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
