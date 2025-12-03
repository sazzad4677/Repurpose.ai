import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import GeneratedContent from "@/models/GeneratedContent";

const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    headers: {
        "HTTP-Referer": "https://repurpose.ai",
        "X-Title": "Repurpose.ai",
    },
});

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();
        // Parse the JSON string we sent from the frontend
        let promptData;
        try {
            promptData = typeof prompt === 'string' ? JSON.parse(prompt) : prompt;
        } catch (e) {
            promptData = { transcript: prompt };
        }
        const { transcript, videoUrl, title, tone, length } = promptData;

        await dbConnect();
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return new Response("Unauthorized", { status: 401 });
        }

        // Sync User
        let user = await User.findOne({ clerkUserId });
        if (!user) {
            const { currentUser } = await import("@clerk/nextjs/server");
            const clerkUser = await currentUser();
            const email = clerkUser?.emailAddresses[0]?.emailAddress || "";
            user = await User.create({ clerkUserId, email });
        }

        if (user.credits <= 0) {
            return new Response("Insufficient credits", { status: 403 });
        }

        // Transcript is already provided by the frontend!
        if (!transcript) {
            return new Response("No transcript provided", { status: 400 });
        }

        console.log("Transcript length:", transcript.length);
        const truncatedTranscript = transcript.slice(0, 20000); // Limit context

        let systemInstruction = "You are an expert content creator. Turn the following YouTube transcript into a structured blog post with headings.";

        if (tone) {
            systemInstruction += ` Write in a ${tone} tone.`;
        }

        if (length) {
            if (length === 'short') systemInstruction += " Keep the blog post concise and short (under 500 words).";
            if (length === 'medium') systemInstruction += " Keep the blog post medium length (around 1000 words).";
            if (length === 'long') systemInstruction += " Make the blog post comprehensive and long (over 1500 words).";
        }

        const result = streamText({
            model: openrouter("openai/gpt-oss-20b:free"),
            messages: [
                {
                    role: "user",
                    content: `${systemInstruction}\n\n${truncatedTranscript}`,
                },
            ],
            onFinish: async ({ text }) => {
                console.log("Stream finished. Generated text length:", text.length);
                // Atomic decrement
                const updatedUser = await User.findOneAndUpdate(
                    { clerkUserId },
                    { $inc: { credits: -1 } },
                    { new: true },
                );

                if (updatedUser) {
                    await GeneratedContent.create({
                        userId: updatedUser._id,
                        originalUrl: videoUrl,
                        title: title || "Untitled Video",
                        generatedText: text,
                    });
                }
            },
        });

        return result.toTextStreamResponse();
    } catch (error: any) {
        console.error("Generation error:", error);
        return new Response(error.message || "Internal Server Error", {
            status: 500,
        });
    }
}
