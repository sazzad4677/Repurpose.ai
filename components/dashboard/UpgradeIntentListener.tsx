'use client';

import { useEffect, useRef } from 'react';
import { createCheckoutSession } from '@/actions/createCheckout';
import { toast } from 'sonner';
import { PLANS } from '@/config/plans';

export default function UpgradeIntentListener() {
    const processedRef = useRef(false);

    useEffect(() => {
        const checkIntent = async () => {
            if (processedRef.current) return;

            const intent = localStorage.getItem('upgrade_intent');
            if (intent === 'creator') {
                processedRef.current = true;
                localStorage.removeItem('upgrade_intent');

                toast.loading("Processing your upgrade...");

                try {
                    // Find the Creator plan price ID
                    const creatorPlan = PLANS.find(p => p.slug === 'creator');
                    if (creatorPlan && creatorPlan.priceId) {
                        const url = await createCheckoutSession(creatorPlan.priceId, 'subscription');
                        if (url) {
                            window.location.href = url;
                        }
                    }
                } catch (error) {
                    console.error("Error processing upgrade intent:", error);
                    toast.dismiss();
                    toast.error("Failed to process upgrade. Please try again.");
                }
            }
        };

        checkIntent();
    }, []);

    return null;
}
