import { NextRequest, NextResponse } from "next/server";
import { createMessage } from "@/lib/actions/messages";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60 * 60 * 1000 });

  if (!limit.success) {
    return NextResponse.json(
      { error: "Trop de requêtes. Veuillez réessayer plus tard." },
      {
        status: 429,
        headers: {
          "X-RateLimit-Limit": "5",
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": String(limit.resetAt),
        },
      }
    );
  }

  const body = await request.json();
  const result = await createMessage(body);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json(result.data, {
    headers: {
      "X-RateLimit-Limit": "5",
      "X-RateLimit-Remaining": String(limit.remaining),
      "X-RateLimit-Reset": String(limit.resetAt),
    },
  });
}
