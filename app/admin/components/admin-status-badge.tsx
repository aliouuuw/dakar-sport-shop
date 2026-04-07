import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral"

interface AdminStatusBadgeProps {
  children: React.ReactNode
  tone?: StatusTone
  className?: string
}

export function AdminStatusBadge({ children, tone = "neutral", className }: AdminStatusBadgeProps) {
  const toneClasses = {
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-[#DC2626]",
    info: "bg-blue-100 text-[#1E40AF]",
    neutral: "bg-slate-100 text-slate-600",
  }

  return (
    <Badge className={cn("h-5 rounded-md px-2 text-[10px] font-semibold border-none shadow-none", toneClasses[tone], className)}>
      {children}
    </Badge>
  )
}
