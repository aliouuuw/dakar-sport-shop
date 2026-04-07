import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon, FileDownloadIcon, Delete01Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const quote = {
  id: 1,
  club: "AS Dakar FC",
  contact: "Moussa Diop",
  email: "moussa.d@asdakarfc.sn",
  phone: "+221 77 123 45 67",
  status: "Nouveau",
  date: "Il y a 2h",
  notes: "Nous préparons la nouvelle saison qui commence en septembre. Besoin urgent pour le tournoi d'août.",
  items: [
    { id: 101, name: "Maillot Pro Équipe - Bleu", quantity: 25, price: 12000, total: 300000 },
    { id: 102, name: "Short Pro Équipe - Blanc", quantity: 25, price: 6000, total: 150000 },
  ],
  subtotal: 450000,
  discount: 0,
  total: 450000
}

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const statusColors: Record<string, string> = {
    "Nouveau": "bg-blue-100 text-[#1E40AF]",
    "En cours": "bg-amber-100 text-amber-700",
    "Envoyé": "bg-green-100 text-green-700",
    "Accepté": "bg-emerald-100 text-emerald-700",
    "Refusé": "bg-slate-100 text-slate-600",
  }

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
                {quote.status}
              </Badge>
            </div>
            <p className="mt-1 text-sm text-slate-500">Reçu {quote.date.toLowerCase()}</p>
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
                {quote.items.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                    <td className="px-6 py-4 text-center text-slate-600">{item.quantity}</td>
                    <td className="px-6 py-4 text-right text-slate-600">{item.price.toLocaleString('fr-FR')} FCFA</td>
                    <td className="px-6 py-4 text-right font-medium text-slate-900">{item.total.toLocaleString('fr-FR')} FCFA</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border-t border-slate-200 bg-slate-50/30">
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-right text-sm text-slate-500">Sous-total</td>
                  <td className="px-6 py-3 text-right font-medium text-slate-900">{quote.subtotal.toLocaleString('fr-FR')} FCFA</td>
                </tr>
                <tr>
                  <td colSpan={3} className="px-6 py-3 text-right text-sm text-slate-500">Remise</td>
                  <td className="px-6 py-3 text-right font-medium text-[#DC2626]">
                    {quote.discount > 0 ? `-${quote.discount.toLocaleString('fr-FR')} FCFA` : "0 FCFA"}
                  </td>
                </tr>
                <tr className="border-t border-slate-100">
                  <td colSpan={3} className="px-6 py-4 text-right text-base font-semibold text-slate-900">Total</td>
                  <td className="px-6 py-4 text-right text-base font-bold text-[#1E40AF]">{quote.total.toLocaleString('fr-FR')} FCFA</td>
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
                <p className="mt-1 text-sm font-medium text-slate-900">{quote.club}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Contact principal</p>
                <p className="mt-1 text-sm font-medium text-slate-900">{quote.contact}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Email</p>
                <a href={`mailto:${quote.email}`} className="mt-1 block text-sm text-[#1E40AF] hover:underline">{quote.email}</a>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Téléphone</p>
                <a href={`tel:${quote.phone.replace(/\s+/g, '')}`} className="mt-1 block text-sm text-[#1E40AF] hover:underline">{quote.phone}</a>
              </div>
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
