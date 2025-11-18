import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import tanishData from "@/data/tanish.json";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "No message provided." });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

    const model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });

    const prompt = `
You are Tanish’s personal AI assistant for his portfolio.

Respond in a natural, friendly tone.
Use ONLY the information in the DATA section, but always rewrite it in smooth human language (never copy the text).

Answer ONLY the parts relevant to the user’s question.
Keep responses short and focused unless the user asks for “details” or “explain more.”

If the user greets you, greet back.
If they ask who you are, explain your role.
If the question is outside the data, reply: “I can only talk about Tanish.”

Never invent or guess anything outside the DATA.

Here is the user message:"

"${message}"

DATA:
${JSON.stringify(tanishData, null, 2)}
`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({
      reply: text || "I couldn't generate a response.",
    });

  } catch (err: any) {
    console.error("GEMINI ERROR:", err);
    return NextResponse.json({
      reply: "Sorry, something went wrong.",
    });
  }
}
