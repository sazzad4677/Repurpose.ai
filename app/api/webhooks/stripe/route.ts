import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { PLANS } from '@/config/plans';

export const dynamic = 'force-dynamic';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
        apiVersion: '2025-11-17.clover',
    });

    const body = await req.text();
    const signature = (await headers()).get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        const clerkUserId = session.metadata?.clerkUserId;

        if (clerkUserId) {
            try {
                await dbConnect();
                const user = await User.findOne({ clerkUserId: clerkUserId }); // Fixed: clerkId -> clerkUserId

                if (user) {
                    // Update user subscription details
                    user.stripeCustomerId = session.customer as string;
                    user.stripeSubscriptionId = session.subscription as string;
                    user.stripePriceId = PLANS.find(p => p.slug === 'creator')?.priceId;
                    user.tier = 'Creator';
                    user.credits = 50; // Set to Creator plan quota

                    // Calculate period end (approximate, or fetch from subscription object if needed)
                    // For simplicity in this webhook, we'll set it to 30 days from now or fetch properly if we had the sub object
                    // Better: Fetch subscription to get accurate period_end
                    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
                    user.stripeCurrentPeriodEnd = new Date(subscription.current_period_end * 1000);

                    await user.save();
                    console.log(`User ${user.clerkUserId} upgraded to Creator plan`);
                }
            } catch (error) {
                console.error('Error handling invoice payment:', error);
                return new NextResponse('Error handling invoice payment', { status: 500 });
            }
        }
    }

    return new NextResponse(null, { status: 200 });
}
