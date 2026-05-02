import Link from "next/link"
import { notFound } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, FileDownloadIcon, Delete01Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getQuoteById } from "@/lib/actions/quotes"

const statusColors: Record<string, string> = {
  "new": "bg-blue-100 text-[#1E40AF]",
  "pending": "bg-amber-100 text-amber-700",
  "sent": "bg-green-100 text-green-700",
  "accepted": "bg-emerald-100 text-emerald-700",
  "rejected": "bg-slate-100 text-slate-600",
}

const statusLabels: Record<string, string> = {
  "new": "Nouveau",
  "pending": "En cours",
  "sent": "Envoyé",
  "accepted": "Accepté",
  "rejected": "Refusé",
}

function fmtDate(d: Date) {
  const now = new Date()
  const diff = now.getTime() - new Date(d).getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 60) return `Il y a ${minutes} minute${minutes > 1 ? "s" : ""}`
  if (hours < 24) return `Il y a ${hours} heure${hours > 1 ? "s" : ""}`
  if (days < 7) return `Il y a ${days} jour${days > 1 ? "s" : ""}`
  
  return new Intl.DateTimeFormat("fr", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(d))
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const quote = await getQuoteById(parseInt(id, 10))

  if (!quote) notFound()

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="h-9 w-9 text-slate-500 hover:text-slate-900">
            <Link href="/admin/quotes">
              <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Devis #{id}</h1>
              <Badge className={`h-5 rounded-md px-2 text-[10px] font-semibold border-none ${statusColors[quote.status]}`}>
                {statusLabels[quote.status]}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">Reçu {fmtDate(quote.createdAt)}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">
            <HugeiconsIcon icon={FileDownloadIcon} size={18} className="mr-2" />
            Générer PDF
          </Button>
          <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] shadow-none">
            <HugeiconsIcon icon={Mail01Icon} size={18} className="mr-2" />
            Envoyer par email
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_350px]">
        {/* Left Column - Quote Details */}
        <div className="flex flex-col gap-6">
          <Card className="border-slate-200 shadow-none rounded-xl overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50/60 border-b border-slate-100">
                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <th className="px-6 py-4">Produit</th>
                  <th className="px-6 py-4 text-center">Quantité</th>
                  <th className="px-6 py-4 text-right">Prix unitaire</th>
                  <th className="px-6 py-4 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quote.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.productName}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{item.unitPrice.toLocaleString('fr-FR')} FCFA</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">{(item.unitPrice * item.quantity).toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-slate-200 bg-slate-50/30">
                <tr className="border-t border-slate-100">
                  <td colSpan={3} className="px-6 py-4 text-right text-base font-semibold text-slate-900">Total</td>
                  <td className="px-6 py-4 text-right text-base font-bold text-[#1E40AF]">{quote.totalPrice.toLocaleString('fr-FR')} FCFA</td>
                </tr>
              </tfoot>
            </table>
          </Card>

          {quote.notes && (
            <Card className="border-slate-200 shadow-none rounded-xl">
              <CardHeader className="border-b border-slate-100 pb-4">
                <CardTitle className="text-base text-slate-900">Notes du client</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-slate-600 leading-relaxed">{quote.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column - Status & Contact */}
        <div className="flex flex-col gap-6">
          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Statut du devis</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Changer le statut</label>
                <select 
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#1E40AF]/20"
                  defaultValue={quote.status}
                >
                  <option value="Nouveau">Nouveau</option>
                  <option value="En cours">En cours de traitement</option>
                  <option value="Envoyé">Devis envoyé</option>
                  <option value="Accepté">Accepté</option>
                  <option value="Refusé">Refusé</option>
                </select>
              </div>
              <Button className="w-full border-slate-200 bg-white text-slate-700 hover:bg-slate-50" variant="outline">
                Mettre à jour le statut
              </Button>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-none rounded-xl">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-base text-slate-900">Informations client</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Club / Équipe</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{quote.clubName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Contact principal</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{quote.contactName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</p>
                <a href={`mailto:${quote.email}`} className="mt-1 block text-sm text-[#1E40AF] hover:underline">{quote.email}</a>
              </div>
              {quote.phone && (
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Téléphone</p>
                  <a href={`tel:${quote.phone.replace(/\s+/g, '')}`} className="mt-1 block text-sm text-[#1E40AF] hover:underline">{quote.phone}</a>
                </div>
              )}
            </CardContent>
          </Card>

          <Button variant="ghost" className="w-full text-[#DC2626] hover:bg-red-50 hover:text-[#DC2626]">
            <HugeiconsIcon icon={Delete01Icon} size={18} className="mr-2" />
            Supprimer ce devis
          </Button>
        </div>
      </div>
    </div>
  )
}
