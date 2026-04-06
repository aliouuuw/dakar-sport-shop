import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Notification01Icon, Calendar01Icon, Edit01Icon, MessageNotification01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const announcements = [
  { title: "Nouvelle collection disponible", type: "Banner", status: "Active", range: "01 Avr - 15 Avr" },
  { title: "Livraison spéciale Ramadan", type: "Popup", status: "Programmée", range: "08 Avr - 12 Avr" },
  { title: "Horaires d'ouverture mis à jour", type: "Info", status: "Archivée", range: "01 Mar - 31 Mar" },
] as const

export default function AnnouncementsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Annonces</h1>
          <p className="mt-1 text-sm text-slate-500">Publiez des bannières, popups et messages d'information sur le storefront.</p>
        </div>
        <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
          <HugeiconsIcon icon={Add01Icon} size={18} className="mr-2" />
          Nouvelle annonce
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-blue-100 p-3 text-[#1E40AF]"><HugeiconsIcon icon={Notification01Icon} size={20} /></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Bannières</p>
              <p className="text-2xl font-semibold text-slate-900">1</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-amber-100 p-3 text-amber-700"><HugeiconsIcon icon={MessageNotification01Icon} size={20} /></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Popups</p>
              <p className="text-2xl font-semibold text-slate-900">1</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-lg bg-slate-100 p-3 text-slate-700"><HugeiconsIcon icon={Calendar01Icon} size={20} /></div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">Programmées</p>
              <p className="text-2xl font-semibold text-slate-900">1</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={Notification01Icon} size={18} className="text-[#1E40AF]" />
              Liste des annonces
            </CardTitle>
            <CardDescription>Consultez et gérez vos annonces actives, programmées et archivées.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-slate-100">
              {announcements.map((announcement) => (
                <div key={announcement.title} className="flex items-center justify-between gap-4 px-6 py-4 hover:bg-slate-50/60 transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-900">{announcement.title}</span>
                      <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${
                        announcement.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : announcement.status === "Programmée"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                      }`}>
                        {announcement.status}
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      {announcement.type} · {announcement.range}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#1E40AF]">
                    <HugeiconsIcon icon={Edit01Icon} size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg text-slate-900">Éditeur d'annonce</CardTitle>
            <CardDescription>Créez ou modifiez une annonce avec son type, son contenu et sa période de diffusion.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Titre</label>
              <Input defaultValue="Nouvelle collection disponible" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Type</label>
              <Select defaultValue="Banner">
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Banner">Banner</SelectItem>
                  <SelectItem value="Popup">Popup</SelectItem>
                  <SelectItem value="Info">Info</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Contenu</label>
              <Textarea className="min-h-[128px] resize-none" defaultValue="Annonce promotionnelle destinée à la page d'accueil et aux visiteurs récurrents." />
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
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">Enregistrer l'annonce</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
