"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import HeaderCreditsClient from "./HeaderCreditsClient";
import UpgradeButton from "./layout/UpgradeButton";

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 text-2xl font-semibold">
                    <Image src="/logo.png" alt="Repurpose.ai Logo" width={40} height={40} className="object-contain" />
                    Repurpose.ai
                </Link>

                <div className="flex items-center gap-4">
                    <SignedIn>
                        <HeaderCreditsClient />
                        <UpgradeButton />
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium hover:underline"
                        >
                            Dashboard
                        </Link>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <button className="text-sm font-medium text-muted-foreground hover:text-primary">
                                Sign In
                            </button>
                        </SignInButton>
                        <SignUpButton mode="modal">
                            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                                Get Started
                            </button>
                        </SignUpButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}
