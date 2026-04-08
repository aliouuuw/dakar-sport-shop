import { getQuotes } from "@/lib/actions/quotes"
import { QuotesClient } from "./quotes-client"

export default async function QuotesPage() {
  const quotes = await getQuotes()
  return <QuotesClient initial={quotes} />
}
