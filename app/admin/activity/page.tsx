import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon } from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"

export default function ActivityPage() {
  const activities = [
    { id: 1, action: "Produit créé", entity: "Ballon de foot Pro", user: "Admin", time: "Il y a 2h" },
    { id: 2, action: "Catégorie modifiée", entity: "Football", user: "Admin", time: "Il y a 4h" },
    { id: 3, action: "Promotion activée", entity: "Réduction 20%", user: "Admin", time: "Hier" },
  ]

  const actionColors: Record<string, string> = {
    "Produit créé": "bg-green-100 text-green-700",
    "Catégorie modifiée": "bg-blue-100 text-[#1E40AF]",
    "Promotion activée": "bg-amber-100 text-amber-700",
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Journal d'activité</h1>
        <p className="mt-1 text-sm text-slate-500">Historique de tous les changements</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
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
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>Par {activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
