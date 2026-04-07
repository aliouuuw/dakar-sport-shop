import Link from "next/link";

export default function AdminNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-800 text-white font-black text-lg mb-6">
          DS
        </div>
        <h1 className="text-5xl font-black text-slate-900 mb-3">404</h1>
        <h2 className="text-lg font-bold text-slate-700 mb-2">Page introuvable</h2>
        <p className="text-slate-500 mb-8">
          Cette section de l'administration n'existe pas.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
        >
          Tableau de bord
        </Link>
      </div>
    </div>
  );
}
