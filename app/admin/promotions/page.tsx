import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Calendar01Icon, DiscountTag01Icon, Edit01Icon, PercentIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const promotions = [
  { title: "Promo rentrée", code: "RENTREE20", type: "Pourcentage", value: "20%", status: "Active", range: "01 Avr - 30 Avr" },
  { title: "Offre ballons", code: "BALLON5", type: "Fixe", value: "5 000 FCFA", status: "Bientôt", range: "10 Avr - 20 Avr" },
  { title: "Club partenaire", code: "CLUB10", type: "Pourcentage", value: "10%", status: "Expirée", range: "01 Mar - 31 Mar" },
] as const

export default function PromotionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Promotions</h1>
          <p className="mt-1 text-sm text-slate-500">Gérez vos codes promotionnels, types de remises et périodes d'application.</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Nouvelle promotion
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-[#1E40AF]"><HugeiconsIcon icon={PercentIcon} size={20} /></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Actives</p>
              <p className="text-2xl font-semibold text-slate-900">1</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-amber-100 p-3 text-amber-700"><HugeiconsIcon icon={Calendar01Icon} size={20} /></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">À venir</p>
              <p className="text-2xl font-semibold text-slate-900">1</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-slate-100 p-3 text-slate-700"><HugeiconsIcon icon={DiscountTag01Icon} size={20} /></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Expirées</p>
              <p className="text-2xl font-semibold text-slate-900">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={DiscountTag01Icon} size={18} className="text-[#1E40AF]" />
              Liste des promotions
            </CardTitle>
            <CardDescription>Consultez et gérez vos promotions actives, à venir et expirées.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {promotions.map((promotion) => (
                <div key={promotion.code} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{promotion.title}</span>
                      <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${
                        promotion.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : promotion.status === "Bientôt"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}>
                        {promotion.status}
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {promotion.code} · {promotion.type} · {promotion.range}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-slate-900">{promotion.value}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#1E40AF]">
                      <HugeiconsIcon icon={Edit01Icon} size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg text-slate-900">Formulaire promotion</CardTitle>
            <CardDescription>Créez ou modifiez une promotion avec son type, sa valeur, son code et ses dates.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Titre</label>
              <Input defaultValue="Promo rentrée" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Code promo</label>
              <Input defaultValue="RENTREE20" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
                <Select defaultValue="Pourcentage">
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pourcentage">Pourcentage</SelectItem>
                    <SelectItem value="Fixe">Fixe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Valeur</label>
                <Input defaultValue="20" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Début</label>
                <Input type="date" />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">Fin</label>
                <Input type="date" />
              </div>
            </div>
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">Enregistrer la promotion</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
