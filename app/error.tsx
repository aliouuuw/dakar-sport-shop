"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-100 text-red-600 text-2xl mb-6">
          ⚠️
        </div>
        <h1 className="text-2xl font-black text-slate-900 mb-2">Une erreur est survenue</h1>
        <p className="text-slate-500 mb-8">
          Quelque chose s'est mal passé. Veuillez réessayer ou revenir à l'accueil.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition-colors"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-semibold px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}
