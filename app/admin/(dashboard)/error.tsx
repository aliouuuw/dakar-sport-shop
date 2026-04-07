"use client";

import { useEffect } from "react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-600 text-xl mb-6">
          ⚠️
        </div>
        <h1 className="text-xl font-black text-slate-900 mb-2">Erreur inattendue</h1>
        <p className="text-slate-500 text-sm mb-6">
          Une erreur s'est produite dans cette section. Réessayez ou revenez au tableau de bord.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 font-mono mb-6">Code: {error.digest}</p>
        )}
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-900 transition-colors text-sm"
          >
            Réessayer
          </button>
          <a
            href="/admin"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 font-semibold px-5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm"
          >
            Tableau de bord
          </a>
        </div>
      </div>
    </div>
  );
}
