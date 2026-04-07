"use client"

import { useState } from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, FileDownloadIcon, ArrowRight01Icon, Invoice01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { AdminPageHeader } from "../components/admin-page-header"
import { AdminViewToggle } from "../components/admin-view-toggle"
import { AdminStatusBadge, StatusTone } from "../components/admin-status-badge"

const quotes = [
  { id: 1, club: "AS Dakar FC", contact: "Moussa Diop", status: "Nouveau", date: "Il y a 2h", total: "450 000 FCFA", items: 22 },
  { id: 2, club: "Stade de Keur Madior", contact: "Aissatou Fall", status: "En cours", date: "Hier", total: "1 200 000 FCFA", items: 45 },
  { id: 3, club: "Équipe Université", contact: "Ibrahim Sene", status: "Envoyé", date: "04 Avr", total: "320 000 FCFA", items: 15 },
]

const statusToneMap: Record<string, StatusTone> = {
  "Nouveau": "info",
  "En cours": "warning",
  "Envoyé": "success",
}

export default function QuotesPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Devis"
        description="Gérez les demandes de devis des clubs et partenaires."
        action={
          <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
            <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
            Nouveau devis
          </Button>
        }
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={Invoice01Icon} size={20} />
                </div>
                Liste des devis
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Suivez l'état d'avancement de vos propositions commerciales.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {quotes.map((quote, index) => (
                  <div 
                    key={quote.id} 
                    className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-900">{quote.club}</span>
                        <AdminStatusBadge tone={statusToneMap[quote.status]}>
                          {quote.status}
                        </AdminStatusBadge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                        <span className="font-bold text-slate-700">{quote.contact}</span>
                        <span>•</span>
                        <span>{quote.items} articles</span>
                        <span>•</span>
                        <span>{quote.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total TTC</span>
                        <span className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">{quote.total}</span>
                      </div>
                      <div className="h-10 w-px bg-slate-200 mx-2" />
                      <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-[#1E40AF] hover:bg-blue-50 shadow-sm transition-colors" title="Télécharger le PDF">
                          <HugeiconsIcon icon={FileDownloadIcon} size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50 transition-colors" title="Voir les détails">
                          <Link href={`/admin/quotes/${quote.id}`}>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {quotes.map((quote, index) => (
                  <div 
                    key={quote.id} 
                    className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                      <HugeiconsIcon icon={Invoice01Icon} size={100} />
                    </div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2 pr-4">
                        <span className="text-xl font-black tracking-tight text-slate-900 line-clamp-1">{quote.club}</span>
                      </div>
                      <AdminStatusBadge tone={statusToneMap[quote.status]} className="shrink-0 shadow-sm">
                        {quote.status}
                      </AdminStatusBadge>
                    </div>
                    
                    <div className="relative z-10 flex flex-col gap-2 mb-8">
                      <div className="text-sm font-bold text-slate-700">{quote.contact}</div>
                      <div className="text-sm font-medium text-slate-500">{quote.items} articles demandés</div>
                      <div className="text-sm font-medium text-slate-400">{quote.date}</div>
                    </div>
                    
                    <div className="relative z-10 mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total TTC</span>
                        <span className="text-3xl font-black tracking-tighter text-slate-900">{quote.total}</span>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-[#1E40AF] hover:bg-blue-50 shadow-sm" title="Télécharger le PDF">
                          <HugeiconsIcon icon={FileDownloadIcon} size={16} />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50" title="Voir les détails">
                          <Link href={`/admin/quotes/${quote.id}`}>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                          </Link>
                        </Button>
                      </div>
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
