import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, FileDownloadIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function QuotesPage() {
  const quotes = [
    { id: 1, club: "AS Dakar FC", contact: "Moussa Diop", status: "Nouveau", date: "Il y a 2h", total: "450 000 FCFA" },
    { id: 2, club: "Stade de Keur Madior", contact: "Aissatou Fall", status: "En cours", date: "Hier", total: "1 200 000 FCFA" },
    { id: 3, club: "Équipe Université", contact: "Ibrahim Sene", status: "Envoyé", date: "04 Avr", total: "320 000 FCFA" },
  ]

  const statusColors: Record<string, string> = {
    "Nouveau": "bg-blue-100 text-[#1E40AF]",
    "En cours": "bg-amber-100 text-amber-700",
    "Envoyé": "bg-green-100 text-green-700",
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Devis</h1>
          <p className="mt-1 text-sm text-slate-500">Gérez les demandes de devis des clubs</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Nouveau devis
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="divide-y divide-slate-100">
          {quotes.map((quote) => (
            <div key={quote.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex flex-col flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-900">{quote.club}</span>
                  <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${statusColors[quote.status]}`}>
                    {quote.status}
                  </Badge>
                </div>
                <div className="mt-1 flex items-center gap-4 text-xs text-slate-500">
                  <span>{quote.contact}</span>
                  <span>{quote.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 ml-4">
                <span className="text-sm font-semibold text-slate-900 whitespace-nowrap">{quote.total}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600" title="Télécharger le PDF">
                  <HugeiconsIcon icon={FileDownloadIcon} size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
