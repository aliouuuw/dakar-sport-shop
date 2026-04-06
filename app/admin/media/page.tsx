import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Search01Icon, Delete01Icon, Image01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

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
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Médias</h1>
          <p className="mt-1 text-sm text-slate-500">Gérez votre bibliothèque d'images pour les produits et annonces</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Uploader une image
        </Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
            <HugeiconsIcon icon={Search01Icon} size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher par nom de fichier ou texte alternatif..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
          </div>
          <span className="text-sm text-slate-500">{mediaFiles.length} fichiers</span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
          {mediaFiles.map((file) => (
            <div key={file.id} className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-50 transition-all hover:border-[#1E40AF]/30 hover:shadow-sm">
              {/* Image preview */}
              <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                {/* Using a standard img tag for mock purposes to avoid Next.js Image config requirements */}
                <img 
                  src={file.url} 
                  alt={file.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Hover overlay actions */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 opacity-0 backdrop-blur-[1px] transition-opacity group-hover:opacity-100">
                  <div className="flex gap-2">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white text-slate-700 hover:bg-slate-100 hover:text-[#1E40AF]">
                      <HugeiconsIcon icon={Image01Icon} size={16} />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-white text-slate-700 hover:bg-red-50 hover:text-red-600">
                      <HugeiconsIcon icon={Delete01Icon} size={16} />
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* File details */}
              <div className="flex flex-col p-3">
                <span className="truncate text-xs font-medium text-slate-900" title={file.filename}>
                  {file.filename}
                </span>
                <div className="mt-1 flex items-center justify-between text-[10px] text-slate-500">
                  <span>{file.size}</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
