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
    <div className="flex h-full flex-col bg-[#1E3A5F]">
      {/* Logo */}
      <div className="flex h-16 items-center px-6 border-b border-white/8">
        <Link
          href="/admin"
          className="flex items-center gap-2"
          onClick={onNavigate}
        >
          <span className="text-lg font-bold text-white font-heading">
            Dakar Sport
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-l-[3px] border-blue-400 bg-blue-500/10 text-white"
                  : "border-l-[3px] border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={20}
                className={cn(active ? "text-white" : "text-slate-400")}
              />
              <span className="flex-1">{item.label}</span>
              {"badge" in item && item.badge && unreadCount > 0 && (
                <Badge className="h-[18px] min-w-[18px] rounded-full bg-red-600 px-1.5 text-[10px] text-white border-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-2">
        <Separator className="mb-2 bg-white/8" />
        {bottomNavItems.map((item) => {
          const active = isActive(item.href)
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "border-l-[3px] border-blue-400 bg-blue-500/10 text-white"
                  : "border-l-[3px] border-transparent text-slate-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <HugeiconsIcon
                icon={item.icon}
                size={20}
                className={cn(active ? "text-white" : "text-slate-400")}
              />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* User section */}
      <div className="border-t border-white/8 px-3 py-3">
        <div className="flex items-center gap-3 px-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/20 text-sm font-medium text-blue-300">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-medium text-white">Admin</p>
            <p className="truncate text-xs text-slate-400">admin@dakarsport.sn</p>
          </div>
          <button
            onClick={() => {
              // TODO: call signOut() once auth is set up
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
            title="Déconnexion"
          >
            <HugeiconsIcon icon={Logout01Icon} size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
