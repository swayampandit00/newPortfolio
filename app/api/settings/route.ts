import { NextRequest, NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { settingsSchema } from "@/lib/validations";
import { getPortfolio } from "@/lib/data";
import Settings from "@/models/Settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data.settings);
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoUri()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const parsed = settingsSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const updated = await Settings.findOneAndUpdate({}, parsed.data, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(updated);
}
