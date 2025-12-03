"use server";

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function getCreditsServer() {
    try {
        await dbConnect();
        const { userId: clerkUserId } = await auth();

        if (!clerkUserId) {
            return null;
        }

        let user = await User.findOne({ clerkUserId });

        if (!user) {
            const { currentUser } = await import("@clerk/nextjs/server");
            const clerkUser = await currentUser();
            const email = clerkUser?.emailAddresses[0]?.emailAddress || "";
            user = await User.create({ clerkUserId, email });
        }

        return user.credits;
    } catch (error) {
        console.error("Error fetching credits:", error);
        return null;
    }
}
