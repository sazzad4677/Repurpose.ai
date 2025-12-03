'use server';

import { auth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function getUserTier() {
    const { userId } = await auth();

    if (!userId) {
        return 'Free';
    }

    await dbConnect();
    const user = await User.findOne({ clerkUserId: userId });

    return user?.tier || 'Free';
}
