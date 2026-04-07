import { getCategories } from "@/lib/actions/categories";
import { getProductCountByCategory } from "@/lib/actions/products";
import { CategoriesClient } from "./categories-client";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const [categories, productCounts] = await Promise.all([
    getCategories(),
    getProductCountByCategory(),
  ]);

  return <CategoriesClient categories={categories} productCounts={productCounts} />;
}
