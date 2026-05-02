import { AdminPageHeader } from "@/app/admin/components/admin-page-header"
import { getActivityLog } from "@/lib/actions/activity-log"
import { ActivityClient } from "./activity-client"

export default async function ActivityPage() {
  const logs = await getActivityLog(50)

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Journal d'activité"
        description="Historique complet et traçabilité de tous les changements effectués sur la plateforme Dakar Sport."
      />

      <ActivityClient logs={logs} />
    </div>
  )
}
