import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "amsilab_admin";
export const ADMIN_SESSION_MAX_AGE = 60 * 60 * 12;

function getSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ?? process.env.ADMIN_PASSWORD ?? ""
  );
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD && getSecret());
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeCompare(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  if (bufferA.length !== bufferB.length) {
    return false;
  }

  return timingSafeEqual(bufferA, bufferB);
}

export function verifyPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;

  if (!expected) {
    return false;
  }

  return safeCompare(candidate, expected);
}

export function createSessionToken(now: number = Date.now()): string {
  const expiresAt = now + ADMIN_SESSION_MAX_AGE * 1000;

  return `${expiresAt}.${sign(String(expiresAt))}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token || !isAdminConfigured()) {
    return false;
  }

  const [expiresAtRaw, signature] = token.split(".");

  if (!expiresAtRaw || !signature) {
    return false;
  }

  const expiresAt = Number(expiresAtRaw);

  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    return false;
  }

  return safeCompare(signature, sign(expiresAtRaw));
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const store = await cookies();

  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}
