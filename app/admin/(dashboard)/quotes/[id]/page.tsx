import { notFound } from "next/navigation"
import { getQuoteById } from "@/lib/actions/quotes"
import { QuoteDetailClient } from "./quote-detail-client"

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const quote = await getQuoteById(parseInt(id, 10))

  if (!quote) notFound()

  return <QuoteDetailClient quote={quote} />
}
