// app/api/audio/[language]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Audio from "@/lib/Audio";

export const runtime = "nodejs";

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ language: string }> }
) {
    try {
        const { language } = await context.params;
        const lang = language?.toLowerCase();

        if (!lang) {
            return NextResponse.json(
                { error: "Language is required" },
                { status: 400 }
            );
        }

        await connectDB();

        // 👇 search by `language` field
        const audioDoc = await Audio.findOne({ language: lang }).lean();

        if (!audioDoc) {
            return NextResponse.json(
                { error: "Audio not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ url: audioDoc.url });
    } catch (err: any) {
        console.error("Error fetching audio:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
