import { PrismaClient } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

export async function GET() {
  const entries = await prisma.guestbookEntry.findMany({
    orderBy: { createdAt: "desc" },
  });
  return new Response(JSON.stringify(entries), { status: 200 });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, message } = body;

  if (!name || name.length < 3 || !message || message.length < 10) {
    return new Response(JSON.stringify({ error: "Invalid input" }), { status: 400 });
  }

  const entry = await prisma.guestbookEntry.create({
    data: { name, message },
  });

  return new Response(JSON.stringify(entry), { status: 201 });
}
