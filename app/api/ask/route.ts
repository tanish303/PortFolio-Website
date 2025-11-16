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
You are Tanish's personal AI assistant.
You must answer ONLY using the information provided in the DATA section.
If the user asks anything not included in the DATA, reply: "I don't have that information yet."

USER QUESTION:
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
