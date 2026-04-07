import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-800 font-black text-2xl mb-6">
          DS
        </div>
        <h1 className="text-6xl font-black text-slate-900 mb-4">404</h1>
        <h2 className="text-xl font-bold text-slate-700 mb-2">Page introuvable</h2>
        <p className="text-slate-500 mb-8">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
