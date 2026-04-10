"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  MailOpen01Icon,
  Archive01Icon,
  Delete01Icon,
  CheckmarkCircle01Icon,
  ArrowRight01Icon,
  InboxIcon,
  Archive02Icon,
  MoreVerticalIcon,
} from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "@/app/admin/components/admin-page-header";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import {
  markAsRead,
  markAsUnread,
  archiveMessage,
  unarchiveMessage,
  deleteMessage,
} from "@/lib/actions/messages";
import type { getMessages, getUnreadCount } from "@/lib/actions/messages";

type Message = Awaited<ReturnType<typeof getMessages>>[number];

interface MessagesClientProps {
  messages: Message[];
  unreadCount: number;
}

type FilterType = "all" | "unread" | "archived";

export function MessagesClient({ messages, unreadCount }: MessagesClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState<FilterType>("all");
  const [items, setItems] = useState(messages);

  const filteredMessages = items.filter((m) => {
    if (filter === "unread") return !m.read && !m.archivedAt;
    if (filter === "archived") return !!m.archivedAt;
    return !m.archivedAt;
  });

  const handleMarkAsRead = (id: number) => {
    startTransition(async () => {
      const result = await markAsRead(id);
      if (result.success) {
        setItems((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: true } : m))
        );
        toast.success("Marqué comme lu");
      } else {
        toast.error("Erreur", { description: result.error });
      }
    });
  };

  const handleMarkAsUnread = (id: number) => {
    startTransition(async () => {
      const result = await markAsUnread(id);
      if (result.success) {
        setItems((prev) =>
          prev.map((m) => (m.id === id ? { ...m, read: false } : m))
        );
        toast.success("Marqué comme non lu");
      } else {
        toast.error("Erreur", { description: result.error });
      }
    });
  };

  const handleArchive = (id: number) => {
    startTransition(async () => {
      const result = await archiveMessage(id);
      if (result.success) {
        setItems((prev) =>
          prev.map((m) =>
            m.id === id ? { ...m, archivedAt: new Date() } : m
          )
        );
        toast.success("Message archivé");
      } else {
        toast.error("Erreur", { description: result.error });
      }
    });
  };

  const handleUnarchive = (id: number) => {
    startTransition(async () => {
      const result = await unarchiveMessage(id);
      if (result.success) {
        setItems((prev) =>
          prev.map((m) => ({ ...m, archivedAt: null }))
        );
        toast.success("Message désarchivé");
        router.refresh();
      } else {
        toast.error("Erreur", { description: result.error });
      }
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const result = await deleteMessage(id);
      if (result.success) {
        setItems((prev) => prev.filter((m) => m.id !== id));
        toast.success("Message supprimé");
      } else {
        toast.error("Erreur", { description: result.error });
      }
    });
  };

  const archiveCount = items.filter((m) => m.archivedAt).length;

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Messages"
        description={`${items.length} message${items.length !== 1 ? "s" : ""} — ${unreadCount} non lu${unreadCount !== 1 ? "s" : ""}`}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            filter === "all"
              ? "border-[#1E40AF] text-[#1E40AF]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={InboxIcon} size={18} />
            Boîte de réception
            {unreadCount > 0 && (
              <Badge variant="default" className="ml-1 bg-[#1E40AF]">
                {unreadCount}
              </Badge>
            )}
          </span>
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            filter === "unread"
              ? "border-[#1E40AF] text-[#1E40AF]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Mail01Icon} size={18} />
            Non lus
          </span>
        </button>
        <button
          onClick={() => setFilter("archived")}
          className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
            filter === "archived"
              ? "border-[#1E40AF] text-[#1E40AF]"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center gap-2">
            <HugeiconsIcon icon={Archive02Icon} size={18} />
            Archivés
            {archiveCount > 0 && (
              <Badge variant="secondary" className="ml-1">
                {archiveCount}
              </Badge>
            )}
          </span>
        </button>
      </div>

      {/* Messages List */}
      <div className="grid gap-3">
        {filteredMessages.map((message) => (
          <Card
            key={message.id}
            className={`group transition-all hover:shadow-md ${
              !message.read && !message.archivedAt
                ? "border-l-4 border-l-[#1E40AF] bg-blue-50/30"
                : "border-l-4 border-l-transparent"
            } ${message.archivedAt ? "opacity-75" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${
                    !message.read && !message.archivedAt
                      ? "bg-[#1E40AF] text-white"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  <span className="font-semibold text-lg">
                    {message.name.charAt(0).toUpperCase()}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={`font-bold ${
                            !message.read && !message.archivedAt
                              ? "text-slate-900"
                              : "text-slate-700"
                          }`}
                        >
                          {message.name}
                        </h3>
                        {!message.read && !message.archivedAt && (
                          <Badge className="bg-[#DC2626] text-white hover:bg-[#DC2626]">
                            Nouveau
                          </Badge>
                        )}
                        {message.archivedAt && (
                          <Badge variant="secondary">Archivé</Badge>
                        )}
                      </div>
                      <p
                        className={`font-medium mb-1 ${
                          !message.read && !message.archivedAt
                            ? "text-slate-800"
                            : "text-slate-600"
                        }`}
                      >
                        {message.subject}
                      </p>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {message.body}
                      </p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                        <span>{message.email}</span>
                        {message.phone && (
                          <>
                            <span>•</span>
                            <span>{message.phone}</span>
                          </>
                        )}
                        <span>•</span>
                        <span>
                          {new Date(message.createdAt).toLocaleDateString(
                            "fr-SN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 text-slate-600 hover:text-[#1E40AF]"
                        asChild
                      >
                        <Link href={`/admin/messages/${message.id}`}>
                          <span className="flex items-center gap-1">
                            Lire
                            <HugeiconsIcon icon={ArrowRight01Icon} size={16} />
                          </span>
                        </Link>
                      </Button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9"
                            disabled={isPending}
                          >
                            <HugeiconsIcon
                              icon={MoreVerticalIcon}
                              size={18}
                            />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {!message.read ? (
                            <DropdownMenuItem
                              onClick={() => handleMarkAsRead(message.id)}
                            >
                              <HugeiconsIcon
                                icon={MailOpen01Icon}
                                size={16}
                                className="mr-2"
                              />
                              Marquer comme lu
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleMarkAsUnread(message.id)}
                            >
                              <HugeiconsIcon
                                icon={Mail01Icon}
                                size={16}
                                className="mr-2"
                              />
                              Marquer comme non lu
                            </DropdownMenuItem>
                          )}
                          {message.archivedAt ? (
                            <DropdownMenuItem
                              onClick={() => handleUnarchive(message.id)}
                            >
                              <HugeiconsIcon
                                icon={CheckmarkCircle01Icon}
                                size={16}
                                className="mr-2"
                              />
                              Désarchiver
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleArchive(message.id)}
                            >
                              <HugeiconsIcon
                                icon={Archive01Icon}
                                size={16}
                                className="mr-2"
                              />
                              Archiver
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => handleDelete(message.id)}
                          >
                            <HugeiconsIcon
                              icon={Delete01Icon}
                              size={16}
                              className="mr-2"
                            />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredMessages.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <HugeiconsIcon
                icon={filter === "archived" ? Archive02Icon : InboxIcon}
                size={32}
                className="text-slate-400"
              />
            </div>
            <p className="text-slate-500 font-medium">
              {filter === "archived"
                ? "Aucun message archivé"
                : filter === "unread"
                ? "Aucun message non lu"
                : "Aucun message"}
            </p>
            <p className="text-sm text-slate-400 mt-1">
              {filter === "archived"
                ? "Les messages archivés apparaissent ici"
                : filter === "unread"
                ? "Tous vos messages ont été lus"
                : "Votre boîte de réception est vide"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
