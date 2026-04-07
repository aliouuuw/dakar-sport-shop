import StoreHeader from "@/components/store-header";
import StoreFooter from "@/components/store-footer";
import Link from "next/link";

export default function StorePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <StoreHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              <span className="text-blue-800">Tout pour le</span> Sport
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Equipements sportifs de qualité à Dakar. Football, basketball,
              running, fitness et bien plus encore.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="/produits"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-red-600 px-8 text-base font-semibold text-white shadow-lg hover:bg-red-700 transition-colors"
              >
                Voir nos produits
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-slate-300 bg-white px-8 text-base font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </main>
      <StoreFooter />
    </div>
  );
}