import { getAnnouncements } from "@/lib/actions/announcements"
import { AnnouncementsClient } from "./announcements-client"

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements()
  return <AnnouncementsClient initial={announcements} />
}