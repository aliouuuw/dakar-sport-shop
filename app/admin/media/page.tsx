"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon, Delete01Icon, Image01Icon, ListViewIcon, GridViewIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { AdminPageHeader } from "../components/admin-page-header"
import { AdminViewToggle } from "../components/admin-view-toggle"

const mediaFiles = [
  { id: 1, filename: "ballon-foot-pro-1.jpg", alt: "Ballon de foot professionnel face", size: "245 KB", date: "04 Avr 2026", url: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&q=80" },
  { id: 2, filename: "ballon-foot-pro-2.jpg", alt: "Ballon de foot professionnel côté", size: "198 KB", date: "04 Avr 2026", url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80" },
  { id: 3, filename: "maillot-senegal-domicile.png", alt: "Maillot équipe nationale Sénégal domicile", size: "850 KB", date: "02 Avr 2026", url: "https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=400&q=80" },
  { id: 4, filename: "crampons-puma-future.jpg", alt: "Crampons Puma Future Z rouges", size: "320 KB", date: "28 Mar 2026", url: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&q=80" },
  { id: 5, filename: "banner-ramadan.jpg", alt: "Bannière promotionnelle Ramadan", size: "1.2 MB", date: "25 Mar 2026", url: "https://images.unsplash.com/photo-1555596883-9b88914c6d67?w=400&q=80" },
  { id: 6, filename: "tapis-yoga-bleu.jpg", alt: "Tapis de yoga 6mm bleu", size: "150 KB", date: "15 Mar 2026", url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&q=80" },
  { id: 7, filename: "ballon-basket-spalding.jpg", alt: "Ballon de basketball Spalding", size: "280 KB", date: "10 Mar 2026", url: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&q=80" },
  { id: 8, filename: "gants-gardien-nike.png", alt: "Gants de gardien Nike Grip", size: "410 KB", date: "05 Mar 2026", url: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=400&q=80" },
]

export default function MediaPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Médias"
        description="Gérez votre bibliothèque d'images pour les produits et annonces."
        action={
          <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
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
              placeholder="Rechercher par nom de fichier..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{mediaFiles.length} fichiers</span>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} className="bg-white rounded-xl shadow-sm border border-slate-200 p-1" />
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="p-8 bg-slate-50/30">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
              {mediaFiles.map((file, index) => (
                <div 
                  key={file.id} 
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all hover:border-[#1E40AF]/40 hover:shadow-xl duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {/* Image preview */}
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    <img 
                      src={file.url} 
                      alt={file.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Hover overlay actions */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 backdrop-blur-[2px] transition-all duration-300 group-hover:opacity-100 scale-95 group-hover:scale-100">
                      <div className="flex gap-3">
                        <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg bg-white text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF]">
                          <HugeiconsIcon icon={Image01Icon} size={18} />
                        </Button>
                        <Button variant="secondary" size="icon" className="h-10 w-10 rounded-full shadow-lg bg-white text-slate-700 hover:bg-red-50 hover:text-red-600">
                          <HugeiconsIcon icon={Delete01Icon} size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* File details */}
                  <div className="flex flex-col p-4 border-t border-slate-100">
                    <span className="truncate text-sm font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors" title={file.filename}>
                      {file.filename}
                    </span>
                    <div className="mt-2 flex items-center justify-between text-xs font-medium text-slate-500">
                      <span className="bg-slate-100 px-1.5 rounded">{file.size}</span>
                      <span>{file.date}</span>
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
                  <th className="px-8 py-5">Date d'ajout</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-slate-50/30">
                {mediaFiles.map((file, index) => (
                  <tr 
                    key={file.id} 
                    className="group hover:bg-white transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-8 py-4">
                      <div className="h-16 w-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        <img 
                          src={file.url} 
                          alt={file.alt}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors">{file.filename}</span>
                        <span className="text-xs font-medium text-slate-500 line-clamp-1 max-w-xs mt-1" title={file.alt}>{file.alt}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 font-bold text-slate-700">
                      <span className="bg-slate-100 px-2 py-1 rounded-md">{file.size}</span>
                    </td>
                    <td className="px-8 py-4 font-medium text-slate-500">{file.date}</td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50 transition-colors">
                          <HugeiconsIcon icon={Image01Icon} size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors">
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
          <span>Affichage de <span className="text-slate-900 font-bold">{mediaFiles.length}</span> sur {mediaFiles.length} fichiers</span>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Précédent</Button>
            <Button variant="outline" size="sm" className="h-10 rounded-xl border-slate-200 text-xs font-bold px-4 hover:bg-slate-50" disabled>Suivant</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
