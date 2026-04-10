import { getMessages, getUnreadCount } from "@/lib/actions/messages";
import { MessagesClient } from "./messages-client";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const [messagesList, unreadCount] = await Promise.all([
    getMessages({ limit: 50 }),
    getUnreadCount(),
  ]);

  return <MessagesClient messages={messagesList} unreadCount={unreadCount} />;
}
