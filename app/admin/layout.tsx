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
    <div className="min-h-screen bg-slate-50/80">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block shadow-xl shadow-[#1E40AF]/5">
        <AdminSidebar unreadCount={unreadCount} />
      </aside>

      {/* Mobile header */}
      <AdminMobileHeader unreadCount={unreadCount} />

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
          {children}
        </div>
      </main>
    </div>
  )
}
