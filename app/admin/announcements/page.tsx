"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Notification01Icon, Calendar01Icon, Edit01Icon, MessageNotification01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "../components/admin-page-header"
import { AdminMetricCard } from "../components/admin-metric-card"
import { AdminViewToggle } from "../components/admin-view-toggle"
import { AdminStatusBadge, StatusTone } from "../components/admin-status-badge"

const announcements = [
  { title: "Nouvelle collection disponible", type: "Banner", status: "Active", range: "01 Avr - 15 Avr" },
  { title: "Livraison spéciale Ramadan", type: "Popup", status: "Programmée", range: "08 Avr - 12 Avr" },
  { title: "Horaires d'ouverture mis à jour", type: "Info", status: "Archivée", range: "01 Mar - 31 Mar" },
] as const

const statusToneMap: Record<string, StatusTone> = {
  "Active": "success",
  "Programmée": "warning",
  "Archivée": "neutral"
}

export default function AnnouncementsPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Annonces"
        description="Publiez des bannières, popups et messages d'information sur le storefront."
        action={
          <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
            <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
            Nouvelle annonce
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminMetricCard label="Bannières" value="1" icon={Notification01Icon} tone="primary" />
        <AdminMetricCard label="Popups" value="1" icon={MessageNotification01Icon} tone="warning" />
        <AdminMetricCard label="Programmées" value="1" icon={Calendar01Icon} tone="neutral" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="border-slate-200 shadow-none rounded-xl h-fit">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
                <HugeiconsIcon icon={Notification01Icon} size={18} className="text-[#1E40AF]" />
                Liste des annonces
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-1">Consultez et gérez vos annonces actives, programmées et archivées.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {announcements.map((announcement) => (
                  <div key={announcement.title} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900">{announcement.title}</span>
                        <AdminStatusBadge tone={statusToneMap[announcement.status]}>
                          {announcement.status}
                        </AdminStatusBadge>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {announcement.type} · {announcement.range}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#1E40AF]">
                      <HugeiconsIcon icon={Edit01Icon} size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50/30">
                {announcements.map((announcement) => (
                  <div key={announcement.title} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-[#1E40AF]/30 hover:shadow-sm transition-all">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 line-clamp-2">{announcement.title}</span>
                      </div>
                      <AdminStatusBadge tone={statusToneMap[announcement.status]} className="shrink-0">
                        {announcement.status}
                      </AdminStatusBadge>
                    </div>
                    <div className="text-xs text-slate-500 mb-4">Période: <span className="font-medium text-slate-700">{announcement.range}</span></div>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-600">
                          {announcement.type}
                        </span>
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
            <CardTitle className="text-lg text-slate-900">Éditeur d'annonce</CardTitle>
            <CardDescription>Créez ou modifiez une annonce avec son type, son contenu et sa période de diffusion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Titre</label>
              <Input defaultValue="Nouvelle collection disponible" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
              <Select defaultValue="Banner">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Banner">Banner</SelectItem>
                  <SelectItem value="Popup">Popup</SelectItem>
                  <SelectItem value="Info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Contenu</label>
              <Textarea className="min-h-[128px] resize-none" defaultValue="Annonce promotionnelle destinée à la page d'accueil et aux visiteurs récurrents." />
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
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">Enregistrer l'annonce</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
