"use server";

import { YoutubeTranscript } from "youtube-transcript";
import { Innertube } from "youtubei.js";

export async function getVideoData(videoUrl: string) {
    console.log("Fetching data for URL:", videoUrl);

    try {
        if (!videoUrl) {
            throw new Error("Video URL is required");
        }

        // 1. Robust Video ID Extraction
        let videoId = "";
        try {
            // Handle standard URLs, Shorts, and mobile URLs
            const urlObj = new URL(videoUrl);
            if (urlObj.hostname.includes("youtube.com")) {
                if (urlObj.pathname.startsWith("/shorts/")) {
                    videoId = urlObj.pathname.split("/shorts/")[1];
                } else {
                    videoId = urlObj.searchParams.get("v") || "";
                }
            } else if (urlObj.hostname.includes("youtu.be")) {
                videoId = urlObj.pathname.slice(1);
            }
        } catch (e) {
            console.log("URL parsing failed, trying regex/split fallback");
        }

        // Fallback regex/split if URL object fails
        if (!videoId) {
            if (videoUrl.includes("v=")) {
                videoId = videoUrl.split("v=")[1].split("&")[0];
            } else if (videoUrl.includes("youtu.be/")) {
                videoId = videoUrl.split("youtu.be/")[1].split("?")[0];
            }
        }

        if (!videoId) {
            throw new Error("Invalid YouTube URL. Could not extract Video ID.");
        }

        console.log("Extracted Video ID:", videoId);

        // 2. Try youtube-transcript (Primary Method)
        try {
            console.log("Attempting youtube-transcript...");
            const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
            const transcriptText = transcriptItems
                .map((item) => item.text)
                .join(" ");

            if (transcriptText) {
                console.log("Success with youtube-transcript");
                return { transcript: transcriptText };
            }
        } catch (ytError: any) {
            console.warn("youtube-transcript failed:", ytError.message);
        }

        // 3. Try youtubei.js (Fallback Method)
        try {
            console.log("Attempting youtubei.js fallback...");
            const youtube = await Innertube.create();
            const info = await youtube.getInfo(videoId);
            const transcriptData = await info.getTranscript();

            if (
                transcriptData?.transcript?.content?.body?.initial_segments
            ) {
                const segments =
                    transcriptData.transcript.content.body.initial_segments;
                const transcriptText = segments
                    .map((item: any) => item.snippet?.text || "")
                    .filter((text: string) => text.length > 0)
                    .join(" ");

                if (transcriptText) {
                    console.log("Success with youtubei.js");
                    return { transcript: transcriptText };
                }
            }
        } catch (innertubeError: any) {
            console.error("youtubei.js fallback failed:", innertubeError.message);
        }

        throw new Error(
            "Could not fetch transcript. The video might not have captions enabled.",
        );
    } catch (error: any) {
        console.error("getVideoData Error:", error);
        return { error: error.message || "Failed to fetch transcript" };
    }
}
