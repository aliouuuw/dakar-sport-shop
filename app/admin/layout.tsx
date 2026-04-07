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
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#1E40AF]/20">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block border-r border-slate-200/60 bg-white">
        <AdminSidebar unreadCount={unreadCount} />
      </aside>

      {/* Mobile header */}
      <AdminMobileHeader unreadCount={unreadCount} />

      {/* Main content - wider canvas, bolder spacing */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-12 lg:py-12 xl:py-16">
          {children}
        </div>
      </main>
    </div>
  )
}

