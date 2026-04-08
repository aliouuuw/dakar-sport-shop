"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Calendar01Icon, DiscountTag01Icon, Edit01Icon, Delete01Icon, PercentIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { AdminMetricCard } from "@/app/admin/components/admin-metric-card"
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle"
import { AdminStatusBadge, type StatusTone } from "@/app/admin/components/admin-status-badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  createPromotion, updatePromotion, deletePromotion, type PromotionInput,
} from "@/lib/actions/promotions"

type PromoRow = {
  id: number
  title: string
  code: string | null
  discountType: "percentage" | "fixed"
  discountValue: number
  active: boolean
  startsAt: Date
  endsAt: Date
  createdAt: Date
  updatedAt: Date
}

function promoTone(p: PromoRow): StatusTone {
  const now = new Date()
  if (!p.active || new Date(p.endsAt) < now) return "neutral"
  if (new Date(p.startsAt) > now) return "warning"
  return "success"
}
function promoLabel(p: PromoRow) {
  const now = new Date()
  if (!p.active || new Date(p.endsAt) < now) return "Expirée"
  if (new Date(p.startsAt) > now) return "À venir"
  return "Active"
}
function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short" }).format(new Date(d))
}
function fmtValue(p: PromoRow) {
  return p.discountType === "percentage"
    ? `${p.discountValue}%`
    : `${p.discountValue.toLocaleString("fr")} FCFA`
}

function Spin() {
  return (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

type FormData = { title: string; code: string; discountType: "percentage" | "fixed"; discountValue: number; startsAt: string; endsAt: string }

function PromotionForm({ promo, isPending, onSave }: { promo?: PromoRow; isPending: boolean; onSave: (d: FormData) => void }) {
  const [title, setTitle] = useState(promo?.title ?? "")
  const [code, setCode] = useState(promo?.code ?? ""  )
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">(promo?.discountType ?? "percentage")
  const [discountValue, setDiscountValue] = useState(String(promo?.discountValue ?? ""))
  const [startsAt, setStartsAt] = useState(promo?.startsAt ? new Date(promo.startsAt).toISOString().slice(0, 10) : "")
  const [endsAt, setEndsAt] = useState(promo?.endsAt ? new Date(promo.endsAt).toISOString().slice(0, 10) : "")

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Titre</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Promo rentrée" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Code promo</label>
        <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="Ex: RENTREE20" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Type</label>
          <Select value={discountType} onValueChange={(v) => setDiscountType(v as "percentage" | "fixed")}>
            <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Pourcentage</SelectItem>
              <SelectItem value="fixed">Fixe</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Valeur</label>
          <Input value={discountValue} onChange={(e) => setDiscountValue(e.target.value)} placeholder="Ex: 20" type="number" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Début</label>
          <Input type="date" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="h-12 bg-slate-50 border-slate-200" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Fin</label>
          <Input type="date" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="h-12 bg-slate-50 border-slate-200" />
        </div>
      </div>
      <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4" disabled={isPending}
        onClick={() => onSave({ title, code, discountType, discountValue: Number(discountValue), startsAt, endsAt })}>
        {isPending ? <><Spin />Enregistrement...</> : promo ? "Enregistrer" : "Créer la promotion"}
      </Button>
    </div>
  )
}

export function PromotionsClient({ initial }: { initial: PromoRow[] }) {
  const [list, setList] = useState(initial)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [del, setDel] = useState<{ open: boolean; id: number | null; name: string }>({ open: false, id: null, name: "" })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const now = new Date()
  const active = list.filter((p) => p.active && new Date(p.startsAt) <= now && new Date(p.endsAt) >= now).length
  const upcoming = list.filter((p) => p.active && new Date(p.startsAt) > now).length
  const expired = list.filter((p) => !p.active || new Date(p.endsAt) < now).length

  const doSave = (promo: PromoRow | undefined, data: FormData) => {
    startTransition(async () => {
      const payload: PromotionInput = {
        title: data.title, code: data.code,
        discountType: data.discountType, discountValue: Number(data.discountValue),
        active: true,
        startsAt: data.startsAt ? new Date(data.startsAt) : new Date(),
        endsAt: data.endsAt ? new Date(data.endsAt) : new Date(),
      }
      const result = promo
        ? await updatePromotion(promo.id, payload)
        : await createPromotion(payload)
      if (result.success) {
        toast.success(promo ? "Promotion mise à jour" : "Promotion créée")
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  const doDelete = () => {
    if (!del.id) return
    startTransition(async () => {
      const result = await deletePromotion(del.id!)
      if (result.success) {
        toast.success("Promotion supprimée")
        setList((prev) => prev.filter((p) => p.id !== del.id))
        setDel({ open: false, id: null, name: "" })
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Promotions"
        description="Gérez vos codes promotionnels, types de remises et périodes d'application."
        action={
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md font-semibold h-12 rounded-xl">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />Nouvelle promotion
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Nouvelle promotion</SheetTitle>
                <SheetDescription>Créez une promotion avec son type, sa valeur, son code et ses dates.</SheetDescription>
              </SheetHeader>
              <PromotionForm isPending={isPending} onSave={(d) => doSave(undefined, d)} />
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <AdminMetricCard label="Actives" value={String(active)} icon={PercentIcon} tone="primary" />
        <AdminMetricCard label="À venir" value={String(upcoming)} icon={Calendar01Icon} tone="warning" />
        <AdminMetricCard label="Expirées" value={String(expired)} icon={DiscountTag01Icon} tone="neutral" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={DiscountTag01Icon} size={20} /></div>
                Campagnes en cours
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Consultez et gérez vos promotions actives, à venir et expirées.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 mb-6"><HugeiconsIcon icon={PercentIcon} size={48} className="text-slate-400" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune promotion</h3>
                <p className="text-base text-slate-500 max-w-sm">Créez votre première promotion pour offrir des réductions.</p>
              </div>
            ) : viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {list.map((p, idx) => (
                  <div key={p.id} className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-900">{p.title}</span>
                        <AdminStatusBadge tone={promoTone(p)}>{promoLabel(p)}</AdminStatusBadge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                        <span className="font-mono text-slate-700 bg-slate-100 px-1.5 rounded">{p.code}</span>
                        <span>&bull;</span>
                        <span>{p.discountType === "percentage" ? "Pourcentage" : "Fixe"}</span>
                        <span>&bull;</span>
                        <span>{fmtDate(p.startsAt)} – {fmtDate(p.endsAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-2xl font-black tracking-tight text-slate-900">{fmtValue(p)}</span>
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all">
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader><SheetTitle className="text-2xl font-bold">Éditer la promotion</SheetTitle><SheetDescription>Modifiez les informations.</SheetDescription></SheetHeader>
                          <PromotionForm promo={p} isPending={isPending} onSave={(d) => doSave(p, d)} />
                        </SheetContent>
                      </Sheet>
                      <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: p.id, name: p.title })} className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-red-50 transition-all">
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {list.map((p) => (
                  <div key={p.id} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 pointer-events-none"><HugeiconsIcon icon={PercentIcon} size={100} /></div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <span className="text-xl font-black tracking-tight text-slate-900 line-clamp-1">{p.title}</span>
                      <AdminStatusBadge tone={promoTone(p)} className="shrink-0 shadow-sm">{promoLabel(p)}</AdminStatusBadge>
                    </div>
                    <div className="relative z-10 flex flex-col gap-2 mb-8">
                      <div className="text-sm font-medium text-slate-500">Code: <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 rounded">{p.code}</span></div>
                      <div className="text-sm font-medium text-slate-500">Période: {fmtDate(p.startsAt)} – {fmtDate(p.endsAt)}</div>
                    </div>
                    <div className="relative z-10 mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">{p.discountType === "percentage" ? "Pourcentage" : "Fixe"}</span>
                        <span className="text-3xl font-black tracking-tighter text-slate-900">{fmtValue(p)}</span>
                      </div>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:text-[#1E40AF] hover:bg-blue-50"><HugeiconsIcon icon={Edit01Icon} size={18} /></Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader><SheetTitle className="text-2xl font-bold">Éditer la promotion</SheetTitle><SheetDescription>Modifiez les informations.</SheetDescription></SheetHeader>
                            <PromotionForm promo={p} isPending={isPending} onSave={(d) => doSave(p, d)} />
                          </SheetContent>
                        </Sheet>
                        <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: p.id, name: p.title })} className="h-10 w-10 rounded-full hover:text-[#DC2626] hover:bg-red-50"><HugeiconsIcon icon={Delete01Icon} size={18} /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={del.open} onOpenChange={(open) => !open && setDel({ open: false, id: null, name: "" })}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer la promotion</DialogTitle>
            <DialogDescription className="pt-2">
              Êtes-vous sûr de vouloir supprimer <strong className="text-slate-900">&ldquo;{del.name}&rdquo;</strong> ? Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 pt-2">
            <Button variant="outline" onClick={() => setDel({ open: false, id: null, name: "" })} disabled={isPending} className="rounded-xl h-12 font-semibold">Annuler</Button>
            <Button variant="destructive" onClick={doDelete} disabled={isPending} className="rounded-xl h-12 font-semibold min-w-[120px]">
              {isPending ? <><Spin />Suppression...</> : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
