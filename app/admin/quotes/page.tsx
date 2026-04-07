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
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Devis"
        description="Gérez les demandes de devis des clubs et partenaires."
        action={
          <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
            <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
            Nouveau devis
          </Button>
        }
      />

      <Card className="border-slate-200 shadow-none rounded-xl h-fit">
        <CardHeader className="border-b border-slate-100 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={Invoice01Icon} size={18} className="text-[#1E40AF]" />
              Liste des devis
            </CardTitle>
            <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
          </div>
          <CardDescription className="mt-1">Suivez l'état d'avancement de vos propositions commerciales.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {viewMode === "list" ? (
            <div className="divide-y divide-slate-100">
              {quotes.map((quote) => (
                <div key={quote.id} className="flex items-center justify-between p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900">{quote.club}</span>
                      <AdminStatusBadge tone={statusToneMap[quote.status]}>
                        {quote.status}
                      </AdminStatusBadge>
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">{quote.contact}</span>
                      <span>•</span>
                      <span>{quote.items} articles</span>
                      <span>•</span>
                      <span>{quote.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-4">
                    <div className="flex flex-col text-right">
                      <span className="text-xs text-slate-500 uppercase tracking-wide">Total TTC</span>
                      <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{quote.total}</span>
                    </div>
                    <div className="h-8 w-px bg-slate-100 mx-2" />
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" title="Télécharger le PDF">
                      <HugeiconsIcon icon={FileDownloadIcon} size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-[#1E40AF] hover:text-[#1e3a8a] hover:bg-blue-50" title="Voir les détails">
                      <Link href={`/admin/quotes/${quote.id}`}>
                        <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-slate-50/30">
              {quotes.map((quote) => (
                <div key={quote.id} className="group relative flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-[#1E40AF]/30 hover:shadow-sm transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 line-clamp-1">{quote.club}</span>
                    </div>
                    <AdminStatusBadge tone={statusToneMap[quote.status]} className="shrink-0 shadow-sm">
                      {quote.status}
                    </AdminStatusBadge>
                  </div>
                  
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="text-sm text-slate-600 font-medium">{quote.contact}</div>
                    <div className="text-xs text-slate-500">{quote.items} articles demandés</div>
                    <div className="text-xs text-slate-400">{quote.date}</div>
                  </div>
                  
                  <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wide text-slate-500 font-medium">Total TTC</span>
                      <span className="font-bold text-slate-900 text-lg">{quote.total}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" title="Télécharger le PDF">
                        <HugeiconsIcon icon={FileDownloadIcon} size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-[#1E40AF] hover:text-[#1e3a8a] hover:bg-blue-50" title="Voir les détails">
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
  )
}
