import { NextResponse } from "next/server";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { requireAdmin } from "@/lib/require-admin";
import Message from "@/models/Message";
import { memoryInbox } from "@/lib/inbox";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await requireAdmin();
  if (error) return error;

  if (!hasMongoUri()) {
    return NextResponse.json(memoryInbox);
  }

  await connectDB();
  const messages = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(JSON.parse(JSON.stringify(messages)));
}
