export default function ProductsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-7 w-40 bg-slate-200 rounded-lg" />
        <div className="h-9 w-32 bg-slate-200 rounded-lg" />
      </div>
      <div className="flex gap-3">
        <div className="h-9 w-64 bg-slate-200 rounded-lg" />
        <div className="h-9 w-36 bg-slate-200 rounded-lg" />
      </div>
      <div className="border border-slate-200 rounded-xl overflow-hidden">
        <div className="bg-slate-100 h-11 w-full" />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3 border-t border-slate-100">
            <div className="h-10 w-10 bg-slate-200 rounded-lg shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="h-4 w-48 bg-slate-200 rounded" />
              <div className="h-3 w-24 bg-slate-100 rounded" />
            </div>
            <div className="h-4 w-20 bg-slate-200 rounded" />
            <div className="h-4 w-16 bg-slate-200 rounded" />
            <div className="h-6 w-14 bg-slate-200 rounded-full" />
            <div className="h-7 w-7 bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
