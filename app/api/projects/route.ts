import { NextRequest, NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import { projectSchema } from "@/lib/validations";
import { slugify } from "@/lib/utils";
import { getPortfolio } from "@/lib/data";
import Project from "@/models/Project";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data.projects);
}

export async function POST(req: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;
  if (!hasMongoUri()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const body = await req.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectDB();
  const payload = {
    ...parsed.data,
    slug: parsed.data.slug || slugify(parsed.data.title),
  };
  const created = await Project.create(payload);
  return NextResponse.json(created, { status: 201 });
}
