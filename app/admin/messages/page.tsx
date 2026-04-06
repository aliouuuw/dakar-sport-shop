import { HugeiconsIcon } from "@hugeicons/react"
import { Archive01Icon, Delete01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function MessagesPage() {
  const messages = [
    { id: 1, name: "Moussa Diop", subject: "Devis pour équipe de foot", date: "Il y a 2h", unread: true },
    { id: 2, name: "Aissatou Fall", subject: "Disponibilité maillots", date: "Il y a 4h", unread: true },
    { id: 3, name: "Ibrahim Sene", subject: "Question sur les chaussures", date: "Hier", unread: false },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Gérez les messages de vos clients</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="divide-y divide-slate-100">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
              <div className="flex items-center gap-4 flex-1">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-600">
                  {msg.name.charAt(0)}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${msg.unread ? 'text-slate-900' : 'text-slate-600'}`}>
                      {msg.name}
                    </span>
                    {msg.unread && (
                      <Badge variant="secondary" className="h-5 rounded-md bg-blue-100 px-1.5 text-[10px] font-semibold text-[#1E40AF] border-none">
                        Nouveau
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm text-slate-500 truncate">{msg.subject}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <span className="text-xs text-slate-400 whitespace-nowrap">{msg.date}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                  <HugeiconsIcon icon={Archive01Icon} size={16} />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-red-600">
                  <HugeiconsIcon icon={Delete01Icon} size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
