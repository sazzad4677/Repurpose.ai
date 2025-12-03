import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
    {
        clerkUserId: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        credits: {
            type: Number,
            default: 3,
        },
        tier: {
            type: String,
            default: "Free",
        },
        stripeCustomerId: {
            type: String,
            unique: true,
            sparse: true,
        },
        stripeSubscriptionId: {
            type: String,
        },
        stripePriceId: {
            type: String,
        },
        stripeCurrentPeriodEnd: {
            type: Date,
        },
    },
    { timestamps: true },
);

const User = models.User || model("User", UserSchema);

export default User;
