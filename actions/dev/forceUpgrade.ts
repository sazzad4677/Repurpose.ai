'use server';

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";

export async function forceUpgrade() {
    try {
        const { userId } = await auth();
        if (!userId) return { success: false, message: "Not logged in" };

        await dbConnect();
        const user = await User.findOne({ clerkUserId: userId });

        if (!user) return { success: false, message: "User not found" };

        // Simulate Creator plan upgrade
        user.tier = 'Creator';
        user.credits = 50;
        user.stripePriceId = 'price_simulated_dev';
        user.stripeCurrentPeriodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days from now

        await user.save();

        revalidatePath('/dashboard');
        return { success: true, message: "Upgraded to Creator (Simulated)" };
    } catch (error) {
        console.error("Force upgrade failed:", error);
        return { success: false, message: "Failed to upgrade" };
    }
}
