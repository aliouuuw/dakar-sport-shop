"use client"

import { useState } from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon, Edit01Icon, FilterIcon, GridViewIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminPageHeader } from "../components/admin-page-header"
import { AdminViewToggle } from "../components/admin-view-toggle"
import { AdminStatusBadge } from "../components/admin-status-badge"

const products = [
  { id: 1, name: "Ballon de foot Pro", category: "Football", price: "15 000 FCFA", compareAt: "18 000 FCFA", stock: 24, active: true, featured: true },
  { id: 2, name: "Maillot équipe nationale", category: "Football", price: "12 500 FCFA", compareAt: null, stock: 58, active: true, featured: false },
  { id: 3, name: "Chaussures de foot Puma", category: "Football", price: "45 000 FCFA", compareAt: "52 000 FCFA", stock: 12, active: true, featured: true },
  { id: 4, name: "Filet de but standard", category: "Football", price: "28 000 FCFA", compareAt: null, stock: 6, active: false, featured: false },
  { id: 5, name: "Ballon de basketball", category: "Basketball", price: "18 000 FCFA", compareAt: null, stock: 15, active: true, featured: false },
  { id: 6, name: "Tapis de yoga 6mm", category: "Fitness", price: "9 500 FCFA", compareAt: "11 000 FCFA", stock: 30, active: true, featured: false },
]

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table")

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Produits"
        description={`Gérez votre catalogue — ${products.length} produits au total.`}
        action={
          <Button asChild size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
            <Link href="/admin/products/new">
              <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
              Nouveau produit
            </Link>
          </Button>
        }
      />

      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 flex-1 max-w-md shadow-sm transition-shadow focus-within:shadow-md focus-within:border-blue-300">
            <HugeiconsIcon icon={Search01Icon} size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <HugeiconsIcon icon={FilterIcon} size={16} className="text-slate-400" />
                <select className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer">
                  <option value="">Catégories</option>
                  <option>Football</option>
                  <option>Basketball</option>
                  <option>Running</option>
                  <option>Fitness</option>
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <select className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer">
                  <option value="">Statut</option>
                  <option>Actif</option>
                  <option>Inactif</option>
                </select>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <AdminViewToggle viewMode={viewMode === "table" ? "list" : "grid"} onViewModeChange={(m) => setViewMode(m === "list" ? "table" : "grid")} className="justify-start bg-white rounded-xl shadow-sm border border-slate-200 p-1" />
          </div>
        </div>

        {viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-white text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-8 py-5">Produit</th>
                  <th className="px-8 py-5">Catégorie</th>
                  <th className="px-8 py-5">Prix</th>
                  <th className="px-8 py-5">Stock</th>
                  <th className="px-8 py-5">Statut</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-slate-50/30">
                {products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className="group hover:bg-white transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                          <HugeiconsIcon icon={GridViewIcon} size={20} className="text-slate-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors">{product.name}</span>
                          {product.featured && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E40AF] mt-0.5">Mis en avant</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 font-medium text-slate-600">{product.category}</td>
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{product.price}</span>
                        {product.compareAt && (
                          <span className="text-xs font-medium text-slate-400 line-through">{product.compareAt}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-2 w-2 rounded-full ${product.stock <= 10 ? "bg-[#DC2626]" : "bg-green-500"}`} />
                        <span className={`font-bold ${
                          product.stock <= 10 ? "text-[#DC2626]" : "text-slate-700"
                        }`}>
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <AdminStatusBadge tone={product.active ? "success" : "neutral"}>
                        {product.active ? "Actif" : "Inactif"}
                      </AdminStatusBadge>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <HugeiconsIcon icon={Edit01Icon} size={18} />
                        </Link>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 bg-slate-50/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <div 
                  key={product.id} 
                  className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-[#1E40AF]/40 hover:shadow-xl transition-all duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="text-slate-300 transform group-hover:scale-110 transition-transform duration-700">
                      <HugeiconsIcon icon={GridViewIcon} size={64} />
                    </div>
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <AdminStatusBadge tone={product.active ? "success" : "neutral"} className="shadow-sm backdrop-blur-md bg-white/90">
                        {product.active ? "Actif" : "Inactif"}
                      </AdminStatusBadge>
                      {product.featured && (
                        <Badge className="h-6 rounded-md bg-[#1E40AF] px-2.5 text-[10px] font-bold uppercase tracking-wider text-white border-none shadow-md shadow-blue-900/20">
                          Mis en avant
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 z-10">
                      <Button variant="secondary" size="icon" asChild className="h-10 w-10 rounded-full shadow-lg bg-white hover:bg-blue-50 text-[#1E40AF] border border-slate-100">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <HugeiconsIcon icon={Edit01Icon} size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">{product.category}</div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-4 group-hover:text-[#1E40AF] transition-colors">{product.name}</h3>
                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tight text-slate-900">{product.price}</span>
                        {product.compareAt && (
                          <span className="text-xs font-medium text-slate-400 line-through">{product.compareAt}</span>
                        )}
                      </div>
                      <div className={`flex items-center gap-1.5 text-xs font-bold ${product.stock <= 10 ? "text-[#DC2626]" : "text-slate-500"}`}>
                        <span className={`flex h-1.5 w-1.5 rounded-full ${product.stock <= 10 ? "bg-[#DC2626]" : "bg-slate-400"}`} />
                        {product.stock} restants
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5 text-sm font-medium text-slate-500 bg-white">
          <span>Affichage de <span className="text-slate-900 font-bold">{products.length}</span> sur {products.length} produits</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
