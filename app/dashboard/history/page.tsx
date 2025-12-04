import { getHistory } from '@/actions/getHistory';
import CopyButton from '@/components/CopyButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { FileText } from 'lucide-react';

export default async function HistoryPage() {
    const history = await getHistory();

    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">History</h1>
                <p className="text-muted-foreground">
                    View all your generated blog posts.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {history.map((item: any) => {
                    // Helper to get video ID (duplicated from dashboard page for now, ideally should be a utility)
                    let videoId = null;
                    try {
                        if (item.originalUrl) {
                            const urlObj = new URL(item.originalUrl);
                            if (urlObj.hostname.includes("youtube.com")) {
                                if (urlObj.pathname.startsWith("/shorts/")) {
                                    videoId = urlObj.pathname.split("/shorts/")[1];
                                } else {
                                    videoId = urlObj.searchParams.get("v");
                                }
                            } else if (urlObj.hostname.includes("youtu.be")) {
                                videoId = urlObj.pathname.slice(1);
                            }
                        }
                    } catch (e) { }

                    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : null;

                    return (
                        <Card key={item._id} className="flex flex-col hover:shadow-md transition-shadow overflow-hidden">
                            {/* Thumbnail Area */}
                            <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="block relative aspect-video w-full bg-muted overflow-hidden">
                                {thumbnailUrl ? (
                                    <img
                                        src={thumbnailUrl}
                                        alt={item.title || 'Untitled Video'}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted/50">
                                        <FileText className="h-10 w-10 text-muted-foreground/50" />
                                    </div>
                                )}
                            </a>

                            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="flex-1 mr-2">
                                    <CardTitle className="text-base font-medium line-clamp-2 leading-tight hover:text-primary transition-colors">
                                        {item.title || 'Untitled Video'}
                                    </CardTitle>
                                </a>
                                <CopyButton text={item.generatedText} />
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-muted-foreground mb-3">
                                    {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                </p>
                                <div className="text-sm text-muted-foreground line-clamp-4">
                                    {item.generatedText}
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
                {history.length === 0 && (
                    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center border rounded-lg border-dashed bg-muted/20">
                        <div className="bg-background p-4 rounded-full mb-4">
                            <FileText className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold">No history yet</h3>
                        <p className="text-muted-foreground max-w-sm mt-2">
                            You haven't generated any content yet. Go to the dashboard to create your first blog post.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
