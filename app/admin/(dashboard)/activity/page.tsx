import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, FilterIcon, Calendar01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"

export default function ActivityPage() {
  const activities = [
    { id: 1, action: "Création", entity: "Ballon de foot Pro", type: "Produit", user: "Admin", time: "Il y a 2h" },
    { id: 2, action: "Modification", entity: "Football", type: "Catégorie", user: "Admin", time: "Il y a 4h" },
    { id: 3, action: "Création", entity: "Réduction 20%", type: "Promotion", user: "Admin", time: "Hier" },
    { id: 4, action: "Suppression", entity: "Ancienne bannière", type: "Annonce", user: "Admin", time: "02 Avr 2026" },
    { id: 5, action: "Modification", entity: "Devis AS Dakar FC", type: "Devis", user: "Admin", time: "01 Avr 2026" },
  ]

  const actionColors: Record<string, string> = {
    "Création": "bg-green-100 text-green-700",
    "Modification": "bg-blue-100 text-[#1E40AF]",
    "Suppression": "bg-red-100 text-[#DC2626]",
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Journal d'activité"
        description="Historique complet et traçabilité de tous les changements effectués sur la plateforme Dakar Sport."
      />

      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-2.5 text-[#1E40AF]">
              <HugeiconsIcon icon={Clock01Icon} size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Dernières actions</h2>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-colors focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-100">
                <HugeiconsIcon icon={FilterIcon} size={16} className="text-slate-400 hidden sm:block" />
                <select className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer">
                  <option value="">Toutes les actions</option>
                  <option>Création</option>
                  <option>Modification</option>
                  <option>Suppression</option>
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-colors focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-100">
                <select className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer">
                  <option value="">Toutes les entités</option>
                  <option>Produits</option>
                  <option>Catégories</option>
                  <option>Promotions</option>
                  <option>Devis</option>
                </select>
              </div>
            </div>
            <div className="hidden sm:block h-8 w-px bg-slate-200" />
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm transition-colors focus-within:border-blue-300 focus-within:ring-1 focus-within:ring-blue-100">
              <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-slate-400 hidden sm:block" />
              <input type="date" className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer" />
              <span className="text-slate-400 text-sm font-medium px-1">à</span>
              <input type="date" className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="p-0">
          <div className="divide-y divide-slate-50 bg-slate-50/30">
            {activities.map((activity, index) => (
              <div 
                key={activity.id} 
                className="group flex items-center gap-6 px-8 py-5 hover:bg-white transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:border-blue-200 group-hover:text-[#1E40AF] group-hover:scale-105 transition-all duration-300">
                  <HugeiconsIcon icon={Clock01Icon} size={20} className="text-slate-400 group-hover:text-[#1E40AF] transition-colors" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                    <Badge className={`h-6 rounded-md px-2.5 text-[10px] font-bold uppercase tracking-wider border-none shadow-sm ${actionColors[activity.action]}`}>
                      {activity.action}
                    </Badge>
                    <span className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors">{activity.entity}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-block bg-slate-100 px-2 py-0.5 rounded-md">
                      {activity.type}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                    <span>Par <span className="font-bold text-slate-700">{activity.user}</span></span>
                    <span className="text-slate-300">•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="font-bold text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  Voir les détails
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5 text-sm font-medium text-slate-500 bg-white">
          <span>Affichage de <span className="text-slate-900 font-bold">{activities.length}</span> sur {activities.length} événements</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
