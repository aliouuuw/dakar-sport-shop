import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Location01Icon, Call02Icon, Clock01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";

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
      <section className="relative bg-slate-900 text-white min-h-[90vh] flex flex-col justify-center overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
          <Image
            src="https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2000&auto=format&fit=crop"
            alt="Dakar Sport Shop Equipements"
            fill
            className="object-cover object-center transform scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            priority
          />
        </div>
        
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-start w-full">
          <ScrollReveal delay={100} direction="left">
            <Badge className="bg-[#DC2626] hover:bg-red-700 text-white mb-6 px-4 py-1.5 text-xs sm:text-sm font-black uppercase tracking-[0.2em]">
              Collection 2024
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal delay={200} direction="left">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              <span className="block text-white">DÉPASSEZ</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#1E40AF]">
                VOS LIMITES.
              </span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal delay={300} direction="left">
            <p className="max-w-xl text-lg sm:text-xl text-slate-300 mb-10 font-medium leading-relaxed">
              L'équipementier sportif de référence à Dakar. Des marques premium pour les athlètes qui exigent le meilleur.
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={400} direction="left">
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-900 h-16 px-10 text-lg font-black uppercase tracking-wide rounded-none">
                <Link href="/produits">
                  Découvrir
                  <HugeiconsIcon icon={ArrowRight01Icon} size={24} className="ml-3" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent hover:bg-white/10 text-white border-white/30 h-16 px-10 text-lg font-bold uppercase tracking-wide rounded-none backdrop-blur-sm">
                <Link href="/promotions">
                  Offres du moment
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee items={["LIVRAISON GRATUITE DÈS 50.000 FCFA", "RETOURS SOUS 14 JOURS", "PAIEMENT À LA LIVRAISON", "ÉQUIPEMENTS OFFICIELS"]} />

      {/* Categories Bento Grid Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                Choisissez votre <span className="text-[#1E40AF]">arène</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl">
                Des équipements spécialisés pour chaque discipline. Ne laissez rien au hasard.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] sm:auto-rows-[300px] gap-4 lg:gap-6">
            {MOCK_CATEGORIES.map((category, idx) => {
              const getBentoClass = (i: number) => {
                if (i === 0) return "md:col-span-2 md:row-span-2"; // Football
                if (i === 1) return "md:col-span-2 md:row-span-1"; // Basketball
                if (i === 2) return "md:col-span-1 md:row-span-1"; // Running
                if (i === 3) return "md:col-span-1 md:row-span-1"; // Fitness
                if (i === 4) return "md:col-span-2 md:row-span-1"; // Natation
                if (i === 5) return "md:col-span-2 md:row-span-1"; // Sports de Combat
                return "md:col-span-1 md:row-span-1";
              };

              return (
                <ScrollReveal 
                  key={category.slug} 
                  delay={idx * 50} 
                  className={getBentoClass(idx)}
                >
                  <Link 
                    href={`/produits?category=${category.slug}`} 
                    className="group relative overflow-hidden rounded-3xl block h-full w-full bg-slate-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                      <h3 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-wider mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {category.name}
                      </h3>
                      <div className="flex items-center text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100 font-bold uppercase tracking-wider text-sm">
                        Découvrir <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="ml-2" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                  Tendances
                </h2>
                <p className="mt-4 text-lg text-slate-500 font-medium">
                  Les équipements les plus demandés cette semaine.
                </p>
              </div>
              <Button asChild variant="outline" className="hidden md:flex bg-white hover:bg-slate-100 text-slate-900 border-slate-300 h-14 px-8 text-sm font-bold uppercase tracking-wider rounded-xl">
                <Link href="/produits">
                  Tout voir <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {MOCK_FEATURED_PRODUCTS.map((product, idx) => (
              <ScrollReveal key={product.id} delay={idx * 100} direction="up" className="h-full">
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Button asChild className="w-full bg-slate-900 hover:bg-slate-800 text-white h-14 text-sm font-bold uppercase tracking-wider rounded-xl">
              <Link href="/produits">Tout voir</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Social Proof / Reviews Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="flex flex-col items-center text-center mb-16">
              <h2 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 uppercase">
                Ils nous font <span className="text-[#1E40AF]">confiance</span>
              </h2>
              <p className="mt-4 text-lg text-slate-500 font-medium max-w-2xl">
                Plus de 5000 athlètes et clubs sportifs équipés partout au Sénégal.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Moussa Diop",
                role: "Coach de Football, AS Dakar",
                content: "Des équipements de qualité professionnelle. Les maillots résistent parfaitement à l'usure de nos entraînements quotidiens.",
                rating: 5
              },
              {
                name: "Awa Ndiaye",
                role: "Athlète Semi-Pro",
                content: "Livraison ultra rapide et service client réactif. J'ai trouvé exactement la paire de running qu'il me fallait pour mon marathon.",
                rating: 5
              },
              {
                name: "Cheikh Fall",
                role: "Propriétaire de Salle de Sport",
                content: "J'ai équipé toute ma salle avec leurs haltères et bancs de musculation. Excellent rapport qualité/prix pour les professionnels.",
                rating: 5
              }
            ].map((review, idx) => (
              <ScrollReveal key={idx} delay={idx * 150} direction="up">
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full flex flex-col relative group hover:border-[#1E40AF]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="h-5 w-5 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 text-lg font-medium leading-relaxed italic mb-8 flex-1">
                    "{review.content}"
                  </p>
                  <div>
                    <div className="font-black text-slate-900">{review.name}</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">{review.role}</div>
                  </div>
                  
                  {/* Decorative Quote Mark */}
                  <div className="absolute top-8 right-8 text-8xl font-serif text-slate-200/50 leading-none select-none group-hover:text-[#1E40AF]/10 transition-colors duration-300">
                    "
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Info Section */}
      <section className="py-16 bg-blue-900 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-800">
            <ScrollReveal delay={100} direction="right">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-blue-800 p-4 rounded-full mb-4">
                  <HugeiconsIcon icon={CheckmarkBadge01Icon} size={32} className="text-blue-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">Qualité Garantie</h3>
                <p className="text-blue-200">Équipements officiels et marques reconnues mondialement.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200} direction="right">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-blue-800 p-4 rounded-full mb-4">
                  <HugeiconsIcon icon={Location01Icon} size={32} className="text-blue-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">Boutique Dakar</h3>
                <p className="text-blue-200">Av. G. Pompidou, en face Restaurant Ali baba, Dakar.</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={300} direction="right">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-blue-800 p-4 rounded-full mb-4">
                  <HugeiconsIcon icon={Call02Icon} size={32} className="text-blue-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">Service Client</h3>
                <p className="text-blue-200">+221 77 634 51 15<br/>Lundi - Samedi</p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={400} direction="right">
              <div className="flex flex-col items-center text-center p-6">
                <div className="bg-blue-800 p-4 rounded-full mb-4">
                  <HugeiconsIcon icon={Clock01Icon} size={32} className="text-blue-200" />
                </div>
                <h3 className="text-xl font-bold mb-2">Horaires</h3>
                <p className="text-blue-200">Ouvert de 09:00 à 19:30<br/>Fermé le Dimanche</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}