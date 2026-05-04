import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters, ProductPagination } from "@/components/product-filters";
import { MobileFilters } from "@/components/mobile-filters";
import { ScrollReveal } from "@/components/scroll-reveal";
import { StorePageHeader } from "@/components/storefront-ui";
import { getProducts, getProductCountByCategory } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";

const PRODUCTS_PER_PAGE = 9;

interface SearchParams {
  category?: string;
  sort?: string;
  q?: string;
  page?: string;
}

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const [allProducts, allCategories, countByCategory] = await Promise.all([
    getProducts({ active: true, limit: 500 }),
    getCategories(),
    getProductCountByCategory(),
  ]);

  let filtered = [...allProducts];

  if (params.category) {
    filtered = filtered.filter((p) => p.categorySlug === params.category);
  }

  if (params.q) {
    const query = params.q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        (p.categoryName ?? "").toLowerCase().includes(query)
    );
  }

  switch (params.sort) {
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name, "fr"));
      break;
    case "newest":
    default:
      filtered.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const categories = allCategories
    .filter((c) => (countByCategory[c.id] ?? 0) > 0)
    .map((c) => ({ name: c.name, slug: c.slug, count: countByCategory[c.id] ?? 0 }));

  return (
    <div className="bg-white min-h-screen">
      <ScrollReveal direction="down">
        <StorePageHeader
          eyebrow="Catalogue complet"
          title="Tous les équipements"
          description="Découvrez notre gamme complète d'équipements sportifs de qualité pour clubs, athlètes et passionnés."
          variant="blue"
        />
      </ScrollReveal>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Mobile Filters (Hidden on Desktop) */}
          <Suspense fallback={null}>
            <MobileFilters 
              categories={categories}
              totalCount={allProducts.length}
              filteredCount={filtered.length}
            />
          </Suspense>

          {/* Sidebar Filters (Hidden on Mobile) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="lg:sticky lg:top-36">
              <Suspense fallback={null}>
                <ProductFilters
                  categories={categories}
                  totalCount={allProducts.length}
                  filteredCount={filtered.length}
                />
              </Suspense>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {paginated.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {paginated.map((product, idx) => (
                    <ScrollReveal key={product.id} delay={(idx % 6) * 80} direction="up" className="h-full">
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

                <div className="mt-16">
                  <Suspense fallback={null}>
                    <ProductPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </Suspense>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center">
                <svg
                  className="h-16 w-16 text-slate-200 mb-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                  />
                </svg>
                <h3 className="font-heading font-bold italic text-3xl text-slate-900 mb-2 leading-none">
                  Aucun résultat
                </h3>
                <p className="text-sm text-slate-500 max-w-sm mt-2">
                  Essayez de modifier vos filtres ou votre recherche pour trouver ce que vous cherchez.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
