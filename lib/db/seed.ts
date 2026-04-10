import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { siteSettings } from "./schema/site-settings";
import { categories } from "./schema/categories";
import { products } from "./schema/products";
import { promotions } from "./schema/promotions";
import { announcements } from "./schema/announcements";
import { messages } from "./schema/messages";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool);

async function seed() {
  console.log("🌱 Starting seed...");

  // ─── Site Settings ──────────────────────────────────────────────────────────
  console.log("  → Seeding site settings...");
  const settingsData = [
    { key: "siteName", value: "Dakar Sport", type: "string" },
    { key: "tagline", value: "Tout pour le Sport", type: "string" },
    { key: "phones", value: JSON.stringify(["+221 33 840 09 45", "+221 77 634 51 15", "+221 77 041 49 30"]), type: "json" },
    { key: "email", value: "promosportsdakar@yahoo.fr", type: "string" },
    { key: "address", value: "Avenue G. Pompidou en face Restaurant Ali baba, Dakar, Sénégal", type: "string" },
    { key: "aboutText", value: "Dakar Sport est votre équipementier sportif de référence à Dakar. Spécialisés dans le football et les clubs associatifs, nous proposons les meilleures marques pour les athlètes et passionnés.", type: "string" },
    { key: "whatsapp", value: "+221776345115", type: "string" },
    { key: "facebook", value: "https://facebook.com/dakarsport", type: "string" },
    { key: "instagram", value: "https://instagram.com/dakarsport", type: "string" },
    { key: "openingHours", value: "Lun–Sam: 9h00–19h00 | Dim: 10h00–17h00", type: "string" },
  ];

  for (const setting of settingsData) {
    await db.insert(siteSettings).values(setting).onConflictDoUpdate({
      target: siteSettings.key,
      set: { value: setting.value, type: setting.type },
    });
  }

  // ─── Categories ─────────────────────────────────────────────────────────────
  console.log("  → Seeding categories...");
  const categoriesData = [
    {
      name: "Football",
      slug: "football",
      image: "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=800",
      description: "Ballons, crampons, maillots et équipements pour le football",
      order: 1,
    },
    {
      name: "Basketball",
      slug: "basketball",
      image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=800",
      description: "Ballons, chaussures et équipements pour le basketball",
      order: 2,
    },
    {
      name: "Running",
      slug: "running",
      image: "https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=800",
      description: "Chaussures, vêtements et accessoires pour la course",
      order: 3,
    },
    {
      name: "Fitness",
      slug: "fitness",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
      description: "Haltères, tapis, sangles et tout pour la salle de sport",
      order: 4,
    },
    {
      name: "Natation",
      slug: "natation",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800",
      description: "Maillots, lunettes et accessoires de natation",
      order: 5,
    },
    {
      name: "Textile Sport",
      slug: "textile",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
      description: "Maillots, shorts, survêtements et tenues sportives",
      order: 6,
    },
  ];

  const insertedCategories: { id: number; slug: string }[] = [];
  for (const cat of categoriesData) {
    const result = await db.insert(categories).values(cat).onConflictDoUpdate({
      target: categories.slug,
      set: { name: cat.name, image: cat.image, description: cat.description, order: cat.order },
    }).returning({ id: categories.id, slug: categories.slug });
    insertedCategories.push(result[0]);
  }

  const getCatId = (slug: string) => insertedCategories.find(c => c.slug === slug)?.id ?? 1;

  // ─── Products ────────────────────────────────────────────────────────────────
  console.log("  → Seeding products...");
  const productsData = [
    // Football (8 products)
    { name: "Ballon de Football Nike Premier League", slug: "ballon-football-nike-premier-league", description: "Ballon officiel de la Premier League, taille 5, couture machine.", price: 18500, compareAtPrice: 22000, images: ["https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600"], categoryId: getCatId("football"), featured: true, active: true, stock: 30 },
    { name: "Crampons Adidas Predator Edge", slug: "crampons-adidas-predator-edge", description: "Crampons hautes performances pour terrain synthétique, semelle TPU.", price: 45000, compareAtPrice: 55000, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600"], categoryId: getCatId("football"), featured: true, active: true, stock: 15 },
    { name: "Maillot PSG 2024 Domicile", slug: "maillot-psg-2024-domicile", description: "Maillot officiel Paris Saint-Germain, saison 2024, tissu Dri-FIT.", price: 35000, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600"], categoryId: getCatId("football"), featured: true, active: true, stock: 20 },
    { name: "Gants Gardien Puma Future Z", slug: "gants-gardien-puma-future-z", description: "Gants de gardien avec paume latex pour une prise assurée.", price: 22000, compareAtPrice: 28000, images: ["https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=600"], categoryId: getCatId("football"), featured: false, active: true, stock: 12 },
    { name: "Ballon d'Entraînement Uhlsport", slug: "ballon-entrainement-uhlsport", description: "Ballon d'entraînement cousu main, taille 4 ou 5.", price: 12000, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=600"], categoryId: getCatId("football"), featured: false, active: true, stock: 50 },
    { name: "Filet de But Football", slug: "filet-but-football", description: "Filet de remplacement 7,32m x 2,44m, compatible buts officiels.", price: 28000, compareAtPrice: 35000, images: ["https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600"], categoryId: getCatId("football"), featured: false, active: true, stock: 8 },
    { name: "Chasuble Entraînement Football (lot de 10)", slug: "chasuble-football-lot-10", description: "Chasubles fluorescentes lavables, idéales pour les clubs.", price: 15000, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=600"], categoryId: getCatId("football"), featured: false, active: true, stock: 25 },
    { name: "Protège-tibias Nike Charge", slug: "protege-tibias-nike-charge", description: "Protège-tibias légers avec chaussettes de maintien, taille S/M/L.", price: 8500, compareAtPrice: 11000, images: ["https://images.unsplash.com/photo-1553778263-73a83bab9b0c?q=80&w=600"], categoryId: getCatId("football"), featured: false, active: true, stock: 40 },
    // Basketball (3 products)
    { name: "Ballon Basketball Spalding NBA", slug: "ballon-basketball-spalding-nba", description: "Ballon officiel NBA Spalding, cuir composite, taille 7.", price: 25000, compareAtPrice: 32000, images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600"], categoryId: getCatId("basketball"), featured: true, active: true, stock: 18 },
    { name: "Chaussures Basketball Nike Air Jordan", slug: "chaussures-basketball-nike-air-jordan", description: "Chaussures de basketball pour terrain intérieur, amorti Air Max.", price: 75000, compareAtPrice: 90000, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600"], categoryId: getCatId("basketball"), featured: true, active: true, stock: 10 },
    { name: "Panier Basketball Portable Réglable", slug: "panier-basketball-portable", description: "Panier amovible réglable de 2,30m à 3,05m, base lestable.", price: 185000, compareAtPrice: 220000, images: ["https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=600"], categoryId: getCatId("basketball"), featured: false, active: true, stock: 3 },
    // Running (3 products)
    { name: "Chaussures Running Adidas Ultraboost 23", slug: "chaussures-running-adidas-ultraboost-23", description: "Chaussures de course légères avec semelle Boost, amorti maximal.", price: 85000, compareAtPrice: 100000, images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600"], categoryId: getCatId("running"), featured: true, active: true, stock: 14 },
    { name: "Montre GPS Running Garmin Forerunner", slug: "montre-gps-running-garmin", description: "Montre GPS avec fréquencemètre cardiaque et suivi de course.", price: 95000, compareAtPrice: 115000, images: ["https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=600"], categoryId: getCatId("running"), featured: true, active: true, stock: 6 },
    { name: "Ceinture Hydratation Running", slug: "ceinture-hydratation-running", description: "Ceinture avec 2 flasques 250ml et poche zippée pour accessoires.", price: 12500, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1571008887538-b36bb32f4571?q=80&w=600"], categoryId: getCatId("running"), featured: false, active: true, stock: 22 },
    // Fitness (3 products)
    { name: "Haltères Réglables 20kg la Paire", slug: "halteres-reglables-20kg", description: "Set d'haltères réglables de 2 à 20kg, disques en fonte.", price: 65000, compareAtPrice: 80000, images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600"], categoryId: getCatId("fitness"), featured: true, active: true, stock: 8 },
    { name: "Tapis de Yoga et Fitness 6mm", slug: "tapis-yoga-fitness", description: "Tapis antidérapant 183cm x 61cm, épaisseur 6mm, avec sangles.", price: 18000, compareAtPrice: 22000, images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600"], categoryId: getCatId("fitness"), featured: false, active: true, stock: 35 },
    { name: "Bande de Résistance Élastique Set de 5", slug: "bande-resistance-elastique-set", description: "Set de 5 bandes de résistance de niveaux débutant à avancé.", price: 9500, compareAtPrice: 12000, images: ["https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600"], categoryId: getCatId("fitness"), featured: false, active: true, stock: 45 },
    // Natation (2 products)
    { name: "Lunettes Natation Speedo Fastskin", slug: "lunettes-natation-speedo-fastskin", description: "Lunettes de compétition avec verres anti-UV et joint silicone.", price: 15000, compareAtPrice: 19000, images: ["https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=600"], categoryId: getCatId("natation"), featured: false, active: true, stock: 20 },
    { name: "Maillot Natation Arena Powerskin", slug: "maillot-natation-arena-powerskin", description: "Maillot de compétition homme/femme, tissu hydrophobe.", price: 28000, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=600"], categoryId: getCatId("natation"), featured: false, active: true, stock: 12 },
    // Textile (3 products)
    { name: "Survêtement Adidas Tiro 23 Complet", slug: "survetement-adidas-tiro-23", description: "Survêtement veste + pantalon, tissu polyester respirant.", price: 42000, compareAtPrice: 52000, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600"], categoryId: getCatId("textile"), featured: true, active: true, stock: 18 },
    { name: "Short Sport Nike Dri-FIT", slug: "short-sport-nike-dri-fit", description: "Short léger et respirant, poche zippée, taille élastique.", price: 14000, compareAtPrice: 18000, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600"], categoryId: getCatId("textile"), featured: false, active: true, stock: 30 },
    { name: "Chaussettes Sport Compression (3 paires)", slug: "chaussettes-sport-compression-3p", description: "Chaussettes de compression pour la récupération musculaire.", price: 7500, compareAtPrice: null, images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600"], categoryId: getCatId("textile"), featured: false, active: true, stock: 60 },
  ];

  for (const product of productsData) {
    await db.insert(products).values(product).onConflictDoUpdate({
      target: products.slug,
      set: {
        name: product.name,
        price: product.price,
        compareAtPrice: product.compareAtPrice,
        stock: product.stock,
        featured: product.featured,
        active: product.active,
      },
    });
  }

  // ─── Promotions ─────────────────────────────────────────────────────────────
  console.log("  → Seeding promotions...");
  const now = new Date();
  const promotionsData = [
    {
      title: "Soldes Football — Fin de Saison",
      description: "Profitez de -20% sur toute la gamme Football pour équiper votre club avant la saison.",
      discountType: "percentage" as const,
      discountValue: 20,
      code: "FOOT20",
      active: true,
      startsAt: new Date(now.getFullYear(), now.getMonth(), 1),
      endsAt: new Date(now.getFullYear(), now.getMonth() + 2, 0),
    },
    {
      title: "Pack Équipement Running",
      description: "5000 FCFA de réduction dès 50 000 FCFA d'achat sur la catégorie Running.",
      discountType: "fixed" as const,
      discountValue: 5000,
      code: "RUN5K",
      active: true,
      startsAt: new Date(now.getFullYear(), now.getMonth(), 15),
      endsAt: new Date(now.getFullYear(), now.getMonth() + 1, 15),
    },
  ];

  for (const promo of promotionsData) {
    await db.insert(promotions).values(promo).onConflictDoNothing();
  }

  // ─── Announcements ───────────────────────────────────────────────────────────
  console.log("  → Seeding announcements...");
  await db.insert(announcements).values({
    title: "Livraison gratuite dès 50 000 FCFA",
    body: "🎉 Profitez de la livraison offerte à Dakar pour toute commande supérieure à 50 000 FCFA. Commandez maintenant !",
    type: "banner" as const,
    active: true,
    order: 1,
  }).onConflictDoNothing();

  // ─── Messages ────────────────────────────────────────────────────────────────
  console.log("  → Seeding messages...");
  const messagesData = [
    {
      name: "Moussa Diallo",
      email: "moussa.diallo@gmail.com",
      phone: "+221 77 123 45 67",
      subject: "Commande maillots club",
      body: "Bonjour, je suis le responsable du club de football AS Médina. Nous souhaitons commander 20 maillots personnalisés avec notre logo. Pouvez-vous nous faire un devis ? Merci.",
      read: true,
    },
    {
      name: "Fatou Ndiaye",
      email: "fatou.ndiaye@yahoo.fr",
      phone: "+221 76 987 65 43",
      subject: "Disponibilité Crampons Adidas Predator",
      body: "Bonjour, je voudrais savoir si les crampons Adidas Predator Edge sont disponibles en pointure 42. Merci d'avance.",
      read: false,
    },
    {
      name: "Ibrahima Seck",
      email: "ibrahima.seck@hotmail.com",
      phone: null,
      subject: "Partenariat équipement scolaire",
      body: "Nous sommes un lycée à Dakar avec une section sportive de 150 élèves. Nous cherchons un partenaire pour nos équipements annuels (football, athlétisme). Intéressé par un partenariat à long terme.",
      read: false,
    },
  ];

  for (const message of messagesData) {
    await db.insert(messages).values(message).onConflictDoNothing();
  }

  console.log("✅ Seed complete!");
  await pool.end();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
