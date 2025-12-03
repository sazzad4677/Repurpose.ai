'use server';

import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import GeneratedContent from '@/models/GeneratedContent';

export async function getHistory(limit?: number) {
    const { userId } = await auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }

    await dbConnect();

    const user = await User.findOne({ clerkUserId: userId });

    if (!user) {
        throw new Error('User not found');
    }

    let query = GeneratedContent.find({ userId: user._id }).sort({ createdAt: -1 });

    if (limit) {
        query = query.limit(limit);
    }

    const history = await query.lean();

    // Serialize to plain JSON to avoid "Plain Objects Only" error
    return JSON.parse(JSON.stringify(history));
}
