import { notFound } from "next/navigation";
import Link from "next/link";
import { getMessageById } from "@/lib/actions/messages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AdminPageHeader } from "@/app/admin/components/admin-page-header";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  Mail01Icon,
  MailOpen01Icon,
  UserIcon,
  MailIcon,
  CallIcon,
  Calendar03Icon,
  Archive01Icon,
  CheckmarkCircle01Icon,
  Delete01Icon,
} from "@hugeicons/core-free-icons";
import {
  markAsRead,
  archiveMessage,
  unarchiveMessage,
  deleteMessage,
} from "@/lib/actions/messages";
import { revalidatePath } from "next/cache";

interface MessageDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function MessageDetailPage({
  params,
}: MessageDetailPageProps) {
  const { id } = await params;
  const message = await getMessageById(parseInt(id, 10));

  if (!message) notFound();

  // Auto-mark as read when viewing
  if (!message.read) {
    await markAsRead(message.id);
    revalidatePath("/admin/messages");
  }

  async function handleArchive() {
    "use server";
    await archiveMessage(message.id);
    revalidatePath("/admin/messages");
    revalidatePath(`/admin/messages/${message.id}`);
  }

  async function handleUnarchive() {
    "use server";
    await unarchiveMessage(message.id);
    revalidatePath("/admin/messages");
    revalidatePath(`/admin/messages/${message.id}`);
  }

  async function handleDelete() {
    "use server";
    await deleteMessage(message.id);
    revalidatePath("/admin/messages");
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Back Link */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" className="gap-2" asChild>
          <Link href="/admin/messages">
            <HugeiconsIcon icon={ArrowLeft01Icon} size={18} />
            Retour aux messages
          </Link>
        </Button>
      </div>

      <AdminPageHeader
        title={message.subject}
        description={`Message de ${message.name}`}
        action={
          <div className="flex items-center gap-2">
            {message.archivedAt ? (
              <form action={handleUnarchive}>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="gap-2 h-12 rounded-xl"
                >
                  <HugeiconsIcon icon={CheckmarkCircle01Icon} size={20} />
                  Désarchiver
                </Button>
              </form>
            ) : (
              <form action={handleArchive}>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="gap-2 h-12 rounded-xl"
                >
                  <HugeiconsIcon icon={Archive01Icon} size={20} />
                  Archiver
                </Button>
              </form>
            )}
            <form action={handleDelete}>
              <Button
                type="submit"
                variant="destructive"
                size="lg"
                className="gap-2 h-12 rounded-xl"
              >
                <HugeiconsIcon icon={Delete01Icon} size={20} />
                Supprimer
              </Button>
            </form>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Message Body */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`h-14 w-14 rounded-full flex items-center justify-center ${
                  message.read
                    ? "bg-slate-200 text-slate-600"
                    : "bg-[#1E40AF] text-white"
                }`}
              >
                <span className="font-bold text-xl">
                  {message.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="font-bold text-lg text-slate-900">
                  {message.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <span>{message.email}</span>
                  {!message.read && (
                    <Badge className="bg-[#DC2626] text-white">Non lu</Badge>
                  )}
                  {message.archivedAt && <Badge variant="secondary">Archivé</Badge>}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <HugeiconsIcon icon={Calendar03Icon} size={16} />
              <span>
                Reçu le{" "}
                {new Date(message.createdAt).toLocaleDateString("fr-SN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">
                {message.body}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <h3 className="font-bold text-slate-900">Informations</h3>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={UserIcon} size={18} className="text-slate-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Nom
                  </p>
                  <p className="font-medium text-slate-900">{message.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <HugeiconsIcon icon={MailIcon} size={18} className="text-slate-500" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Email
                  </p>
                  <a
                    href={`mailto:${message.email}`}
                    className="font-medium text-[#1E40AF] hover:underline truncate block"
                  >
                    {message.email}
                  </a>
                </div>
              </div>

              {message.phone && (
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={CallIcon} size={18} className="text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">
                      Téléphone
                    </p>
                    <a
                      href={`tel:${message.phone.replace(/\s/g, "")}`}
                      className="font-medium text-[#1E40AF] hover:underline"
                    >
                      {message.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                  <HugeiconsIcon
                    icon={message.read ? MailOpen01Icon : Mail01Icon}
                    size={18}
                    className="text-slate-500"
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Statut
                  </p>
                  <p className="font-medium text-slate-900">
                    {message.read ? "Lu" : "Non lu"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-0 shadow-md bg-gradient-to-br from-[#1E40AF] to-[#1e3a8a] text-white">
            <CardContent className="p-5">
              <h3 className="font-bold mb-3">Répondre</h3>
              <p className="text-sm text-blue-100 mb-4">
                Cliquez ci-dessous pour répondre par email.
              </p>
              <Button
                className="w-full bg-white text-[#1E40AF] hover:bg-blue-50 font-semibold"
                asChild
              >
                <a
                  href={`mailto:${message.email}?subject=Re: ${encodeURIComponent(
                    message.subject
                  )}`}
                >
                  <HugeiconsIcon icon={MailIcon} size={18} className="mr-2" />
                  Ouvrir l&apos;email
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
