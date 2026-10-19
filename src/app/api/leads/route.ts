import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { leadSchema } from "@/schemas/lead";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function hashValue(value: string): string {
  const salt = process.env.LEAD_HASH_SALT ?? "amsilab";
  return createHash("sha256").update(`${salt}:${value}`).digest("hex");
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "desconocida";
  return hashValue(ip);
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  const db = getDb();

  if (!db) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "El servicio de solicitudes aún no está configurado. Escríbenos por otro medio mientras lo habilitamos.",
      },
      { status: 503 },
    );
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "No pudimos leer la solicitud enviada." },
      { status: 400 },
    );
  }

  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Revisa los campos marcados e inténtalo de nuevo.",
        issues: parsed.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      },
      { status: 422 },
    );
  }

  const data = parsed.data;

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const clientKey = getClientKey(request);

  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Recibimos varias solicitudes tuyas. Inténtalo en unos minutos.",
      },
      { status: 429 },
    );
  }

  const userAgent = request.headers.get("user-agent")?.slice(0, 300) ?? null;

  try {
    await db`
      insert into public.leads (
        name,
        email,
        phone,
        company,
        role,
        interest,
        course_slug,
        message,
        source,
        user_agent,
        ip_hash
      )
      values (
        ${data.name},
        ${data.email.toLowerCase()},
        ${data.phone || null},
        ${data.company || null},
        ${data.role || null},
        ${data.interest},
        ${data.courseSlug || null},
        ${data.message},
        ${"web"},
        ${userAgent},
        ${clientKey}
      )
    `;

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("No se pudo registrar la solicitud", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          "No pudimos registrar tu solicitud. Inténtalo nuevamente en un momento.",
      },
      { status: 500 },
    );
  }
}
