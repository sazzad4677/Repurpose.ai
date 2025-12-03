'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroInput() {
    const [url, setUrl] = useState("");
    const router = useRouter();

    const handleGenerate = () => {
        if (url.trim()) {
            router.push(`/dashboard?url=${encodeURIComponent(url)}`);
        } else {
            router.push('/dashboard');
        }
    };

    return (
        <div className="w-full max-w-lg mt-8 p-2 bg-background/50 backdrop-blur-sm border rounded-full shadow-[0_0_40px_-10px_rgba(168,85,247,0.4)] flex gap-2">
            <Input
                placeholder="Paste YouTube URL..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-12 text-base pl-6"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            />
            <Button
                size="lg"
                className="rounded-full h-12 px-8 shadow-lg shadow-primary/20 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white cursor-pointer"
                onClick={handleGenerate}
            >
                Generate Content
            </Button>
        </div>
    );
}
