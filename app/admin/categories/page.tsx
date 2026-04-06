import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export default function CategoriesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catégories</h1>
          <p className="mt-1 text-sm text-slate-500">Organisez vos catégories de produits</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Nouvelle catégorie
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="text-center py-12 text-slate-500">
          <p className="text-sm">Liste des catégories à implémenter</p>
        </div>
      </div>
    </div>
  )
}
