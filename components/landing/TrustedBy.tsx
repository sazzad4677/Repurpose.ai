import { Youtube, Linkedin, Twitter, FileText } from "lucide-react";

export default function TrustedBy() {
    return (
        <div className="w-full py-12 border-y bg-muted/20 overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center mb-8">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                    Trusted by 10,000+ Creators from
                </p>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="animate-marquee whitespace-nowrap flex items-center gap-8 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 px-12">
                    {/* First Set */}
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Youtube className="h-8 w-8" />
                        <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Linkedin className="h-8 w-8" />
                        <span>LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <FileText className="h-8 w-8" />
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Twitter className="h-8 w-8" />
                        <span>Twitter</span>
                    </div>

                    {/* Duplicate Set for Loop */}
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Youtube className="h-8 w-8" />
                        <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Linkedin className="h-8 w-8" />
                        <span>LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <FileText className="h-8 w-8" />
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Twitter className="h-8 w-8" />
                        <span>Twitter</span>
                    </div>

                    {/* Triplicate Set for Loop (Safety for wide screens) */}
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Youtube className="h-8 w-8" />
                        <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Linkedin className="h-8 w-8" />
                        <span>LinkedIn</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <FileText className="h-8 w-8" />
                        <span>Medium</span>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-xl">
                        <Twitter className="h-8 w-8" />
                        <span>Twitter</span>
                    </div>
                </div>

                <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-8 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 px-12 ml-[100%]">
                    {/* Mirror Set for seamless loop if needed, but the single long strip usually works with translate. 
                         Actually, standard marquee implementation often uses two identical containers sliding. 
                         Let's stick to a simple CSS animation on a single container if it's long enough, 
                         or the standard 'two copies' approach. 
                         
                         Let's use the 'two copies' approach which is more robust.
                     */}
                </div>
            </div>
        </div>
    );
}
