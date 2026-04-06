import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ShoppingBag01Icon,
  CheckmarkBadge01Icon,
  GridIcon,
  Mail01Icon,
  PercentIcon,
  Add01Icon,
  ArrowRight01Icon,
  MoreVerticalIcon
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const metrics = [
  { label: "Total Produits", value: "142", icon: ShoppingBag01Icon },
  { label: "Produits Actifs", value: "128", icon: CheckmarkBadge01Icon },
  { label: "Catégories", value: "8", icon: GridIcon },
  { label: "Messages non lus", value: "3", icon: Mail01Icon, alert: true },
  { label: "Promotions actives", value: "2", icon: PercentIcon },
]

const recentMessages = [
  { id: 1, name: "Moussa Diop", subject: "Devis pour équipe de foot", date: "Il y a 2h", unread: true },
  { id: 2, name: "Aissatou Fall", subject: "Disponibilité maillots", date: "Il y a 4h", unread: true },
  { id: 3, name: "Ibrahim Sene", subject: "Question sur les chaussures", date: "Hier", unread: true },
  { id: 4, name: "Fatou Ndiaye", subject: "Commande #1024", date: "Hier", unread: false },
  { id: 5, name: "Cheikh Ba", subject: "Partenariat", date: "04 Avr", unread: false },
]

export default async function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* HEADER */}
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Tableau de bord</h1>
          <p className="mt-1.5 text-sm text-slate-500">
            Aperçu des performances et activités récentes de Dakar Sport.
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          <Button variant="outline" asChild className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50">
            <Link href="/admin/promotions">
              <HugeiconsIcon icon={PercentIcon} size={18} className="mr-2" />
              Nouvelle promotion
            </Link>
          </Button>
          <Button asChild className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-none">
            <Link href="/admin/products/new">
              <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
              Ajouter un produit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, i) => (
          <div 
            key={i} 
            className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-[#1E40AF]/30 hover:shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{metric.label}</span>
              <div className="rounded-md bg-slate-50 p-2 text-slate-600 group-hover:bg-[#1E40AF]/10 group-hover:text-[#1E40AF] transition-colors">
                <HugeiconsIcon icon={metric.icon} size={18} />
              </div>
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight text-slate-900">
                {metric.value}
              </span>
              {metric.alert && (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#DC2626]"></span>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Messages récents</h2>
            <Button variant="ghost" size="sm" asChild className="text-[#1E40AF] hover:text-[#1e3a8a] hover:bg-blue-50">
              <Link href="/admin/messages">Voir tout <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1" /></Link>
            </Button>
          </div>
          
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-none">
            <div className="divide-y divide-slate-100">
              {recentMessages.map((msg) => (
                <div key={msg.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                      {msg.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-medium ${msg.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                          {msg.name}
                        </span>
                        {msg.unread && (
                          <Badge variant="secondary" className="h-5 rounded-md bg-blue-100 px-1.5 text-[10px] font-semibold text-[#1E40AF] border-none">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                      <span className="text-sm text-slate-500">{msg.subject}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-400 whitespace-nowrap">{msg.date}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                      <HugeiconsIcon icon={MoreVerticalIcon} size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-slate-900">Actions rapides</h2>
          
          <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <Button variant="ghost" asChild className="w-full justify-start text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF]">
              <Link href="/admin/announcements"><HugeiconsIcon icon={Add01Icon} size={18} className="mr-3 text-slate-400" />Créer une annonce</Link>
            </Button>
            <div className="h-px bg-slate-100 w-full" />
            <Button variant="ghost" asChild className="w-full justify-start text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF]">
              <Link href="/admin/products"><HugeiconsIcon icon={ShoppingBag01Icon} size={18} className="mr-3 text-slate-400" />Gérer les produits</Link>
            </Button>
            <div className="h-px bg-slate-100 w-full" />
            <Button variant="ghost" asChild className="w-full justify-start text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF]">
              <Link href="/admin/categories"><HugeiconsIcon icon={GridIcon} size={18} className="mr-3 text-slate-400" />Modifier les catégories</Link>
            </Button>
          </div>

          <div className="mt-4 rounded-xl bg-slate-900 p-5 text-white">
            <h3 className="text-sm font-medium text-slate-300">Astuce du jour</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-100">
              N'oubliez pas d'ajouter des images de haute qualité pour vos nouveaux équipements. Les produits avec de bonnes photos se vendent 40% plus vite.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

