"use client"

import { useState, useTransition, useRef } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { SaveIcon, Store01Icon, Call02Icon, Share01Icon, PaintBoardIcon, Add01Icon, Delete01Icon, CheckmarkCircle01Icon, WhatsappIcon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { updateSiteSettings } from "@/lib/actions/site-settings"

interface PhoneEntry {
  id: number
  value: string
}

interface SettingsClientProps {
  initial: Record<string, string>
}

function Spinner() {
  return (
    <svg className="mr-1.5 h-3 w-3 animate-spin" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  )
}

function SaveButton({ label, saving }: { label: string; saving: boolean }) {
  return (
    <Button size="sm" type="submit" disabled={saving} className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-10 rounded-xl font-bold">
      {saving ? (
        <><Spinner />Enregistrement...</>
      ) : (
        <><HugeiconsIcon icon={SaveIcon} size={16} className="mr-1.5" />Enregistrer</>
      )}
    </Button>
  )
}

export function SettingsClient({ initial }: SettingsClientProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [sectionSaving, setSectionSaving] = useState<string | null>(null)

  const initialPhones: PhoneEntry[] = (() => {
    try {
      const parsed = JSON.parse(initial.phones ?? "[]")
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed.map((p: { number?: string; label?: string }, i: number) => ({ id: i + 1, value: p.number ?? "" }))
      }
    } catch { /* fall through */ }
    return [{ id: 1, value: "" }]
  })()

  const [phones, setPhones] = useState<PhoneEntry[]>(initialPhones)
  const [nextPhoneId, setNextPhoneId] = useState(initialPhones.length + 1)

  const addPhone = () => {
    setPhones((prev) => [...prev, { id: nextPhoneId, value: "" }])
    setNextPhoneId((prev) => prev + 1)
  }

  const removePhone = (id: number) => {
    if (phones.length <= 1) {
      toast.error("Impossible de supprimer", { description: "Vous devez garder au moins un numéro de téléphone." })
      return
    }
    setPhones((prev) => prev.filter((p) => p.id !== id))
  }

  const updatePhone = (id: number, value: string) => {
    setPhones((prev) => prev.map((p) => (p.id === id ? { ...p, value } : p)))
  }

  const save = (section: string, entries: Array<{ key: string; value: string }>) => {
    setSectionSaving(section)
    startTransition(async () => {
      const result = await updateSiteSettings(entries)
      if (result.success) {
        toast.success("Paramètres enregistrés", {
          description: `Les modifications de "${section}" ont été sauvegardées.`,
          icon: <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} />,
        })
        router.refresh()
      } else {
        toast.error("Erreur", { description: result.error })
      }
      setSectionSaving(null)
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-both">
      {/* General Settings */}
      <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            save("Informations générales", [
              { key: "siteName", value: fd.get("siteName") as string },
              { key: "tagline", value: fd.get("tagline") as string },
              { key: "aboutText", value: fd.get("aboutText") as string },
            ])
          }}
        >
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={Store01Icon} size={20} /></div>
                Informations générales
              </CardTitle>
              <SaveButton label="Informations générales" saving={sectionSaving === "Informations générales" && isPending} />
            </div>
            <CardDescription className="mt-2 text-base font-medium">Nom de la boutique, devise et description principale.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Nom de la boutique</label>
              <Input name="siteName" defaultValue={initial.siteName ?? "Dakar Sport"} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Slogan (Tagline)</label>
              <Input name="tagline" defaultValue={initial.tagline ?? "Tout pour le Sport"} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Description SEO</label>
              <Textarea name="aboutText" rows={3} defaultValue={initial.aboutText ?? ""} className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4 font-medium" />
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Contact Settings */}
      <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            const phonesPayload = JSON.stringify(
              phones.filter((p) => p.value.trim()).map((p) => ({ label: "Téléphone", number: p.value.trim() }))
            )
            save("Contact et Adresse", [
              { key: "email", value: fd.get("email") as string },
              { key: "address", value: fd.get("address") as string },
              { key: "phones", value: phonesPayload },
              { key: "openingHours", value: fd.get("openingHours") as string },
            ])
          }}
        >
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={Call02Icon} size={20} /></div>
                Contact et Adresse
              </CardTitle>
              <SaveButton label="Contact et Adresse" saving={sectionSaving === "Contact et Adresse" && isPending} />
            </div>
            <CardDescription className="mt-2 text-base font-medium">Coordonnées affichées sur le storefront et dans les devis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Email de contact</label>
              <Input name="email" type="email" defaultValue={initial.email ?? ""} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Adresse physique</label>
              <Textarea name="address" rows={2} defaultValue={initial.address ?? ""} className="resize-none bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] p-4 font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Horaires d&apos;ouverture</label>
              <Input name="openingHours" defaultValue={initial.openingHours ?? ""} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Numéros de téléphone</label>
                <Button type="button" variant="ghost" size="sm" onClick={addPhone} className="h-8 rounded-lg text-xs font-bold text-[#1E40AF] hover:bg-blue-50">
                  <HugeiconsIcon icon={Add01Icon} size={14} className="mr-1" />Ajouter
                </Button>
              </div>
              <div className="space-y-3">
                {phones.map((phone) => (
                  <div key={phone.id} className="flex items-center gap-2">
                    <Input value={phone.value} onChange={(e) => updatePhone(phone.id, e.target.value)} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium flex-1" placeholder="+221 XX XXX XX XX" />
                    <Button type="button" variant="ghost" size="icon" onClick={() => removePhone(phone.id)} className="h-12 w-12 rounded-xl text-slate-400 hover:text-[#DC2626] hover:bg-red-50 shrink-0">
                      <HugeiconsIcon icon={Delete01Icon} size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Social Media Settings */}
      <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            const fd = new FormData(e.currentTarget)
            save("Réseaux sociaux", [
              { key: "facebook", value: fd.get("facebook") as string },
              { key: "whatsapp", value: fd.get("whatsapp") as string },
              { key: "instagram", value: fd.get("instagram") as string },
            ])
          }}
        >
          <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
                <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={Share01Icon} size={20} /></div>
                Réseaux sociaux
              </CardTitle>
              <SaveButton label="Réseaux sociaux" saving={sectionSaving === "Réseaux sociaux" && isPending} />
            </div>
            <CardDescription className="mt-2 text-base font-medium">Liens vers vos pages sociales.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <HugeiconsIcon icon={Share01Icon} size={16} className="text-blue-600" />Facebook
              </label>
              <Input name="facebook" type="url" defaultValue={initial.facebook ?? ""} placeholder="https://facebook.com/..." className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                <HugeiconsIcon icon={WhatsappIcon} size={16} className="text-green-600" />WhatsApp (Numéro business)
              </label>
              <Input name="whatsapp" defaultValue={initial.whatsapp ?? ""} className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-mono font-medium" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Instagram</label>
              <Input name="instagram" type="url" defaultValue={initial.instagram ?? ""} placeholder="https://instagram.com/..." className="h-12 bg-slate-50 border-slate-200 focus-visible:ring-[#1E40AF] font-medium" />
            </div>
          </CardContent>
        </form>
      </Card>

      {/* Appearance Settings */}
      <Card className="border-slate-200 shadow-none rounded-3xl overflow-hidden transition-all hover:border-[#1E40AF]/30 hover:shadow-lg">
        <CardHeader className="border-b border-slate-100 pb-4 bg-slate-50/50 px-8 pt-8">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="rounded-xl bg-blue-50 p-2 text-[#1E40AF]"><HugeiconsIcon icon={PaintBoardIcon} size={20} /></div>
              Apparence
            </CardTitle>
          </div>
          <CardDescription className="mt-2 text-base font-medium">Logos et identité visuelle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 p-8">
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Logo principal</label>
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-40 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-sm font-medium text-slate-400 group hover:border-[#1E40AF] hover:bg-blue-50 transition-colors cursor-pointer">
                {initial.logoUrl ? <img src={initial.logoUrl} alt="Logo" className="h-full w-full object-contain p-2" /> : "dakar-sport.png"}
              </div>
              <Button type="button" variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50">Changer le logo</Button>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-700">Icône (Favicon)</label>
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 text-xs font-medium text-slate-400 group hover:border-[#1E40AF] hover:bg-blue-50 transition-colors cursor-pointer">
                {initial.faviconUrl ? <img src={initial.faviconUrl} alt="Favicon" className="h-full w-full object-contain p-2" /> : "icon.png"}
              </div>
              <Button type="button" variant="outline" className="h-10 rounded-xl border-slate-200 font-bold hover:bg-slate-50">Changer icone</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
