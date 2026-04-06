"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Home01Icon,
  ShoppingBag01Icon,
  GridIcon,
  PercentIcon,
  Megaphone01Icon,
  Mail01Icon,
  Invoice01Icon,
  Image01Icon,
  Clock01Icon,
  Settings01Icon,
  Logout01Icon,
} from "@hugeicons/core-free-icons"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Tableau de bord", icon: Home01Icon },
  { href: "/admin/products", label: "Produits", icon: ShoppingBag01Icon },
  { href: "/admin/categories", label: "Catégories", icon: GridIcon },
  { href: "/admin/promotions", label: "Promotions", icon: PercentIcon },
  { href: "/admin/announcements", label: "Annonces", icon: Megaphone01Icon },
  { href: "/admin/messages", label: "Messages", icon: Mail01Icon, badge: true },
  { href: "/admin/quotes", label: "Devis", icon: Invoice01Icon },
  { href: "/admin/media", label: "Médias", icon: Image01Icon },
  { href: "/admin/activity", label: "Activité", icon: Clock01Icon },
] as const

const bottomNavItems = [
  { href: "/admin/settings", label: "Paramètres", icon: Settings01Icon },
] as const

interface AdminSidebarProps {
  unreadCount?: number
  onNavigate?: () => void
}

export function AdminSidebar({ unreadCount = 0, onNavigate }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <div className="flex h-full flex-col bg-[#1E40AF] text-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link
          href="/admin"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={onNavigate}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1E40AF] shadow-sm">
            <span className="font-heading text-lg font-bold leading-none tracking-tight">D</span>
          </div>
          <span className="font-heading text-lg font-bold tracking-tight">
            Dakar Sport
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-hide">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-blue-200/60">
          Menu Principal
        </div>
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-white text-[#1E40AF] shadow-sm"
                  : "text-blue-100/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={18}
                className={cn(
                  "transition-colors",
                  active ? "text-[#1E40AF]" : "text-blue-200/80 group-hover:text-white"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {"badge" in item && item.badge && unreadCount > 0 && (
                <Badge className={cn(
                  "h-5 min-w-[20px] rounded-full px-1.5 text-[10px] font-bold border-none transition-colors",
                  active ? "bg-[#DC2626] text-white" : "bg-[#DC2626] text-white"
                )}>
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-4 pb-4">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-blue-200/60">
          Système
        </div>
        {bottomNavItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-white text-[#1E40AF] shadow-sm"
                  : "text-blue-100/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={18}
                className={cn(
                  "transition-colors",
                  active ? "text-[#1E40AF]" : "text-blue-200/80 group-hover:text-white"
                )}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* User section */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-xl bg-black/10 p-3 backdrop-blur-sm">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white shadow-inner">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-white">Admin</p>
            <p className="truncate text-xs text-blue-200/80">admin@dakarsport.sn</p>
          </div>
          <button
            onClick={() => {
              // TODO: call signOut() once auth is set up
            }}
            className="rounded-lg p-2 text-blue-200/80 transition-colors hover:bg-white/20 hover:text-white"
            title="Déconnexion"
          >
            <HugeiconsIcon icon={Logout01Icon} size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
