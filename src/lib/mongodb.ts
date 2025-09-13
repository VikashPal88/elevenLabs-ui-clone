// lib/mongodb.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error("⚠️ Please add your MongoDB URI to .env");
}

let isConnected = false;

export async function connectDB() {
    if (isConnected) {
        console.log("🟢 MongoDB already connected");
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "ttsdb", // optional: force DB name
        });
        isConnected = true;
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
    }
}
