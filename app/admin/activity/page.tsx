import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, FilterIcon, Calendar01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Journal d'activité</h1>
          <p className="mt-1 text-sm text-slate-500">Historique de tous les changements sur la plateforme</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        {/* Filters */}
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={FilterIcon} size={16} className="text-slate-400" />
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
              <option value="">Toutes les actions</option>
              <option>Création</option>
              <option>Modification</option>
              <option>Suppression</option>
            </select>
            <select className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20">
              <option value="">Toutes les entités</option>
              <option>Produits</option>
              <option>Catégories</option>
              <option>Promotions</option>
              <option>Devis</option>
            </select>
          </div>
          <div className="flex items-center gap-2 sm:ml-auto">
            <HugeiconsIcon icon={Calendar01Icon} size={16} className="text-slate-400" />
            <input type="date" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20" />
            <span className="text-slate-400 text-sm">à</span>
            <input type="date" className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20" />
          </div>
        </div>

        {/* Timeline */}
        <div className="divide-y divide-slate-100">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center gap-4 p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100">
                <HugeiconsIcon icon={Clock01Icon} size={18} className="text-slate-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${actionColors[activity.action]}`}>
                    {activity.action}
                  </Badge>
                  <span className="text-sm font-medium text-slate-900">{activity.entity}</span>
                  <span className="text-xs text-slate-400">({activity.type})</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>Par <span className="font-medium text-slate-700">{activity.user}</span></span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-[#1E40AF]">Détails</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
