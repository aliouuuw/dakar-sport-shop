const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://dakarsport.sn";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: "Dakar Sport",
    alternateName: "Tout pour le Sport",
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    description:
      "Spécialiste des équipements sportifs à Dakar. Football, basketball, running, fitness, natation.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Avenue G. Pompidou en face Restaurant Ali baba",
      addressLocality: "Dakar",
      addressCountry: "SN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+221338400945",
        contactType: "customer service",
        availableLanguage: ["French", "Wolof"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+221776345115",
        contactType: "sales",
      },
    ],
    sameAs: [],
  };
}

export function productJsonLd(product: {
  name: string;
  slug: string;
  description: string | null;
  price: number;
  compareAtPrice: number | null;
  images: string[];
  categoryName: string | null;
  stock: number;
}) {
  const images = product.images ?? [];
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: images.length > 0 ? images : undefined,
    url: `${APP_URL}/produits/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "XOF",
      price: product.price,
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${APP_URL}/produits/${product.slug}`,
    },
    category: product.categoryName ?? undefined,
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${APP_URL}${item.href}`,
    })),
  };
}
