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
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

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
  collapsed?: boolean
}

function NavLink({
  item,
  active,
  collapsed,
  unreadCount,
  onClick,
}: {
  item: { href: string; label: string; icon: typeof Home01Icon; badge?: boolean }
  active: boolean
  collapsed: boolean
  unreadCount?: number
  onClick?: () => void
}) {
  const content = (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 text-sm font-medium transition-all duration-200",
        collapsed
          ? "justify-center p-2.5 rounded-lg"
          : "px-3 py-2.5 rounded-lg",
        active
          ? "bg-white text-[#1E40AF] shadow-sm"
          : "text-blue-100/80 hover:bg-white/10 hover:text-white"
      )}
    >
      <HugeiconsIcon
        icon={item.icon}
        size={18}
        className={cn(
          "shrink-0 transition-colors",
          active ? "text-[#1E40AF]" : "text-blue-200/80 group-hover:text-white"
        )}
      />
      {!collapsed && <span className="flex-1">{item.label}</span>}
      {!collapsed && "badge" in item && item.badge && unreadCount && unreadCount > 0 && (
        <Badge className="h-5 min-w-[20px] rounded-full px-1.5 bg-[#DC2626] text-white text-[10px] font-bold border-none">
          {unreadCount > 99 ? "99+" : unreadCount}
        </Badge>
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            {content}
          </TooltipTrigger>
          <TooltipContent side="right" className="bg-slate-900 text-white font-medium">
            {item.label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return content
}

export function AdminSidebar({ unreadCount = 0, onNavigate, collapsed = false }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin"
    return pathname.startsWith(href)
  }

  return (
    <div className={cn(
      "flex h-full flex-col bg-[#1E40AF] text-white transition-all duration-300",
    )}>
      {/* Logo */}
      <div className={cn(
        "flex h-16 shrink-0 items-center border-b border-white/10 transition-all duration-300",
        collapsed ? "justify-center px-3" : "justify-start px-6"
      )}>
        <Link
          href="/admin"
          className="flex items-center gap-2 transition-opacity hover:opacity-90"
          onClick={onNavigate}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-[#1E40AF] shadow-sm">
            <span className="font-heading text-lg font-bold leading-none tracking-tight">D</span>
          </div>
          {!collapsed && (
            <span className="font-heading text-lg font-bold tracking-tight">
              Dakar Sport
            </span>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-6 space-y-1 scrollbar-hide">
        {!collapsed && (
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-blue-200/60">
            Menu Principal
          </div>
        )}
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(item.href)}
            collapsed={collapsed}
            unreadCount={unreadCount}
            onClick={onNavigate}
          />
        ))}
      </nav>

      {/* Bottom nav */}
      <div className="px-3 pb-4">
        {!collapsed && (
          <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-blue-200/60">
            Système
          </div>
        )}
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={isActive(item.href)}
            collapsed={collapsed}
            onClick={onNavigate}
          />
        ))}
      </div>

      {/* User section */}
      <div className={cn(
        "border-t border-white/10 p-3 transition-all duration-300",
        collapsed ? "px-2" : "p-4"
      )}>
        <div className={cn(
          "flex items-center rounded-xl bg-black/10 backdrop-blur-sm transition-all duration-300",
          collapsed ? "p-2.5 justify-center" : "p-3 gap-3"
        )}>
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white shadow-inner">
            A
          </div>
          {!collapsed && (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}