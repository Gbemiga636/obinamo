import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "obinasom_admin_session";

function secret() {
  return (
    process.env.OBINASOM_ADMIN_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    "obinasom-dev-secret"
  );
}

function expectedUser() {
  return (process.env.OBINASOM_ADMIN_USER || "temi ibrahim").trim().toLowerCase();
}

function expectedPassword() {
  return process.env.OBINASOM_ADMIN_PASSWORD || "obinasom";
}

export function verifyAdminCredentials(username: string, password: string) {
  const uOk = username.trim().toLowerCase() === expectedUser();
  const pOk = password === expectedPassword();
  return uOk && pOk;
}

function sign(payload: string) {
  return createHmac("sha256", secret()).update(payload).digest("hex");
}

export function createAdminToken() {
  const exp = Date.now() + 1000 * 60 * 60 * 24 * 7; // 7 days
  const payload = `obinasom:${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function isValidAdminToken(token: string | undefined | null) {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = sign(payload);
  try {
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) return false;
  } catch {
    return false;
  }
  const exp = Number(payload.split(":")[1]);
  if (!Number.isFinite(exp) || Date.now() > exp) return false;
  return payload.startsWith("obinasom:");
}

export async function setAdminSessionCookie() {
  const jar = await cookies();
  jar.set(COOKIE, createAdminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSessionCookie() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAdminAuthenticated() {
  const jar = await cookies();
  return isValidAdminToken(jar.get(COOKIE)?.value);
}

export { COOKIE as ADMIN_COOKIE_NAME };
