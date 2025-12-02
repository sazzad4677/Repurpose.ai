"use server";

import { Innertube } from "youtubei.js";

export async function getVideoData(videoUrl: string) {
    try {
        if (!videoUrl) {
            throw new Error("Video URL is required");
        }

        // Extract video ID
        let videoId = "";
        try {
            if (videoUrl.includes("v=")) {
                videoId = videoUrl.split("v=")[1].split("&")[0];
            } else if (videoUrl.includes("youtu.be/")) {
                videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
            } else {
                throw new Error("Invalid YouTube URL format");
            }
        } catch (e) {
            throw new Error("Could not extract video ID from URL");
        }

        const youtube = await Innertube.create();
        const info = await youtube.getInfo(videoId);
        const transcriptData = await info.getTranscript();

        console.log("Transcript Data Keys:", Object.keys(transcriptData || {}));
        if (transcriptData?.transcript) {
            console.log("Transcript Content Keys:", Object.keys(transcriptData.transcript));
            if (transcriptData.transcript.content) {
                console.log("Transcript Body Keys:", Object.keys(transcriptData.transcript.content.body || {}));
            }
        }

        if (
            !transcriptData ||
            !transcriptData.transcript ||
            !transcriptData.transcript.content ||
            !transcriptData.transcript.content.body ||
            !transcriptData.transcript.content.body.initial_segments
        ) {
            console.log("Structure mismatch. Full data:", JSON.stringify(transcriptData, null, 2));
            throw new Error("No transcript found for this video");
        }

        const segments = transcriptData.transcript.content.body.initial_segments;

        const transcriptText = segments
            .map((item: any) => {
                if (item.snippet && item.snippet.text) {
                    return item.snippet.text;
                }
                return "";
            })
            .filter((text: string) => text.length > 0)
            .join(" ");

        if (!transcriptText) {
            throw new Error("Transcript is empty");
        }

        return { transcript: transcriptText };
    } catch (error: any) {
        console.error("Error fetching transcript:", error);
        return { error: error.message || "Failed to fetch transcript" };
    }
}
