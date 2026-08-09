import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  createServiceClient,
  OBINASOM_GUESTS_TABLE,
  type ObinasomGuest,
} from "@/lib/supabase/obinasom";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Partial<{
    first_name: string;
    surname: string;
    phone: string;
    email: string;
    sort_order: number;
  }> | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (typeof body.first_name === "string") patch.first_name = body.first_name.trim();
  if (typeof body.surname === "string") patch.surname = body.surname.trim();
  if (typeof body.phone === "string") patch.phone = body.phone.trim();
  if (typeof body.email === "string") {
    patch.email = body.email.trim().toLowerCase();
  }
  if (typeof body.sort_order === "number") patch.sort_order = body.sort_order;

  const supabase = createServiceClient();
  const { data, error } = await supabase
    .from(OBINASOM_GUESTS_TABLE)
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ guest: data as ObinasomGuest });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  const supabase = createServiceClient();
  const { error } = await supabase.from(OBINASOM_GUESTS_TABLE).delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
