"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { SaveIcon, Store01Icon, Call02Icon, Share01Icon, PaintBoardIcon, Add01Icon, Delete01Icon, CheckmarkCircle01Icon, WhatsappIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AdminPageHeader } from "../components/admin-page-header"
import { toast } from "sonner"

interface PhoneEntry {
  id: number
  value: string
}

export default function SettingsPage() {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()
  const [phones, setPhones] = useState<PhoneEntry[]>([
    { id: 1, value: "+221 33 840 09 45" },
    { id: 2, value: "+221 77 634 51 15" },
    { id: 3, value: "+221 77 041 49 30" },
  ])
  const [nextPhoneId, setNextPhoneId] = useState(4)

  const [sectionSaving, setSectionSaving] = useState<string | null>(null)

  const handleSaveSection = (section: string) => {
    setSectionSaving(section)
    startTransition(() => {
      // TODO: Replace with actual server action call
      // await updateSettings(section, data)
      setTimeout(() => {
        toast.success("Param&egrave;tres enregistr&eacute;s", {
          description: `Les modifications de la section "${section}" ont &eacute;t&eacute; sauvegard&eacute;es.`,
          icon: <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />,
        })
        setSectionSaving(null)
        router.refresh()
      }, 500)
    })
  }

  const addPhone = () => {
    setPhones((prev) => [...prev, { id: nextPhoneId, value: "" }])
    setNextPhoneId((prev) => prev + 1)
  }

  const removePhone = (id: number) => {
    if (phones.length <= 1) {
      toast.error("Impossible de supprimer", {
        description: "Vous devez garder au moins un num&eacute;ro de t&eacute;l&eacute;phone.",
      })
      return
    }
    setPhones((prev) => prev.filter((p) => p.id !== id))
  }

  const updatePhone = (id: number, value: string) => {
    setPhones((prev) => prev.map((p) => (p.id === id ? { ...p, value } : p)))
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Param&egrave;tres"
        description="G&eacute;rez les informations globales et l'apparence de votre boutique."
      />

      <div className="grid gap-6 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
        {/* General Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={Store01Icon} size={20} />
                </div>
                Informations g&eacute;n&eacute;rales
              </CardTitle>
              <Button
                size="sm"
                onClick={() => handleSaveSection("Informations g&eacute;n&eacute;rales")}
                disabled={isPending && sectionSaving === "Informations g&eacute;n&eacute;rales"}
                className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-10 rounded-xl font-bold"
              >
                {sectionSaving === "Informations g&eacute;n&eacute;rales" ? (
                  <>
                    <svg className="mr-1.5 h-3 w-3 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={SaveIcon} size={16} className="mr-1.5" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
            <CardDescription className="mt-2 text-base font-medium">Nom de la boutique, devise et description principale.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la boutique</label>
              <Input defaultValue="Dakar Sport" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slogan (Tagline)</label>
              <Input defaultValue="Tout pour le Sport" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Description SEO</label>
              <Textarea
                rows={3}
                defaultValue="Boutique d'&eacute;quipements sportifs &agrave; Dakar. Sp&eacute;cialiste en football et clubs associatifs."
                className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4 font-medium"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={Call02Icon} size={20} />
                </div>
                Contact et Adresse
              </CardTitle>
              <Button
                size="sm"
                onClick={() => handleSaveSection("Contact et Adresse")}
                disabled={isPending && sectionSaving === "Contact et Adresse"}
                className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-10 rounded-xl font-bold"
              >
                {sectionSaving === "Contact et Adresse" ? (
                  <>
                    <svg className="mr-1.5 h-3 w-3 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={SaveIcon} size={16} className="mr-1.5" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
            <CardDescription className="mt-2 text-base font-medium">Coordonn&eacute;es affich&eacute;es sur le storefront et dans les devis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Email de contact</label>
              <Input type="email" defaultValue="promosportsdakar@yahoo.fr" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Adresse physique</label>
              <Textarea
                rows={2}
                defaultValue="Avenue G. Pompidou en face Restaurant Ali baba, Dakar, Senegal"
                className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4 font-medium"
              />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Num&eacute;ros de t&eacute;l&eacute;phone</label>
                <Button variant="ghost" size="sm" onClick={addPhone} className="h-8 rounded-lg text-xs font-bold text-[#1E40AF] hover:bg-blue-50">
                  <HugeiconsIcon icon={Add01Icon} size={14} className="mr-1" />
                  Ajouter
                </Button>
              </div>
              <div className="space-y-3">
                {phones.map((phone) => (
                  <div key={phone.id} className="flex items-center gap-2">
                    <Input
                      value={phone.value}
                      onChange={(e) => updatePhone(phone.id, e.target.value)}
                      className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium flex-1"
                      placeholder="+221 XX XXX XX XX"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removePhone(phone.id)}
                      className="h-12 w-12 rounded-xl text-slate-400 hover:text-[#DC2626] hover:bg-red-50 shrink-0"
                    >
                      <HugeiconsIcon icon={Delete01Icon} size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={Share01Icon} size={20} />
                </div>
                R&eacute;seaux sociaux
              </CardTitle>
              <Button
                size="sm"
                onClick={() => handleSaveSection("R&eacute;seaux sociaux")}
                disabled={isPending && sectionSaving === "R&eacute;seaux sociaux"}
                className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-10 rounded-xl font-bold"
              >
                {sectionSaving === "R&eacute;seaux sociaux" ? (
                  <>
                    <svg className="mr-1.5 h-3 w-3 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={SaveIcon} size={16} className="mr-1.5" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
            <CardDescription className="mt-2 text-base font-medium">Liens vers vos pages sociales.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <HugeiconsIcon icon={Share01Icon} size={16} className="text-blue-600" />
                Facebook
              </label>
              <Input type="url" placeholder="https://facebook.com/..." className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <HugeiconsIcon icon={WhatsappIcon} size={16} className="text-green-600" />
                WhatsApp (Num&eacute;ro business)
              </label>
              <Input defaultValue="+221 77 634 51 15" className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Instagram</label>
              <Input type="url" placeholder="https://instagram.com/..." className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]">
                  <HugeiconsIcon icon={PaintBoardIcon} size={20} />
                </div>
                Apparence
              </CardTitle>
              <Button
                size="sm"
                onClick={() => handleSaveSection("Apparence")}
                disabled={isPending && sectionSaving === "Apparence"}
                className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-10 rounded-xl font-bold"
              >
                {sectionSaving === "Apparence" ? (
                  <>
                    <svg className="mr-1.5 h-3 w-3 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enregistrement...
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={SaveIcon} size={16} className="mr-1.5" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
            <CardDescription className="mt-2 text-base font-medium">Logos et identit&eacute; visuelle.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-8">
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Logo principal</label>
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-400 group hover:border-[#1E40AF] hover:bg-blue-50 transition-colors cursor-pointer">
                  dakar-sport.png
                </div>
                <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50">Changer le logo</Button>
              </div>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Ic&ocirc;ne (Favicon)</label>
              <div className="flex items-center gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs font-medium text-slate-400 group hover:border-[#1E40AF] hover:bg-blue-50 transition-colors cursor-pointer">
                  icon.png
                </div>
                <Button variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50">Changer icone</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}