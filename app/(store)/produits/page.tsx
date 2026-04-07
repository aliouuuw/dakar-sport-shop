import { Suspense } from "react";
import { ProductCard } from "@/components/product-card";
import { ProductFilters, ProductPagination } from "@/components/product-filters";
import { MobileFilters } from "@/components/mobile-filters";

import { ScrollReveal } from "@/components/scroll-reveal";

// Mock data — will be replaced by DB queries
const ALL_PRODUCTS = [
  {
    id: "1",
    name: "Maillot Domicile Equipe Nationale Sénégal 2024",
    slug: "maillot-senegal-2024",
    price: 35000,
    compareAtPrice: 45000,
    category: "Football",
    categorySlug: "football",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    createdAt: "2024-03-20",
  },
  {
    id: "2",
    name: "Chaussures de Running Pro X-Vite",
    slug: "running-pro-x-vite",
    price: 65000,
    category: "Running",
    categorySlug: "running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-18",
  },
  {
    id: "3",
    name: "Ballon de Basket Officiel Taille 7",
    slug: "ballon-basket-t7",
    price: 25000,
    compareAtPrice: 30000,
    category: "Basketball",
    categorySlug: "basketball",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-15",
  },
  {
    id: "4",
    name: "Haltères Réglables 20kg (Set de 2)",
    slug: "halteres-20kg-set",
    price: 45000,
    category: "Fitness",
    categorySlug: "fitness",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-12",
  },
  {
    id: "5",
    name: "Gants de Boxe Entraînement 12oz",
    slug: "gants-boxe-12oz",
    price: 22000,
    category: "Sports de Combat",
    categorySlug: "sports-de-combat",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-10",
  },
  {
    id: "6",
    name: "Tapis de Yoga Antidérapant Épais",
    slug: "tapis-yoga-epais",
    price: 15000,
    compareAtPrice: 20000,
    category: "Fitness",
    categorySlug: "fitness",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-08",
  },
  {
    id: "7",
    name: "Raquette de Tennis Pro Carbone",
    slug: "raquette-tennis-pro",
    price: 85000,
    category: "Tennis",
    categorySlug: "tennis",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    createdAt: "2024-03-22",
  },
  {
    id: "8",
    name: "Sac de Sport Imperméable 50L",
    slug: "sac-sport-50l",
    price: 18000,
    category: "Accessoires",
    categorySlug: "accessoires",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-05",
  },
  {
    id: "9",
    name: "Maillot FC Barcelone 2024",
    slug: "maillot-barca-2024",
    price: 42000,
    category: "Football",
    categorySlug: "football",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
    isNew: true,
    createdAt: "2024-03-21",
  },
  {
    id: "10",
    name: "Chaussures de Football Crampons Moulés",
    slug: "crampons-moules",
    price: 55000,
    compareAtPrice: 70000,
    category: "Football",
    categorySlug: "football",
    image: "https://images.unsplash.com/photo-1511886929837-354d827aafe2?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-03-01",
  },
  {
    id: "11",
    name: "Lunettes de Natation Pro Anti-Buée",
    slug: "lunettes-natation-pro",
    price: 12000,
    category: "Natation",
    categorySlug: "natation",
    image: "https://images.unsplash.com/photo-1519315901367-f34f9274ceb3?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-02-28",
  },
  {
    id: "12",
    name: "Short de Basketball Respirant",
    slug: "short-basketball",
    price: 18000,
    category: "Basketball",
    categorySlug: "basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-02-25",
  },
  {
    id: "13",
    name: "Corde à Sauter Professionnelle",
    slug: "corde-sauter-pro",
    price: 8000,
    compareAtPrice: 12000,
    category: "Fitness",
    categorySlug: "fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-02-20",
  },
  {
    id: "14",
    name: "Protège-Tibias Pro Football",
    slug: "protege-tibias-pro",
    price: 10000,
    category: "Football",
    categorySlug: "football",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-02-18",
  },
  {
    id: "15",
    name: "Maillot de Bain Compétition Homme",
    slug: "maillot-bain-competition",
    price: 20000,
    category: "Natation",
    categorySlug: "natation",
    image: "https://images.unsplash.com/photo-1519315901367-f34f9274ceb3?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-02-15",
  },
  {
    id: "16",
    name: "Ballon de Football Officiel Taille 5",
    slug: "ballon-foot-t5",
    price: 15000,
    category: "Football",
    categorySlug: "football",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    createdAt: "2024-02-10",
  },
];

const CATEGORIES = [
  { name: "Football", slug: "football", count: 5 },
  { name: "Basketball", slug: "basketball", count: 2 },
  { name: "Running", slug: "running", count: 1 },
  { name: "Fitness", slug: "fitness", count: 3 },
  { name: "Natation", slug: "natation", count: 2 },
  { name: "Tennis", slug: "tennis", count: 1 },
  { name: "Sports de Combat", slug: "sports-de-combat", count: 1 },
  { name: "Accessoires", slug: "accessoires", count: 1 },
];

const PRODUCTS_PER_PAGE = 9;

interface SearchParams {
  category?: string;
  sort?: string;
  q?: string;
  page?: string;
}

function getFilteredProducts(searchParams: SearchParams) {
  let products = [...ALL_PRODUCTS];

  // Filter by category
  if (searchParams.category) {
    products = products.filter(
      (p) => p.categorySlug === searchParams.category
    );
  }

  // Filter by search query
  if (searchParams.q) {
    const query = searchParams.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
    );
  }

  // Sort
  switch (searchParams.sort) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name, "fr"));
      break;
    case "newest":
    default:
      products.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  return products;
}

export default async function ProduitsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const filtered = getFilteredProducts(params);
  const currentPage = Math.max(1, parseInt(params.page || "1", 10));
  const totalPages = Math.ceil(filtered.length / PRODUCTS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

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
              categories={CATEGORIES}
              totalCount={ALL_PRODUCTS.length}
              filteredCount={filtered.length}
            />
          </Suspense>

          {/* Sidebar Filters (Hidden on Mobile) */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="lg:sticky lg:top-36">
              <Suspense fallback={null}>
                <ProductFilters
                  categories={CATEGORIES}
                  totalCount={ALL_PRODUCTS.length}
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
                        id={product.id}
                        name={product.name}
                        slug={product.slug}
                        price={product.price}
                        compareAtPrice={product.compareAtPrice}
                        category={product.category}
                        image={product.image}
                        isNew={product.isNew}
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
