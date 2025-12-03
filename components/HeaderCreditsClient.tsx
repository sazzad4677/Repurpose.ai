"use client";

import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import StatsPill from "./dashboard/StatsPill";

export default function HeaderCreditsClient() {
    const { data, error, isLoading } = useSWR<{ credits: number | null, tier: string, stripeCurrentPeriodEnd: string | null }>("/api/credits", fetcher, {
        revalidateOnFocus: false,
    });

    const credits = data?.credits;
    const isCreator = data?.tier === 'Creator';
    const expiryDate = data?.stripeCurrentPeriodEnd ? new Date(data.stripeCurrentPeriodEnd).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : null;

    if (isLoading) return null;
    if (error) return null;

    return (
        <div className="mr-4">
            {credits !== undefined && credits !== null && (
                <StatsPill
                    credits={credits}
                    isCreator={isCreator}
                    expiryDate={expiryDate}
                />
            )}
        </div>
    );
}
