export default function ProduitsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 w-48 bg-slate-200 rounded-lg mb-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="space-y-3">
            <div className="aspect-square bg-slate-200 rounded-xl" />
            <div className="space-y-2 px-1">
              <div className="h-3 w-3/4 bg-slate-200 rounded" />
              <div className="h-3 w-1/2 bg-slate-100 rounded" />
              <div className="h-5 w-2/3 bg-slate-200 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
