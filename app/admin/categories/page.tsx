"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, ArrowDown01Icon, ArrowUp01Icon, Edit01Icon, Delete01Icon, GridIcon } from "@hugeicons/core-free-icons"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Category {
  id: number
  name: string
  slug: string
  products: number
  order: number
  active: boolean
}

const mockCategories: Category[] = [
  { id: 1, name: "Football", slug: "football", products: 32, order: 1, active: true },
  { id: 2, name: "Basketball", slug: "basketball", products: 14, order: 2, active: true },
  { id: 3, name: "Running", slug: "running", products: 18, order: 3, active: true },
  { id: 4, name: "Fitness", slug: "fitness", products: 24, order: 4, active: true },
]

interface DeleteDialogState {
  open: boolean
  categoryId: number | null
  categoryName: string
  productCount: number
}

function CategoryForm({ category, onSubmit, isPending }: { category?: Category; onSubmit: () => void; isPending: boolean }) {
  return (
    <div className="grid flex-1 auto-rows-min gap-6 px-4">
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la cat&eacute;gorie</label>
        <Input placeholder="Ex: Football" defaultValue={category?.name} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slug (URL)</label>
        <Input placeholder="Ex: football" defaultValue={category?.slug} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Ordre d'affichage</label>
        <Input type="number" defaultValue={category?.order ?? 1} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF]" />
      </div>
      <Button
        size="lg"
        className="w-full bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-12 rounded-xl font-bold mt-4"
        disabled={isPending}
        onClick={onSubmit}
      >
        {isPending ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Enregistrement...
          </>
        ) : category ? (
          "Enregistrer les modifications"
        ) : (
          "Enregistrer la cat&eacute;gorie"
        )}
      </Button>
    </div>
  )
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [deleteDialog, setDeleteDialog] = useState<DeleteDialogState>({
    open: false,
    categoryId: null,
    categoryName: "",
    productCount: 0,
  })
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDeleteClick = (id: number, name: string, productCount: number) => {
    setDeleteDialog({ open: true, categoryId: id, categoryName: name, productCount })
  }

  const handleDeleteConfirm = () => {
    startTransition(() => {
      if (deleteDialog.productCount > 0) {
        toast.error("Impossible de supprimer", {
          description: `Cette cat&eacute;gorie contient ${deleteDialog.productCount} produit(s). Supprimez ou d&eacute;placez les produits d'abord.`,
        })
        setDeleteDialog({ open: false, categoryId: null, categoryName: "", productCount: 0 })
        return
      }
      // TODO: Replace with actual server action call
      // await deleteCategory(deleteDialog.categoryId!)
      toast.success("Cat&eacute;gorie supprim&eacute;e", {
        description: `"${deleteDialog.categoryName}" a &eacute;t&eacute; supprim&eacute;e avec succ&egrave;s.`,
      })
      setCategories((prev) => prev.filter((c) => c.id !== deleteDialog.categoryId))
      setDeleteDialog({ open: false, categoryId: null, categoryName: "", productCount: 0 })
      router.refresh()
    })
  }

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, categoryId: null, categoryName: "", productCount: 0 })
  }

  const handleCreateCategory = () => {
    startTransition(() => {
      // TODO: Replace with actual server action call
      toast.success("Cat&eacute;gorie cr&eacute;&eacute;e", {
        description: "La nouvelle cat&eacute;gorie a &eacute;t&eacute; enregistr&eacute;e avec succ&egrave;s.",
      })
      router.refresh()
    })
  }

  const handleUpdateCategory = () => {
    startTransition(() => {
      // TODO: Replace with actual server action call
      toast.success("Cat&eacute;gorie mise &agrave; jour", {
        description: "Les modifications ont &eacute;t&eacute; enregistr&eacute;es avec succ&egrave;s.",
      })
      router.refresh()
    })
  }

  const emptyState = categories.length === 0

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Cat&eacute;gories"
        description="Organisez vos cat&eacute;gories de produits et d&eacute;finissez leur ordre d'affichage."
        action={
          <Sheet>
            <SheetTrigger asChild>
              <Button size="lg" className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl">
                <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
                Nouvelle cat&eacute;gorie
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-2xl font-bold text-slate-900">Nouvelle cat&eacute;gorie</SheetTitle>
                <SheetDescription>
                  Cr&eacute;ez une nouvelle cat&eacute;gorie pour organiser vos produits.
                </SheetDescription>
              </SheetHeader>
              <CategoryForm onSubmit={handleCreateCategory} isPending={isPending} />
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
            <CardDescription className="mt-2 text-base">R&eacute;ordonnez les cat&eacute;gories pour contr&ocirc;ler leur ordre d'apparition sur le storefront.</CardDescription>
          </CardHeader>
          <CardContent className="p-0 bg-slate-50/30">
            {emptyState ? (
              <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                <div className="rounded-2xl bg-slate-100 p-4 mb-6">
                  <HugeiconsIcon icon={GridIcon} size={48} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Aucune cat&eacute;gorie</h3>
                <p className="text-base text-slate-500 max-w-sm mb-6">Commencez par cr&eacute;er votre premi&egrave;re cat&eacute;gorie pour organiser vos produits.</p>
              </div>
            ) : viewMode === "list" ? (
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
                            <SheetTitle className="text-2xl font-bold text-slate-900">&Eacute;diter la cat&eacute;gorie</SheetTitle>
                            <SheetDescription>
                              Modifiez les informations de cette cat&eacute;gorie.
                            </SheetDescription>
                          </SheetHeader>
                          <CategoryForm category={category} onSubmit={handleUpdateCategory} isPending={isPending} />
                        </SheetContent>
                      </Sheet>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteClick(category.id, category.name, category.products)}
                        className="h-10 w-10 rounded-full text-slate-400 hover:text-[#DC2626] hover:bg-red-50"
                      >
                        <HugeiconsIcon icon={Delete01Icon} size={18} />
                      </Button>
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
                        <div className="flex items-center gap-2">
                          <Sheet>
                            <SheetTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300">
                                <HugeiconsIcon icon={Edit01Icon} size={16} />
                              </Button>
                            </SheetTrigger>
                            <SheetContent className="w-full sm:max-w-md border-l-0 shadow-2xl">
                              <SheetHeader className="pb-6 border-b border-slate-100">
                                <SheetTitle className="text-2xl font-bold text-slate-900">&Eacute;diter la cat&eacute;gorie</SheetTitle>
                                <SheetDescription>
                                  Modifiez les informations de cette cat&eacute;gorie.
                                </SheetDescription>
                              </SheetHeader>
                              <CategoryForm category={category} onSubmit={handleUpdateCategory} isPending={isPending} />
                            </SheetContent>
                          </Sheet>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(category.id, category.name, category.products)}
                            className="h-8 w-8 rounded-full text-slate-400 opacity-0 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-red-50 transition-all duration-300"
                          >
                            <HugeiconsIcon icon={Delete01Icon} size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog.open} onOpenChange={(open: boolean) => !open && handleDeleteCancel()}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">Supprimer la cat&eacute;gorie</DialogTitle>
            <DialogDescription className="pt-2">
              {deleteDialog.productCount > 0 ? (
                <>
                  Impossible de supprimer <strong className="text-slate-900">&ldquo;{deleteDialog.categoryName}&rdquo;</strong> car elle contient <strong className="text-slate-900">{deleteDialog.productCount} produit(s)</strong>. Supprimez ou d&eacute;placez d'abord les produits.
                </>
              ) : (
                <>
                  &Ecirc;tes-vous s&ucirc;r de vouloir supprimer <strong className="text-slate-900">&ldquo;{deleteDialog.categoryName}&rdquo;</strong> ? Cette action est irr&eacute;versible.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {deleteDialog.productCount === 0 && (
            <DialogFooter className="gap-3 sm:gap-2 pt-2">
              <Button
                variant="outline"
                onClick={handleDeleteCancel}
                disabled={isPending}
                className="rounded-xl h-12 font-semibold"
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteConfirm}
                disabled={isPending}
                className="rounded-xl h-12 font-semibold min-w-[120px]"
              >
                {isPending ? (
                  <>
                    <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Suppression...
                  </>
                ) : (
                  "Supprimer"
                )}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}