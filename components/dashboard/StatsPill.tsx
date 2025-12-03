import { Zap } from "lucide-react";

interface StatsPillProps {
    credits: number;
    isCreator: boolean;
    expiryDate: string | null;
}

export default function StatsPill({ credits, isCreator, expiryDate }: StatsPillProps) {
    return (
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm">
            <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                <span className="text-sm font-semibold text-gray-900">{credits}</span>
                <span className="text-xs text-muted-foreground font-medium">Credits</span>
            </div>

            {isCreator && expiryDate && (
                <>
                    <div className="h-3 w-px bg-gray-300" />
                    <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                        Renews {expiryDate}
                    </span>
                </>
            )}
        </div>
    );
}
