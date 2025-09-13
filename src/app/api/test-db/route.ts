// app/api/seed/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Audio from "@/lib/Audio";

export async function GET() {
    try {
        await connectDB();

        // Insert a sample document
        await Audio.create({
            language: "en",
            url: "https://example.com/english.mp3",
        });

        return NextResponse.json({ message: "✅ Sample audio inserted" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
