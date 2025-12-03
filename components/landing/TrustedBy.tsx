import { Youtube, Linkedin, Twitter, FileText } from "lucide-react";

export default function TrustedBy() {
    return (
        <div className="w-full py-12 border-y bg-muted/20">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <p className="text-sm font-medium text-muted-foreground mb-8 uppercase tracking-wider">
                    Trusted by 10,000+ Creators from
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
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
            </div>
        </div>
    );
}
