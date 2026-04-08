import { getMedia } from "@/lib/actions/media"
import { MediaClient } from "./media-client"

export const dynamic = "force-dynamic"

export default async function MediaPage() {
  const files = await getMedia({ limit: 100 })
  return <MediaClient initial={files} />
}
