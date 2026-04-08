import { HugeiconsIcon } from "@hugeicons/react"
import { WhatsappIcon, Chart01Icon } from "@hugeicons/core-free-icons"
import { AdminPageHeader } from "@/app/admin/components/admin-page-header"

export default function LeadsPage() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Leads WhatsApp"
        description="Suivez l'intérêt pour vos produits via les clics sur le bouton WhatsApp."
      />

      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white py-24 px-6 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="rounded-2xl bg-green-50 p-5 mb-6">
          <HugeiconsIcon icon={WhatsappIcon} size={48} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 mb-3">Suivi des leads à venir</h3>
        <p className="text-base text-slate-500 max-w-md mb-6">
          Le tracking des clics WhatsApp sera disponible une fois le système d&apos;analytique connecté.
          Les données seront enregistrées automatiquement dès que les boutons produits seront activés.
        </p>
        <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-500">
          <HugeiconsIcon icon={Chart01Icon} size={16} />
          Fonctionnalité en développement
        </div>
      </div>
    </div>
  )
}
