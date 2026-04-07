import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";
import { ProductsClient } from "./products-client";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts({ limit: 100 }),
    getCategories(),
  ]);

  return <ProductsClient products={products} categories={categories} />;
}
