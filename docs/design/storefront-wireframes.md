# Storefront UI Wireframes & User Flows — Dakar Sport

> **Direction:** Bold, sporty, trustworthy · mobile-first e-commerce
> **Audience:** Sports enthusiasts, club managers, casual shoppers in Dakar
> **Tone:** Energetic yet professional · Senegalese identity · accessible
> **Language:** French (primary)

---

## Table of Contents

1. [Global Layout (Header + Footer)](#1-global-layout)
2. [Homepage (Accueil)](#2-homepage)
3. [Products Listing (Produits)](#3-products-listing)
4. [Product Detail](#4-product-detail)
5. [Contact Page](#5-contact-page)
6. [404 Page](#6-404-page)
7. [User Flows](#7-user-flows)
8. [Responsive Strategy](#8-responsive-strategy)

---

## 1. Global Layout

### Header — Desktop (≥1024px)

```
┌────────────────────────────────────────────────────────────┐
│ [Announcement Banner — full width, bg-brand-red, white text]│
│ "🏷 Soldes d'été : -30% sur tout le Football !"    [×]    │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  🏪 DAKAR SPORT    Accueil  Produits  Promotions  Contact  │
│  Tout pour le Sport                          🔍  📱 WhatsApp│
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### Header — Mobile (<1024px)

```
┌────────────────────────────────────┐
│ [Announcement Banner — compact]    │
├────────────────────────────────────┤
│ ☰   🏪 DAKAR SPORT          🔍   │
└────────────────────────────────────┘
```

### Header Specs

| Property | Value |
|---|---|
| Height | h-16 (desktop), h-14 (mobile) |
| Background | `#FFFFFF` with `border-b border-slate-200` |
| Logo | "DAKAR SPORT" text, `font-heading font-bold text-xl`, blue `#1E40AF` |
| Tagline | "Tout pour le Sport" — `text-xs text-muted-foreground`, desktop only |
| Nav links | `text-sm font-medium text-slate-700`, hover: `text-brand-blue` |
| Active link | `text-brand-blue font-semibold`, 2px bottom border |
| Mobile menu | Sheet from left, full nav + contact info + social links |
| Search | Icon button, opens search overlay/dialog |
| WhatsApp CTA | Green `#25D366` icon + "WhatsApp" text, links to `wa.me/221776345115` |
| Announcement bar | `bg-red-600 text-white text-sm py-2 text-center`, dismissible `×` |

### Footer

```
┌────────────────────────────────────────────────────────────┐
│  bg-slate-900, text-slate-300                              │
│                                                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ DAKAR SPORT  │ │ Navigation   │ │ Contact      │      │
│  │              │ │              │ │              │      │
│  │ Tout pour le │ │ Accueil      │ │ 📞 33 840..  │      │
│  │ Sport depuis │ │ Produits     │ │ 📞 77 634..  │      │
│  │ Dakar,       │ │ Promotions   │ │ 📞 77 041..  │      │
│  │ Sénégal.     │ │ Contact      │ │ ✉ promosport │      │
│  │              │ │              │ │ 📍 Ave. G.   │      │
│  │ [FB] [IG]    │ │              │ │    Pompidou  │      │
│  │ [WA]         │ │              │ │              │      │
│  └──────────────┘ └──────────────┘ └──────────────┘      │
│                                                            │
│  ──────────────────────────────────────────────────        │
│  © 2026 Dakar Sport · Tout pour le Sport                   │
└────────────────────────────────────────────────────────────┘
```

### Footer Specs

| Property | Value |
|---|---|
| Background | `bg-slate-900` |
| Text | `text-slate-400` body, `text-white` headings |
| Layout | 3-col grid (lg), stacked (mobile) |
| Columns | Brand info + social · Navigation links · Contact info |
| Social icons | Facebook, Instagram, WhatsApp — `text-slate-400 hover:text-white` |
| Copyright | `text-slate-500 text-xs`, border-t `border-slate-800` |
| Padding | `py-12 px-6` (desktop), `py-8 px-4` (mobile) |

---

## 2. Homepage (Accueil)

**Route:** `/` — `app/(store)/page.tsx`

```
┌────────────────────────────────────────────────────────────┐
│ [HEADER + ANNOUNCEMENT BANNER]                             │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─ HERO SECTION ────────────────────────────────────────┐ │
│  │                                                        │ │
│  │  bg-gradient: brand-blue → dark-blue                   │ │
│  │  h-[500px] (desktop), h-[400px] (mobile)               │ │
│  │                                                        │ │
│  │       TOUT POUR LE SPORT                               │ │
│  │       Équipements sportifs de qualité                  │ │
│  │       à Dakar, Sénégal                                 │ │
│  │                                                        │ │
│  │       [Voir nos produits →]  [Demander un devis]       │ │
│  │                                                        │ │
│  │                            [Hero image: sports gear]    │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌─ CATEGORIES SHOWCASE ─────────────────────────────────┐ │
│  │  Nos catégories                                        │ │
│  │                                                        │ │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │ │
│  │  │ [image] │ │ [image] │ │ [image] │ │ [image] │    │ │
│  │  │Football │ │Basket   │ │Running  │ │Fitness  │    │ │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │ │
│  │  ┌─────────┐ ┌─────────┐                              │ │
│  │  │ [image] │ │ [image] │                              │ │
│  │  │Natation │ │Textile  │                              │ │
│  │  └─────────┘ └─────────┘                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌─ FEATURED PRODUCTS ───────────────────────────────────┐ │
│  │  Produits en vedette                  [Voir tout →]    │ │
│  │                                                        │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                 │ │
│  │  │[img] │ │[img] │ │[img] │ │[img] │                 │ │
│  │  │Name  │ │Name  │ │Name  │ │Name  │                 │ │
│  │  │Price │ │Price │ │Price │ │Price │                 │ │
│  │  │[Voir]│ │[Voir]│ │[Voir]│ │[Voir]│                 │ │
│  │  └──────┘ └──────┘ └──────┘ └──────┘                 │ │
│  │                                                        │ │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                 │ │
│  │  │ ...  │ │ ...  │ │ ...  │ │ ...  │  (8 total)      │ │
│  │  └──────┘ └──────┘ └──────┘ └──────┘                 │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                            │
│  ┌─ TRUST / INFO SECTION ────────────────────────────────┐ │
│  │  bg-slate-50                                           │ │
│  │                                                        │ │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐            │ │
│  │  │ 📞       │  │ 📍       │  │ 🏪       │            │ │
│  │  │ Appelez  │  │ Visitez  │  │ Spécialiste│            │ │
│  │  │ nous     │  │ nous     │  │ Football  │            │ │
│  │  │ 3 lines  │  │ Address  │  │ & Clubs   │            │ │
│  │  └──────────┘  └──────────┘  └──────────┘            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                            │
│ [FOOTER]                                                   │
└────────────────────────────────────────────────────────────┘
```

### Hero Section

| Property | Value |
|---|---|
| Background | `bg-gradient-to-br from-blue-800 to-blue-950` |
| Height | 500px (lg), 400px (md), 350px (sm) |
| Heading | `text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white` |
| Subheading | `text-lg text-blue-100` |
| CTA primary | `Button` white bg, blue text: "Voir nos produits →" |
| CTA secondary | `Button variant="outline"` white border: "Demander un devis" |
| Layout | Text left + image right (desktop), stacked centered (mobile) |

### Category Cards

- Grid: 3-col (lg), 2-col (sm)
- Card: image with dark overlay, category name centered in white bold text
- Hover: scale 1.02 + shadow, overlay lightens
- Click: navigates to `/produits?category=[slug]`
- Aspect ratio: 4:3

### Product Card (reused across site)

```
┌────────────────────┐
│  [Product Image]   │  aspect-square, object-cover
│  ┌─ badge ─────┐   │  Category badge top-left (optional)
│                    │
│  Ballon Adidas     │  font-medium, truncate
│  Football          │  text-sm text-muted-foreground
│                    │
│  15 000 FCFA       │  font-heading font-bold
│  20 000 FCFA       │  text-sm line-through text-muted (compare-at)
│                    │
│  [Voir détails]    │  Button variant="outline" size="sm"
└────────────────────┘
```

| Property | Value |
|---|---|
| Card | `border rounded-lg overflow-hidden hover:shadow-lg transition` |
| Image | `aspect-square object-cover bg-slate-100` (placeholder) |
| Name | `text-sm font-medium text-foreground line-clamp-2` |
| Category | `text-xs text-muted-foreground` |
| Price | `text-lg font-heading font-bold` |
| Compare price | `text-sm line-through text-muted-foreground` |
| CTA | `Button variant="outline" size="sm" w-full` |

### Trust Section

- `bg-slate-50 py-16`
- 3-col grid with icon + title + description
- Icons: Phone, MapPin, Store — 32px, `text-brand-blue`

---

## 3. Products Listing (Produits)

**Route:** `/produits` — `app/(store)/produits/page.tsx`

```
┌────────────────────────────────────────────────────────────┐
│ [HEADER]                                                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Nos produits                              38 produits     │
│                                                            │
│  ┌─ Filters bar ─────────────────────────────────────────┐│
│  │ [🔍 Rechercher...]  [Catégorie ▼]  [Trier par ▼]     ││
│  └───────────────────────────────────────────────────────┘│
│                                                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │[img] │ │[img] │ │[img] │ │[img] │                    │
│  │Name  │ │Name  │ │Name  │ │Name  │                    │
│  │Price │ │Price │ │Price │ │Price │                    │
│  └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │ ...  │ │ ...  │ │ ...  │ │ ...  │                    │
│  └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                            │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                    │
│  │ ...  │ │ ...  │ │ ...  │ │ ...  │                    │
│  └──────┘ └──────┘ └──────┘ └──────┘                    │
│                                                            │
│        [< 1  2  3  4  5 >]  pagination                    │
│                                                            │
│ [FOOTER]                                                   │
└────────────────────────────────────────────────────────────┘
```

### Specs

| Element | Detail |
|---|---|
| Grid | 4-col (lg), 3-col (md), 2-col (sm) |
| Filters | Sticky top bar below header on scroll |
| Category filter | `Select` dropdown, populated from DB, URL param `?category=` |
| Sort | `Select`: Prix croissant, Prix décroissant, Nouveautés |
| Search | `Input` with debounced search, URL param `?q=` |
| Count | "38 produits" — `text-sm text-muted-foreground` right-aligned |
| Pagination | Number buttons, 12 products per page, URL param `?page=` |
| Empty state | "Aucun produit trouvé" + reset filters button |
| URL-driven | All filters stored in URL search params (SSR-friendly) |

---

## 4. Product Detail

**Route:** `/produits/[slug]` — `app/(store)/produits/[slug]/page.tsx`

```
┌────────────────────────────────────────────────────────────┐
│ [HEADER]                                                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Accueil > Football > Ballon Adidas Al Rihla               │
│                                                            │
│  ┌─────────────────────┬──────────────────────────────┐   │
│  │                     │                              │   │
│  │  ┌───────────────┐  │  Ballon Adidas Al Rihla      │   │
│  │  │               │  │  Football                    │   │
│  │  │  MAIN IMAGE   │  │                              │   │
│  │  │  (large)      │  │  15 000 FCFA                │   │
│  │  │               │  │  20 000 FCFA  (barré)       │   │
│  │  └───────────────┘  │  Économisez 5 000 FCFA      │   │
│  │                     │                              │   │
│  │  [thumb] [thumb]    │  ● En stock (50 unités)     │   │
│  │  [thumb]            │                              │   │
│  │                     │  Taille: [S] [M] [L] [XL]   │   │
│  │                     │  Couleur: [●] [●] [●]       │   │
│  │                     │                              │   │
│  │                     │  ┌──────────────────────┐   │   │
│  │                     │  │ 📱 Commander via      │   │   │
│  │                     │  │    WhatsApp           │   │   │
│  │                     │  └──────────────────────┘   │   │
│  │                     │                              │   │
│  │                     │  [📞 Appeler: 77 634 51 15] │   │
│  └─────────────────────┴──────────────────────────────┘   │
│                                                            │
│  ┌─ Description ─────────────────────────────────────────┐│
│  │  Ballon de match officiel Adidas. Conçu pour les      ││
│  │  compétitions de haut niveau. Surface texturée...     ││
│  └───────────────────────────────────────────────────────┘│
│                                                            │
│  ┌─ Produits similaires ─────────────────────────────────┐│
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                ││
│  │  │[img] │ │[img] │ │[img] │ │[img] │                ││
│  │  │Name  │ │Name  │ │Name  │ │Name  │                ││
│  │  │Price │ │Price │ │Price │ │Price │                ││
│  │  └──────┘ └──────┘ └──────┘ └──────┘                ││
│  └───────────────────────────────────────────────────────┘│
│                                                            │
│ [FOOTER]                                                   │
└────────────────────────────────────────────────────────────┘
```

### Specs

| Element | Detail |
|---|---|
| Breadcrumb | `Accueil > [Category] > [Product]` — `text-sm text-muted-foreground` |
| Layout | 2-col (lg): gallery left (55%), info right (45%). Stacked on mobile. |
| Main image | `aspect-square rounded-lg object-cover`, click to zoom (optional) |
| Thumbnails | Row of small images (64×64), click swaps main image, ring on active |
| Product name | `text-2xl md:text-3xl font-heading font-bold` |
| Category | `text-sm text-muted-foreground` |
| Price | `text-3xl font-heading font-bold text-foreground` |
| Compare price | `text-lg line-through text-muted-foreground` |
| Savings | `text-sm text-green-600 font-medium` — "Économisez X FCFA" |
| Stock | `● En stock` (green) or `● Rupture de stock` (red) |
| Variants | Size: toggle group buttons. Color: color swatches with ring. |
| WhatsApp CTA | **Primary action** — `bg-green-600 hover:bg-green-700 text-white`, full width |
|  | Links to `wa.me/221776345115?text=Bonjour, je suis intéressé par [Product] ([Variant]) - [Price] FCFA - [URL]` |
| Phone CTA | Secondary — `Button variant="outline"`, `tel:+221776345115` |
| Description | Prose section below, `text-sm leading-relaxed` |
| Related products | 4-col product card grid, same category, excludes current |
| SEO | `generateMetadata`: title, description, `og:image` from first product image |

---

## 5. Contact Page

**Route:** `/contact` — `app/(store)/contact/page.tsx`

```
┌────────────────────────────────────────────────────────────┐
│ [HEADER]                                                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  Contactez-nous                                            │
│  Une question ? Écrivez-nous ou passez nous voir.          │
│                                                            │
│  ┌──────────────────────────┬─────────────────────────┐   │
│  │                          │                         │   │
│  │  ┌─ Formulaire ────────┐│  ┌─ Nos coordonnées ──┐│   │
│  │  │                     ││  │                     ││   │
│  │  │  Nom *    [_______] ││  │ 📞 Téléphones      ││   │
│  │  │  Email *  [_______] ││  │ +221 33 840 09 45  ││   │
│  │  │  Tél.     [_______] ││  │ +221 77 634 51 15  ││   │
│  │  │  Sujet *  [_______] ││  │ +221 77 041 49 30  ││   │
│  │  │  Message *           ││  │                     ││   │
│  │  │  [________________] ││  │ ✉ Email            ││   │
│  │  │  [________________] ││  │ promosportsdakar@  ││   │
│  │  │  [________________] ││  │ yahoo.fr           ││   │
│  │  │                     ││  │                     ││   │
│  │  │  [Envoyer le message]││  │ 📍 Adresse         ││   │
│  │  │                     ││  │ Avenue G. Pompidou ││   │
│  │  └─────────────────────┘│  │ en face Restaurant ││   │
│  │                          │  │ Ali baba, Dakar    ││   │
│  │                          │  │                     ││   │
│  │                          │  │ 📱 WhatsApp        ││   │
│  │                          │  │ [Écrire sur WA →]  ││   │
│  │                          │  └─────────────────────┘│   │
│  └──────────────────────────┴─────────────────────────┘   │
│                                                            │
│  ┌─ Google Maps ─────────────────────────────────────────┐│
│  │                                                        ││
│  │  [Embedded Google Maps iframe]                         ││
│  │  Avenue G. Pompidou, Dakar                             ││
│  │  h-[400px], rounded-lg                                 ││
│  │                                                        ││
│  └────────────────────────────────────────────────────────┘│
│                                                            │
│ [FOOTER]                                                   │
└────────────────────────────────────────────────────────────┘
```

### Specs

| Element | Detail |
|---|---|
| Layout | 2-col (lg): form left (60%), info right (40%). Stacked on mobile (info first). |
| Form fields | Nom*, Email*, Téléphone, Sujet*, Message* — shadcn Input/Textarea |
| Validation | Zod: required fields, email format. French errors. |
| Submit | `Button` primary: "Envoyer le message" — loading spinner during submit |
| Success | Toast (Sonner): "Message envoyé avec succès ! Nous vous répondrons bientôt." |
| Error | Toast destructive: "Erreur lors de l'envoi. Veuillez réessayer." |
| Contact info | Cards with icons, phone numbers as `tel:` links, email as `mailto:` |
| WhatsApp | Green CTA button linking to `wa.me/221776345115` |
| Map | Google Maps iframe, `h-96 rounded-lg`, centered on Ave. G. Pompidou Dakar |
| Server action | `createMessage()` — inserts into `messages` table |

---

## 6. 404 Page

**Route:** `app/(store)/not-found.tsx`

```
┌────────────────────────────────────────────────────────────┐
│ [HEADER]                                                   │
├────────────────────────────────────────────────────────────┤
│                                                            │
│              text-center py-24                              │
│                                                            │
│              🏟️                                            │
│              (large sports icon)                            │
│                                                            │
│              Page introuvable                               │
│                                                            │
│              Désolé, cette page n'existe pas               │
│              ou a été déplacée.                             │
│                                                            │
│              [Retour à l'accueil]  [Voir nos produits]     │
│                                                            │
│                                                            │
│ [FOOTER]                                                   │
└────────────────────────────────────────────────────────────┘
```

### Specs

- Centered layout, `py-24`
- Large icon/illustration (sports-themed), 80px
- Title: `text-3xl font-heading font-bold`
- Message: `text-muted-foreground`
- Two CTAs: primary → `/`, outline → `/produits`

---

## 7. User Flows

### Flow 1: Product Discovery → WhatsApp Order

```
┌───────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│           │    │              │    │              │    │              │
│ Homepage  │───→│ Products     │───→│ Product      │───→│ WhatsApp     │
│ or Search │    │ Listing      │    │ Detail       │    │ (external)   │
│           │    │              │    │              │    │              │
└───────────┘    └──────────────┘    └──────────────┘    └──────────────┘
     │                │                    │                    │
     │ Hero CTA       │ Filter/search      │ Select variant    │ Pre-filled
     │ Category card   │ Sort               │ Click WhatsApp   │ message with
     │ Featured prod.  │ Click card         │ CTA button       │ product info
     │                │ Pagination          │                  │ + URL
     └────────────────┘                    └──────────────────┘

Entry points:
  • Homepage hero "Voir nos produits" → /produits
  • Homepage category card → /produits?category=[slug]
  • Homepage featured product card → /produits/[slug]
  • Header nav "Produits" → /produits
  • Search → /produits?q=[term]

Product detail actions:
  • Select size/color variant (updates WhatsApp message)
  • "Commander via WhatsApp" → opens wa.me with message
  • "Appeler" → tel: link
  • Click related product → /produits/[other-slug]

Lead tracking:
  • WhatsApp click logged to DB (productId, variantId, timestamp)
```

### Flow 2: Contact Form Submission

```
┌───────────┐    ┌──────────────┐    ┌──────────────┐
│           │    │              │    │              │
│ Any page  │───→│ Contact      │───→│ Success      │
│ (nav)     │    │ Page         │    │ (toast)      │
│           │    │              │    │              │
└───────────┘    └──────────────┘    └──────────────┘
                      │                    │
                      │ Fill form          │ Form resets
                      │ Submit             │ Toast shown
                      │ Validation         │ Email sent to admin
                      │ (client + server)  │ Message saved to DB
                      │                    │
                      └── Error? ──→ Show inline errors (French)
                                     Toast: "Erreur lors de l'envoi"
```

### Flow 3: Club Quote Request

```
┌───────────┐    ┌──────────────┐    ┌──────────────┐
│           │    │              │    │              │
│ Homepage  │───→│ Product      │───→│ WhatsApp or  │
│ "Demander │    │ Detail       │    │ Contact form │
│ un devis" │    │ (browse)     │    │ (with quote  │
│           │    │              │    │  context)    │
└───────────┘    └──────────────┘    └──────────────┘
     │
     └── Future: dedicated /devis page with multi-product form
```

---

## 8. Responsive Strategy

### Breakpoint Behavior

| Breakpoint | Header | Hero | Product Grid | Detail Layout | Contact | Footer |
|---|---|---|---|---|---|---|
| `<640px` (sm) | Hamburger, compact | Centered, stacked | 2-col | Stacked (image → info) | Stacked (info → form) | Stacked |
| `640-1023px` (md) | Hamburger, compact | Centered, stacked | 3-col | Stacked (image → info) | 2-col | 2-col |
| `≥1024px` (lg) | Full nav bar | Text left + image right | 4-col | 2-col side by side | 2-col | 3-col |

### Mobile-First Principles

- **Touch targets:** Minimum 44×44px for all interactive elements
- **Product cards:** Larger tap area, full-width CTA button
- **WhatsApp CTA:** Sticky bottom bar on product detail (mobile only)
- **Search:** Full-screen overlay on mobile
- **Images:** Lazy loaded, `sizes` attribute for responsive images
- **Filters:** Collapsible panel on mobile, inline on desktop
- **Scroll:** Smooth scroll, infinite scroll consideration for products (paginated first)

### Performance Considerations

- All pages are **Server Components** (no `use client` at page level)
- Images via `next/image` with `sizes` and `priority` for above-fold
- Product grid: Suspense boundary with skeleton cards
- Filters: URL search params (no client state needed for SSR)
