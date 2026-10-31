import { NextRequest, NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { experienceSchema } from "@/lib/validations";
import { getPortfolio } from "@/lib/data";
import Experience from "@/models/Experience";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data.experience);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoUri()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const parsed = experienceSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const created = await Experience.create(parsed.data);
  return NextResponse.json(created, { status: 201 });
}
