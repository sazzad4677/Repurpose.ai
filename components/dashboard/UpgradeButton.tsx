'use client';

import { useState } from 'react';
import { createCheckoutSession } from '@/actions/createCheckout';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export default function UpgradeButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleUpgrade = async () => {
        setIsLoading(true);
        try {
            const url = await createCheckoutSession('price_placeholder', 'payment');
            if (url) {
                window.location.href = url;
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            toast.error('Failed to start checkout process. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleUpgrade} disabled={isLoading} className="w-full">
            {isLoading ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                </>
            ) : (
                'Upgrade - Get 10 Credits ($10)'
            )}
        </Button>
    );
}
