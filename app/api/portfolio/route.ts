import { NextResponse } from "next/server";
import { getPortfolio } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function GET() {
  const data = await getPortfolio();
  return NextResponse.json(data);
}
