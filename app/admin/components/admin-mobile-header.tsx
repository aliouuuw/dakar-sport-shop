"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet"
import { AdminSidebar } from "./admin-sidebar"

interface AdminMobileHeaderProps {
  unreadCount?: number
}

export function AdminMobileHeader({ unreadCount = 0 }: AdminMobileHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 items-center border-b bg-background px-4 lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
        >
          <HugeiconsIcon icon={Menu01Icon} size={20} />
        </Button>
        <span className="mx-auto text-base font-bold font-heading">
          Dakar Sport
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
          A
        </div>
      </header>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[280px] p-0" showCloseButton={false}>
          <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
          <AdminSidebar
            unreadCount={unreadCount}
            onNavigate={() => setOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </>
  )
}
