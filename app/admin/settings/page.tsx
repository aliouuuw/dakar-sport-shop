import { HugeiconsIcon } from "@hugeicons/react"
import { SaveIcon, Store01Icon, Call02Icon, Share01Icon, PaintBoardIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "../components/admin-page-header"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Paramètres"
        description="Gérez les informations globales et l'apparence de votre boutique."
        action={
          <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
            <HugeiconsIcon icon={SaveIcon} size={20} className="mr-2" />
            Enregistrer tout
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        {/* General Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-6 bg-slate-50/50 px-8 pt-8">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                <HugeiconsIcon icon={Store01Icon} size={20} />
              </div>
              Informations générales
            </CardTitle>
            <CardDescription className="mt-2 text-base font-medium">Nom de la boutique, devise et description principale.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la boutique</label>
              <Input defaultValue="Dakar Sport" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slogan (Tagline)</label>
              <Input defaultValue="Tout pour le Sport" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Description SEO</label>
              <Textarea
                rows={3}
                defaultValue="Boutique d'équipements sportifs à Dakar. Spécialiste en football et clubs associatifs."
                className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4 font-medium"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-6 bg-slate-50/50 px-8 pt-8">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                <HugeiconsIcon icon={Call02Icon} size={20} />
              </div>
              Contact et Adresse
            </CardTitle>
            <CardDescription className="mt-2 text-base font-medium">Coordonnées affichées sur le storefront et dans les devis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Email de contact</label>
              <Input type="email" defaultValue="promosportsdakar@yahoo.fr" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Adresse physique</label>
              <Textarea
                rows={2}
                defaultValue="Avenue G. Pompidou en face Restaurant Ali baba, Dakar, Senegal"
                className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4 font-medium"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Numéros de téléphone</label>
                <Button variant="ghost" size="sm" className="h-8 rounded-lg text-xs font-bold text-[#1E40AF] hover:bg-blue-50">Ajouter</Button>
              </div>
              <div className="space-y-3">
                <Input defaultValue="+221 33 840 09 45" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium" />
                <Input defaultValue="+221 77 634 51 15" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium" />
                <Input defaultValue="+221 77 041 49 30" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-6 bg-slate-50/50 px-8 pt-8">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                <HugeiconsIcon icon={Share01Icon} size={20} />
              </div>
              Réseaux sociaux
            </CardTitle>
            <CardDescription className="mt-2 text-base font-medium">Liens vers vos pages sociales.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Facebook</label>
              <Input type="url" placeholder="https://facebook.com/..." className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Instagram</label>
              <Input type="url" placeholder="https://instagram.com/..." className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">WhatsApp (Numéro business)</label>
              <Input defaultValue="+221 77 634 51 15" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium" />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-6 bg-slate-50/50 px-8 pt-8">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                <HugeiconsIcon icon={PaintBoardIcon} size={20} />
              </div>
              Apparence
            </CardTitle>
            <CardDescription className="mt-2 text-base font-medium">Logos et identité visuelle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Logo principal</label>
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-400 group hover:border-[#1E40AF] hover:bg-blue-50 transition-colors cursor-pointer">
                  dakar-sport.png
                </div>
                <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50">Changer le logo</Button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Icône (Favicon)</label>
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs font-medium text-slate-400 group hover:border-[#1E40AF] hover:bg-blue-50 transition-colors cursor-pointer">
                  icon.png
                </div>
                <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50">Changer l'icône</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
