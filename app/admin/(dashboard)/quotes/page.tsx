"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, FileDownloadIcon, ArrowRight01Icon, Invoice01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle"
import { AdminStatusBadge, StatusTone } from "@/app/admin/components/admin-status-badge"
import { toast } from "sonner"

interface Quote {
  id: number
  club: string
  contact: string
  email: string
  phone: string
  status: "Nouveau" | "En cours" | "Envoye" | "Accepte" | "Refuse"
  date: string
  total: string
  items: number
}

const mockQuotes: Quote[] = [
  { id: 1, club: "AS Dakar FC", contact: "Moussa Diop", email: "moussa.d@example.com", phone: "+221 77 123 45 67", status: "Nouveau", date: "Il y a 2h", total: "450 000 FCFA", items: 22 },
  { id: 2, club: "Stade de Keur Madior", contact: "Aissatou Fall", email: "aissatou.f@example.com", phone: "+221 78 234 56 78", status: "En cours", date: "Hier", total: "1 200 000 FCFA", items: 45 },
  { id: 3, club: "Equipe Universite", contact: "Ibrahim Sene", email: "isene@example.com", phone: "+221 76 345 67 89", status: "Envoye", date: "04 Avr", total: "320 000 FCFA", items: 15 },
]

const statusToneMap: Record<string, StatusTone> = {
  "Nouveau": "info",
  "En cours": "warning",
  "Envoye": "success",
  "Accepte": "success",
  "Refuse": "neutral",
}

const statusLabels: Record<string, string> = {
  "Nouveau": "Nouveau",
  "En cours": "En cours",
  "Envoye": "Envoye",
  "Accepte": "Accepte",
  "Refuse": "Refuse",
}

interface DeleteDialogState {
  open: boolean
  quoteId: number | null
  quoteClub: string
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    quoteId: null,
    quoteClub: "",
  })

  const handleStatusChange = (id: number, newStatus: string) => {
    startTransition(() => {
      setQuotes((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status: newStatus as Quote["status"] } : q))
      )
      toast.success("Statut mis a jour", {
        description: `Le statut du devis a ete change en "${statusLabels[newStatus]}".`,
      })
      router.refresh()
    })
  }

  const handleDeleteClick = (id: number, club: string) => {
    setDeleteDialog({ open: true, quoteId: id, quoteClub: club })
  }

  const handleDeleteConfirm = () => {
    startTransition(() => {
      setQuotes((prev) => prev.filter((q) => q.id !== deleteDialog.quoteId))
      toast.success("Devis supprime", {
        description: `Le devis pour "${deleteDialog.quoteClub}" a ete supprime.`,
      })
      setDeleteDialog({ open: false, quoteId: null, quoteClub: "" })
      router.refresh()
    })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, quoteId: null, quoteClub: "" })
  }

  const handleGeneratePDF = (id: number) => {
    startTransition(() => {
      // TODO: Replace with actual PDF generation
      toast.info("Generation PDF", {
        description: "Le fichier PDF est en cours de generation...",
      })
    })
  }

  const emptyState = quotes.length === 0

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Devis"
        description="Gerez les demandes de devis des clubs et partenaires."
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
            <CardDescription className="mt-2 text-base">Suivez l'etat d'avancement de vos propositions commerciales.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {emptyState ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 mb-6">
                  <HugeiconsIcon icon={Invoice01Icon} size={48} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun devis</h3>
                <p className="text-base text-slate-500 max-w-sm mb-6">Commencez par creer votre premier devis pour un club ou partenaire.</p>
              </div>
            ) : viewMode === "list" ? (
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
                          {statusLabels[quote.status]}
                        </AdminStatusBadge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                        <span className="font-bold text-slate-700">{quote.contact}</span>
                        <span>&bull;</span>
                        <span>{quote.items} articles</span>
                        <span>&bull;</span>
                        <span>{quote.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Select defaultValue={quote.status} onValueChange={(val) => handleStatusChange(quote.id, val)}>
                        <SelectTrigger className="w-[140px] h-9 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nouveau">Nouveau</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Envoye">Envoye</SelectItem>
                          <SelectItem value="Accepte">Accepte</SelectItem>
                          <SelectItem value="Refuse">Refuse</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total TTC</span>
                        <span className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">{quote.total}</span>
                      </div>
                      <div className="h-10 w-px bg-slate-200 mx-2" />
                      <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleGeneratePDF(quote.id)}
                          className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-[#1E40AF] hover:bg-blue-50 shadow-sm transition-colors"
                          title="Telecharger le PDF"
                          disabled={isPending}
                        >
                          <HugeiconsIcon icon={FileDownloadIcon} size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50 transition-colors" title="Voir les details">
                          <Link href={`/admin/quotes/${quote.id}`}>
                            <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(quote.id, quote.club)}
                          className="h-10 w-10 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50 transition-colors"
                          title="Supprimer"
                        >
                          <HugeiconsIcon icon={Delete01Icon} size={18} />
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
                        {statusLabels[quote.status]}
                      </AdminStatusBadge>
                    </div>

                    <div className="relative z-10 flex flex-col gap-2 mb-8">
                      <div className="text-sm font-bold text-slate-700">{quote.contact}</div>
                      <div className="text-sm font-medium text-slate-500">{quote.items} articles demandes</div>
                      <div className="text-sm font-medium text-slate-400">{quote.date}</div>
                    </div>

                    <div className="relative z-10 mt-auto flex flex-col gap-3 pt-4 border-t border-slate-100">
                      <Select defaultValue={quote.status} onValueChange={(val) => handleStatusChange(quote.id, val)}>
                        <SelectTrigger className="w-full h-9 rounded-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Nouveau">Nouveau</SelectItem>
                          <SelectItem value="En cours">En cours</SelectItem>
                          <SelectItem value="Envoye">Envoye</SelectItem>
                          <SelectItem value="Accepte">Accepte</SelectItem>
                          <SelectItem value="Refuse">Refuse</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total TTC</span>
                          <span className="text-3xl font-black tracking-tighter text-slate-900">{quote.total}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleGeneratePDF(quote.id)}
                            className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-[#1E40AF] hover:bg-blue-50 shadow-sm"
                            title="Telecharger le PDF"
                            disabled={isPending}
                          >
                            <HugeiconsIcon icon={FileDownloadIcon} size={16} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(quote.id, quote.club)}
                            className="h-10 w-10 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50"
                            title="Supprimer"
                          >
                            <HugeiconsIcon icon={Delete01Icon} size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50" title="Voir les details">
                            <Link href={`/admin/quotes/${quote.id}`}>
                              <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open: boolean) => !open && handleDeleteCancel()}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer le devis</DialogTitle>
            <DialogDescription className="pt-2">
              Etes-vous sur de vouloir supprimer le devis pour <strong className="text-slate-900">&ldquo;{deleteDialog.quoteClub}&rdquo;</strong> ? Cette action est irreversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleDeleteCancel}
              disabled={isPending}
              className="rounded-xl h-12 font-semibold"
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isPending}
              className="rounded-xl h-12 font-semibold min-w-[120px]"
            >
              {isPending ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Suppression...
                </>
              ) : (
                "Supprimer"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}