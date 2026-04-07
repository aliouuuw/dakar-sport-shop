import Link from "next/link";

export default function StoreNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl mb-6">🏃</p>
        <h1 className="text-4xl font-black text-slate-900 mb-3">404</h1>
        <h2 className="text-lg font-bold text-slate-700 mb-2">Page introuvable</h2>
        <p className="text-slate-500 mb-8">
          Cette page n'existe pas. Explorez nos produits ou revenez à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Accueil
          </Link>
          <Link
            href="/produits"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Nos produits
          </Link>
        </div>
      </div>
    </div>
  );
}
