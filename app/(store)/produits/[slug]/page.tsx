import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, WhatsappIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductCard } from "@/components/product-card";
import { ProductVariants } from "@/components/product-variants";

// Mock data — same as products listing
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
    images: [
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Maillot officiel de l'équipe nationale du Sénégal pour la saison 2024. Confortable, respirant et durable pour tous les matchs.",
    stock: 15,
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
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Chaussures de running haute performance avec semelle amortissante et support optimal de la voûte plantaire.",
    stock: 8,
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
    images: [
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Ballon de basketball officiel conforme aux normes internationales. Parfait pour l'entraînement et la compétition.",
    stock: 20,
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
    images: [
      "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Set de 2 haltères réglables de 20kg chacun. Idéal pour l'entraînement à domicile avec plusieurs niveaux de poids.",
    stock: 5,
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
    images: [
      "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Gants de boxe professionnels 12oz avec rembourrage optimal pour l'entraînement et les sparrings.",
    stock: 12,
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
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Tapis de yoga épais et antidérapant pour une pratique confortable et sécurisée.",
    stock: 25,
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
    images: [
      "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Raquette de tennis en carbone haute performance pour joueurs avancés.",
    stock: 3,
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
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Sac de sport imperméable 50L avec compartiments multiples pour tous vos équipements.",
    stock: 18,
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
    images: [
      "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Maillot officiel du FC Barcelone 2024. Authentique et de haute qualité.",
    stock: 10,
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
    images: [
      "https://images.unsplash.com/photo-1511886929837-354d827aafe2?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Chaussures de football avec crampons moulés pour une meilleure adhérence et contrôle du ballon.",
    stock: 7,
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
    images: [
      "https://images.unsplash.com/photo-1519315901367-f34f9274ceb3?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Lunettes de natation professionnelles avec traitement anti-buée et verres clairs.",
    stock: 22,
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
    images: [
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Short de basketball respirant et confortable pour l'entraînement et les matchs.",
    stock: 16,
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
    images: [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Corde à sauter professionnelle avec poignées ergonomiques pour un entraînement cardio efficace.",
    stock: 30,
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
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Protège-tibias professionnel pour une protection maximale pendant les matchs.",
    stock: 14,
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
    images: [
      "https://images.unsplash.com/photo-1519315901367-f34f9274ceb3?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Maillot de bain de compétition pour nageurs professionnels avec tissu haute performance.",
    stock: 9,
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
    images: [
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
    ],
    description: "Ballon de football officiel taille 5 conforme aux normes internationales.",
    stock: 24,
    createdAt: "2024-02-10",
  },
];

function getProductBySlug(slug: string) {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

function getRelatedProducts(categorySlug: string, currentProductId: string) {
  return ALL_PRODUCTS.filter(
    (p) => p.categorySlug === categorySlug && p.id !== currentProductId
  ).slice(0, 4);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit non trouvé",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${product.name} | Dakar Sport`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product.categorySlug, product.id);

  // Mock variants for the selected product
  const mockSizes = [
    { id: "s", name: "S" },
    { id: "m", name: "M" },
    { id: "l", name: "L" },
    { id: "xl", name: "XL" },
  ];
  
  const mockColors = [
    { id: "noir", name: "Noir" },
    { id: "blanc", name: "Blanc" },
    { id: "rouge", name: "Rouge", priceOffset: 2000 },
  ];

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 border-b border-slate-200">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-slate-500 hover:text-slate-700">
            Accueil
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/produits" className="text-slate-500 hover:text-slate-700">
            Produits
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href={`/produits?category=${product.categorySlug}`}
            className="text-slate-500 hover:text-slate-700"
          >
            {product.category}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900 font-semibold">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <div>
            <ProductGallery
              images={product.images || [product.image]}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                    {product.name}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500 uppercase tracking-wider font-semibold">
                    {product.category}
                  </p>
                </div>
                {product.isNew && (
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
                    Nouveau
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? "fill-amber-400 text-amber-400" : "fill-slate-300 text-slate-300"
                      }`}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-slate-500">(42 avis)</span>
              </div>
            </div>

            {/* Price & Variants (Replaces static price and CTA buttons) */}
            <ProductVariants 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                slug: product.slug,
              }}
              sizes={product.category === "Football" || product.category === "Basketball" ? mockSizes : undefined}
              colors={product.category === "Running" ? mockColors : undefined}
            />

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <div
                className={`h-3 w-3 rounded-full ${
                  product.stock > 5 ? "bg-green-500" : "bg-amber-500"
                }`}
              />
              <span className="text-sm font-semibold text-slate-700">
                {product.stock > 0 ? (
                  <>
                    {product.stock} en stock
                    {product.stock <= 5 && " — Quantité limitée"}
                  </>
                ) : (
                  "Rupture de stock"
                )}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">Description</h2>
              <p className="text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Card className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Livraison
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    Gratuite à Dakar
                  </p>
                </CardContent>
              </Card>
              <Card className="border-slate-200">
                <CardContent className="p-4 text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Garantie
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    12 mois
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-slate-200 pt-16">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={relProduct.id}
                  name={relProduct.name}
                  slug={relProduct.slug}
                  price={relProduct.price}
                  compareAtPrice={relProduct.compareAtPrice}
                  category={relProduct.category}
                  image={relProduct.image}
                  isNew={relProduct.isNew}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
