import { AdminSidebar } from "./components/admin-sidebar"
import { AdminMobileHeader } from "./components/admin-mobile-header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: fetch unreadCount from DB once messages schema is set up
  const unreadCount = 3

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 lg:block">
        <AdminSidebar unreadCount={unreadCount} />
      </aside>

      {/* Mobile header */}
      <AdminMobileHeader unreadCount={unreadCount} />

      {/* Main content */}
      <main className="lg:pl-60">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
