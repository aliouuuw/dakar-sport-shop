import { notFound } from "next/navigation"
import { getProductById } from "@/lib/actions/products"
import { getCategories } from "@/lib/actions/categories"
import { ProductForm } from "../../product-form"

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [product, categories] = await Promise.all([
    getProductById(parseInt(id, 10)),
    getCategories(),
  ])

  if (!product) notFound()

  return (
    <ProductForm
      categories={categories}
      product={{
        id: product.id,
        name: product.name,
        description: product.description ?? null,
        price: product.price,
        compareAtPrice: product.compareAtPrice ?? null,
        images: product.images,
        categoryId: product.categoryId ?? null,
        featured: product.featured,
        active: product.active,
        stock: product.stock,
      }}
    />
  )
}
