'use client';

import React from "react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { Input } from "@/components/ui/input";
import { Brain, FileText, Sparkles } from "lucide-react";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6">
                <FadeIn className="text-center mb-20">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">How It Works</h2>
                    <p className="text-lg text-muted-foreground">From video to viral post in three simple steps.</p>
                </FadeIn>

                <div className="space-y-16 md:space-y-24 max-w-5xl mx-auto">
                    {/* Step 1: Input */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold shadow-lg shadow-primary/20 mx-auto md:mx-0">1</div>
                            <h3 className="text-2xl md:text-3xl font-bold">Paste Your Video URL</h3>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                Simply copy the link of any YouTube video or Short you want to repurpose. We handle the rest, extracting the transcript and context instantly.
                            </p>
                        </div>
                        <div className="flex-1 relative w-full">
                            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full opacity-50"></div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-2xl border bg-background p-2 shadow-2xl rotate-1 hover:rotate-0 transition-transform"
                            >
                                <div className="rounded-xl overflow-hidden border bg-muted/50 aspect-video flex items-center justify-center relative">
                                    <div className="w-full max-w-xs relative">
                                        <TypingInput />
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Step 2: Processing */}
                    <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div className="h-12 w-12 rounded-full bg-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-purple-600/20 mx-auto md:mx-0">2</div>
                            <h3 className="text-2xl md:text-3xl font-bold">AI Magic Happens</h3>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                Our advanced AI analyzes the content, identifies key takeaways, and rewrites it into a perfectly structured blog post or article.
                            </p>
                        </div>
                        <div className="flex-1 relative w-full">
                            <div className="absolute inset-0 bg-purple-600/20 blur-3xl rounded-full opacity-50"></div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-2xl border bg-background p-2 shadow-2xl -rotate-1 hover:rotate-0 transition-transform"
                            >
                                <div className="rounded-xl overflow-hidden border bg-muted/50 aspect-video flex items-center justify-center bg-background relative">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.1, 1],
                                            filter: ["drop-shadow(0 0 0px rgba(147, 51, 234, 0))", "drop-shadow(0 0 20px rgba(147, 51, 234, 0.5))", "drop-shadow(0 0 0px rgba(147, 51, 234, 0))"]
                                        }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                    >
                                        <Brain className="h-12 w-12 md:h-16 md:w-16 text-purple-600" />
                                    </motion.div>
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                    >
                                        <div className="w-24 h-24 md:w-32 md:h-32 border-2 border-dashed border-purple-200 rounded-full"></div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Step 3: Result */}
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="flex-1 space-y-6 text-center md:text-left">
                            <div className="h-12 w-12 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-green-600/20 mx-auto md:mx-0">3</div>
                            <h3 className="text-2xl md:text-3xl font-bold">Publish & Grow</h3>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                Copy your new content, tweak it if you like, and publish it to your blog, newsletter, or social media. Watch your reach multiply.
                            </p>
                        </div>
                        <div className="flex-1 relative w-full">
                            <div className="absolute inset-0 bg-green-600/20 blur-3xl rounded-full opacity-50"></div>
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="relative rounded-2xl border bg-background p-2 shadow-2xl rotate-1 hover:rotate-0 transition-transform"
                            >
                                <div className="rounded-xl overflow-hidden border bg-muted/50 aspect-video flex items-center justify-center bg-background p-4 md:p-6">
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        whileInView={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                        className="w-full bg-background border shadow-sm rounded-lg p-4 space-y-3"
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-8 w-8 rounded bg-green-100 flex items-center justify-center text-green-600">
                                                <FileText className="h-4 w-4" />
                                            </div>
                                            <div className="h-3 w-32 bg-muted rounded"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-2 w-full bg-muted/50 rounded"></div>
                                            <div className="h-2 w-full bg-muted/50 rounded"></div>
                                            <div className="h-2 w-3/4 bg-muted/50 rounded"></div>
                                        </div>
                                        <div className="pt-2 flex justify-end">
                                            <div className="h-6 w-16 bg-primary/10 rounded text-xs flex items-center justify-center text-primary font-medium">
                                                Copy
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function TypingInput() {
    const [text, setText] = React.useState("");
    const fullText = "https://youtube.com/watch?v=dQw4w9WgXcQ";

    React.useEffect(() => {
        let timeout: NodeJS.Timeout;

        const animate = (index: number) => {
            if (index <= fullText.length) {
                setText(fullText.slice(0, index));
                timeout = setTimeout(() => animate(index + 1), 50);
            } else {
                timeout = setTimeout(() => {
                    setText("");
                    animate(0);
                }, 2000);
            }
        };

        animate(0);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="relative">
            <Input
                value={text}
                readOnly
                className="bg-background shadow-sm pr-10 font-mono text-xs md:text-sm"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-0.5 h-5 bg-primary animate-pulse"></div>
            </div>
        </div>
    );
}
