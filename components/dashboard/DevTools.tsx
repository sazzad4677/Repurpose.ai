'use client';

import { Button } from "@/components/ui/button";
import { forceUpgrade } from "@/actions/dev/forceUpgrade";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DevTools() {
    const router = useRouter();

    const handleForceUpgrade = async () => {
        const result = await forceUpgrade();
        if (result.success) {
            toast.success(result.message);
            router.refresh();
        } else {
            toast.error(result.message);
        }
    };

    // Only show in development
    if (process.env.NODE_ENV !== 'development') return null;

    return (
        <div className="fixed bottom-4 right-4 p-4 bg-card border rounded-lg shadow-lg z-50">
            <h3 className="text-xs font-bold mb-2 text-muted-foreground">Dev Tools</h3>
            <Button
                variant="outline"
                size="sm"
                onClick={handleForceUpgrade}
                className="text-xs"
            >
                Force Upgrade (Simulate Webhook)
            </Button>
        </div>
    );
}
