"use client"

import { useState, useEffect } from "react"
import { AdminSidebar } from "@/app/admin/components/admin-sidebar"
import { AdminMobileHeader } from "@/app/admin/components/admin-mobile-header"
import { HugeiconsIcon } from "@hugeicons/react"
import { SidebarLeftIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

const SIDEBAR_COLLAPSED_KEY = "admin-sidebar-collapsed"

function getInitialCollapsed() {
  if (typeof window === "undefined") return false
  const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY)
  return stored === "true"
}

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(getInitialCollapsed)

  // Persist collapse state
  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(collapsed))
  }, [collapsed])

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev)
  }

  // TODO: fetch unreadCount from DB once messages schema is set up
  const unreadCount = 3

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-[#1E40AF]/20">
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-30 hidden border-r border-slate-200/60 bg-white transition-[width] duration-300 lg:block overflow-hidden",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <AdminSidebar unreadCount={unreadCount} collapsed={collapsed} />
      </aside>

      {/* Mobile header */}
      <AdminMobileHeader unreadCount={unreadCount} />

      {/* Main content */}
      <main
        className={cn(
          "transition-[padding-left] duration-300",
          collapsed ? "lg:pl-[72px]" : "lg:pl-64"
        )}
      >
        {/* Desktop header with toggle */}
        <header className="sticky top-0 z-20 hidden h-16 border-b border-slate-200/60 bg-white shadow-sm lg:flex lg:items-center lg:justify-between lg:px-6">
          <button
            onClick={toggleSidebar}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <HugeiconsIcon icon={SidebarLeftIcon} size={20} className={cn(
              "transition-transform duration-300",
              collapsed && "rotate-180"
            )} />
          </button>
        </header>

        <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-12 lg:py-12 xl:py-16">
          {children}
        </div>
      </main>
    </div>
  )
}
