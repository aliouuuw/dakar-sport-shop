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
  MoreVerticalIcon,
  BulbIcon
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPageHeader } from "./components/admin-page-header"
import { AdminMetricCard, MetricTone } from "./components/admin-metric-card"

const metrics = [
  { label: "Total Produits", value: "142", icon: ShoppingBag01Icon, tone: "neutral" as MetricTone },
  { label: "Produits Actifs", value: "128", icon: CheckmarkBadge01Icon, tone: "success" as MetricTone },
  { label: "Catégories", value: "8", icon: GridIcon, tone: "primary" as MetricTone },
  { label: "Messages non lus", value: "3", icon: Mail01Icon, alert: true, tone: "danger" as MetricTone },
  { label: "Promotions actives", value: "2", icon: PercentIcon, tone: "warning" as MetricTone },
]

const recentMessages = [
  { id: 1, name: "Moussa Diop", subject: "Devis pour équipe de foot", date: "Il y a 2h", unread: true },
  { id: 2, name: "Aissatou Fall", subject: "Disponibilité maillots", date: "Il y a 4h", unread: true },
  { id: 3, name: "Ibrahim Sene", subject: "Question sur les chaussures", date: "Hier", unread: true },
  { id: 4, name: "Fatou Ndiaye", subject: "Commande #1024", date: "Hier", unread: false },
  { id: 5, name: "Cheikh Ba", subject: "Partenariat", date: "04 Avr", unread: false },
]

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* HEADER */}
      <AdminPageHeader
        title="Tableau de bord"
        description="Aperçu des performances et activités récentes de Dakar Sport."
        action={
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
        }
      />

      {/* METRICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((metric, i) => (
          <div key={i} className="relative">
            <AdminMetricCard 
              label={metric.label} 
              value={metric.value} 
              icon={metric.icon} 
              tone={metric.tone} 
              className="h-full hover:border-[#1E40AF]/30 hover:shadow-sm transition-all"
            />
            {metric.alert && (
              <span className="absolute top-4 right-4 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#DC2626]"></span>
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* RECENT MESSAGES */}
        <div className="col-span-1 flex flex-col gap-4 lg:col-span-2">
          <Card className="border-slate-200 shadow-none h-full flex flex-col">
            <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-lg text-slate-900">Messages récents</CardTitle>
              <Button variant="ghost" size="sm" asChild className="text-[#1E40AF] hover:text-[#1e3a8a] hover:bg-blue-50">
                <Link href="/admin/messages">Voir tout <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1" /></Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <div className="divide-y divide-slate-100">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center justify-between p-4 hover:bg-slate-50/60 transition-colors">
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
            </CardContent>
          </Card>
        </div>

        {/* SIDEBAR ACTIONS */}
        <div className="col-span-1 flex flex-col gap-6">
          <Card className="border-slate-200 shadow-none">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-lg text-slate-900">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="flex flex-col gap-1">
                <Button variant="ghost" asChild className="w-full justify-start text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF] px-3 py-6 h-auto">
                  <Link href="/admin/announcements">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <HugeiconsIcon icon={Add01Icon} size={20} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Créer une annonce</span>
                        <span className="text-xs text-slate-500 font-normal">Bannière ou popup</span>
                      </div>
                    </div>
                  </Link>
                </Button>
                <div className="h-px bg-slate-100 mx-3" />
                <Button variant="ghost" asChild className="w-full justify-start text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF] px-3 py-6 h-auto">
                  <Link href="/admin/products">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <HugeiconsIcon icon={ShoppingBag01Icon} size={20} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Gérer les produits</span>
                        <span className="text-xs text-slate-500 font-normal">Mettre à jour le stock</span>
                      </div>
                    </div>
                  </Link>
                </Button>
                <div className="h-px bg-slate-100 mx-3" />
                <Button variant="ghost" asChild className="w-full justify-start text-slate-700 hover:bg-slate-50 hover:text-[#1E40AF] px-3 py-6 h-auto">
                  <Link href="/admin/categories">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                        <HugeiconsIcon icon={GridIcon} size={20} />
                      </div>
                      <div className="flex flex-col items-start">
                        <span className="font-medium">Modifier les catégories</span>
                        <span className="text-xs text-slate-500 font-normal">Changer l'ordre d'affichage</span>
                      </div>
                    </div>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-none shadow-md overflow-hidden relative">
            <div className="absolute top-0 right-0 p-6 text-slate-800/30 transform translate-x-1/4 -translate-y-1/4">
              <HugeiconsIcon icon={BulbIcon} size={120} />
            </div>
            <CardHeader className="relative z-10 pb-2">
              <CardTitle className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <HugeiconsIcon icon={BulbIcon} size={16} className="text-amber-400" />
                Astuce du jour
              </CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
              <p className="text-sm leading-relaxed text-slate-100">
                N'oubliez pas d'ajouter des images de haute qualité pour vos nouveaux équipements. Les produits avec de bonnes photos se vendent <span className="font-bold text-amber-400">40% plus vite</span>.
              </p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

