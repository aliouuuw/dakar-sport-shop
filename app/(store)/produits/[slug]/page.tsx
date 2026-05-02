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
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 py-5 border-b border-slate-100">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Link href="/" className="text-slate-400 hover:text-slate-700 transition-colors">
            Accueil
          </Link>
          <span className="text-slate-300">/</span>
          <Link href="/produits" className="text-slate-400 hover:text-slate-700 transition-colors">
            Produits
          </Link>
          <span className="text-slate-300">/</span>
          <Link
            href={`/produits?category=${product.categorySlug ?? ""}`}
            className="text-slate-400 hover:text-slate-700 transition-colors"
          >
            {product.categoryName}
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-slate-900">{product.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
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
              <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-[#1E40AF] mb-3">
                {product.categoryName}
              </span>
              <h1 className="font-heading font-bold italic text-5xl sm:text-6xl text-slate-900 leading-none tracking-tight">
                {product.name}
              </h1>
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
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4">Description</h2>
              <p className="text-slate-600 text-sm leading-relaxed">{product.description}</p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-px pt-6 border-t border-slate-100 bg-slate-100">
              <div className="bg-white p-5 text-center flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1">
                  Livraison
                </p>
                <p className="text-xs font-bold text-slate-900">
                  Gratuite à Dakar
                </p>
              </div>
              <div className="bg-white p-5 text-center flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-1">
                  Garantie
                </p>
                <p className="text-xs font-bold text-slate-900">
                  12 mois inclus
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-slate-100 pt-16">
            <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
              Dans la même catégorie
            </span>
            <h2 className="font-heading font-bold italic text-4xl text-slate-900 leading-none tracking-tight mb-10">
              Produits similaires
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
