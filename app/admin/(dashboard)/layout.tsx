import { getUnreadCount } from "@/lib/actions/messages"
import AdminDashboardShell from "./layout-shell"

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const unreadCount = await getUnreadCount()
  return <AdminDashboardShell unreadCount={unreadCount}>{children}</AdminDashboardShell>
}
