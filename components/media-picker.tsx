"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Search01Icon, Image01Icon, Tick02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

interface MediaPickerProps {
  onSelect: (url: string) => void
  onClose: () => void
}

const mediaFiles = [
  { id: 1, filename: "ballon-foot-pro-1.jpg", alt: "Ballon de foot professionnel face", url: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=400&q=80" },
  { id: 2, filename: "ballon-foot-pro-2.jpg", alt: "Ballon de foot professionnel côté", url: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&q=80" },
  { id: 3, filename: "maillot-senegal-domicile.png", alt: "Maillot équipe nationale Sénégal domicile", url: "https://images.unsplash.com/photo-1580087433295-ab2600c1030e?w=400&q=80" },
  { id: 4, filename: "crampons-puma-future.jpg", alt: "Crampons Puma Future Z rouges", url: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=400&q=80" },
  { id: 5, filename: "banner-ramadan.jpg", alt: "Bannière promotionnelle Ramadan", url: "https://images.unsplash.com/photo-1555596883-9b88914c6d67?w=400&q=80" },
  { id: 6, filename: "tapis-yoga-bleu.jpg", alt: "Tapis de yoga 6mm bleu", url: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&q=80" },
]

export function MediaPicker({ onSelect, onClose }: MediaPickerProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  const handleConfirm = () => {
    if (selectedId) {
      const file = mediaFiles.find(f => f.id === selectedId)
      if (file) onSelect(file.url)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="flex h-full max-h-[80vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <HugeiconsIcon icon={Image01Icon} size={20} className="text-[#1E40AF]" />
            <h2 className="text-lg font-semibold text-slate-900">Sélectionner un média</h2>
          </div>
          <button onClick={onClose} className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <HugeiconsIcon icon={Cancel01Icon} size={20} />
          </button>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-3">
          <div className="flex w-full max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5">
            <HugeiconsIcon icon={Search01Icon} size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <Button variant="outline" size="sm" className="h-8 border-slate-200 bg-white">
            Uploader
          </Button>
        </div>

        {/* Grid Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {mediaFiles.map((file) => {
              const isSelected = selectedId === file.id
              
              return (
                <button
                  key={file.id}
                  onClick={() => setSelectedId(file.id)}
                  className={`group relative flex aspect-square flex-col overflow-hidden rounded-xl border text-left transition-all ${
                    isSelected 
                      ? "border-[#1E40AF] ring-2 ring-[#1E40AF]/20" 
                      : "border-slate-200 hover:border-[#1E40AF]/50"
                  }`}
                >
                  <div className="relative flex-1 bg-slate-100 overflow-hidden">
                    <img 
                      src={file.url} 
                      alt={file.alt}
                      className={`h-full w-full object-cover transition-transform duration-300 ${isSelected ? "scale-105" : "group-hover:scale-105"}`}
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#1E40AF]/10 ring-inset ring-[#1E40AF]">
                        <div className="absolute right-2 top-2 rounded-full bg-[#1E40AF] p-1 text-white shadow-sm">
                          <HugeiconsIcon icon={Tick02Icon} size={14} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-slate-100 bg-white p-2">
                    <p className="truncate text-xs font-medium text-slate-900" title={file.filename}>
                      {file.filename}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-6 py-4">
          <p className="text-sm text-slate-500">
            {selectedId ? "1 élément sélectionné" : "Aucun élément sélectionné"}
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="border-slate-200 bg-white">
              Annuler
            </Button>
            <Button 
              onClick={handleConfirm} 
              disabled={!selectedId}
              className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] disabled:bg-slate-200 disabled:text-slate-400"
            >
              Sélectionner
            </Button>
          </div>
        </div>

      </div>
    </div>
  )
}
