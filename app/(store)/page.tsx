import Image from "next/image";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon, Location01Icon, Call02Icon, Clock01Icon, CheckmarkBadge01Icon } from "@hugeicons/core-free-icons";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Marquee } from "@/components/marquee";
import { getProducts } from "@/lib/actions/products";
import { getCategories } from "@/lib/actions/categories";

export default async function StorePage() {
  const [featuredProducts, allCategories] = await Promise.all([
    getProducts({ active: true, featured: true, limit: 8 }),
    getCategories(),
  ]);

  const categories = allCategories.slice(0, 6);

  const getBentoClass = (i: number) => {
    if (i === 0) return "md:col-span-2 md:row-span-2";
    if (i === 1) return "md:col-span-2 md:row-span-1";
    if (i === 2) return "md:col-span-1 md:row-span-1";
    if (i === 3) return "md:col-span-1 md:row-span-1";
    if (i === 4) return "md:col-span-2 md:row-span-1";
    if (i === 5) return "md:col-span-2 md:row-span-1";
    return "md:col-span-1 md:row-span-1";
  };

  return (
    <div className="flex-1">
      {/* Hero Section */}
      <section className="relative bg-blue-950 text-white overflow-hidden h-[360px] sm:h-[420px] lg:h-[520px]">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1518605368461-1e1252220a22?q=80&w=1920&auto=format&fit=crop"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://videos.pexels.com/video-files/6077718/6077718-hd_1920_1080_25fps.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-blue-950/50 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-blue-950/40 to-blue-900/20" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
          <ScrollReveal delay={100} direction="up">
            <Badge className="bg-[#DC2626] hover:bg-red-700 text-white mb-5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider border-none shadow-lg shadow-red-900/20">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse mr-2 inline-block align-middle" />
              Spécialiste Football
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={250} direction="up">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4 drop-shadow-xl">
              <span className="block text-white">Dakar</span>
              <span className="block text-[#DC2626]">Sport</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={400} direction="up">
            <p className="text-sm sm:text-base text-blue-50 mb-8 max-w-md font-medium drop-shadow-md">
              L&apos;équipementier de référence pour les clubs associatifs et les passionnés de football au Sénégal.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={550} direction="up">
            <Button asChild size="lg" className="bg-white hover:bg-blue-50 text-blue-900 h-14 px-10 text-sm font-bold uppercase tracking-wider rounded-xl shadow-xl shadow-black/20 transition-all hover:scale-[1.03]">
              <Link href="/produits">
                Découvrir la collection
                <HugeiconsIcon icon={ArrowRight01Icon} size={20} className="ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Marquee Ticker */}
      <Marquee items={["LIVRAISON GRATUITE DÈS 50.000 FCFA", "RETOURS SOUS 14 JOURS", "PAIEMENT À LA LIVRAISON", "ÉQUIPEMENTS OFFICIELS"]} />

      {/* Categories Bento Grid */}
      {categories.length > 0 && (
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
              {categories.map((category, idx) => (
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
                    {category.image ? (
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1E40AF] to-blue-900" />
                    )}
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
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
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
              {featuredProducts.map((product, idx) => (
                <ScrollReveal key={product.id} delay={idx * 100} direction="up" className="h-full">
                  <ProductCard
                    id={String(product.id)}
                    name={product.name}
                    slug={product.slug}
                    price={product.price}
                    compareAtPrice={product.compareAtPrice ?? undefined}
                    category={product.categoryName ?? ""}
                    image={product.images[0] ?? ""}
                  />
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
      )}

      {/* Social Proof */}
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
              { name: "Moussa Diop", role: "Coach de Football, AS Dakar", content: "Des équipements de qualité professionnelle. Les maillots résistent parfaitement à l'usure de nos entraînements quotidiens.", rating: 5 },
              { name: "Awa Ndiaye", role: "Athlète Semi-Pro", content: "Livraison ultra rapide et service client réactif. J'ai trouvé exactement la paire de running qu'il me fallait pour mon marathon.", rating: 5 },
              { name: "Cheikh Fall", role: "Propriétaire de Salle de Sport", content: "J'ai équipé toute ma salle avec leurs haltères et bancs de musculation. Excellent rapport qualité/prix pour les professionnels.", rating: 5 },
            ].map((review, idx) => (
              <ScrollReveal key={idx} delay={idx * 150} direction="up">
                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 h-full flex flex-col relative group hover:border-[#1E40AF]/30 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <svg key={i} className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-slate-700 text-lg font-medium leading-relaxed italic mb-8 flex-1">&ldquo;{review.content}&rdquo;</p>
                  <div>
                    <div className="font-black text-slate-900">{review.name}</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mt-1">{review.role}</div>
                  </div>
                  <div className="absolute top-8 right-8 text-8xl font-serif text-slate-200/50 leading-none select-none group-hover:text-[#1E40AF]/10 transition-colors duration-300">&ldquo;</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Info */}
      <section className="py-16 bg-blue-900 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-800">
            {[
              { icon: CheckmarkBadge01Icon, title: "Qualité Garantie", text: "Équipements officiels et marques reconnues mondialement." },
              { icon: Location01Icon, title: "Boutique Dakar", text: "Av. G. Pompidou, en face Restaurant Ali baba, Dakar." },
              { icon: Call02Icon, title: "Service Client", text: "+221 77 634 51 15\nLundi - Samedi" },
              { icon: Clock01Icon, title: "Horaires", text: "Ouvert de 09:00 à 19:30\nFermé le Dimanche" },
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={(idx + 1) * 100} direction="right">
                <div className="flex flex-col items-center text-center p-6">
                  <div className="bg-blue-800 p-4 rounded-full mb-4">
                    <HugeiconsIcon icon={item.icon} size={32} className="text-blue-200" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-blue-200 whitespace-pre-line">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
