"use server";

import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { getVideoData } from "./getVideoData";

const openrouter = createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    headers: {
        "HTTP-Referer": "https://repurpose.ai", // Optional: for OpenRouter rankings
        "X-Title": "Repurpose.ai", // Optional: for OpenRouter rankings
    },
});

export async function generateContent(history: any[], videoUrl: string) {
    const stream = createStreamableValue("");

    (async () => {
        const { transcript, error } = await getVideoData(videoUrl);

        if (error || !transcript) {
            stream.update("Error: " + (error || "No transcript found"));
            stream.done();
            return;
        }

        try {
            const { textStream } = await streamText({
                model: openrouter("openai/gpt-oss-20b:free"),
                system:
                    "You are an expert content creator. Turn the following YouTube transcript into a structured blog post with headings.",
                prompt: transcript,
            });

            for await (const delta of textStream) {
                stream.update(delta);
            }
        } catch (aiError: any) {
            console.error("AI Generation Error:", aiError);
            stream.update("Error generating content: " + (aiError.message || "Unknown error"));
        }

        stream.done();
    })();

    return { output: stream.value };
}
