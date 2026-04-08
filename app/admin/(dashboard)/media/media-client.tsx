"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon, Delete01Icon, Image01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle"
import { deleteMedia } from "@/lib/actions/media"

type MediaRow = {
  id: number
  url: string
  alt: string | null
  filename: string
  mimeType: string
  size: number
  width: number | null
  height: number | null
  createdAt: Date
}

function fmtSize(bytes: number) {
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${Math.round(bytes / 1_000)} KB`
  return `${bytes} B`
}

function fmtDate(d: Date) {
  return new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d))
}

function Spin() {
  return (
    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

export function MediaClient({ initial }: { initial: MediaRow[] }) {
  const [list, setList] = useState(initial)
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [search, setSearch] = useState("")
  const [del, setDel] = useState<{ open: boolean; id: number | null; name: string }>({ open: false, id: null, name: "" })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const filtered = list.filter(
    (f) =>
      f.filename.toLowerCase().includes(search.toLowerCase()) ||
      (f.alt ?? "").toLowerCase().includes(search.toLowerCase())
  )

  const doDelete = () => {
    if (!del.id) return
    startTransition(async () => {
      const result = await deleteMedia(del.id!)
      if (result.success) {
        toast.success("Média supprimé", { description: `"${del.name}" a été supprimé.` })
        setList((prev) => prev.filter((f) => f.id !== del.id))
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
        title="Médias"
        description="Gérez votre bibliothèque d'images pour les produits et annonces."
        action={
          <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md font-semibold h-12 rounded-xl" disabled>
            <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
            Uploader une image
          </Button>
        }
      />

      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 flex-1 max-w-md shadow-sm transition-shadow focus-within:shadow-md focus-within:border-blue-300">
            <HugeiconsIcon icon={Search01Icon} size={18} className="text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher par nom de fichier..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{filtered.length} fichiers</span>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <AdminViewToggle viewMode={viewMode} onViewModeChange={(m) => setViewMode(m)} className="bg-white rounded-xl shadow-sm border border-slate-200 p-1" />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="rounded-2xl bg-slate-100 p-4 mb-6">
              <HugeiconsIcon icon={Image01Icon} size={48} className="text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              {search ? "Aucun résultat" : "Aucun média"}
            </h3>
            <p className="text-base text-slate-500 max-w-sm">
              {search
                ? `Aucun fichier ne correspond à "${search}"`
                : "Commencez par uploader votre première image."}
            </p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="p-8 bg-slate-50/30">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {filtered.map((file, index) => (
                <div
                  key={file.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#1E40AF]/40 hover:shadow-xl duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    <img src={file.url} alt={file.alt ?? file.filename} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 scale-95 group-hover:scale-100">
                      <Button
                        variant="secondary" size="icon"
                        onClick={() => setDel({ open: true, id: file.id, name: file.filename })}
                        className="h-10 w-10 rounded-full shadow-lg bg-white text-slate-700 hover:bg-red-50 hover:text-red-600"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col p-4 border-t border-slate-100">
                    <span className="truncate text-sm font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors" title={file.filename}>{file.filename}</span>
                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-500">
                      <span className="bg-slate-100 px-1.5 rounded">{fmtSize(file.size)}</span>
                      <span>{fmtDate(file.createdAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-white text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-8 py-5">Aperçu</th>
                  <th className="px-8 py-5">Nom du fichier</th>
                  <th className="px-8 py-5">Taille</th>
                  <th className="px-8 py-5">Date d&apos;ajout</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-slate-50/30">
                {filtered.map((file, index) => (
                  <tr key={file.id} className="group hover:bg-white transition-colors duration-200" style={{ animationDelay: `${index * 50}ms` }}>
                    <td className="px-8 py-4">
                      <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img src={file.url} alt={file.alt ?? file.filename} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors">{file.filename}</span>
                        {file.alt && <span className="text-xs font-medium text-slate-500 line-clamp-1 max-w-xs mt-1">{file.alt}</span>}
                      </div>
                    </td>
                    <td className="px-8 py-4 font-bold text-slate-700">
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{fmtSize(file.size)}</span>
                    </td>
                    <td className="px-8 py-4 font-medium text-slate-500">{fmtDate(file.createdAt)}</td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" onClick={() => setDel({ open: true, id: file.id, name: file.filename })} className="h-10 w-10 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                          <HugeiconsIcon icon={Delete01Icon} size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5 text-sm font-medium text-slate-500 bg-white">
          <span>Affichage de <span className="text-slate-900 font-bold">{filtered.length}</span> sur {list.length} fichiers</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Suivant</Button>
          </div>
        </div>
      </div>

      <Dialog open={del.open} onOpenChange={(open) => !open && setDel({ open: false, id: null, name: "" })}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer le média</DialogTitle>
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
