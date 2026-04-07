"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Calendar01Icon, DiscountTag01Icon, Edit01Icon, PercentIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminPageHeader } from "../components/admin-page-header"
import { AdminMetricCard } from "../components/admin-metric-card"
import { AdminViewToggle } from "../components/admin-view-toggle"
import { AdminStatusBadge, StatusTone } from "../components/admin-status-badge"

const promotions = [
  { title: "Promo rentrée", code: "RENTREE20", type: "Pourcentage", value: "20%", status: "Active", range: "01 Avr - 30 Avr" },
  { title: "Offre ballons", code: "BALLON5", type: "Fixe", value: "5 000 FCFA", status: "Bientôt", range: "10 Avr - 20 Avr" },
  { title: "Club partenaire", code: "CLUB10", type: "Pourcentage", value: "10%", status: "Expirée", range: "01 Mar - 31 Mar" },
] as const

const statusToneMap: Record<string, StatusTone> = {
  "Active": "success",
  "Bientôt": "warning",
  "Expirée": "neutral"
}

export default function PromotionsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Promotions"
        description="Gérez vos codes promotionnels, types de remises et périodes d'application."
        action={
          <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
            <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
            Nouvelle promotion
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminMetricCard label="Actives" value="1" icon={PercentIcon} tone="primary" />
        <AdminMetricCard label="À venir" value="1" icon={Calendar01Icon} tone="warning" />
        <AdminMetricCard label="Expirées" value="1" icon={DiscountTag01Icon} tone="neutral" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="border-slate-200 shadow-none rounded-xl h-fit">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <HugeiconsIcon icon={DiscountTag01Icon} size={18} className="text-[#1E40AF]" />
                Liste des promotions
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-1">Consultez et gérez vos promotions actives, à venir et expirées.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {promotions.map((promotion) => (
                  <div key={promotion.code} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{promotion.title}</span>
                        <AdminStatusBadge tone={statusToneMap[promotion.status]}>
                          {promotion.status}
                        </AdminStatusBadge>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {promotion.code} · {promotion.type} · {promotion.range}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-900">{promotion.value}</span>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#1E40AF]">
                        <HugeiconsIcon icon={Edit01Icon} size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50/30">
                {promotions.map((promotion) => (
                  <div key={promotion.code} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-[#1E40AF]/30 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 line-clamp-1">{promotion.title}</span>
                      </div>
                      <AdminStatusBadge tone={statusToneMap[promotion.status]} className="shrink-0">
                        {promotion.status}
                      </AdminStatusBadge>
                    </div>
                    <div className="text-xs text-slate-500 mb-1">Code: <span className="font-medium text-slate-700">{promotion.code}</span></div>
                    <div className="text-xs text-slate-500 mb-4">Période: {promotion.range}</div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wide text-slate-400">{promotion.type}</span>
                        <span className="font-bold text-slate-900">{promotion.value}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#1E40AF] transition-opacity">
                        <HugeiconsIcon icon={Edit01Icon} size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-none rounded-xl h-fit">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg text-slate-900">Formulaire promotion</CardTitle>
            <CardDescription>Créez ou modifiez une promotion avec son type, sa valeur, son code et ses dates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Titre</label>
              <Input defaultValue="Promo rentrée" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Code promo</label>
              <Input defaultValue="RENTREE20" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
                <Select defaultValue="Pourcentage">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pourcentage">Pourcentage</SelectItem>
                    <SelectItem value="Fixe">Fixe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Valeur</label>
                <Input defaultValue="20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Début</label>
                <Input type="date" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Fin</label>
                <Input type="date" />
              </div>
            </div>
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">Enregistrer la promotion</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
