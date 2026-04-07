import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters, ProductPagination } from "@/components/product-filters";
import { MobileFilters } from "@/components/mobile-filters";
import { ScrollReveal } from "@/components/scroll-reveal";
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
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <ScrollReveal direction="down">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase">
              Nos <span className="text-[#1E40AF]">Produits</span>
            </h1>
            <p className="mt-4 text-xl text-slate-400 max-w-2xl font-medium">
              Découvrez notre gamme complète d'équipements sportifs de qualité.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginated.map((product, idx) => (
                    <ScrollReveal key={product.id} delay={(idx % 6) * 100} direction="up" className="h-full">
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

                <div className="mt-12">
                  <Suspense fallback={null}>
                    <ProductPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                    />
                  </Suspense>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="bg-slate-100 rounded-full p-6 mb-6">
                  <svg
                    className="h-12 w-12 text-slate-400"
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
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Aucun produit trouvé
                </h3>
                <p className="text-slate-500 max-w-md">
                  Essayez de modifier vos filtres ou votre recherche pour trouver
                  ce que vous cherchez.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
