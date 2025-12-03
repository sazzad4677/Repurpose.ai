import Header from "@/components/Header";
import Footer from "@/components/dashboard/Footer";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-gray-50/50">
            <Header />
            <main className="flex-1 container mx-auto px-4 md:px-6 py-8">{children}</main>
            <Footer />
        </div>
    );
}
