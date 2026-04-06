import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowDown01Icon, ArrowUp01Icon, Edit01Icon, GridIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const categories = [
  { name: "Football", slug: "football", products: 32, order: 1, active: true },
  { name: "Basketball", slug: "basketball", products: 14, order: 2, active: true },
  { name: "Running", slug: "running", products: 18, order: 3, active: true },
  { name: "Fitness", slug: "fitness", products: 24, order: 4, active: true },
] as const

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catégories</h1>
          <p className="mt-1 text-sm text-slate-500">Organisez vos catégories de produits et définissez leur ordre d'affichage.</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={GridIcon} size={18} className="text-[#1E40AF]" />
              Liste des catégories
            </CardTitle>
            <CardDescription>Réordonnez les catégories pour contrôler leur ordre d'apparition sur le storefront.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {categories.map((category) => (
                <div key={category.slug} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{category.name}</span>
                      <Badge variant="secondary" className="h-5 rounded-md bg-blue-100 px-1.5 text-[10px] font-semibold text-[#1E40AF] border-none">
                        {category.products} produits
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">/{category.slug} · Ordre {category.order}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                      <HugeiconsIcon icon={ArrowUp01Icon} size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700">
                      <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#1E40AF]">
                      <HugeiconsIcon icon={Edit01Icon} size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg text-slate-900">Édition rapide</CardTitle>
            <CardDescription>Créez ou modifiez une catégorie et définissez son ordre d'affichage.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nom</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20" defaultValue="Football" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Slug</label>
              <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20" defaultValue="football" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Ordre d'affichage</label>
              <input type="number" className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20" defaultValue={1} />
            </div>
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">Enregistrer la catégorie</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
