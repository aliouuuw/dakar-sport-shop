import { NextRequest, NextResponse } from "next/server";
import { createQuote } from "@/lib/actions/quotes";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(`quotes:${ip}`, { limit: 3, windowMs: 60 * 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer dans une heure." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": "3",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(limit.resetAt),
        },
      }
    );
  }

  const body = await request.json();
  const result = await createQuote(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result.data, {
    headers: {
      "X-RateLimit-Limit": "3",
      "X-RateLimit-Remaining": String(limit.remaining),
      "X-RateLimit-Reset": String(limit.resetAt),
    },
  });
}
