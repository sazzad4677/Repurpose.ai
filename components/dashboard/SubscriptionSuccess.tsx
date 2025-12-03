'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { checkSubscription } from "@/actions/checkSubscription";
import { mutate } from "swr";

export default function SubscriptionSuccess() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const processedRef = useRef(false);

    useEffect(() => {
        if (processedRef.current) return;

        const success = searchParams.get('success');
        const sessionId = searchParams.get('session_id');
        const canceled = searchParams.get('canceled');

        if (success === 'true' && sessionId) {
            processedRef.current = true;

            const verifySubscription = async () => {
                try {
                    toast.loading("Verifying subscription...");
                    const result = await checkSubscription(sessionId);

                    toast.dismiss();
                    if (result.success) {
                        toast.success("Subscription successful! You are now a Creator.");
                        // Refresh credits data
                        mutate("/api/credits");
                        router.refresh();
                    } else {
                        toast.error("Could not verify subscription. Please contact support.");
                    }
                } catch (error) {
                    toast.dismiss();
                    toast.error("Something went wrong verifying subscription.");
                } finally {
                    // Remove query params
                    const newUrl = window.location.pathname;
                    router.replace(newUrl);
                }
            };

            verifySubscription();
        } else if (success === 'true') {
            // Fallback for old URLs without session_id
            processedRef.current = true;
            toast.success("Subscription successful!");
            router.replace(window.location.pathname);
        }

        if (canceled === 'true') {
            processedRef.current = true;
            toast.info("Subscription canceled.");
            router.replace(window.location.pathname);
        }
    }, [searchParams, router]);

    return null;
}
