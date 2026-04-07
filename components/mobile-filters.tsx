"use client";

import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FilterIcon, Search01Icon } from "@hugeicons/core-free-icons";
import { ProductFilters } from "./product-filters";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface MobileFiltersProps {
  categories: Category[];
  totalCount: number;
  filteredCount: number;
}

export function MobileFilters({
  categories,
  totalCount,
  filteredCount,
}: MobileFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden mb-6 flex items-center justify-between">
      <p className="text-sm font-bold text-slate-900">
        {filteredCount} produit{filteredCount !== 1 ? "s" : ""}
      </p>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="h-11 rounded-xl bg-white border-slate-200">
            <HugeiconsIcon icon={FilterIcon} size={18} className="mr-2 text-slate-500" />
            Filtres & Tri
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="pb-6 border-b border-slate-100 mb-6">
            <SheetTitle className="text-xl font-extrabold">Filtres</SheetTitle>
          </SheetHeader>
          
          <div className="pb-10">
            <ProductFilters
              categories={categories}
              totalCount={totalCount}
              filteredCount={filteredCount}
            />
          </div>

          <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 mt-auto">
            <Button 
              className="w-full h-12 bg-[#1E40AF] hover:bg-[#1e3a8a] text-white font-bold rounded-xl"
              onClick={() => setOpen(false)}
            >
              Afficher {filteredCount} résultat{filteredCount !== 1 ? "s" : ""}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
