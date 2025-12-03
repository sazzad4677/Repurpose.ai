"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { getVideoData } from "@/actions/getVideoData";
import axios, { AxiosProgressEvent } from "axios";
import { mutate } from "swr";

import ReactMarkdown from 'react-markdown';
import CopyButton from '@/components/CopyButton';
import { Search, Sparkles, Loader2, SlidersHorizontal, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function GeneratorForm() {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState<"idle" | "fetching" | "generating" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [generatedContent, setGeneratedContent] = useState("");

    // Settings State
    const [tone, setTone] = useState("professional");
    const [length, setLength] = useState("medium");

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
                prompt: JSON.stringify({
                    transcript: data.transcript,
                    videoUrl: url,
                    title: data.title,
                    tone,
                    length
                }),
            }, {
                onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                    const xhr = progressEvent.event?.target as XMLHttpRequest;
                    if (xhr) {
                        setGeneratedContent(xhr.responseText);
                    }
                }
            });
            setStatus("success");
            await mutate("/api/credits");

        } catch (error: any) {
            console.error("Error in form submit:", error);
            setStatus("error");
            setErrorMessage(error.message || "Something went wrong");
        }
    };

    return (
        <div className="space-y-8">
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white rounded-xl border border-gray-100 shadow-sm p-2">
                    <form onSubmit={handleFormSubmit} className="flex flex-col md:flex-row gap-2">
                        <div className="relative flex-1">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                <Search className="h-5 w-5" />
                            </div>
                            <Input
                                placeholder="Paste YouTube URL to generate viral content..."
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                disabled={status === "fetching" || status === "generating"}
                                required
                                className="h-14 pl-12 pr-4 text-lg border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                            />
                        </div>

                        <div className="flex items-center gap-2 px-2 pb-2 md:pb-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-12 w-12 shrink-0 border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50">
                                        <SlidersHorizontal className="h-5 w-5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>Tone</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={tone} onValueChange={setTone}>
                                        <DropdownMenuRadioItem value="professional">Professional</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="casual">Casual</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="funny">Funny</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuLabel>Length</DropdownMenuLabel>
                                    <DropdownMenuRadioGroup value={length} onValueChange={setLength}>
                                        <DropdownMenuRadioItem value="short">Short</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                                        <DropdownMenuRadioItem value="long">Long</DropdownMenuRadioItem>
                                    </DropdownMenuRadioGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            <Button
                                type="submit"
                                disabled={status === "fetching" || status === "generating"}
                                className="h-12 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                {status === "fetching" || status === "generating" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Generating...
                                    </>
                                ) : (
                                    <>
                                        Generate <Sparkles className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>

            {status === "fetching" && (
                <div className="flex items-center justify-center gap-2 text-sm text-purple-600 animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Extracting transcript from YouTube...</span>
                </div>
            )}

            {errorMessage && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    {errorMessage}
                </div>
            )}

            {(generatedContent || status === "generating" || status === "success") && (
                <Card className="border-gray-200 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
                        <h3 className="font-semibold text-gray-900">Generated Content</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground px-2 py-1 rounded-full bg-white border border-gray-200">
                                {tone.charAt(0).toUpperCase() + tone.slice(1)} • {length.charAt(0).toUpperCase() + length.slice(1)}
                            </span>
                            <CopyButton text={generatedContent} />
                        </div>
                    </div>
                    <CardContent className="p-0">
                        <div className="prose prose-zinc dark:prose-invert max-w-none p-6 bg-white">
                            <ReactMarkdown
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-2 mb-4 text-gray-900" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-900" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-xl font-semibold mt-4 mb-3 text-gray-900" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />,
                                    li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-4 leading-relaxed text-gray-700" {...props} />,
                                    blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-purple-200 pl-4 italic text-gray-600 my-4" {...props} />,
                                }}
                            >
                                {generatedContent}
                            </ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
