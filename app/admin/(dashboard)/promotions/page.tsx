import { getPromotions } from "@/lib/actions/promotions"
import { PromotionsClient } from "./promotions-client"

export default async function PromotionsPage() {
  const promotions = await getPromotions()
  return <PromotionsClient initial={promotions} />
}
