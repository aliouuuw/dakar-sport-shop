import { getMessages, getUnreadCount } from "@/lib/actions/messages";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AdminPageHeader } from "@/app/admin/components/admin-page-header";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";
import type { messages } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

type Message = typeof messages.$inferSelect;

export default async function MessagesPage() {
  const [messagesList, unreadCount] = await Promise.all([
    getMessages({ limit: 50 }),
    getUnreadCount(),
  ]);

  return (
    <div className="flex flex-col gap-8 pb-12">
      <AdminPageHeader
        title="Messages"
        description={`${messagesList.length} message${messagesList.length !== 1 ? "s" : ""} — ${unreadCount} non lu${unreadCount !== 1 ? "s" : ""}.`}
      />

      <div className="grid gap-4">
        {messagesList.map((message: Message) => (
          <Card key={message.id} className={!message.read ? "border-l-4 border-l-[#1E40AF]" : undefined}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold ${!message.read ? "text-slate-900" : "text-slate-600"}`}>
                    {message.name}
                  </h3>
                  {!message.read && <Badge>Nouveau</Badge>}
                  {message.archivedAt && <Badge variant="secondary">Archivé</Badge>}
                </div>
                <p className="text-sm font-medium text-slate-700">{message.subject}</p>
                <p className="text-xs text-slate-400">
                  {message.email} • {new Date(message.createdAt).toLocaleDateString("fr-SN")}
                </p>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/admin/messages/${message.id}`}>
                  <HugeiconsIcon icon={Mail01Icon} size={18} />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}

        {messagesList.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-200">
            <HugeiconsIcon icon={Mail01Icon} size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500">Aucun message</p>
          </div>
        )}
      </div>
    </div>
  );
}
