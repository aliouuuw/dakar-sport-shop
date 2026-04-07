import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Location01Icon, Call02Icon, Clock01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for the homepage
const MOCK_FEATURED_PRODUCTS = [
  {
    id: "1",
    name: "Maillot Domicile Equipe Nationale Sénégal 2024",
    slug: "maillot-senegal-2024",
    price: 35000,
    compareAtPrice: 45000,
    category: "Football",
    image: "https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "2",
    name: "Chaussures de Running Pro X-Vite",
    slug: "running-pro-x-vite",
    price: 65000,
    category: "Running",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "3",
    name: "Ballon de Basket Officiel Taille 7",
    slug: "ballon-basket-t7",
    price: 25000,
    compareAtPrice: 30000,
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Haltères Réglables 20kg (Set de 2)",
    slug: "halteres-20kg-set",
    price: 45000,
    category: "Fitness",
    image: "https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "5",
    name: "Gants de Boxe Entraînement 12oz",
    slug: "gants-boxe-12oz",
    price: 22000,
    category: "Sports de combat",
    image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "6",
    name: "Tapis de Yoga Antidérapant Épais",
    slug: "tapis-yoga-epais",
    price: 15000,
    compareAtPrice: 20000,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "7",
    name: "Raquette de Tennis Pro Carbone",
    slug: "raquette-tennis-pro",
    price: 85000,
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=600&auto=format&fit=crop",
    isNew: true,
  },
  {
    id: "8",
    name: "Sac de Sport Imperméable 50L",
    slug: "sac-sport-50l",
    price: 18000,
    category: "Accessoires",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=600&auto=format&fit=crop",
  },
];

const MOCK_CATEGORIES = [
  {
    name: "Football",
    slug: "football",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Basketball",
    slug: "basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Running",
    slug: "running",
    image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Fitness",
    slug: "fitness",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Natation",
    slug: "natation",
    image: "https://images.unsplash.com/photo-1519315901367-f34f9274ceb3?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Sports de Combat",
    slug: "sports-de-combat",
    image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=600&auto=format&fit=crop",
  },
];

export default function StorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <Image
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop"
            alt="Dakar Sport Shop Equipements"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-48 flex flex-col items-center text-center">
          <Badge className="bg-red-600 hover:bg-red-700 text-white mb-6 px-4 py-1 text-sm font-semibold uppercase tracking-wider">
            Nouveaux arrivages 2024
          </Badge>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl mb-6">
            <span className="block text-blue-400 mb-2">Tout pour le</span>
            <span className="block text-white">Sport à Dakar</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-slate-200 mb-10 leading-relaxed">
            L'équipementier sportif n°1 au Sénégal. Découvrez notre sélection d'articles de qualité pour professionnels et amateurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg font-bold">
              <Link href="/produits">
                Voir nos produits
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20 h-14 px-8 text-lg font-bold backdrop-blur-sm">
              <Link href="/contact">
                Demander un devis club
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Produits Vedettes</h2>
              <p className="mt-4 text-lg text-slate-600">Notre sélection des meilleurs équipements du moment.</p>
            </div>
            <Link href="/produits" className="hidden sm:flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              Voir tout <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_FEATURED_PRODUCTS.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
          
          <div className="mt-10 text-center sm:hidden">
            <Button asChild variant="outline" className="w-full">
              <Link href="/produits">Voir tous les produits</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Showcase Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">Explorer par Sport</h2>
            <p className="mt-4 text-lg text-slate-600">Trouvez l'équipement adapté à votre discipline.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
            {MOCK_CATEGORIES.map((category) => (
              <Link key={category.slug} href={`/produits?category=${category.slug}`} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Info Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-800">
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-800 p-4 rounded-full mb-4">
                <HugeiconsIcon icon={CheckmarkBadge01Icon} size={32} className="text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Qualité Garantie</h3>
              <p className="text-blue-200">Équipements officiels et marques reconnues mondialement.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-800 p-4 rounded-full mb-4">
                <HugeiconsIcon icon={Location01Icon} size={32} className="text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Boutique Dakar</h3>
              <p className="text-blue-200">Av. G. Pompidou, en face Restaurant Ali baba, Dakar.</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-800 p-4 rounded-full mb-4">
                <HugeiconsIcon icon={Call02Icon} size={32} className="text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Service Client</h3>
              <p className="text-blue-200">+221 77 634 51 15<br/>Lundi - Samedi</p>
            </div>
            
            <div className="flex flex-col items-center text-center p-6">
              <div className="bg-blue-800 p-4 rounded-full mb-4">
                <HugeiconsIcon icon={Clock01Icon} size={32} className="text-blue-200" />
              </div>
              <h3 className="text-xl font-bold mb-2">Horaires</h3>
              <p className="text-blue-200">Ouvert de 09:00 à 19:30<br/>Fermé le Dimanche</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}