"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Add01Icon, Notification01Icon, Calendar01Icon, Edit01Icon, Delete01Icon, MessageNotification01Icon,
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { AdminMetricCard } from "@/app/admin/components/admin-metric-card"
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle"
import { AdminStatusBadge, type StatusTone } from "@/app/admin/components/admin-status-badge"
import {
  Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import {
  createAnnouncement, updateAnnouncement, deleteAnnouncement, type AnnouncementInput,
} from "@/lib/actions/announcements"

type AnnRow = {
  id: number
  title: string
  body: string
  type: "banner" | "popup" | "info"
  active: boolean
  startsAt: Date | null
  endsAt: Date | null
  order: number
  createdAt: Date
  updatedAt: Date
}

function tone(a: AnnRow): StatusTone {
  if (!a.active) return "neutral"
  const now = new Date()
  if (a.startsAt && new Date(a.startsAt) > now) return "warning"
  return "success"
}

function label(a: AnnRow) {
  if (!a.active) return "Archivée"
  const now = new Date()
  if (a.startsAt && new Date(a.startsAt) > now) return "Programmée"
  return "Active"
}

function fmtDate(d: Date | null) {
  if (!d) return "—"
  return new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short" }).format(new Date(d))
}

function Spin() {
  return (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

type FormData = { title: string; body: string; type: AnnouncementInput["type"]; startsAt: string; endsAt: string }

function AnnouncementForm({
  ann, isPending, onSave,
}: { ann?: AnnRow; isPending: boolean; onSave: (d: FormData) => void }) {
  const [type, setType] = useState<AnnouncementInput["type"]>(ann?.type ?? "banner")
  const [title, setTitle] = useState(ann?.title ?? "")
  const [body, setBody] = useState(ann?.body ?? "")
  const [startsAt, setStartsAt] = useState(ann?.startsAt ? new Date(ann.startsAt).toISOString().slice(0, 10) : "")
  const [endsAt, setEndsAt] = useState(ann?.endsAt ? new Date(ann.endsAt).toISOString().slice(0, 10) : "")

  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Titre</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ex: Livraison offerte" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Type</label>
        <Select value={type} onValueChange={(v) => setType(v as AnnouncementInput["type"])}>
          <SelectTrigger className="h-12 bg-slate-50 border-slate-200"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="banner">Banner</SelectItem>
            <SelectItem value="popup">Popup</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Contenu</label>
        <Textarea value={body} onChange={(e) => setBody(e.target.value)} className="min-h-[128px] resize-none bg-slate-50 border-slate-200 p-4" />
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
      <Button
        size="lg"
        className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4"
        disabled={isPending}
        onClick={() => onSave({ title, body, type, startsAt, endsAt })}
      >
        {isPending ? <><Spin />Enregistrement...</> : ann ? "Enregistrer" : "Publier"}
      </Button>
    </div>
  )
}

export function AnnouncementsClient({ initial }: { initial: AnnRow[] }) {
  const [list, setList] = useState(initial)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [del, setDel] = useState<{ open: boolean; id: number | null; name: string }>({ open: false, id: null, name: "" })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const banners = list.filter((a) => a.type === "banner").length
  const popups = list.filter((a) => a.type === "popup").length
  const now = new Date()
  const scheduled = list.filter((a) => a.active && a.startsAt && new Date(a.startsAt) > now).length

  const doSave = (ann: AnnRow | undefined, data: FormData) => {
    startTransition(async () => {
      const payload: AnnouncementInput = {
        title: data.title, body: data.body, type: data.type, active: true, order: 0,
        startsAt: data.startsAt ? new Date(data.startsAt) : null,
        endsAt: data.endsAt ? new Date(data.endsAt) : null,
      }
      const result = ann
        ? await updateAnnouncement(ann.id, payload)
        : await createAnnouncement(payload)
      if (result.success) {
        toast.success(ann ? "Annonce mise à jour" : "Annonce créée")
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
    })
  }

  const doDelete = () => {
    if (!del.id) return
    startTransition(async () => {
      const result = await deleteAnnouncement(del.id!)
      if (result.success) {
        toast.success("Annonce supprimée")
        setList((prev) => prev.filter((a) => a.id !== del.id))
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
        title="Annonces"
        description="Publiez des bannières, popups et messages d'information sur le storefront."
        action={
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md font-semibold h-12 rounded-xl">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />Nouvelle annonce
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold">Nouvelle annonce</SheetTitle>
                <SheetDescription>Créez une annonce avec son type, son contenu et sa période.</SheetDescription>
              </SheetHeader>
              <AnnouncementForm isPending={isPending} onSave={(d) => doSave(undefined, d)} />
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <AdminMetricCard label="Bannières" value={String(banners)} icon={Notification01Icon} tone="primary" />
        <AdminMetricCard label="Popups" value={String(popups)} icon={MessageNotification01Icon} tone="warning" />
        <AdminMetricCard label="Programmées" value={String(scheduled)} icon={Calendar01Icon} tone="neutral" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={Notification01Icon} size={20} /></div>
                Campagnes de communication
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Gérez l&apos;affichage des messages promotionnels sur le storefront.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {list.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 mb-6"><HugeiconsIcon icon={Notification01Icon} size={48} className="text-slate-400" /></div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune annonce</h3>
                <p className="text-base text-slate-500 max-w-sm">Commencez par créer votre première annonce pour communiquer avec vos clients.</p>
              </div>
            ) : viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {list.map((a, idx) => (
                  <div key={a.id} className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors" style={{ animationDelay: `${idx * 50}ms` }}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-slate-900">{a.title}</span>
                        <AdminStatusBadge tone={tone(a)}>{label(a)}</AdminStatusBadge>
                      </div>
                      <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                        <span className="font-mono text-slate-700 bg-slate-100 px-1.5 rounded">{a.type}</span>
                        <span>&bull;</span>
                        <span>{fmtDate(a.startsAt)} – {fmtDate(a.endsAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all">
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle className="text-2xl font-bold">Éditer l&apos;annonce</SheetTitle>
                            <SheetDescription>Modifiez le contenu ou les dates de diffusion.</SheetDescription>
                          </SheetHeader>
                          <AnnouncementForm ann={a} isPending={isPending} onSave={(d) => doSave(a, d)} />
                        </SheetContent>
                      </Sheet>
                      <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: a.id, name: a.title })} className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-red-50 transition-all">
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {list.map((a) => (
                  <div key={a.id} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 pointer-events-none"><HugeiconsIcon icon={Notification01Icon} size={100} /></div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <span className="text-xl font-black tracking-tight text-slate-900 line-clamp-2 pr-4">{a.title}</span>
                      <AdminStatusBadge tone={tone(a)} className="shrink-0 shadow-sm">{label(a)}</AdminStatusBadge>
                    </div>
                    <div className="relative z-10 text-sm font-medium text-slate-500 mb-8">Période: <span className="font-bold text-slate-700">{fmtDate(a.startsAt)} – {fmtDate(a.endsAt)}</span></div>
                    <div className="relative z-10 mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <span className="inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 bg-slate-50">{a.type}</span>
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full hover:text-[#1E40AF] hover:bg-blue-50"><HugeiconsIcon icon={Edit01Icon} size={18} /></Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader><SheetTitle className="text-2xl font-bold">Éditer l&apos;annonce</SheetTitle><SheetDescription>Modifiez le contenu ou les dates.</SheetDescription></SheetHeader>
                            <AnnouncementForm ann={a} isPending={isPending} onSave={(d) => doSave(a, d)} />
                          </SheetContent>
                        </Sheet>
                        <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: a.id, name: a.title })} className="h-10 w-10 rounded-full hover:text-[#DC2626] hover:bg-red-50"><HugeiconsIcon icon={Delete01Icon} size={18} /></Button>
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
            <DialogTitle className="text-xl">Supprimer l&apos;annonce</DialogTitle>
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
