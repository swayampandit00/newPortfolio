import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { connectDB, hasMongoUri } from "@/lib/mongodb";
import Message from "@/models/Message";
import { memoryInbox } from "@/lib/inbox";

export const dynamic = "force-dynamic";

export default async function AdminMessagesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin");

  let messages: Array<{
    _id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: string | Date;
  }> = [];

  if (hasMongoUri()) {
    await connectDB();
    messages = (await Message.find().sort({ createdAt: -1 }).lean()) as unknown as typeof messages;
  } else {
    messages = memoryInbox;
  }

  return (
    <div>
      <h1 className="display text-4xl">Messages</h1>
      <p className="mt-3 mb-8 text-sm text-muted">
        {hasMongoUri() ? "Stored in MongoDB." : "Stored in memory until MongoDB is connected."}
      </p>
      <div className="space-y-4">
        {messages.length === 0 && <p className="text-sm text-muted">No transmissions yet.</p>}
        {messages.map((item, index) => (
          <article key={item._id || index} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap justify-between gap-3">
              <div>
                <h2>{item.subject}</h2>
                <p className="text-sm text-muted">{item.name} · {item.email}</p>
              </div>
              <p className="text-xs text-muted">
                {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
              </p>
            </div>
            <p className="mt-4 text-sm leading-7">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
