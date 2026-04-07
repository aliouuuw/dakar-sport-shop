import { HugeiconsIcon } from "@hugeicons/react"
import { SaveIcon, Store01Icon, Call02Icon, Share01Icon, PaintBoardIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "../components/admin-page-header"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <AdminPageHeader
        title="Paramètres"
        description="Gérez les informations globales et l'apparence de votre boutique"
        action={
          <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
            <HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />
            Enregistrer tout
          </Button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={Store01Icon} size={18} className="text-[#1E40AF]" />
              Informations générales
            </CardTitle>
            <CardDescription>Nom de la boutique, devise et description principale.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Nom de la boutique</label>
              <Input defaultValue="Dakar Sport" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Slogan (Tagline)</label>
              <Input defaultValue="Tout pour le Sport" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Description SEO</label>
              <Textarea
                rows={3}
                defaultValue="Boutique d'équipements sportifs à Dakar. Spécialiste en football et clubs associatifs."
                className="resize-none"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={Call02Icon} size={18} className="text-[#1E40AF]" />
              Contact et Adresse
            </CardTitle>
            <CardDescription>Coordonnées affichées sur le storefront et dans les devis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Email de contact</label>
              <Input type="email" defaultValue="promosportsdakar@yahoo.fr" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Adresse physique</label>
              <Textarea
                rows={2}
                defaultValue="Avenue G. Pompidou en face Restaurant Ali baba, Dakar, Senegal"
                className="resize-none"
              />
            </div>
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label className="block text-sm font-medium text-slate-700">Numéros de téléphone</label>
                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs text-[#1E40AF]">Ajouter</Button>
              </div>
              <div className="space-y-2">
                <Input defaultValue="+221 33 840 09 45" />
                <Input defaultValue="+221 77 634 51 15" />
                <Input defaultValue="+221 77 041 49 30" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Settings */}
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={Share01Icon} size={18} className="text-[#1E40AF]" />
              Réseaux sociaux
            </CardTitle>
            <CardDescription>Liens vers vos pages sociales.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Facebook</label>
              <Input type="url" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Instagram</label>
              <Input type="url" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">WhatsApp (Numéro business)</label>
              <Input defaultValue="+221 77 634 51 15" />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-slate-200 shadow-none rounded-xl">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-slate-900">
              <HugeiconsIcon icon={PaintBoardIcon} size={18} className="text-[#1E40AF]" />
              Apparence
            </CardTitle>
            <CardDescription>Logos et identité visuelle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-6">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Logo principal</label>
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-32 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                  dakar-sport.png
                </div>
                <Button variant="outline" size="sm" className="border-slate-200">Changer</Button>
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Icône (Favicon)</label>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs text-slate-400">
                  icon.png
                </div>
                <Button variant="outline" size="sm" className="border-slate-200">Changer</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
