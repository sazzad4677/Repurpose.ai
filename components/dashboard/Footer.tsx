import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-gray-100 bg-white mt-auto">
            <div className="container mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Repurpose.ai. All rights reserved.
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-500">
                    <Link href="#" className="hover:text-gray-900 transition-colors">
                        Support
                    </Link>
                    <Link href="#" className="hover:text-gray-900 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="#" className="hover:text-gray-900 transition-colors">
                        Terms
                    </Link>
                </div>
            </div>
        </footer>
    );
}
