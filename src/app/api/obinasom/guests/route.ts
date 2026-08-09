import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  createServiceClient,
  OBINASOM_GUESTS_TABLE,
  type ObinasomGuest,
} from "@/lib/supabase/obinasom";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(OBINASOM_GUESTS_TABLE)
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guests: (data ?? []) as ObinasomGuest[] });
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as {
    first_name?: string;
    surname?: string;
    phone?: string;
    email?: string;
  } | null;

  const first_name = body?.first_name?.trim() ?? "";
  const surname = body?.surname?.trim() ?? "";
  const phone = body?.phone?.trim() ?? "";
  const email = body?.email?.trim().toLowerCase() ?? "";

  if (!first_name || !surname || !phone || !email) {
    return NextResponse.json(
      { error: "Please fill in all fields." },
      { status: 400 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
  }

  const supabase = createServiceClient();

  const { data: last } = await supabase
    .from(OBINASOM_GUESTS_TABLE)
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const sort_order = (last?.sort_order ?? 0) + 1;

  const { data, error } = await supabase
    .from(OBINASOM_GUESTS_TABLE)
    .insert({ first_name, surname, phone, email, sort_order })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guest: data as ObinasomGuest });
}
