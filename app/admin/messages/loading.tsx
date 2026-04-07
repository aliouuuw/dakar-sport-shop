export default function MessagesLoading() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-7 w-36 bg-slate-200 rounded-lg" />
        <div className="h-5 w-20 bg-slate-200 rounded-full" />
      </div>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="border border-slate-200 rounded-xl p-4 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-slate-200 rounded-full" />
              <div className="space-y-1">
                <div className="h-4 w-32 bg-slate-200 rounded" />
                <div className="h-3 w-24 bg-slate-100 rounded" />
              </div>
            </div>
            <div className="h-3 w-20 bg-slate-100 rounded" />
          </div>
          <div className="h-4 w-56 bg-slate-200 rounded ml-12" />
          <div className="h-3 w-full bg-slate-100 rounded ml-12" />
        </div>
      ))}
    </div>
  );
}
