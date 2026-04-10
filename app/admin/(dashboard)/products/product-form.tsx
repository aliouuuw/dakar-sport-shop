"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, SaveIcon, Delete01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import { createProduct, updateProduct, deleteProduct, type ProductInput } from "@/lib/actions/products"

type Category = { id: number; name: string; slug: string }

type InitialProduct = {
  id: number
  name: string
  description: string | null
  price: number
  compareAtPrice: number | null
  images: string[]
  categoryId: number | null
  featured: boolean
  active: boolean
  stock: number
}

function Spin() {
  return (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[]
  product?: InitialProduct
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const isEdit = !!product

  const [name, setName] = useState(product?.name ?? "")
  const [description, setDescription] = useState(product?.description ?? "")
  const [categoryId, setCategoryId] = useState(String(product?.categoryId ?? ""))
  const [price, setPrice] = useState(String(product?.price ?? ""))
  const [compareAtPrice, setCompareAtPrice] = useState(String(product?.compareAtPrice ?? ""))
  const [images, setImages] = useState<string[]>(
    product?.images?.length ? [...product.images, "", ""] : ["", "", ""]
  )
  const [active, setActive] = useState(product?.active ?? true)
  const [featured, setFeatured] = useState(product?.featured ?? false)
  const [stock, setStock] = useState(String(product?.stock ?? "0"))

  const updateImage = (i: number, val: string) => {
    setImages((prev) => prev.map((img, idx) => (idx === i ? val : img)))
  }

  const handleSubmit = () => {
    const parsedCategoryId = parseInt(categoryId, 10)
    if (!name.trim() || !categoryId || isNaN(parsedCategoryId)) {
      toast.error("Veuillez remplir tous les champs obligatoires.")
      return
    }
    const parsedPrice = parseInt(price, 10)
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      toast.error("Le prix doit être un nombre positif.")
      return
    }

    const data: ProductInput = {
      name: name.trim(),
      description: description.trim() || null,
      price: parsedPrice,
      compareAtPrice: compareAtPrice ? parseInt(compareAtPrice, 10) || null : null,
      images: images.filter((img) => img.trim().length > 0),
      categoryId: parsedCategoryId,
      featured,
      active,
      stock: parseInt(stock, 10) || 0,
    }

    startTransition(async () => {
      const result = isEdit
        ? await updateProduct(product!.id, data)
        : await createProduct(data)

      if (result.success) {
        toast.success(isEdit ? "Produit mis à jour" : "Produit créé", {
          description: isEdit
            ? "Les modifications ont été enregistrées."
            : "Le produit a été créé avec succès.",
        })
        router.push("/admin/products")
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  const handleDelete = () => {
    if (!product) return
    startTransition(async () => {
      const result = await deleteProduct(product.id)
      if (result.success) {
        toast.success("Produit supprimé")
        router.push("/admin/products")
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-500 hover:text-slate-900">
            <Link href="/admin/products">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {isEdit ? "Modifier le produit" : "Nouveau produit"}
              </h1>
              {isEdit && (
                <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${
                  active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                }`}>
                  {active ? "Actif" : "Inactif"}
                </Badge>
              )}
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {isEdit
                ? `Produit #${product!.id} — modifiez les informations ci-dessous.`
                : "Remplissez les informations pour créer un nouveau produit."}
            </p>
          </div>
        </div>

        {isEdit && (
          <Button
            variant="ghost"
            disabled={isPending}
            onClick={handleDelete}
            className="text-[#DC2626] hover:bg-red-50 hover:text-[#DC2626] border border-transparent hover:border-red-200"
          >
            <HugeiconsIcon icon={Delete01Icon} size={16} className="mr-2" />
            Supprimer
          </Button>
        )}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <div className="flex flex-col gap-6">
          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Informations générales</CardTitle>
              <CardDescription>Nom, description et catégorie du produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Nom du produit <span className="text-[#DC2626]">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Ballon de foot Pro"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Décrivez le produit en détail..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Catégorie <span className="text-[#DC2626]">*</span>
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                >
                  <option value="">Sélectionner une catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Prix</CardTitle>
              <CardDescription>Prix de vente et prix barré (optionnel).</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Prix (FCFA) <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="15000"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-16 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">FCFA</span>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Prix barré (FCFA)</label>
                <div className="relative">
                  <input
                    type="number"
                    value={compareAtPrice}
                    onChange={(e) => setCompareAtPrice(e.target.value)}
                    placeholder="18000"
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 pr-16 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400">FCFA</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Images</CardTitle>
              <CardDescription>URLs des images du produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              {images.map((url, i) => (
                <div key={i}>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Image {i + 1}{i === 0 && <span className="text-[#DC2626]"> *</span>}
                  </label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => updateImage(i, e.target.value)}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-6">
          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Visibilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Produit actif</p>
                  <p className="text-xs text-slate-400">Visible sur le storefront</p>
                </div>
                <Switch checked={active} onCheckedChange={setActive} />
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Mis en avant</p>
                  <p className="text-xs text-slate-400">Affiché sur la page d&apos;accueil</p>
                </div>
                <Switch checked={featured} onCheckedChange={setFeatured} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Stock</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <label className="mb-1 block text-sm font-medium text-slate-700">Quantité</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                min={0}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
              {parseInt(stock, 10) <= 10 && parseInt(stock, 10) >= 0 && isEdit && (
                <p className="mt-1.5 text-xs font-medium text-[#DC2626]">⚠ Stock faible</p>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]"
            >
              {isPending ? (
                <><Spin />{isEdit ? "Enregistrement..." : "Création..."}</>
              ) : (
                <><HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />{isEdit ? "Enregistrer les modifications" : "Créer le produit"}</>
              )}
            </Button>
            <Button variant="outline" asChild className="w-full border-slate-200 text-slate-700">
              <Link href="/admin/products">Annuler</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
