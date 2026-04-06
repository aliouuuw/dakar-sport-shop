import { HugeiconsIcon } from "@hugeicons/react"
import { SaveIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Paramètres</h1>
        <p className="mt-1 text-sm text-slate-500">Configurez les paramètres de votre boutique</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Informations générales</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nom de la boutique</label>
              <input
                type="text"
                defaultValue="Dakar Sport"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tagline</label>
              <input
                type="text"
                defaultValue="Tout pour le Sport"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
              <HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />
              Enregistrer
            </Button>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Informations de contact</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                defaultValue="promosportsdakar@yahoo.fr"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Adresse</label>
              <input
                type="text"
                defaultValue="Avenue G. Pompidou, Dakar"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
              />
            </div>
            <Button className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
              <HugeiconsIcon icon={SaveIcon} size={18} className="mr-2" />
              Enregistrer
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
