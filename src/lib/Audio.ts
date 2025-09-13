import mongoose, { Schema } from "mongoose";

const AudioSchema = new Schema(
    {
        language: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            enum: ["en", "ar"], // extend as needed
        },
        url: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

AudioSchema.index({ language: 1 }, { unique: true });

export default mongoose.models.Audio || mongoose.model("Audio", AudioSchema);
