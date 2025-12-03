'use server';

import { auth, currentUser } from '@clerk/nextjs/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import User from '@/models/User';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-11-17.clover', // Use the latest API version or the one you prefer
});

export async function createCheckoutSession(priceId: string, mode: 'payment' | 'subscription' = 'payment') {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
        throw new Error('Unauthorized');
    }

    await dbConnect();
    const dbUser = await User.findOne({ clerkUserId: userId });

    let customerId = dbUser?.stripeCustomerId;

    // If user exists in DB but has no Stripe Customer ID, create one (or let Checkout do it and capture via webhook)
    // However, for subscriptions, it's often better to ensure we have a customer ID if possible, 
    // but Checkout can create one. We'll rely on Checkout to create/use email matching or pass existing.

    // Actually, if we have one, pass it.

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

    if (mode === 'payment') {
        // One-time payment logic (Credits)
        if (priceId === 'price_placeholder' || !priceId) {
            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: '10 Credits',
                        description: 'Purchase 10 credits for generating content.',
                    },
                    unit_amount: 1000, // $10.00
                },
                quantity: 1,
            });
        } else {
            line_items.push({ price: priceId, quantity: 1 });
        }
    } else {
        // Subscription logic
        line_items.push({
            price: priceId,
            quantity: 1,
        });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
        mode: mode,
        payment_method_types: ['card'],
        line_items: line_items,
        success_url: `${appUrl}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${appUrl}/dashboard?canceled=true`,
        metadata: {
            clerkUserId: userId,
        },
        customer_email: customerId ? undefined : user.emailAddresses[0]?.emailAddress,
        customer: customerId || undefined,
    };

    try {
        const session = await stripe.checkout.sessions.create(sessionConfig);
        if (!session.url) {
            throw new Error('Failed to create checkout session');
        }
        return session.url;
    } catch (error: any) {
        console.error('Stripe API Error:', error);
        throw new Error(error.message || 'Failed to create checkout session');
    }
}
