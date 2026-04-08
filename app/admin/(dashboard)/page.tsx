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
  BulbIcon,
  ArrowUp01Icon
} from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { getProducts } from "@/lib/actions/products"
import { getCategories } from "@/lib/actions/categories"
import { getMessages, getUnreadCount } from "@/lib/actions/messages"
import { getActivePromotions } from "@/lib/actions/promotions"

export default async function AdminDashboardPage() {
  const [allProducts, categories, recentMessages, unreadCount, activePromotions] = await Promise.all([
    getProducts({ limit: 500 }),
    getCategories(),
    getMessages({ limit: 5 }),
    getUnreadCount(),
    getActivePromotions(),
  ])

  const totalProducts = allProducts.length
  const activeProducts = allProducts.filter((p) => p.active).length
  return (
    <div className="flex flex-col gap-10 pb-16">
      {/* HEADER */}
      <AdminPageHeader
        title="Tableau de bord"
        description="Aperçu des performances et activités récentes de Dakar Sport."
        action={
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button variant="outline" size="lg" asChild className="border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-semibold h-12 rounded-xl">
              <Link href="/admin/promotions">
                <HugeiconsIcon icon={PercentIcon} size={20} className="mr-2" />
                Nouvelle promotion
              </Link>
            </Button>
            <Button size="lg" asChild className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
              <Link href="/admin/products/new">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
                Ajouter un produit
              </Link>
            </Button>
          </div>
        }
      />

      {/* BENTO GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        
        {/* MAIN METRIC - Spans 2 rows, large impact */}
        <div className="md:col-span-4 lg:col-span-5 row-span-2 group relative flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 transition-all hover:border-[#1E40AF]/40 hover:shadow-lg overflow-hidden">
          <div className="absolute -right-6 -top-6 text-slate-50 opacity-50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <HugeiconsIcon icon={ShoppingBag01Icon} size={160} />
          </div>
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-3 text-[#1E40AF]">
                <HugeiconsIcon icon={ShoppingBag01Icon} size={24} />
              </div>
              <span className="text-base font-bold uppercase tracking-wider text-slate-600">Total Produits</span>
            </div>
          </div>
          <div className="relative z-10 mt-auto flex flex-col items-start gap-4">
            <span className="text-7xl font-black tracking-tighter text-slate-900">
              {totalProducts}
            </span>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none px-3 py-1 text-sm font-bold flex items-center gap-1.5">
              <HugeiconsIcon icon={ArrowUp01Icon} size={16} className="rotate-45" />
              +12% ce mois
            </Badge>
          </div>
        </div>

        {/* URGENT METRIC - High contrast red */}
        <div className="md:col-span-2 lg:col-span-3 row-span-1 relative flex flex-col justify-center rounded-3xl bg-[#DC2626] text-white p-6 shadow-md shadow-red-900/20 transition-transform hover:-translate-y-1 overflow-hidden">
          <div className="absolute right-0 top-0 w-32 h-32 bg-white opacity-10 rounded-full blur-3xl -mr-10 -mt-10" />
          <div className="relative z-10 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-wider text-red-100">Messages non lus</span>
              <HugeiconsIcon icon={Mail01Icon} size={20} className="text-red-200" />
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-5xl font-black tracking-tight">{unreadCount}</span>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-white"></span>
              </span>
            </div>
          </div>
        </div>

        {/* SECONDARY METRICS - Standard grid items */}
        <div className="md:col-span-2 lg:col-span-4 row-span-1 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Produits Actifs</span>
            <HugeiconsIcon icon={CheckmarkBadge01Icon} size={20} className="text-green-600" />
          </div>
          <span className="text-4xl font-black tracking-tight text-slate-900 mt-4">{activeProducts}</span>
        </div>

        <div className="md:col-span-2 lg:col-span-4 row-span-1 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Promotions</span>
            <HugeiconsIcon icon={PercentIcon} size={20} className="text-amber-500" />
          </div>
          <span className="text-4xl font-black tracking-tight text-slate-900 mt-4">{activePromotions.length}</span>
        </div>

        <div className="md:col-span-2 lg:col-span-3 row-span-1 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 transition-colors hover:bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold uppercase tracking-wider text-slate-500">Catégories</span>
            <HugeiconsIcon icon={GridIcon} size={20} className="text-[#1E40AF]" />
          </div>
          <span className="text-4xl font-black tracking-tight text-slate-900 mt-4">{categories.length}</span>
        </div>

        {/* TIP OF THE DAY - Dark mode contrast block */}
        <div className="md:col-span-4 lg:col-span-4 row-span-2 flex flex-col rounded-3xl bg-slate-900 text-white p-8 shadow-xl overflow-hidden relative group">
          <div className="absolute -right-10 -bottom-10 text-white/5 transform group-hover:rotate-12 transition-transform duration-700">
            <HugeiconsIcon icon={BulbIcon} size={200} />
          </div>
          <div className="relative z-10 flex items-center gap-3 mb-6">
            <div className="rounded-full bg-amber-400/20 p-2 text-amber-400">
              <HugeiconsIcon icon={BulbIcon} size={24} />
            </div>
            <span className="text-sm font-bold uppercase tracking-wider text-slate-300">Astuce du jour</span>
          </div>
          <p className="relative z-10 text-xl font-medium leading-relaxed text-slate-100 mt-auto">
            Les équipements avec des images de <span className="text-amber-400 font-bold">haute qualité</span> se vendent 40% plus vite. N'hésitez pas à enrichir votre galerie média.
          </p>
        </div>

        {/* RECENT MESSAGES LIST */}
        <div className="md:col-span-4 lg:col-span-8 row-span-2 flex flex-col rounded-3xl border border-slate-200 bg-white p-2">
          <div className="flex items-center justify-between p-6 pb-2">
            <h2 className="text-xl font-bold text-slate-900">Messages récents</h2>
            <Button variant="ghost" size="sm" asChild className="text-[#1E40AF] font-semibold hover:bg-blue-50 rounded-lg">
              <Link href="/admin/messages">Voir tout <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1.5" /></Link>
            </Button>
          </div>
          <div className="flex-1 px-4 pb-4">
            <div className="divide-y divide-slate-100">
              {recentMessages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-slate-400 font-medium">Aucun message pour l&apos;instant</p>
                </div>
              ) : recentMessages.map((msg) => (
                <div key={msg.id} className="group flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${!msg.read ? 'bg-blue-100 text-[#1E40AF]' : 'bg-slate-100 text-slate-600'}`}>
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-semibold ${!msg.read ? 'text-slate-900' : 'text-slate-700'}`}>
                          {msg.name}
                        </span>
                        {!msg.read && (
                          <span className="h-2 w-2 rounded-full bg-[#DC2626]" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-slate-500">{msg.subject}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-400 whitespace-nowrap">
                      {new Intl.RelativeTimeFormat("fr", { numeric: "auto" }).format(
                        Math.round((new Date(msg.createdAt).getTime() - Date.now()) / (1000 * 60 * 60)),
                        "hour"
                      )}
                    </span>
                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100 opacity-0 group-hover:opacity-100 transition-all group-hover:scale-105 text-slate-400 group-hover:text-[#1E40AF]">
                      <HugeiconsIcon icon={ArrowRight01Icon} size={18} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

