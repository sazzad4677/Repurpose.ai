"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getVideoData } from "@/actions/getVideoData";
import axios, { AxiosProgressEvent } from "axios";

export default function GeneratorForm() {
    const router = useRouter();
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<"idle" | "fetching" | "generating" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [generatedContent, setGeneratedContent] = useState("");

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url) return;

        setStatus("fetching");
        setErrorMessage("");
        setGeneratedContent("");

        try {
            // Step 1: Fetch Transcript
            console.log("Step 1: Fetching transcript for", url);
            const data = await getVideoData(url);

            if (data.error || !data.transcript) {
                throw new Error(data.error || "Failed to fetch transcript");
            }

            console.log("Transcript fetched, length:", data.transcript.length);
            setStatus("generating");

            await axios.post("/api/generate", {
                prompt: JSON.stringify({ transcript: data.transcript, videoUrl: url }),
            }, {
                onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                    const xhr = progressEvent.event?.target as XMLHttpRequest;
                    if (xhr) {
                        setGeneratedContent(xhr.responseText);
                    }
                }
            });

            setStatus("success");
            router.refresh();

        } catch (error: any) {
            console.error("Error in form submit:", error);
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong");
        }
    };

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Generate Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFormSubmit} className="flex gap-4">
                        <Input
                            placeholder="Enter YouTube URL..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={status === "fetching" || status === "generating"}
                            required
                        />
                        <Button type="submit" disabled={status === "fetching" || status === "generating"}>
                            {status === "fetching" ? "Fetching Transcript..." :
                                status === "generating" ? "Generating..." : "Generate"}
                        </Button>
                    </form>

                    {status === "fetching" && (
                        <p className="text-sm text-blue-500 mt-2">
                            Found video. Extracting transcript... (This might take 10-20 seconds)
                        </p>
                    )}

                    {errorMessage && (
                        <p className="text-sm text-red-500 mt-2">
                            Error: {errorMessage}
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Debug Info */}
            <div className="text-xs text-gray-500">
                Status: {status}, Length: {generatedContent.length}
            </div>

            {(generatedContent || status === "generating" || status === "success") && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none whitespace-pre-wrap min-h-[100px] p-4 border rounded-md bg-slate-50 dark:bg-slate-900">
                            {generatedContent}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
