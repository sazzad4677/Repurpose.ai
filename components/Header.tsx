import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import HeaderCreditsClient from "./HeaderCreditsClient";

export default function Header() {
    return (
        <header className="border-b">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-2xl font-bold">
                    Repurpose.ai
                </Link>

                <div className="flex items-center gap-4">
                    <SignedIn>
                        <HeaderCreditsClient />
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
                            <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                                Sign In
                            </button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </header>
    );
}
