import { HugeiconsIcon } from "@hugeicons/react"
import { Archive01Icon, Delete01Icon, CheckmarkCircle01Icon, Mail01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

const messages = [
  { id: 1, name: "Moussa Diop", email: "moussa.d@example.com", subject: "Devis pour équipe de foot", content: "Bonjour, je voudrais un devis pour 20 maillots et 2 ballons pour notre club.", date: "Aujourd'hui, 10:30", unread: true },
  { id: 2, name: "Aissatou Fall", email: "aissatou.f@example.com", subject: "Disponibilité maillots", content: "Est-ce que vous avez les maillots de l'équipe nationale en taille L ?", date: "Aujourd'hui, 08:15", unread: true },
  { id: 3, name: "Ibrahim Sene", email: "isene@example.com", subject: "Question sur les chaussures", content: "Je cherche des crampons pour terrain synthétique. Que recommandez-vous ?", date: "Hier, 14:20", unread: false },
]

export default function MessagesPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">Gérez les demandes de contact de vos clients</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200">
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} className="mr-2" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr] flex-1">
        {/* Inbox List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Boîte de réception</h2>
            <Badge variant="secondary" className="h-5 rounded-md bg-blue-100 px-1.5 text-[10px] font-bold text-[#1E40AF] border-none">
              2 non lus
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            {messages.map((msg, i) => (
              <button 
                key={msg.id} 
                className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                  i === 0 
                    ? "border-[#1E40AF] bg-blue-50/50 shadow-sm" 
                    : "border-slate-200 bg-white hover:border-[#1E40AF]/30"
                }`}
              >
                <div className="flex w-full items-start justify-between gap-2">
                  <span className={`text-sm truncate ${msg.unread ? "font-bold text-slate-900" : "font-medium text-slate-700"}`}>
                    {msg.name}
                  </span>
                  <span className="shrink-0 text-xs text-slate-500">{msg.date.split(',')[0]}</span>
                </div>
                <span className={`text-sm truncate w-full ${msg.unread ? "font-semibold text-slate-900" : "text-slate-600"}`}>
                  {msg.subject}
                </span>
                <span className="text-xs text-slate-500 line-clamp-2 w-full leading-relaxed">
                  {msg.content}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Detail View */}
        <Card className="border-slate-200 shadow-none rounded-xl h-fit">
          <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-start justify-between gap-4 space-y-0">
            <div className="flex flex-col gap-1">
              <CardTitle className="text-xl text-slate-900">{messages[0].subject}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="font-medium text-slate-900">{messages[0].name}</span>
                <span>&lt;{messages[0].email}&gt;</span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm text-slate-400 mr-2">{messages[0].date}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                <HugeiconsIcon icon={Archive01Icon} size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-[#DC2626] hover:bg-red-50">
                <HugeiconsIcon icon={Delete01Icon} size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none text-slate-700">
              <p className="whitespace-pre-wrap leading-relaxed">{messages[0].content}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">Répondre</p>
              <Textarea 
                className="w-full min-h-[120px] resize-none"
                placeholder="Écrivez votre réponse ici..."
              />
              <div className="mt-3 flex justify-end">
                <Button className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a]">
                  <HugeiconsIcon icon={Mail01Icon} size={16} className="mr-2" />
                  Envoyer la réponse
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
