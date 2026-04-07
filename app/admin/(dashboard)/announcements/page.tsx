"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Notification01Icon, Calendar01Icon, Edit01Icon, Delete01Icon, MessageNotification01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { AdminMetricCard } from "@/app/admin/components/admin-metric-card"
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle"
import { AdminStatusBadge, StatusTone } from "@/app/admin/components/admin-status-badge"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Announcement {
  id: number
  title: string
  type: "Banner" | "Popup" | "Info"
  status: "Active" | "Programmee" | "Archivee"
  range: string
  content: string
}

const mockAnnouncements: Announcement[] = [
  { id: 1, title: "Nouvelle collection disponible", type: "Banner", status: "Active", range: "01 Avr - 15 Avr", content: "Decouvrez notre nouvelle collection ete 2026." },
  { id: 2, title: "Livraison speciale Ramadan", type: "Popup", status: "Programmee", range: "08 Avr - 12 Avr", content: "Livraison gratuite pendant le Ramadan a partir de 25 000 FCFA d'achats." },
  { id: 3, title: "Horaires d'ouverture mis a jour", type: "Info", status: "Archivee", range: "01 Mar - 31 Mar", content: "Nos boutiques ferment a 18h pendant le mois de Mars." },
]

const statusToneMap: Record<string, StatusTone> = {
  "Active": "success",
  "Programmee": "warning",
  "Archivee": "neutral"
}

interface DeleteDialogState {
  open: boolean
  announcementId: number | null
  announcementName: string
}

function AnnouncementForm({ announcement, onSubmit, isPending }: { announcement?: Announcement; onSubmit: () => void; isPending: boolean }) {
  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Titre de l'annonce</label>
        <Input placeholder="Ex: Livraison offerte" defaultValue={announcement?.title} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Type d'affichage</label>
        <Select defaultValue={announcement?.type ?? "Banner"}>
          <SelectTrigger className="h-12 bg-slate-50 border-slate-200 focus:ring-[#1E40AF]">
            <SelectValue placeholder="Selectionner le type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Banner">Banner (Bandeau haut)</SelectItem>
            <SelectItem value="Popup">Popup (Modale centrale)</SelectItem>
            <SelectItem value="Info">Info (Discret)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Contenu du message</label>
        <Textarea
          className="min-h-[128px] resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4"
          placeholder="Saisissez le texte visible par les clients..."
          defaultValue={announcement?.content}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Date de debut</label>
          <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Date de fin</label>
          <Input type="date" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
        </div>
      </div>
      <Button
        size="lg"
        className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4"
        disabled={isPending}
        onClick={onSubmit}
      >
        {isPending ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Enregistrement...
          </>
        ) : announcement ? (
          "Enregistrer les modifications"
        ) : (
          "Publier l'annonce"
        )}
      </Button>
    </div>
  )
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    announcementId: null,
    announcementName: "",
  })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteDialog({ open: true, announcementId: id, announcementName: name })
  }

  const handleDeleteConfirm = () => {
    startTransition(() => {
      // TODO: Replace with actual server action call
      // await deleteAnnouncement(deleteDialog.announcementId!)
      toast.success("Annonce supprimee", {
        description: `"${deleteDialog.announcementName}" a ete supprimee avec succes.`,
      })
      setAnnouncements((prev) => prev.filter((a) => a.id !== deleteDialog.announcementId))
      setDeleteDialog({ open: false, announcementId: null, announcementName: "" })
      router.refresh()
    })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, announcementId: null, announcementName: "" })
  }

  const handleCreateAnnouncement = () => {
    startTransition(() => {
      // TODO: Replace with actual server action call
      toast.success("Annonce creee", {
        description: "La nouvelle annonce a ete publiee avec succes.",
      })
      router.refresh()
    })
  }

  const handleUpdateAnnouncement = () => {
    startTransition(() => {
      // TODO: Replace with actual server action call
      toast.success("Annonce mise a jour", {
        description: "Les modifications ont ete enregistrees avec succes.",
      })
      router.refresh()
    })
  }

  const emptyState = announcements.length === 0

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Annonces"
        description="Publiez des bannieres, popups et messages d'information sur le storefront."
        action={
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
                Nouvelle annonce
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-slate-900">Nouvelle annonce</SheetTitle>
                <SheetDescription>
                  Creez une annonce avec son type, son contenu et sa periode de diffusion.
                </SheetDescription>
              </SheetHeader>
              <AnnouncementForm onSubmit={handleCreateAnnouncement} isPending={isPending} />
            </SheetContent>
          </Sheet>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100 fill-mode-both">
        <AdminMetricCard label="Bannieres" value="1" icon={Notification01Icon} tone="primary" />
        <AdminMetricCard label="Popups" value="1" icon={MessageNotification01Icon} tone="warning" />
        <AdminMetricCard label="Programmées" value="1" icon={Calendar01Icon} tone="neutral" />
      </div>

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={Notification01Icon} size={20} />
                </div>
                Campagnes de communication
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Gerez l'affichage des messages promotionnels sur le storefront.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {emptyState ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 mb-6">
                  <HugeiconsIcon icon={Notification01Icon} size={48} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune annonce</h3>
                <p className="text-base text-slate-500 max-w-sm mb-6">Commencez par creer votre premiere annonce pour communiquer avec vos clients.</p>
              </div>
            ) : viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {announcements.map((announcement, index) => (
                  <div
                    key={announcement.title}
                    className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-slate-900">{announcement.title}</span>
                          <AdminStatusBadge tone={statusToneMap[announcement.status]}>
                            {announcement.status}
                          </AdminStatusBadge>
                        </div>
                        <div className="mt-1.5 flex items-center gap-3 text-sm font-medium text-slate-500">
                          <span className="font-mono text-slate-700 bg-slate-100 px-1.5 rounded">{announcement.type}</span>
                          <span>&bull;</span>
                          <span>{announcement.range}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-slate-900">Editer l'annonce</SheetTitle>
                            <SheetDescription>
                              Modifiez le contenu ou les dates de diffusion de cette campagne.
                            </SheetDescription>
                          </SheetHeader>
                          <AnnouncementForm announcement={announcement} onSubmit={handleUpdateAnnouncement} isPending={isPending} />
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(announcement.id, announcement.title)}
                        className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-red-50 transition-all duration-300"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
                {announcements.map((announcement) => (
                  <div key={announcement.title} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                      <HugeiconsIcon icon={Notification01Icon} size={100} />
                    </div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2 pr-4">
                        <span className="text-xl font-black tracking-tight text-slate-900 line-clamp-2">{announcement.title}</span>
                      </div>
                      <AdminStatusBadge tone={statusToneMap[announcement.status]} className="shrink-0 shadow-sm">
                        {announcement.status}
                      </AdminStatusBadge>
                    </div>
                    <div className="relative z-10 text-sm font-medium text-slate-500 mb-8">
                      P&eacute;riode: <span className="font-bold text-slate-700">{announcement.range}</span>
                    </div>
                    <div className="relative z-10 mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center rounded-md border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600 bg-slate-50">
                          {announcement.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                              <HugeiconsIcon icon={Edit01Icon} size={18} />
                            </Button>
                          </SheetTrigger>
                          <SheetContent>
                            <SheetHeader>
                              <SheetTitle className="text-2xl font-bold text-slate-900">Editer l'annonce</SheetTitle>
                              <SheetDescription>
                                Modifiez le contenu ou les dates de diffusion de cette campagne.
                              </SheetDescription>
                            </SheetHeader>
                            <AnnouncementForm announcement={announcement} onSubmit={handleUpdateAnnouncement} isPending={isPending} />
                          </SheetContent>
                        </Sheet>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(announcement.id, announcement.title)}
                          className="h-10 w-10 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-red-50 transition-all duration-300"
                        >
                          <HugeiconsIcon icon={Delete01Icon} size={18} />
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open: boolean) => !open && handleDeleteCancel()}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer l'annonce</DialogTitle>
            <DialogDescription className="pt-2">
              &Ecirc;tes-vous s&ucirc;r de vouloir supprimer <strong className="text-slate-900">&ldquo;{deleteDialog.announcementName}&rdquo;</strong> ? Cette action est irr&eacute;versible.
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