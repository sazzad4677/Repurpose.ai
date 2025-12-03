'use client';

import Link from "next/link";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function UpgradeButton() {
    const { data } = useSWR<{ tier: string }>("/api/credits", fetcher, {
        revalidateOnFocus: false,
    });

    const tier = data?.tier;

    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            const { createCheckoutSession } = await import("@/actions/createCheckout");
            const { PLANS } = await import("@/config/plans");
            const creatorPlan = PLANS.find(p => p.slug === 'creator');

            if (creatorPlan?.priceId) {
                const url = await createCheckoutSession(creatorPlan.priceId, 'subscription');
                if (url) {
                    window.location.href = url;
                } else {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Upgrade error:", error);
            setIsLoading(false);
        }
    };

    if (tier === 'Creator') {
        return (
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full font-medium text-sm shadow-lg shadow-purple-500/20 cursor-default">
                ✨ Pro
            </div>
        );
    }

    if (tier === 'Free') {
        return (
            <button
                onClick={handleUpgrade}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-all shadow-lg shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        ⚡ Upgrade to Pro
                    </>
                )}
            </button>
        );
    }

    return null;
}
