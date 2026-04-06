import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon, Edit01Icon, FilterIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const products = [
  { id: 1, name: "Ballon de foot Pro", category: "Football", price: "15 000 FCFA", compareAt: "18 000 FCFA", stock: 24, active: true, featured: true },
  { id: 2, name: "Maillot équipe nationale", category: "Football", price: "12 500 FCFA", compareAt: null, stock: 58, active: true, featured: false },
  { id: 3, name: "Chaussures de foot Puma", category: "Football", price: "45 000 FCFA", compareAt: "52 000 FCFA", stock: 12, active: true, featured: true },
  { id: 4, name: "Filet de but standard", category: "Football", price: "28 000 FCFA", compareAt: null, stock: 6, active: false, featured: false },
  { id: 5, name: "Ballon de basketball", category: "Basketball", price: "18 000 FCFA", compareAt: null, stock: 15, active: true, featured: false },
  { id: 6, name: "Tapis de yoga 6mm", category: "Fitness", price: "9 500 FCFA", compareAt: "11 000 FCFA", stock: 30, active: true, featured: false },
]

export default async function ProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Produits</h1>
          <p className="mt-1 text-sm text-slate-500">Gérez votre catalogue — {products.length} produits au total.</p>
        </div>
        <Button asChild className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <Link href="/admin/products/new">
            <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
            Nouveau produit
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 flex-1 max-w-sm">
            <HugeiconsIcon icon={Search01Icon} size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={FilterIcon} size={16} className="text-slate-400" />
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
              <option value="">Toutes les catégories</option>
              <option>Football</option>
              <option>Basketball</option>
              <option>Running</option>
              <option>Fitness</option>
            </select>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
              <option value="">Tous les statuts</option>
              <option>Actif</option>
              <option>Inactif</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-4 py-3">Produit</th>
              <th className="px-4 py-3">Catégorie</th>
              <th className="px-4 py-3">Prix</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-900">{product.name}</span>
                    {product.featured && (
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-[#1E40AF]">Mis en avant</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600">{product.category}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">{product.price}</span>
                    {product.compareAt && (
                      <span className="text-xs text-slate-400 line-through">{product.compareAt}</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-medium ${
                    product.stock <= 10 ? "text-[#DC2626]" : "text-slate-700"
                  }`}>
                    {product.stock} unités
                  </span>
                </td>
                <td className="px-4 py-3">
                  <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${
                    product.active ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    {product.active ? "Actif" : "Inactif"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-slate-400 hover:text-[#1E40AF]">
                    <Link href={`/admin/products/${product.id}/edit`}>
                      <HugeiconsIcon icon={Edit01Icon} size={16} />
                    </Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm text-slate-500">
          <span>Affichage de {products.length} sur {products.length} produits</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-8 border-slate-200 text-xs" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="h-8 border-slate-200 text-xs" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
