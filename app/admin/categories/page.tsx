"use client"

import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowDown01Icon, ArrowUp01Icon, Edit01Icon, GridIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { AdminPageHeader } from "../components/admin-page-header"
import { AdminViewToggle } from "../components/admin-view-toggle"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const categories = [
  { name: "Football", slug: "football", products: 32, order: 1, active: true },
  { name: "Basketball", slug: "basketball", products: 14, order: 2, active: true },
  { name: "Running", slug: "running", products: 18, order: 3, active: true },
  { name: "Fitness", slug: "fitness", products: 24, order: 4, active: true },
] as const

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Catégories"
        description="Organisez vos catégories de produits et définissez leur ordre d'affichage."
        action={
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
                Nouvelle catégorie
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-slate-900">Nouvelle catégorie</SheetTitle>
                <SheetDescription>
                  Créez une nouvelle catégorie pour organiser vos produits.
                </SheetDescription>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la catégorie</label>
                  <Input placeholder="Ex: Football" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slug (URL)</label>
                  <Input placeholder="Ex: football" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Ordre d'affichage</label>
                  <Input type="number" defaultValue={1} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                </div>
                <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4">
                  Enregistrer la catégorie
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        }
      />

      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden">
          <CardHeader className="border-b border-slate-100 pb-4 bg-white px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={GridIcon} size={20} />
                </div>
                Structure du catalogue
              </CardTitle>
              <AdminViewToggle viewMode={viewMode} onViewModeChange={setViewMode} />
            </div>
            <CardDescription className="mt-2 text-base">Réordonnez les catégories pour contrôler leur ordre d'apparition sur le storefront.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {viewMode === "list" ? (
              <div className="divide-y divide-slate-100">
                {categories.map((category, index) => (
                  <div 
                    key={category.slug} 
                    className="group flex items-center justify-between gap-4 px-8 py-5 bg-white hover:bg-slate-50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex items-center gap-6">
                      <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 font-mono font-bold text-lg group-hover:border-blue-200 group-hover:text-[#1E40AF] transition-colors">
                        {category.order}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-bold text-slate-900">{category.name}</span>
                          <Badge variant="secondary" className="h-6 rounded-md bg-blue-100 px-2 text-xs font-bold text-[#1E40AF] border-none">
                            {category.products} produits
                          </Badge>
                        </div>
                        <div className="mt-1 text-sm font-medium text-slate-500">/{category.slug}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-40 group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white shadow-sm">
                        <HugeiconsIcon icon={ArrowUp01Icon} size={18} />
                      </Button>
                      <Button variant="outline" size="icon" className="h-10 w-10 rounded-full border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white shadow-sm">
                        <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
                      </Button>
                      <div className="h-8 w-px bg-slate-200 mx-2" />
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-slate-400 hover:text-[#1E40AF] hover:bg-blue-50">
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle className="text-2xl font-bold text-slate-900">Éditer la catégorie</SheetTitle>
                            <SheetDescription>
                              Modifiez les informations de cette catégorie.
                            </SheetDescription>
                          </SheetHeader>
                          <div className="grid flex-1 auto-rows-min gap-6 px-4">
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la catégorie</label>
                              <Input defaultValue={category.name} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slug (URL)</label>
                              <Input defaultValue={category.slug} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Ordre d'affichage</label>
                              <Input type="number" defaultValue={category.order} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                            </div>
                            <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4">
                              Enregistrer les modifications
                            </Button>
                          </div>
                        </SheetContent>
                      </Sheet>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
                {categories.map((category) => (
                  <div key={category.slug} className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 hover:border-[#1E40AF]/40 hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="absolute -right-4 -top-4 text-slate-50 opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500 pointer-events-none">
                      <HugeiconsIcon icon={GridIcon} size={100} />
                    </div>
                    <div className="relative z-10 flex items-start justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-tight text-slate-900">{category.name}</span>
                      </div>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 font-mono font-bold text-sm">
                        {category.order}
                      </div>
                    </div>
                    <div className="relative z-10 text-sm font-medium text-slate-500 mb-8">/{category.slug}</div>
                    
                    <div className="relative z-10 mt-auto flex flex-col gap-4">
                      <Badge variant="secondary" className="w-fit h-6 rounded-md bg-blue-50 px-2 text-xs font-bold text-[#1E40AF] border-none">
                        {category.products} produits
                      </Badge>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                            <HugeiconsIcon icon={ArrowUp01Icon} size={14} />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
                            <HugeiconsIcon icon={ArrowDown01Icon} size={14} />
                          </Button>
                        </div>
                        <Sheet>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                              <HugeiconsIcon icon={Edit01Icon} size={16} />
                            </Button>
                          </SheetTrigger>
                          <SheetContent className="w-full sm:max-w-md border-l-0 shadow-2xl">
                            <SheetHeader className="pb-6 border-b border-slate-100">
                              <SheetTitle className="text-2xl font-bold text-slate-900">Éditer la catégorie</SheetTitle>
                              <SheetDescription>
                                Modifiez les informations de cette catégorie.
                              </SheetDescription>
                            </SheetHeader>
                            <div className="py-6 space-y-6">
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la catégorie</label>
                                <Input defaultValue={category.name} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slug (URL)</label>
                                <Input defaultValue={category.slug} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Ordre d'affichage</label>
                                <Input type="number" defaultValue={category.order} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
                              </div>
                              <Button size="lg" className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4">
                                Enregistrer les modifications
                              </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
