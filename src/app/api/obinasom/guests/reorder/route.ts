import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  createServiceClient,
  OBINASOM_GUESTS_TABLE,
} from "@/lib/supabase/obinasom";

/** Reorder guests — body: { orderedIds: string[] } */
export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => null)) as {
    orderedIds?: string[];
  } | null;

  const orderedIds = body?.orderedIds;
  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    return NextResponse.json({ error: "orderedIds required" }, { status: 400 });
  }

  const supabase = createServiceClient();
  const now = new Date().toISOString();

  const results = await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from(OBINASOM_GUESTS_TABLE)
        .update({ sort_order: index + 1, updated_at: now })
        .eq("id", id),
    ),
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
