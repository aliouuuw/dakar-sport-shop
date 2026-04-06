import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, SaveIcon, Delete01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const product = {
  id: 1,
  name: "Ballon de foot Pro",
  description: "Ballon officiel de compétition taille 5, coutures renforcées et chambre à air de haute précision. Idéal pour les matchs et l'entraînement intensif.",
  category: "Football",
  price: 15000,
  compareAt: 18000,
  stock: 24,
  active: true,
  featured: true,
  images: [
    "https://example.com/ballon-1.jpg",
    "https://example.com/ballon-2.jpg",
    "",
  ],
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

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
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Modifier le produit</h1>
              <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${
                product.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
              }`}>
                {product.active ? "Actif" : "Inactif"}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">Produit #{id} — dernière modification il y a 3 jours.</p>
          </div>
        </div>
        <Button variant="ghost" className="text-[#DC2626] hover:bg-red-50 hover:text-[#DC2626] border border-transparent hover:border-red-200">
          <HugeiconsIcon icon={Delete01Icon} size={16} className="mr-2" />
          Supprimer
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Left column — main fields */}
        <div className="flex flex-col gap-6">
          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Informations générales</CardTitle>
              <CardDescription>Nom, description et catégorie du produit.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Nom du produit <span className="text-[#DC2626]">*</span></label>
                <input
                  type="text"
                  defaultValue={product.name}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  rows={5}
                  defaultValue={product.description}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Catégorie <span className="text-[#DC2626]">*</span></label>
                <select defaultValue={product.category} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
                  <option value="">Sélectionner une catégorie</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Running</option>
                  <option>Fitness</option>
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
                <label className="mb-1 block text-sm font-medium text-slate-700">Prix (FCFA) <span className="text-[#DC2626]">*</span></label>
                <div className="relative">
                  <input
                    type="number"
                    defaultValue={product.price}
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
                    defaultValue={product.compareAt}
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
              {product.images.map((url, i) => (
                <div key={i}>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Image {i + 1}{i === 0 && <span className="text-[#DC2626]"> *</span>}</label>
                  <input
                    type="url"
                    defaultValue={url}
                    placeholder="https://..."
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column — toggles & publish */}
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
                <button
                  role="switch"
                  aria-checked={product.active}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    product.active ? "bg-[#1E40AF]" : "bg-slate-200"
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    product.active ? "translate-x-4" : "translate-x-0.5"
                  }`} />
                </button>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Mis en avant</p>
                  <p className="text-xs text-slate-400">Affiché sur la page d'accueil</p>
                </div>
                <button
                  role="switch"
                  aria-checked={product.featured}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    product.featured ? "bg-[#1E40AF]" : "bg-slate-200"
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                    product.featured ? "translate-x-4" : "translate-x-0.5"
                  }`} />
                </button>
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
                defaultValue={product.stock}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
              {product.stock <= 10 && (
                <p className="mt-1.5 text-xs font-medium text-[#DC2626]">⚠ Stock faible</p>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
              <HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />
              Enregistrer les modifications
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
