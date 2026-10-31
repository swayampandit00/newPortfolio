import { NextRequest, NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { serviceSchema } from "@/lib/validations";
import { getPortfolio } from "@/lib/data";
import Service from "@/models/Service";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data.services);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoUri()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const parsed = serviceSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const created = await Service.create(parsed.data);
  return NextResponse.json(created, { status: 201 });
}
