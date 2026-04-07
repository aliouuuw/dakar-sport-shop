import { HugeiconsIcon } from "@hugeicons/react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type MetricTone = "primary" | "success" | "warning" | "danger" | "neutral"

interface AdminMetricCardProps {
  label: string
  value: string | number
  icon: any
  tone?: MetricTone
  className?: string
}

export function AdminMetricCard({ label, value, icon, tone = "primary", className }: AdminMetricCardProps) {
  const toneClasses = {
    primary: "bg-blue-100 text-[#1E40AF]",
    success: "bg-green-100 text-green-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-[#DC2626]",
    neutral: "bg-slate-100 text-slate-700",
  }

  return (
    <Card className={cn("border-slate-200 shadow-none rounded-xl", className)}>
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn("rounded-lg p-3", toneClasses[tone])}>
          <HugeiconsIcon icon={icon} size={20} />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
          <p className="text-2xl font-semibold text-slate-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}
