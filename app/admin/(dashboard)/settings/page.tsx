import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { getSiteSettings } from "@/lib/actions/site-settings"
import { SettingsClient } from "./settings-client"

export default async function SettingsPage() {
  const settings = await getSiteSettings()

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Paramètres"
        description="Gérez les informations globales et l'apparence de votre boutique."
      />
      <SettingsClient initial={settings} />
    </div>
  )
}
