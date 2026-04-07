"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Add01Icon,
  Search01Icon,
  Edit01Icon,
  Delete01Icon,
  FilterIcon,
  GridViewIcon,
  Copy01Icon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { AdminPageHeader } from "@/app/admin/components/admin-page-header";
import { AdminViewToggle } from "@/app/admin/components/admin-view-toggle";
import { AdminStatusBadge } from "@/app/admin/components/admin-status-badge";
import { deleteProduct, duplicateProduct } from "@/lib/actions/products";
import type { getProducts } from "@/lib/actions/products";
import type { getCategories } from "@/lib/actions/categories";

type Product = Awaited<ReturnType<typeof getProducts>>[number];
type Category = Awaited<ReturnType<typeof getCategories>>[number];

interface ProductsClientProps {
  products: Product[];
  categories: Category[];
}

function formatCFA(price: number): string {
  return new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(price);
}

export function ProductsClient({ products, categories }: ProductsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    productId: null as number | null,
    productName: "",
  });

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? String(p.categoryId) === categoryFilter : true;
    const matchesStatus = statusFilter === "active" ? p.active : statusFilter === "inactive" ? !p.active : true;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteDialog({ open: true, productId: id, productName: name });
  };

  const handleDeleteConfirm = () => {
    if (!deleteDialog.productId) return;
    startTransition(async () => {
      const result = await deleteProduct(deleteDialog.productId!);
      if (result.success) {
        toast.success("Produit supprimé", {
          description: `"${deleteDialog.productName}" a été supprimé avec succès.`,
        });
        router.refresh();
      } else {
        toast.error("Erreur", { description: result.error ?? "Échec de la suppression" });
      }
      setDeleteDialog({ open: false, productId: null, productName: "" });
    });
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, productId: null, productName: "" });
  };

  const handleDuplicate = (id: number) => {
    startTransition(async () => {
      const result = await duplicateProduct(id);
      if (result.success) {
        toast.success("Produit dupliqué", {
          description: `"${result.data?.name}" a été créé.`,
        });
        router.refresh();
      } else {
        toast.error("Erreur", { description: result.error ?? "Échec de la duplication" });
      }
    });
  };

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Produits"
        description={`Gérez votre catalogue — ${filteredProducts.length} produit${filteredProducts.length !== 1 ? "s" : ""} affiché${filteredProducts.length !== 1 ? "s" : ""}.`}
        action={
          <Button
            asChild
            size="lg"
            className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-md shadow-blue-900/20 font-semibold h-12 rounded-xl"
          >
            <Link href="/admin/products/new">
              <HugeiconsIcon icon={Add01Icon} size={20} className="mr-2" />
              Nouveau produit
            </Link>
          </Button>
        }
      />

      <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-none animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-6 lg:flex-row lg:items-center lg:justify-between bg-slate-50/50">
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 flex-1 max-w-md shadow-sm transition-shadow focus-within:shadow-md focus-within:border-blue-300">
            <HugeiconsIcon icon={Search01Icon} size={18} className="text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400 font-medium"
            />
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <HugeiconsIcon icon={FilterIcon} size={16} className="text-slate-400" />
                <select
                  className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                <select
                  className="bg-transparent text-sm outline-none font-medium text-slate-700 cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Tous les statuts</option>
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <AdminViewToggle
              viewMode={viewMode === "table" ? "list" : "grid"}
              onViewModeChange={(m) => setViewMode(m === "list" ? "table" : "grid")}
              className="justify-start bg-white rounded-xl shadow-sm border border-slate-200 p-1"
            />
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <HugeiconsIcon icon={Search01Icon} size={32} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-1">Aucun produit trouvé</h3>
            <p className="text-slate-500">Essayez de modifier vos filtres ou ajoutez un nouveau produit.</p>
          </div>
        ) : viewMode === "table" ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-white text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="px-8 py-5">Produit</th>
                  <th className="px-8 py-5">Catégorie</th>
                  <th className="px-8 py-5">Prix</th>
                  <th className="px-8 py-5">Stock</th>
                  <th className="px-8 py-5">Statut</th>
                  <th className="px-8 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 bg-slate-50/30">
                {filteredProducts.map((product, index) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-white transition-colors duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                          {product.images?.[0] ? (
                            <img src={product.images[0]} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <HugeiconsIcon icon={GridViewIcon} size={20} className="text-slate-400" />
                          )}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-base font-bold text-slate-900 group-hover:text-[#1E40AF] transition-colors">
                            {product.name}
                          </span>
                          {product.featured && (
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E40AF] mt-0.5">
                              Mis en avant
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-4 font-medium text-slate-600">{product.categoryName ?? "—"}</td>
                    <td className="px-8 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-900">{formatCFA(product.price)}</span>
                        {product.compareAtPrice && (
                          <span className="text-xs font-medium text-slate-400 line-through">
                            {formatCFA(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-2 w-2 rounded-full ${product.stock <= 10 ? "bg-[#DC2626]" : "bg-green-500"}`}
                        />
                        <span
                          className={`font-bold ${
                            product.stock <= 10 ? "text-[#DC2626]" : "text-slate-700"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-4">
                      <AdminStatusBadge tone={product.active ? "success" : "neutral"}>
                        {product.active ? "Actif" : "Inactif"}
                      </AdminStatusBadge>
                    </td>
                    <td className="px-8 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDuplicate(product.id)}
                          disabled={isPending}
                          className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300"
                        >
                          <HugeiconsIcon icon={Copy01Icon} size={18} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#1E40AF] hover:bg-blue-50 transition-all duration-300"
                        >
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <HugeiconsIcon icon={Edit01Icon} size={18} />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteClick(product.id, product.name)}
                          disabled={isPending}
                          className="h-10 w-10 rounded-full text-slate-400 opacity-40 group-hover:opacity-100 hover:text-[#DC2626] hover:bg-red-50 transition-all duration-300"
                        >
                          <HugeiconsIcon icon={Delete01Icon} size={18} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 bg-slate-50/30">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:border-[#1E40AF]/40 hover:shadow-xl transition-all duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[4/3] bg-slate-100 flex items-center justify-center p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-slate-300 transform group-hover:scale-110 transition-transform duration-700">
                        <HugeiconsIcon icon={GridViewIcon} size={64} />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                      <AdminStatusBadge
                        tone={product.active ? "success" : "neutral"}
                        className="shadow-sm backdrop-blur-md bg-white/90"
                      >
                        {product.active ? "Actif" : "Inactif"}
                      </AdminStatusBadge>
                      {product.featured && (
                        <Badge className="h-6 rounded-md bg-[#1E40AF] px-2.5 text-[10px] font-bold uppercase tracking-wider text-white border-none shadow-md shadow-blue-900/20">
                          Mis en avant
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0 z-10 flex gap-1">
                      <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => handleDuplicate(product.id)}
                        disabled={isPending}
                        className="h-10 w-10 rounded-full shadow-lg bg-white hover:bg-blue-50 text-[#1E40AF] border border-slate-100"
                      >
                        <HugeiconsIcon icon={Copy01Icon} size={16} />
                      </Button>
                      <Button
                        variant="secondary"
                        size="icon"
                        asChild
                        className="h-10 w-10 rounded-full shadow-lg bg-white hover:bg-blue-50 text-[#1E40AF] border border-slate-100"
                      >
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <HugeiconsIcon icon={Edit01Icon} size={16} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                      {product.categoryName ?? "—"}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 line-clamp-1 mb-4 group-hover:text-[#1E40AF] transition-colors">
                      {product.name}
                    </h3>
                    <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xl font-black tracking-tight text-slate-900">
                          {formatCFA(product.price)}
                        </span>
                        {product.compareAtPrice && (
                          <span className="text-xs font-medium text-slate-400 line-through">
                            {formatCFA(product.compareAtPrice)}
                          </span>
                        )}
                      </div>
                      <div
                        className={`flex items-center gap-1.5 text-xs font-bold ${
                          product.stock <= 10 ? "text-[#DC2626]" : "text-slate-500"
                        }`}
                      >
                        <span
                          className={`flex h-1.5 w-1.5 rounded-full ${
                            product.stock <= 10 ? "bg-[#DC2626]" : "bg-slate-400"
                          }`}
                        />
                        {product.stock} restants
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialog.open} onOpenChange={(open: boolean) => !open && handleDeleteCancel()}>
          <DialogContent className="rounded-2xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl">Supprimer le produit</DialogTitle>
              <DialogDescription className="pt-2">
                Êtes-vous sûr de vouloir supprimer <strong className="text-slate-900">&ldquo;{deleteDialog.productName}&rdquo;</strong> ? Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
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
          </DialogContent>
        </Dialog>

        <div className="flex items-center justify-between border-t border-slate-100 px-8 py-5 text-sm font-medium text-slate-500 bg-white">
          <span>
            Affichage de <span className="text-slate-900 font-bold">{filteredProducts.length}</span> sur{" "}
            {products.length} produits
          </span>
        </div>
      </div>
    </div>
  );
}
