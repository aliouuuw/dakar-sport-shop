"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { FileDownloadIcon, ArrowRight01Icon, Invoice01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle"
import { AdminStatusBadge, type StatusTone } from "@/app/admin/components/admin-status-badge"
import { toast } from "sonner"
import { updateQuoteStatus, deleteQuote } from "@/lib/actions/quotes"

type QuoteStatus = "new" | "pending" | "sent" | "accepted" | "rejected"

type QuoteRow = {
  id: number
  clubName: string
  contactName: string
  email: string
  phone: string | null
  status: QuoteStatus
  totalPrice: number
  items: unknown
  createdAt: Date
  updatedAt: Date
}

const statusToneMap: Record<QuoteStatus, StatusTone> = {
  new: "info",
  pending: "warning",
  sent: "success",
  accepted: "success",
  rejected: "neutral",
}

const statusLabels: Record<QuoteStatus, string> = {
  new: "Nouveau",
  pending: "En cours",
  sent: "Envoyé",
  accepted: "Accepté",
  rejected: "Refusé",
}

function fmtPrice(n: number) {
  return `${n.toLocaleString("fr")} FCFA`
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d))
}

function itemCount(items: unknown): number {
  if (!Array.isArray(items)) return 0
  return items.reduce((sum: number, i: { quantity?: number }) => sum + (i.quantity ?? 0), 0)
}

function Spin() {
  return (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

export function QuotesClient({ initial }: { initial: QuoteRow[] }) {
  const [list, setList] = useState(initial)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [del, setDel] = useState<{ open: boolean; id: number | null; club: string }>({ open: false, id: null, club: "" })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleStatusChange = (id: number, status: string) => {
    startTransition(async () => {
      const result = await updateQuoteStatus(id, status as QuoteStatus)
      if (result.success) {
        setList((prev) => prev.map((q) => (q.id === id ? { ...q, status: status as QuoteStatus } : q)))
        toast.success("Statut mis à jour", { description: `Statut changé en "${statusLabels[status as QuoteStatus]}".` })
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  const doDelete = () => {
    if (!del.id) return
    startTransition(async () => {
      const result = await deleteQuote(del.id!)
      if (result.success) {
        toast.success("Devis supprimé")
        setList((prev) => prev.filter((q) => q.id !== del.id))
        setDel({ open: false, id: null, club: "" })
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Devis"
        description="Gérez les demandes de devis des clubs et partenaires."
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={Invoice01Icon} size={20} /></div>
                Liste des devis
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Suivez l&apos;état d&apos;avancement de vos propositions commerciales.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 mb-6"><HugeiconsIcon icon={Invoice01Icon} size={48} className="text-slate-400" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aucun devis</h3>
                <p className="text-base text-slate-500 max-w-sm">Aucune demande de devis pour l&apos;instant.</p>
              </div>
            ) : viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {list.map((q, idx) => (
                  <div key={q.id} className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-900">{q.clubName}</span>
                        <AdminStatusBadge tone={statusToneMap[q.status]}>{statusLabels[q.status]}</AdminStatusBadge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                        <span className="font-bold text-slate-700">{q.contactName}</span>
                        <span>&bull;</span>
                        <span>{itemCount(q.items)} articles</span>
                        <span>&bull;</span>
                        <span>{fmtDate(q.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <Select value={q.status} onValueChange={(v) => handleStatusChange(q.id, v)}>
                        <SelectTrigger className="w-[140px] h-9 rounded-lg"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nouveau</SelectItem>
                          <SelectItem value="pending">En cours</SelectItem>
                          <SelectItem value="sent">Envoyé</SelectItem>
                          <SelectItem value="accepted">Accepté</SelectItem>
                          <SelectItem value="rejected">Refusé</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total TTC</span>
                        <span className="text-xl font-black tracking-tight text-slate-900 whitespace-nowrap">{fmtPrice(q.totalPrice)}</span>
                      </div>
                      <div className="h-10 w-px bg-slate-200 mx-2" />
                      <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-[#1E40AF] hover:bg-blue-50 shadow-sm" title="Télécharger PDF" disabled>
                          <HugeiconsIcon icon={FileDownloadIcon} size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50">
                          <Link href={`/admin/quotes/${q.id}`}><HugeiconsIcon icon={ArrowRight01Icon} size={18} /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: q.id, club: q.clubName })} className="h-10 w-10 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50">
                          <HugeiconsIcon icon={Delete01Icon} size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {list.map((q, idx) => (
                  <div key={q.id} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 pointer-events-none"><HugeiconsIcon icon={Invoice01Icon} size={100} /></div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <span className="text-xl font-black tracking-tight text-slate-900 line-clamp-1 pr-2">{q.clubName}</span>
                      <AdminStatusBadge tone={statusToneMap[q.status]} className="shrink-0 shadow-sm">{statusLabels[q.status]}</AdminStatusBadge>
                    </div>
                    <div className="relative z-10 flex flex-col gap-2 mb-8">
                      <div className="text-sm font-bold text-slate-700">{q.contactName}</div>
                      <div className="text-sm font-medium text-slate-500">{itemCount(q.items)} articles demandés</div>
                      <div className="text-sm font-medium text-slate-400">{fmtDate(q.createdAt)}</div>
                    </div>
                    <div className="relative z-10 mt-auto flex flex-col gap-3 pt-4 border-t border-slate-100">
                      <Select value={q.status} onValueChange={(v) => handleStatusChange(q.id, v)}>
                        <SelectTrigger className="w-full h-9 rounded-lg"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nouveau</SelectItem>
                          <SelectItem value="pending">En cours</SelectItem>
                          <SelectItem value="sent">Envoyé</SelectItem>
                          <SelectItem value="accepted">Accepté</SelectItem>
                          <SelectItem value="rejected">Refusé</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-end justify-between">
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Total TTC</span>
                          <span className="text-3xl font-black tracking-tighter text-slate-900">{fmtPrice(q.totalPrice)}</span>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-[#1E40AF] hover:bg-blue-50 shadow-sm" disabled>
                            <HugeiconsIcon icon={FileDownloadIcon} size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: q.id, club: q.clubName })} className="h-10 w-10 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50">
                            <HugeiconsIcon icon={Delete01Icon} size={14} />
                          </Button>
                          <Button variant="ghost" size="icon" asChild className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50">
                            <Link href={`/admin/quotes/${q.id}`}><HugeiconsIcon icon={ArrowRight01Icon} size={16} /></Link>
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

      <Dialog open={del.open} onOpenChange={(open) => !open && setDel({ open: false, id: null, club: "" })}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer le devis</DialogTitle>
            <DialogDescription className="pt-2">
              Êtes-vous sûr de vouloir supprimer le devis pour <strong className="text-slate-900">&ldquo;{del.club}&rdquo;</strong> ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 pt-2">
            <Button variant="outline" onClick={() => setDel({ open: false, id: null, club: "" })} disabled={isPending} className="rounded-xl h-12 font-semibold">Annuler</Button>
            <Button variant="destructive" onClick={doDelete} disabled={isPending} className="rounded-xl h-12 font-semibold min-w-[120px]">
              {isPending ? <><Spin />Suppression...</> : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
