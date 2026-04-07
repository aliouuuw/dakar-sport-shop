import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  UserMultiple02Icon, 
  WhatsappIcon, 
  ArrowRight01Icon, 
  FilterIcon,
  Search01Icon
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "@/app/admin/components/admin-page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for leads
const MOCK_LEADS = [
  {
    id: "1",
    productName: "Maillot Domicile Equipe Nationale Sénégal 2024",
    productSlug: "maillot-senegal-2024",
    variantInfo: "Taille: L",
    timestamp: "2024-04-07T14:30:00Z",
    source: "product_page",
    clicks: 12,
  },
  {
    id: "2",
    productName: "Chaussures de Running Pro X-Vite",
    productSlug: "running-pro-x-vite",
    variantInfo: "Couleur: Noir",
    timestamp: "2024-04-07T10:15:00Z",
    source: "product_page",
    clicks: 8,
  },
  {
    id: "3",
    productName: "Ballon de Basket Officiel Taille 7",
    productSlug: "ballon-basket-t7",
    variantInfo: null,
    timestamp: "2024-04-06T16:45:00Z",
    source: "product_page",
    clicks: 5,
  },
  {
    id: "4",
    productName: "Haltères Réglables 20kg (Set de 2)",
    productSlug: "halteres-20kg-set",
    variantInfo: null,
    timestamp: "2024-04-06T09:20:00Z",
    source: "product_page",
    clicks: 3,
  },
  {
    id: "5",
    productName: "Maillot Domicile Equipe Nationale Sénégal 2024",
    productSlug: "maillot-senegal-2024",
    variantInfo: "Taille: M",
    timestamp: "2024-04-05T11:10:00Z",
    source: "product_page",
    clicks: 15,
  },
];

export default function LeadsPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-SN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex flex-col gap-8 pb-16">
      <AdminPageHeader
        title="Leads WhatsApp"
        description="Suivez l'intérêt pour vos produits via les clics sur le bouton WhatsApp."
      />

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-green-50 p-3 text-green-600">
              <HugeiconsIcon icon={WhatsappIcon} size={24} />
            </div>
            <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-none font-bold">
              +24% ce mois
            </Badge>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
            Clics Totaux (30j)
          </span>
          <span className="text-4xl font-black tracking-tight text-slate-900">
            342
          </span>
        </div>

        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-blue-50 p-3 text-[#1E40AF]">
              <HugeiconsIcon icon={UserMultiple02Icon} size={24} />
            </div>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
            Produit le plus populaire
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 line-clamp-1">
            Maillot Sénégal 2024
          </span>
          <span className="text-sm text-slate-500 font-medium mt-1">
            128 clics
          </span>
        </div>

        <div className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
              <HugeiconsIcon icon={FilterIcon} size={24} />
            </div>
          </div>
          <span className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
            Variante la plus demandée
          </span>
          <span className="text-xl font-bold tracking-tight text-slate-900 line-clamp-1">
            Taille L
          </span>
          <span className="text-sm text-slate-500 font-medium mt-1">
            45% des requêtes (Maillots)
          </span>
        </div>
      </div>

      {/* Filters & Table */}
      <div className="flex flex-col rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:max-w-md">
            <HugeiconsIcon 
              icon={Search01Icon} 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
            />
            <Input 
              placeholder="Rechercher un produit..." 
              className="pl-10 h-12 bg-white border-slate-200 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Select defaultValue="7d">
              <SelectTrigger className="w-full sm:w-[180px] h-12 bg-white rounded-xl">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Dernières 24h</SelectItem>
                <SelectItem value="7d">7 derniers jours</SelectItem>
                <SelectItem value="30d">30 derniers jours</SelectItem>
                <SelectItem value="all">Tout le temps</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 text-xs uppercase tracking-wider font-bold text-slate-500 border-b border-slate-200">
                <th className="px-6 py-4">Produit & Variante</th>
                <th className="px-6 py-4">Date de dernier clic</th>
                <th className="px-6 py-4 text-center">Total Clics</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_LEADS.map((lead) => (
                <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors line-clamp-1">
                        {lead.productName}
                      </span>
                      {lead.variantInfo && (
                        <span className="text-sm font-medium text-slate-500 mt-1">
                          {lead.variantInfo}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">
                    {formatDate(lead.timestamp)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200 font-bold px-3 py-1">
                        {lead.clicks}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm" asChild className="text-[#1E40AF] font-bold hover:bg-blue-50 rounded-lg">
                      <Link href={`/produits/${lead.productSlug}`} target="_blank">
                        Voir produit
                        <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-2" />
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
