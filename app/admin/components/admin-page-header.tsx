import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AdminPageHeaderProps {
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function AdminPageHeader({ title, description, action, className }: AdminPageHeaderProps) {
  return (
    <div className={cn("flex flex-col items-start justify-between gap-6 md:flex-row md:items-end animate-in fade-in slide-in-from-bottom-2 duration-500", className)}>
      <div className="flex flex-col gap-2">
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-none">
          {title}
        </h1>
        <p className="text-base text-slate-500 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
