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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

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
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Promotions"
        description="Gérez vos codes promotionnels, types de remises et périodes d'application."
        action={
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
                Nouvelle promotion
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-slate-900">Nouvelle promotion</SheetTitle>
                <SheetDescription>
                  Créez une promotion avec son type, sa valeur, son code et ses dates.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Titre</label>
                  <Input placeholder="Ex: Promo rentrée" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Code promo</label>
                  <Input placeholder="Ex: RENTREE20" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Type</label>
                    <Select defaultValue="Pourcentage">
                      <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#1E40AF]">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pourcentage">Pourcentage</SelectItem>
                        <SelectItem value="Fixe">Fixe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Valeur</label>
                    <Input placeholder="Ex: 20" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Début</label>
                    <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Fin</label>
                    <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                  </div>
                </div>
                <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4">
                  Enregistrer la promotion
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <AdminMetricCard label="Actives" value="1" icon={PercentIcon} tone="primary" />
        <AdminMetricCard label="À venir" value="1" icon={Calendar01Icon} tone="warning" />
        <AdminMetricCard label="Expirées" value="1" icon={DiscountTag01Icon} tone="neutral" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={DiscountTag01Icon} size={20} />
                </div>
                Campagnes en cours
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Consultez et gérez vos promotions actives, à venir et expirées.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {promotions.map((promotion, index) => (
                  <div 
                    key={promotion.code} 
                    className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-slate-900">{promotion.title}</span>
                          <AdminStatusBadge tone={statusToneMap[promotion.status]}>
                            {promotion.status}
                          </AdminStatusBadge>
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                          <span className="font-mono text-slate-700 bg-slate-100 px-1.5 rounded">{promotion.code}</span>
                          <span>•</span>
                          <span>{promotion.type}</span>
                          <span>•</span>
                          <span>{promotion.range}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-2xl font-black tracking-tight text-slate-900">{promotion.value}</span>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-slate-900">Éditer la promotion</SheetTitle>
                            <SheetDescription>
                              Modifiez les informations de cette promotion.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Titre</label>
                              <Input defaultValue={promotion.title} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Code promo</label>
                              <Input defaultValue={promotion.code} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Type</label>
                                <Select defaultValue={promotion.type}>
                                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#1E40AF]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pourcentage">Pourcentage</SelectItem>
                                    <SelectItem value="Fixe">Fixe</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Valeur</label>
                                <Input defaultValue={promotion.value.replace(/[^0-9]/g, '')} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Début</label>
                                <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Fin</label>
                                <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                            </div>
                            <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4">
                              Enregistrer les modifications
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {promotions.map((promotion) => (
                  <div key={promotion.code} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                      <HugeiconsIcon icon={PercentIcon} size={100} />
                    </div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-tight text-slate-900 line-clamp-1">{promotion.title}</span>
                      </div>
                      <AdminStatusBadge tone={statusToneMap[promotion.status]} className="shrink-0 shadow-sm">
                        {promotion.status}
                      </AdminStatusBadge>
                    </div>
                    
                    <div className="relative z-10 flex flex-col gap-2 mb-8">
                      <div className="text-sm font-medium text-slate-500">Code: <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 rounded">{promotion.code}</span></div>
                      <div className="text-sm font-medium text-slate-500">Période: {promotion.range}</div>
                    </div>
                    
                    <div className="relative z-10 mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{promotion.type}</span>
                        <span className="text-3xl font-black tracking-tighter text-slate-900">{promotion.value}</span>
                      </div>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-slate-900">Éditer la promotion</SheetTitle>
                            <SheetDescription>
                              Modifiez les informations de cette promotion.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Titre</label>
                              <Input defaultValue={promotion.title} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Code promo</label>
                              <Input defaultValue={promotion.code} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Type</label>
                                <Select defaultValue={promotion.type}>
                                  <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#1E40AF]">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Pourcentage">Pourcentage</SelectItem>
                                    <SelectItem value="Fixe">Fixe</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Valeur</label>
                                <Input defaultValue={promotion.value.replace(/[^0-9]/g, '')} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Début</label>
                                <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Fin</label>
                                <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                            </div>
                            <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4">
                              Enregistrer les modifications
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
