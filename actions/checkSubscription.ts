'use server';

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { PLANS } from "@/config/plans";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2025-11-17.clover',
});

export async function checkSubscription(sessionId: string) {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, error: "Not logged in" };

        if (!sessionId) return { success: false, error: "No session ID" };

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            await dbConnect();
            const user = await User.findOne({ clerkUserId: userId });

            if (user) {
                // Check if already updated to avoid duplicate work (though idempotent)
                if (user.stripeSubscriptionId === session.subscription) {
                    return { success: true, message: "Already updated" };
                }

                // Update user subscription details
                user.stripeCustomerId = session.customer as string;
                user.stripeSubscriptionId = session.subscription as string;
                user.stripePriceId = PLANS.find(p => p.slug === 'creator')?.priceId;
                user.tier = 'Creator';
                user.credits = 50;

                // Fetch subscription for accurate period end
                // Fetch subscription for accurate period end
                if (session.subscription) {
                    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
                    if (subscription.current_period_end) {
                        user.stripeCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);
                    } else {
                        // Fallback if date is missing
                        user.stripeCurrentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                    }
                } else {
                    // Fallback for one-time payments or missing subscription
                    user.stripeCurrentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
                }

                await user.save();
                return { success: true, message: "Subscription verified and updated" };
            }
        }

        return { success: false, error: "Payment not verified" };
    } catch (error) {
        console.error("Error checking subscription:", error);
        return { success: false, error: "Failed to verify subscription" };
    }
}
