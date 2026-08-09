import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import {
  createServiceClient,
  OBINASOM_GUESTS_TABLE,
  type ObinasomGuest,
} from "@/lib/supabase/obinasom";

function csvEscape(value: string) {
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

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

  const guests = (data ?? []) as ObinasomGuest[];
  const header = [
    "sort_order",
    "first_name",
    "surname",
    "phone",
    "email",
    "created_at",
  ];
  const lines = [
    header.join(","),
    ...guests.map((g) =>
      [
        String(g.sort_order),
        csvEscape(g.first_name),
        csvEscape(g.surname),
        csvEscape(g.phone),
        csvEscape(g.email),
        csvEscape(g.created_at),
      ].join(","),
    ),
  ];

  const csv = lines.join("\n");
  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="obinasom-guests.csv"`,
    },
  });
}
