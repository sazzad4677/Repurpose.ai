"use client";

import useSWR, { mutate as globalMutate } from "swr";
import fetcher from "@/lib/fetcher";

export default function HeaderCreditsClient() {
    const { data, error, isLoading } = useSWR<{ credits: number | null }>("/api/credits", fetcher, {
        revalidateOnFocus: false,
    });

    const credits = data?.credits;

    return (
        <>
            {!isLoading && credits !== undefined && credits !== null && (
                <div className="mr-4 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
                    {credits} Credits
                </div>
            )}
            {error && (
                <div className="mr-4 rounded-full bg-secondary px-3 py-1 text-sm font-medium">
                    - Credits
                </div>
            )}
        </>
    );
}
