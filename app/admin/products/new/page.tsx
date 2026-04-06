import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, SaveIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export default async function NewProductPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-500 hover:text-slate-900">
          <Link href="/admin/products">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nouveau produit</h1>
          <p className="mt-1 text-sm text-slate-500">Remplissez les informations pour créer un nouveau produit.</p>
        </div>
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
                  placeholder="Ex: Ballon de foot Pro"
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Description</label>
                <textarea
                  rows={5}
                  placeholder="Décrivez le produit en détail..."
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20 resize-none"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Catégorie <span className="text-[#DC2626]">*</span></label>
                <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
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
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Image {i}{i === 1 && <span className="text-[#DC2626]"> *</span>}</label>
                  <input
                    type="url"
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
                <Switch defaultChecked />
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Mis en avant</p>
                  <p className="text-xs text-slate-400">Affiché sur la page d'accueil</p>
                </div>
                <Switch />
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
                defaultValue={0}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </CardContent>
          </Card>

          <div className="flex flex-col gap-2">
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
              <HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />
              Créer le produit
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
