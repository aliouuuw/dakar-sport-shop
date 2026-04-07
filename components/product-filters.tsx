"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon, FilterIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  slug: string;
  count: number;
}

interface ProductFiltersProps {
  categories: Category[];
  totalCount: number;
  filteredCount: number;
}

export function ProductFilters({
  categories,
  totalCount,
  filteredCount,
}: ProductFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "newest";
  const currentQuery = searchParams.get("q") || "";

  const createQueryString = useCallback(
    (params: Record<string, string | null>) => {
      const newParams = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null || value === "") {
          newParams.delete(key);
        } else {
          newParams.set(key, value);
        }
      }

      // Reset to page 1 when filters change
      if (!("page" in params)) {
        newParams.delete("page");
      }

      return newParams.toString();
    },
    [searchParams]
  );

  const pushParams = useCallback(
    (params: Record<string, string | null>) => {
      const qs = createQueryString(params);
      router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
    },
    [router, pathname, createQueryString]
  );

  const hasActiveFilters = currentCategory || currentQuery;

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <HugeiconsIcon
          icon={Search01Icon}
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <Input
          type="text"
          placeholder="Rechercher un produit..."
          defaultValue={currentQuery}
          onChange={(e) => {
            const value = e.target.value;
            // Debounce-like: only push on meaningful input
            if (value.length === 0 || value.length >= 2) {
              pushParams({ q: value || null });
            }
          }}
          className="pl-10 h-11 bg-white border-slate-200 rounded-xl"
        />
      </div>

      {/* Sort */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 block">
          Trier par
        </label>
        <Select
          value={currentSort}
          onValueChange={(value) => pushParams({ sort: value })}
        >
          <SelectTrigger className="h-11 bg-white border-slate-200 rounded-xl">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Nouveautés</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="name-asc">Nom A-Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
          Catégories
        </label>
        <div className="space-y-1">
          <button
            onClick={() => pushParams({ category: null })}
            className={cn(
              "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              !currentCategory
                ? "bg-[#1E40AF] text-white"
                : "text-slate-700 hover:bg-slate-100"
            )}
          >
            <span>Toutes les catégories</span>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-bold",
                !currentCategory
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-600"
              )}
            >
              {totalCount}
            </Badge>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                pushParams({
                  category: cat.slug === currentCategory ? null : cat.slug,
                })
              }
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                currentCategory === cat.slug
                  ? "bg-[#1E40AF] text-white"
                  : "text-slate-700 hover:bg-slate-100"
              )}
            >
              <span>{cat.name}</span>
              <Badge
                variant="secondary"
                className={cn(
                  "text-xs font-bold",
                  currentCategory === cat.slug
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                )}
              >
                {cat.count}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Filtres actifs
            </span>
            <button
              onClick={() => pushParams({ category: null, q: null, sort: null })}
              className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Tout effacer
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {currentCategory && (
              <Badge
                variant="secondary"
                className="bg-blue-50 text-[#1E40AF] border border-blue-200 pl-2 pr-1 py-1 gap-1 cursor-pointer hover:bg-blue-100"
                onClick={() => pushParams({ category: null })}
              >
                {categories.find((c) => c.slug === currentCategory)?.name ||
                  currentCategory}
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
              </Badge>
            )}
            {currentQuery && (
              <Badge
                variant="secondary"
                className="bg-blue-50 text-[#1E40AF] border border-blue-200 pl-2 pr-1 py-1 gap-1 cursor-pointer hover:bg-blue-100"
                onClick={() => pushParams({ q: null })}
              >
                &ldquo;{currentQuery}&rdquo;
                <HugeiconsIcon icon={Cancel01Icon} size={14} />
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="pt-4 border-t border-slate-200">
        <p className="text-sm text-slate-500">
          <span className="font-bold text-slate-900">{filteredCount}</span>{" "}
          produit{filteredCount !== 1 ? "s" : ""} trouvé
          {filteredCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
}

export function ProductPagination({
  currentPage,
  totalPages,
}: ProductPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (page <= 1) {
      newParams.delete("page");
    } else {
      newParams.set("page", String(page));
    }
    const qs = newParams.toString();
    router.push(`${pathname}${qs ? `?${qs}` : ""}`);
  };

  if (totalPages <= 1) return null;

  const pages: (number | "ellipsis")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="rounded-xl"
      >
        Précédent
      </Button>
      {pages.map((page, idx) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-slate-400">
            &hellip;
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(page)}
            className={cn(
              "rounded-xl min-w-[40px]",
              page === currentPage && "bg-[#1E40AF] hover:bg-[#1e3a8a]"
            )}
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="rounded-xl"
      >
        Suivant
      </Button>
    </nav>
  );
}
