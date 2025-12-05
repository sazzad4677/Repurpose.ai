import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, CheckCircle2 } from "lucide-react";
import TrustedBy from "@/components/landing/TrustedBy";
import PricingSection from "@/components/landing/PricingSection";
import { FadeIn } from "@/components/animations/FadeIn";
import HeroInput from "@/components/landing/HeroInput";
import HowItWorks from "@/components/landing/HowItWorks";
import UpgradeButton from "@/components/layout/UpgradeButton";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-primary/20 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
              <Sparkles className="h-5 w-5 " />
            </div>
            <span>Repurpose.ai</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">
              How it Works
            </Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary cursor-pointer hidden md:inline-flex">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" className="rounded-full px-4 md:px-6 shadow-lg shadow-primary/20 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white cursor-pointer">
                  Get Started
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UpgradeButton />
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="cursor-pointer hidden md:inline-flex">Dashboard</Button>
                <Button variant="outline" size="icon" className="cursor-pointer md:hidden">
                  <Sparkles className="h-4 w-4" />
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-16 md:pt-32 md:pb-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[600px] h-[90vw] md:h-[600px] bg-purple-600/20 blur-[80px] md:blur-[120px] rounded-full -z-10"></div>
          <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full md:w-[800px] h-[50vh] md:h-[400px] bg-purple-500/20 blur-[80px] md:blur-[120px] rounded-full -z-10"></div>

          <FadeIn className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center gap-8 relative z-10 w-full">
            <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-colors border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              New: YouTube Shorts Support
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight max-w-5xl leading-tight relative z-10">
              Turn YouTube Videos into <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600 animate-gradient">
                Viral Blog Posts
              </span>
              <div className="absolute inset-0 bg-purple-500/20 blur-[100px] -z-10 rounded-full opacity-50 pointer-events-none"></div>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Stop wasting hours on manual transcription. Our AI instantly converts your videos into SEO-optimized articles, ready to publish.
            </p>

            {/* Try It Now Component */}
            <HeroInput />
          </FadeIn>
        </section>

        {/* Social Proof */}
        <TrustedBy />

        {/* Features Section (Bento Grid) */}
        <section id="features" className="py-24 bg-muted/30 relative">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-grid-small-black/[0.2]"></div>
          <FadeIn className="container mx-auto px-4 md:px-6 relative w-full">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Supercharge Your Content Workflow
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need to repurpose content at scale. Built for creators, marketers, and agencies.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
              {/* Card 1 */}
              <div className="group relative overflow-hidden rounded-3xl border bg-background p-8 hover:shadow-xl transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Transcription</h3>
                <p className="text-muted-foreground leading-relaxed">
                  99% accurate transcripts in seconds. Handles long videos and Shorts with ease.
                </p>
              </div>

              {/* Card 2 (Center - Spans 2 cols) */}
              <div className="md:col-span-2 group relative overflow-hidden rounded-3xl border bg-background p-8 hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="h-12 w-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center mb-6">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">AI-Powered Writing Engine</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Our advanced AI doesn't just summarize; it rewrites your content into engaging, structured blog posts that people actually read.
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">GPT-4o</span>
                    <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Claude 3.5</span>
                  </div>
                </div>
                <div className="flex-1 w-full relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-2xl rounded-full"></div>
                  <div className="relative rounded-xl border bg-background shadow-sm p-4 rotate-2 hover:rotate-0 transition-transform duration-500">
                    <div className="space-y-3">
                      <div className="h-4 w-3/4 bg-muted rounded animate-pulse"></div>
                      <div className="h-4 w-full bg-muted rounded animate-pulse delay-75"></div>
                      <div className="h-4 w-5/6 bg-muted rounded animate-pulse delay-150"></div>
                      <div className="h-4 w-full bg-muted rounded animate-pulse delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative overflow-hidden rounded-3xl border bg-background p-8 hover:shadow-xl transition-all duration-300">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">SEO Optimized</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Proper H1/H2 tags, bullet points, and keywords to help you rank higher.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* How It Works (Zig-Zag) */}
        <HowItWorks />

        {/* CTA Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <FadeIn className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="bg-primary text-primary-foreground rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl max-w-5xl mx-auto">
              {/* Decorative circles */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                  Ready to 10x Your Content Output?
                </h2>
                <p className="text-primary-foreground/80 mb-10 text-xl leading-relaxed">
                  Join thousands of creators who are repurposing their content effortlessly. Start for free today.
                </p>
                <Link href="/dashboard">
                  <Button size="lg" variant="secondary" className="h-14 px-10 rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer">
                    Get Started Now
                  </Button>
                </Link>
                <p className="mt-6 text-sm text-primary-foreground/60">
                  No credit card required · Free plan available
                </p>
              </div>
            </div>
          </FadeIn>
        </section>
        {/* Pricing Section */}
        <PricingSection />

      </main>

      {/* Footer */}
      <footer className="border-t py-16 bg-muted/10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Sparkles className="h-5 w-5" />
                </div>
                <span>Repurpose.ai</span>
              </div>
              <p className="text-muted-foreground max-w-sm">
                The smartest way to repurpose your video content into high-quality written articles. Built for the modern creator economy.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Repurpose.ai. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-foreground transition-colors">GitHub</Link>
              <Link href="#" className="hover:text-foreground transition-colors">Discord</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
