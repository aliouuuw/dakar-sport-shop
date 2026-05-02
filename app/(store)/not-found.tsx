import Link from "next/link";

export default function StoreNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-5">
      <div className="text-center max-w-sm">
        <span className="block text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">
          Erreur 404
        </span>
        <h1 className="font-heading font-bold italic text-7xl text-slate-900 leading-none tracking-tight mb-3">
          404
        </h1>
        <p className="text-sm text-slate-500 mb-10">
          Cette page n&apos;existe pas. Explorez nos produits ou revenez à l&apos;accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[oklch(0.1_0.02_265)] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-[#DC2626] transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/produits"
            className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-slate-50 transition-colors"
          >
            Nos produits
          </Link>
        </div>
      </div>
    </div>
  );
}
