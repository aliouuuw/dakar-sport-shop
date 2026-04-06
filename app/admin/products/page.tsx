import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Produits</h1>
          <p className="mt-1 text-sm text-slate-500">Gérez votre catalogue de produits</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Nouveau produit
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 mb-6">
          <HugeiconsIcon icon={Search01Icon} size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>
        <div className="text-center py-12 text-slate-500">
          <p className="text-sm">Tableau des produits à implémenter</p>
        </div>
      </div>
    </div>
  )
}
