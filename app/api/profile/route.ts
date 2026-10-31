import { NextRequest, NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { profileSchema } from "@/lib/validations";
import { getPortfolio } from "@/lib/data";
import Profile from "@/models/Profile";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data.profile);
}

export async function PUT(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoUri()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const parsed = profileSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const updated = await Profile.findOneAndUpdate({}, parsed.data, {
    new: true,
    upsert: true,
  });
  return NextResponse.json(updated);
}
