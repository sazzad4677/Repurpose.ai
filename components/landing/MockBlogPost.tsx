import { FileText } from "lucide-react";

export default function MockBlogPost() {
    return (
        <div className="w-full h-full p-3 flex flex-col bg-background border border-gray-100 shadow-sm rounded-md">
            {/* Hero Image Placeholder */}
            <div className="w-full h-24 bg-gray-100 rounded-sm mb-3"></div>

            {/* Text Lines */}
            <div className="space-y-2">
                <div className="h-3 w-3/4 bg-foreground/80 rounded-sm font-bold"></div>
                <div className="h-2 w-full bg-muted-foreground/30 rounded-sm"></div>
                <div className="h-2 w-5/6 bg-muted-foreground/30 rounded-sm"></div>
                <div className="h-2 w-4/5 bg-muted-foreground/30 rounded-sm"></div>
            </div>
        </div>
    );
}
