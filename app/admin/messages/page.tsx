"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { HugeiconsIcon } from "@hugeicons/react"
import { Archive01Icon, Delete01Icon, CheckmarkCircle01Icon, Mail01Icon, Clock01Icon } from "@hugeicons/core-free-icons"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface Message {
  id: number
  name: string
  email: string
  phone: string
  subject: string
  content: string
  date: string
  read: boolean
  archived: boolean
}

const mockMessages: Message[] = [
  { id: 1, name: "Moussa Diop", email: "moussa.d@example.com", phone: "+221 77 123 45 67", subject: "Devis pour &eacute;quipe de foot", content: "Bonjour, je voudrais un devis pour 20 maillots et 2 ballons pour notre club.", date: "Aujourd'hui, 10:30", read: false, archived: false },
  { id: 2, name: "Aissatou Fall", email: "aissatou.f@example.com", phone: "+221 78 234 56 78", subject: "Disponibilit&eacute; maillots", content: "Est-ce que vous avez les maillots de l'&eacute;quipe nationale en taille L ?", date: "Aujourd'hui, 08:15", read: false, archived: false },
  { id: 3, name: "Ibrahim Sene", email: "isene@example.com", phone: "+221 76 345 67 89", subject: "Question sur les chaussures", content: "Je cherche des crampons pour terrain synth&eacute;tique. Que recommandez-vous ?", date: "Hier, 14:20", read: true, archived: false },
  { id: 4, name: "Fatou Ndiaye", email: "fatou.n@example.com", phone: "+221 70 456 78 90", subject: "Commande #1024", content: "Je n'ai pas re&ccedil;u ma commande pass&eacute;e il y a 5 jours. Pouvez-vous v&eacute;rifier le statut ?", date: "Hier, 09:45", read: true, archived: true },
]

interface ActionDialogState {
  open: boolean
  action: "delete" | "archive" | null
  messageId: number | null
  messageName: string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [selectedId, setSelectedId] = useState<number | null>(mockMessages[0]?.id ?? null)
  const [replyText, setReplyText] = useState("")
  const [filter, setFilter] = useState<"all" | "unread" | "archived">("all")
  const [isPending, startTransition] = useTransition()
  const [actionDialog, setActionDialog] = useState<ActionDialogState>({
    open: false,
    action: null,
    messageId: null,
    messageName: "",
  })
  const router = useRouter()

  const activeMessages = messages.filter((msg) => {
    if (filter === "unread") return !msg.read && !msg.archived
    if (filter === "archived") return msg.archived
    return !msg.archived
  })
  const selectedMessage = messages.find((m) => m.id === selectedId)
  const unreadCount = messages.filter((m) => !m.read && !m.archived).length

  const handleSelectMessage = (id: number) => {
    setSelectedId(id)
    if (!messages.find((m) => m.id === id)?.read) {
      startTransition(() => {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        )
        // TODO: Replace with actual server action call
        // await markAsRead(id)
      })
    }
  }

  const handleMarkAllRead = () => {
    startTransition(() => {
      setMessages((prev) =>
        prev.map((m) => ({ ...m, read: true }))
      )
      toast.success("Tout marqu&eacute; comme lu", {
        description: `${unreadCount} message(s) marqu&eacute;(s) comme lu(s).`,
      })
      router.refresh()
    })
  }

  const handleActionClick = (action: "delete" | "archive", id: number) => {
    const msg = messages.find((m) => m.id === id)
    setActionDialog({ open: true, action, messageId: id, messageName: msg?.subject ?? "" })
  }

  const handleActionConfirm = () => {
    startTransition(() => {
      if (actionDialog.action === "delete") {
        setMessages((prev) => prev.filter((m) => m.id !== actionDialog.messageId))
        if (selectedId === actionDialog.messageId) {
          setSelectedId(null)
        }
        toast.success("Message supprim&eacute;", {
          description: "Le message a &eacute;t&eacute; supprim&eacute; d&eacute;finitivement.",
        })
      } else if (actionDialog.action === "archive") {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === actionDialog.messageId ? { ...m, archived: true } : m
          )
        )
        if (selectedId === actionDialog.messageId) {
          setSelectedId(null)
        }
        toast.success("Message archiv&eacute;", {
          description: "Le message a &eacute;t&eacute; archiv&eacute;.",
        })
      }
      setActionDialog({ open: false, action: null, messageId: null, messageName: "" })
      router.refresh()
    })
  }

  const handleActionCancel = () => {
    setActionDialog({ open: false, action: null, messageId: null, messageName: "" })
  }

  const handleReply = () => {
    startTransition(() => {
      // TODO: Replace with actual email sending
      toast.success("R&eacute;ponse envoy&eacute;e", {
        description: `Votre r&eacute;ponse a &eacute;t&eacute; envoy&eacute;e &agrave; ${selectedMessage?.name}.`,
      })
      setReplyText("")
      router.refresh()
    })
  }

  const emptyState = activeMessages.length === 0

  return (
    <div className="flex flex-col gap-6 h-full pb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">G&eacute;rez les demandes de contact de vos clients</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="border-slate-200 h-12 rounded-xl font-semibold"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0 || isPending}
          >
            <HugeiconsIcon icon={CheckmarkCircle01Icon} size={18} className="mr-2" />
            Tout marquer comme lu
          </Button>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
          className={`h-9 rounded-lg text-xs font-bold px-4 ${
            filter === "all"
              ? "bg-[#1E40AF] text-white hover:bg-[#1e3a8a]"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Tous
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("unread")}
          className={`h-9 rounded-lg text-xs font-bold px-4 ${
            filter === "unread"
              ? "bg-[#DC2626] text-white hover:bg-[#b91c1c]"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Non lus ({unreadCount})
        </Button>
        <Button
          variant={filter === "archived" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("archived")}
          className={`h-9 rounded-lg text-xs font-bold px-4 ${
            filter === "archived"
              ? "bg-slate-700 text-white hover:bg-slate-800"
              : "border-slate-200 text-slate-600 hover:bg-slate-50"
          }`}
        >
          Archiv&eacute;s
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[350px_1fr] xl:grid-cols-[400px_1fr] flex-1">
        {/* Inbox List */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Bo&icirc;te de r&eacute;ception</h2>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="h-5 rounded-md bg-blue-100 px-1.5 text-[10px] font-bold text-[#1E40AF] border-none">
                {unreadCount}
              </Badge>
            )}
          </div>

          {emptyState ? (
            <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
              <div className="rounded-2xl bg-slate-100 p-4 mb-4">
                <HugeiconsIcon icon={Mail01Icon} size={36} className="text-slate-400" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">
                {filter === "unread" ? "Aucun message non lu" : "Aucun message"}
              </h3>
              <p className="text-sm text-slate-500">
                {filter === "unread"
                  ? "Tous les messages ont &eacute;t&eacute; lus."
                  : "Aucun message dans cette cat&eacute;gorie."}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {activeMessages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => handleSelectMessage(msg.id)}
                  className={`flex flex-col gap-2 rounded-xl border p-4 text-left transition-all ${
                    msg.id === selectedId
                      ? "border-[#1E40AF] bg-blue-50/50 shadow-sm"
                      : "border-slate-200 bg-white hover:border-[#1E40AF]/30"
                  }`}
                >
                  <div className="flex w-full items-start justify-between gap-2">
                    <span className={`text-sm ${msg.read ? "font-medium text-slate-700" : "font-bold text-slate-900"}`}>
                      {msg.name}
                    </span>
                    {msg.read ? (
                      <span className="shrink-0 text-xs text-slate-400">
                        <HugeiconsIcon icon={Clock01Icon} size={12} />
                      </span>
                    ) : (
                      <span className="shrink-0 h-2 w-2 rounded-full bg-[#DC2626] mt-1.5" />
                    )}
                  </div>
                  <span className={`text-sm truncate w-full ${msg.read ? "text-slate-600" : "font-semibold text-slate-900"}`}>
                    {msg.subject}
                  </span>
                  <span className="text-xs text-slate-500 line-clamp-2 w-full leading-relaxed">
                    {msg.content}
                  </span>
                  <span className="text-xs text-slate-400">{msg.date}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail View */}
        {selectedMessage ? (
          <Card className="border-slate-200 shadow-none rounded-xl h-fit">
            <CardHeader className="border-b border-slate-100 pb-4 flex flex-row items-start justify-between gap-4 space-y-0">
              <div className="flex flex-col gap-1">
                <CardTitle className="text-xl text-slate-900">{selectedMessage.subject}</CardTitle>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span className="font-medium text-slate-900">{selectedMessage.name}</span>
                  <span>{"\u003c"}{selectedMessage.email}{"\u003e"}</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">{selectedMessage.phone}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-sm text-slate-400 mr-2">{selectedMessage.date}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleActionClick("archive", selectedMessage.id)}
                  className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full"
                  title="Archiver"
                >
                  <HugeiconsIcon icon={Archive01Icon} size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleActionClick("delete", selectedMessage.id)}
                  className="h-8 w-8 text-slate-400 hover:text-[#DC2626] hover:bg-red-50 rounded-full"
                  title="Supprimer"
                >
                  <HugeiconsIcon icon={Delete01Icon} size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="prose prose-sm max-w-none text-slate-700">
                <p className="whitespace-pre-wrap leading-relaxed">{selectedMessage.content}</p>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-3">R&eacute;pondre</p>
                <Textarea
                  className="w-full min-h-[120px] resize-none"
                  placeholder="&Eacute;crivez votre r&eacute;ponse ici..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="mt-3 flex justify-end">
                  <Button
                    className="bg-[#1E40AF] text-white hover:bg-[#1e3a8a] h-11 rounded-xl font-semibold"
                    disabled={!replyText.trim() || isPending}
                    onClick={handleReply}
                  >
                    {isPending ? (
                      <>
                        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <HugeiconsIcon icon={Mail01Icon} size={16} className="mr-2" />
                        Envoyer la r&eacute;ponse
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center border-2 border-dashed border-slate-200 rounded-xl">
            <div className="rounded-2xl bg-slate-100 p-4 mb-4">
              <HugeiconsIcon icon={Mail01Icon} size={48} className="text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">S&eacute;lectionnez un message</h3>
            <p className="text-sm text-slate-500">Cliquez sur un message dans la liste pour le consulter.</p>
          </div>
        )}
      </div>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionDialog.open} onOpenChange={(open: boolean) => !open && handleActionCancel()}>
        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {actionDialog.action === "delete" ? "Supprimer le message" : "Archiver le message"}
            </DialogTitle>
            <DialogDescription className="pt-2">
              {actionDialog.action === "delete" ? (
                <>
                  &Ecirc;tes-vous s&ucirc;r de vouloir supprimer <strong className="text-slate-900">&ldquo;{actionDialog.messageName}&rdquo;</strong> ? Cette action est irr&eacute;versible.
                </>
              ) : (
                <>
                  Le message <strong className="text-slate-900">&ldquo;{actionDialog.messageName}&rdquo;</strong> sera archiv&eacute; et ne sera plus visible dans la bo&icirc;te de r&eacute;ception.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleActionCancel}
              disabled={isPending}
              className="rounded-xl h-12 font-semibold"
            >
              Annuler
            </Button>
            <Button
              variant={actionDialog.action === "delete" ? "destructive" : "default"}
              onClick={handleActionConfirm}
              disabled={isPending}
              className={`rounded-xl h-12 font-semibold min-w-[120px] ${
                actionDialog.action !== "delete" ? "bg-[#1E40AF] hover:bg-[#1e3a8a]" : ""
              }`}
            >
              {isPending ? (
                <>
                  <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Traitement...
                </>
              ) : (
                actionDialog.action === "delete" ? "Supprimer" : "Archiver"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}