export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="flex items-center space-x-2 animate-pulse">
        <div className="w-4 h-4 rounded-full bg-primary" />
        <div className="w-4 h-4 rounded-full bg-primary" />
        <div className="w-4 h-4 rounded-full bg-primary" />
      </div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}
