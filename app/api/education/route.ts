import { NextRequest, NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { educationSchema } from "@/lib/validations";
import { getPortfolio } from "@/lib/data";
import Education from "@/models/Education";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data.education);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoUri()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }
  const parsed = educationSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  await connectDB();
  const created = await Education.create(parsed.data);
  return NextResponse.json(created, { status: 201 });
}
