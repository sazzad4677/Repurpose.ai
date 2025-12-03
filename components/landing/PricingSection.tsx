'use client';

import { PLANS } from "@/config/plans";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";
import { createCheckoutSession } from "@/actions/createCheckout";
import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FadeIn } from "@/components/animations/FadeIn";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function PricingSection() {
    const { user, isSignedIn } = useUser();
    const { openSignUp } = useClerk();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const { data } = useSWR<{ tier: string }>("/api/credits", fetcher, {
        revalidateOnFocus: false,
    });
    const tier = data?.tier;

    const handleSubscribe = async (priceId: string, planName: string) => {
        setLoadingPlan(planName);
        if (!isSignedIn) {
            if (planName === "Creator") {
                localStorage.setItem("upgrade_intent", "creator");
            }
            openSignUp();
            return;
        }

        if (planName === "Free") {
            router.push("/dashboard");
            return;
        }

        try {
            const url = await createCheckoutSession(priceId, 'subscription');
            if (url) {
                window.location.href = url;
            } else {
                setLoadingPlan(null);
            }
        } catch (error: any) {
            console.error("Error creating checkout session:", error);
            toast.error(error.message || "Failed to start subscription. Please try again.");
            setLoadingPlan(null);
        }
    };

    return (
        <section id="pricing" className="py-24 relative">
            <FadeIn className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Choose the plan that fits your content needs. Cancel anytime.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {PLANS.map((plan) => {
                        const isCreator = plan.slug === 'creator';
                        return (
                            <div
                                key={plan.slug}
                                className={`relative rounded-3xl border p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 ${isCreator
                                    ? "border-purple-500 bg-background shadow-2xl shadow-purple-500/10 ring-2 ring-purple-500/20 md:scale-105 z-10"
                                    : "bg-background/50 backdrop-blur-sm"
                                    }`}
                            >
                                {isCreator && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-1 text-sm font-medium text-white shadow-lg">
                                        Most Popular
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    <div className="mt-4 flex items-baseline text-5xl font-extrabold tracking-tight">
                                        ${plan.price}
                                        <span className="ml-1 text-xl font-medium text-muted-foreground">
                                            /mo
                                        </span>
                                    </div>
                                    <p className="mt-4 text-muted-foreground">
                                        {isCreator ? "For serious creators growing their audience." : "Perfect for trying out the platform."}
                                    </p>
                                </div>

                                <ul className="mb-8 space-y-4">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <div className={`flex h-6 w-6 items-center justify-center rounded-full ${isCreator ? "bg-purple-100 text-purple-600" : "bg-muted text-muted-foreground"}`}>
                                                <Check className="h-4 w-4" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    onClick={() => handleSubscribe(plan.priceId, plan.name)}
                                    disabled={loadingPlan === plan.name || (isCreator && tier === 'Creator')}
                                    className={`w-full h-12 rounded-full text-base font-bold transition-all duration-300 ${isCreator
                                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
                                        : ""
                                        }`}
                                    variant={isCreator ? "default" : "outline"}
                                >
                                    {loadingPlan === plan.name ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                        </>
                                    ) : (isCreator && tier === 'Creator') ? (
                                        <>
                                            <Check className="mr-2 h-4 w-4" /> Current Plan
                                        </>
                                    ) : isCreator ? (
                                        <>
                                            <Sparkles className="mr-2 h-4 w-4" /> Upgrade to {plan.name}
                                        </>
                                    ) : (
                                        "Get Started"
                                    )}
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </FadeIn>
        </section>
    );
}
