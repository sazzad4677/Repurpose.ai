import mongoose, { Schema, model, models } from "mongoose";

const GeneratedContentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        originalUrl: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        generatedText: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const GeneratedContent =
    models.GeneratedContent || model("GeneratedContent", GeneratedContentSchema);

export default GeneratedContent;
