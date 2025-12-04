import GeneratorForm from "@/components/dashboard/GeneratorForm";
import { getHistory } from "@/actions/getHistory";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import CopyButton from "@/components/CopyButton";
import Link from "next/link";
import { ArrowRight, History, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import UpgradeIntentListener from "@/components/dashboard/UpgradeIntentListener";
import SubscriptionSuccess from "@/components/dashboard/SubscriptionSuccess";

function getVideoId(url: string) {
  try {
    if (!url) return null;
    const urlObj = new URL(url);
    if (urlObj.hostname.includes("youtube.com")) {
      if (urlObj.pathname.startsWith("/shorts/")) {
        return urlObj.pathname.split("/shorts/")[1];
      }
      return urlObj.searchParams.get("v");
    } else if (urlObj.hostname.includes("youtu.be")) {
      return urlObj.pathname.slice(1);
    }
  } catch (e) {
    // Fallback for simple ID strings or partial URLs if needed
    return null;
  }
  return null;
}

function stripMarkdown(text: string) {
  if (!text) return "";
  // Remove headers
  let clean = text.replace(/^#+\s+/gm, "");
  // Remove bold/italic
  clean = clean.replace(/(\*\*|__)(.*?)\1/g, "$2");
  clean = clean.replace(/(\*|_)(.*?)\1/g, "$2");
  // Remove links
  clean = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove code blocks
  clean = clean.replace(/```[\s\S]*?```/g, "");
  // Remove inline code
  clean = clean.replace(/`([^`]+)`/g, "$1");
  return clean;
}

export default async function DashboardPage() {
  const history = await getHistory(6); // Increased limit to show more grid items

  return (
    <div className="space-y-16">
      <UpgradeIntentListener />
      <SubscriptionSuccess />

      {/* Hero Section */}
      <div className="space-y-8">
        <GeneratorForm />
      </div>

      {/* History Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <History className="h-5 w-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight text-gray-900">Recent History</h2>
          </div>
          {history.length > 0 && (
            <Link href="/dashboard/history">
              <Button variant="ghost" className="gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                View All <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map((item: any) => {
            const videoId = getVideoId(item.originalUrl);
            const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;
            const plainText = stripMarkdown(item.generatedText);
            const displayTitle = item.title || "Untitled Generation";

            return (
              <Card key={item._id} className="group flex flex-col overflow-hidden hover:shadow-md transition-all duration-300 border-gray-100 bg-white shadow-sm">
                {/* Thumbnail Area */}
                <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full bg-gray-100 overflow-hidden cursor-pointer">
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={displayTitle}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-purple-50">
                      <Play className="h-10 w-10 text-purple-200" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </a>

                <CardHeader className="p-4 pb-0 space-y-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <CardTitle className="text-base font-bold text-gray-900 line-clamp-2 leading-tight hover:text-purple-600 transition-colors" title={displayTitle}>
                        {displayTitle}
                      </CardTitle>
                    </a>
                    <CopyButton text={item.generatedText} />
                  </div>
                  <p className="text-xs text-gray-400">
                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                  </p>
                </CardHeader>
                <CardContent className="p-4 pt-3">
                  <p className="text-sm text-gray-500 line-clamp-3 leading-relaxed">
                    {plainText}
                  </p>
                </CardContent>
              </Card>
            );
          })}

          {history.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-muted-foreground text-center max-w-sm mb-6">
                Paste a YouTube URL above to create your first blog post!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
