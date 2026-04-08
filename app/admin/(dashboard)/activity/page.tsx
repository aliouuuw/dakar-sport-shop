import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon, FilterIcon, Calendar01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { getActivityLog } from "@/lib/actions/activity-log"

export default async function ActivityPage() {
  const logs = await getActivityLog(50)

  const actionLabels: Record<string, string> = {
    create: "Création",
    update: "Modification",
    update_status: "Modification",
    delete: "Suppression",
    duplicate: "Duplication",
  }

  const actionColors: Record<string, string> = {
    create: "bg-green-100 text-green-700",
    update: "bg-blue-100 text-[#1E40AF]",
    update_status: "bg-blue-100 text-[#1E40AF]",
    delete: "bg-red-100 text-[#DC2626]",
    duplicate: "bg-purple-100 text-purple-700",
  }

  function fmtTime(d: Date) {
    return new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(d))
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
            {logs.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-slate-400 font-medium">Aucune activité enregistrée pour l&apos;instant.</p>
              </div>
            )}
            {logs.map((log, index) => (
              <div 
                key={log.id} 
                className="group flex items-center gap-6 px-8 py-5 hover:bg-white transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm group-hover:border-blue-200 group-hover:text-[#1E40AF] group-hover:scale-105 transition-all duration-300">
                  <HugeiconsIcon icon={Clock01Icon} size={20} className="text-slate-400 group-hover:text-[#1E40AF] transition-colors" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                    <Badge className={`h-6 rounded-md px-2.5 text-[10px] font-bold uppercase tracking-wider border-none shadow-sm ${actionColors[log.action] ?? "bg-slate-100 text-slate-700"}`}>
                      {actionLabels[log.action] ?? log.action}
                    </Badge>
                    <span className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors">{log.entityId ? `${log.entityType} #${log.entityId}` : log.entityType}</span>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:inline-block bg-slate-100 px-2 py-0.5 rounded-md">
                      {log.entityType}
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                    <span>Par <span className="font-bold text-slate-700">{log.userId ?? "Système"}</span></span>
                    <span className="text-slate-300">•</span>
                    <span>{fmtTime(log.createdAt)}</span>
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
          <span>Affichage de <span className="text-slate-900 font-bold">{logs.length}</span> sur {logs.length} événements</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
