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
import { getProductBySlug as getProductBySlugFromDB, getProducts } from "@/lib/actions/products";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugFromDB(slug);

  if (!product) {
    return {
      title: "Produit non trouvé",
      description: "Le produit que vous recherchez n'existe pas.",
    };
  }

  return {
    title: `${product.name} | Dakar Sport`,
    description: product.description ?? undefined,
    openGraph: {
      title: product.name,
      description: product.description ?? undefined,
      images: product.images[0]
        ? [{ url: product.images[0], width: 600, height: 600, alt: product.name }]
        : [],
    },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlugFromDB(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.categoryId
    ? (await getProducts({ active: true, categoryId: product.categoryId, limit: 5 }))
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

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
            href={`/produits?category=${product.categorySlug ?? ""}`}
            className="text-slate-500 hover:text-slate-700"
          >
            {product.categoryName}
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
              images={product.images.length > 0 ? product.images : []}
              productName={product.name}
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-8">
            {/* Header */}
            <div>
              <div className="flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
                    {product.name}
                  </h1>
                  <p className="mt-4 text-sm text-[#1E40AF] uppercase tracking-[0.2em] font-black">
                    {product.categoryName}
                  </p>
                </div>
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
                id: String(product.id),
                name: product.name,
                price: product.price,
                slug: product.slug,
              }}
              sizes={product.categoryName === "Football" || product.categoryName === "Basketball" ? [
                { id: "s", name: "S" },
                { id: "m", name: "M" },
                { id: "l", name: "L" },
                { id: "xl", name: "XL" },
              ] : undefined}
              colors={product.categoryName === "Running" ? [
                { id: "noir", name: "Noir" },
                { id: "blanc", name: "Blanc" },
                { id: "rouge", name: "Rouge", priceOffset: 2000 },
              ] : undefined}
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
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em] mb-4">Description</h2>
              <p className="text-slate-600 text-lg leading-relaxed font-medium">{product.description}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
              <div className="bg-slate-50 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Livraison
                </p>
                <p className="text-sm font-bold text-slate-900">
                  Gratuite à Dakar
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-5 text-center flex flex-col items-center justify-center">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                  Garantie
                </p>
                <p className="text-sm font-bold text-slate-900">
                  12 mois inclus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-slate-200 pt-16">
            <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase mb-8">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard
                  key={relProduct.id}
                  id={String(relProduct.id)}
                  name={relProduct.name}
                  slug={relProduct.slug}
                  price={relProduct.price}
                  compareAtPrice={relProduct.compareAtPrice ?? undefined}
                  category={relProduct.categoryName ?? ""}
                  image={relProduct.images[0] ?? ""}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
