"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ListViewIcon, GridViewIcon } from "@hugeicons/core-free-icons"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

interface AdminViewToggleProps {
  viewMode: "list" | "grid"
  onViewModeChange: (mode: "list" | "grid") => void
  className?: string
}

export function AdminViewToggle({ viewMode, onViewModeChange, className }: AdminViewToggleProps) {
  return (
    <ToggleGroup 
      type="single" 
      value={viewMode} 
      onValueChange={(v) => v && onViewModeChange(v as "list" | "grid")} 
      className={cn("justify-end", className)}
    >
      <ToggleGroupItem value="list" aria-label="Vue liste" className="h-8 px-2 data-[state=on]:bg-slate-100">
        <HugeiconsIcon icon={ListViewIcon} size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="grid" aria-label="Vue grille" className="h-8 px-2 data-[state=on]:bg-slate-100">
        <HugeiconsIcon icon={GridViewIcon} size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}
