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
                {history.map((item: any) => (
                    <Card key={item._id} className="flex flex-col hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <CardTitle className="text-base font-medium line-clamp-2 leading-tight">
                                {item.title || 'Untitled Video'}
                            </CardTitle>
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
                ))}
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
