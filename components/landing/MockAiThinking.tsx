export default function MockAiThinking() {
    return (
        <div className="w-full h-full flex flex-col justify-center p-8 space-y-4 bg-background/50 backdrop-blur-sm">
            <div className="h-3 w-3/4 bg-gray-100 rounded-full animate-pulse"></div>
            <div className="h-3 w-full bg-gray-100 rounded-full animate-pulse delay-150"></div>
            <div className="h-3 w-5/6 bg-gray-100 rounded-full animate-pulse delay-300"></div>
        </div>
    );
}
