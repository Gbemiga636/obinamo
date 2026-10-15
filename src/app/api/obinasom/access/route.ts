import { NextResponse } from "next/server";

const normalize = (value: string) => value.trim().toUpperCase();

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    password?: string;
  } | null;

  const expected = normalize(process.env.OBINASOM_SITE_PASSWORD ?? "IYKYK22");
  const given = normalize(body?.password ?? "");

  // Slow down guessing a little
  await new Promise((resolve) => setTimeout(resolve, 650));

  if (!given || given !== expected) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
