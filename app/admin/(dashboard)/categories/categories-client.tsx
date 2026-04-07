"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, ArrowDown01Icon, ArrowUp01Icon, Edit01Icon, Delete01Icon, GridIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AdminPageHeader } from "@/app/admin/components/admin-page-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteCategory, reorderCategories } from "@/lib/actions/categories";
import type { getCategories } from "@/lib/actions/categories";
import { getProductCountByCategory } from "@/lib/actions/products";

type Category = Awaited<ReturnType<typeof getCategories>>[number];

interface CategoriesClientProps {
  categories: Category[];
  productCounts: Record<number, number>;
}

export function CategoriesClient({ categories, productCounts }: CategoriesClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(categories);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    categoryId: null as number | null,
    categoryName: "",
  });

  const handleReorder = (id: number, direction: "up" | "down") => {
    const index = items.findIndex((c) => c.id === id);
    if (index === -1) return;
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === items.length - 1) return;

    const newItems = [...items];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    setItems(newItems);

    startTransition(async () => {
      const result = await reorderCategories(newItems.map((c) => c.id));
      if (result.success) {
        toast.success("Ordre mis à jour");
        router.refresh();
      } else {
        toast.error("Erreur", { description: result.error });
        setItems(categories);
      }
    });
  };

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteDialog({ open: true, categoryId: id, categoryName: name });
  };

  const handleDeleteConfirm = () => {
    if (!deleteDialog.categoryId) return;
    startTransition(async () => {
      const result = await deleteCategory(deleteDialog.categoryId!);
      if (result.success) {
        toast.success("Catégorie supprimée");
        router.refresh();
      } else {
        toast.error("Erreur", { description: result.error });
      }
      setDeleteDialog({ open: false, categoryId: null, categoryName: "" });
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Catégories"
        description={`Gérez les catégories de produits — ${items.length} catégorie${items.length !== 1 ? "s" : ""}.`}
        action={
          <Button
            asChild
            size="lg"
            className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl"
          >
            <Link href="/admin/categories/new">
              <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
              Nouvelle catégorie
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4">
        {items.map((category, index) => (
          <Card key={category.id} className="group overflow-hidden">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={index === 0 || isPending}
                  onClick={() => handleReorder(category.id, "up")}
                >
                  <HugeiconsIcon icon={ArrowUp01Icon} size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  disabled={index === items.length - 1 || isPending}
                  onClick={() => handleReorder(category.id, "down")}
                >
                  <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                </Button>
              </div>

              <div className="h-14 w-14 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                {category.image ? (
                  <img src={category.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <HugeiconsIcon icon={GridIcon} size={24} className="text-slate-400" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-slate-900">{category.name}</h3>
                  <span className="text-sm text-slate-400">/{category.slug}</span>
                </div>
                <p className="text-sm text-slate-500 truncate">{category.description || "Aucune description"}</p>
              </div>

              <Badge variant="secondary" className="shrink-0">
                {productCounts[category.id] ?? 0} produits
              </Badge>

              <div className="flex items-center gap-1 shrink-0">
                <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                  <Link href={`/admin/categories/${category.id}/edit`}>
                    <HugeiconsIcon icon={Edit01Icon} size={18} />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-red-600 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteClick(category.id, category.name)}
                  disabled={isPending}
                >
                  <HugeiconsIcon icon={Delete01Icon} size={18} />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {items.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <HugeiconsIcon icon={GridIcon} size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Aucune catégorie</p>
          </div>
        )}
      </div>

      <Dialog open={deleteDialog.open} onOpenChange={(open) => !open && setDeleteDialog({ open: false, categoryId: null, categoryName: "" })}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Supprimer la catégorie</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer <strong>&ldquo;{deleteDialog.categoryName}&rdquo;</strong> ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog({ open: false, categoryId: null, categoryName: "" })} disabled={isPending}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm} disabled={isPending}>
              {isPending ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
