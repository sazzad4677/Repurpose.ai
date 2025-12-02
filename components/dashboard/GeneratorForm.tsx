"use client";

import { useState } from "react";
import { readStreamableValue } from "ai/rsc";
import { generateContent } from "@/actions/generateContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GeneratorForm() {
    const [url, setUrl] = useState("");
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        setContent("");

        try {
            const { output } = await generateContent([], url);

            for await (const delta of readStreamableValue(output)) {
                setContent((current) => current + delta);
            }
        } catch (error) {
            console.error("Error generating content:", error);
            setContent("Error generating content. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Generate Blog Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex gap-4">
                        <Input
                            placeholder="Enter YouTube URL..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Generating..." : "Generate"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {content && (
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose max-w-none whitespace-pre-wrap">
                            {content}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
