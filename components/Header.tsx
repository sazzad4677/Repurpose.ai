import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-4">
                <Link href="/" className="text-xl font-bold">
                    Repurpose.ai
                </Link>
            </div>
            <div className="flex items-center gap-4">
                <SignedOut>
                    <SignInButton mode="modal">
                        <Button variant="ghost">Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button>Sign Up</Button>
                    </SignUpButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </header>
    );
}
