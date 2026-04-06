# Admin UI Wireframes — Dakar Sport

> **Direction:** Data-dense professional tool · calm enterprise clarity
> **Audience:** Store manager (Ndiaya Ciss) + staff · daily use
> **Tone:** Authoritative, precise, efficient
> **Language:** French (primary), English (code/technical)

---

## 1. Global Layout & Sidebar Navigation

### Desktop (≥1024px)

```
┌──────────────┬──────────────────────────────────────┐
│  SIDEBAR     │  MAIN CONTENT                        │
│  240px fixed │  flex-1, px-6 py-8, max-w-7xl        │
│              │                                      │
│  ┌─────────┐ │  ┌────────────────────────────────┐  │
│  │ LOGO    │ │  │ PageHeader                     │  │
│  │ Dakar   │ │  │ Title · Description · [Action] │  │
│  │ Sport   │ │  └────────────────────────────────┘  │
│  └─────────┘ │                                      │
│              │  ┌────────────────────────────────┐  │
│  NAV:        │  │                                │  │
│  □ Tableau   │  │  Page Content (scrollable)     │  │
│  □ Produits  │  │                                │  │
│  □ Catégories│  │                                │  │
│  □ Promotions│  │                                │  │
│  □ Annonces  │  │                                │  │
│  □ Messages ⑶│  │                                │  │
│  □ Devis     │  │                                │  │
│  □ Médias    │  │                                │  │
│  □ Activité  │  │                                │  │
│  ──────────  │  │                                │  │
│  □ Paramètres│  └────────────────────────────────┘  │
│              │                                      │
│  ┌─────────┐ │                                      │
│  │ User    │ │                                      │
│  │ Logout  │ │                                      │
│  └─────────┘ │                                      │
└──────────────┴──────────────────────────────────────┘
```

### Mobile (<1024px)

- Sidebar hidden, hamburger icon in top bar
- Opens as `Sheet` (shadcn/ui) from left, overlay
- Top bar: `h-14`, hamburger left, "Dakar Sport" center, user avatar right

### Sidebar Specs

| Property | Value |
|---|---|
| Width | 240px fixed |
| Background | `#1E3A5F` (deep navy) |
| Text default | `#CBD5E1` (slate-300) |
| Text active | `#FFFFFF` |
| Active indicator | Left 3px border `#3B82F6` + `bg-blue-500/10` |
| Hover | `bg-white/5` |
| Icon size | 20px via HugeIcons |
| Badge (unread) | `bg-red-600` circle, white text, 18px |
| Logo area | h-16, border-b `white/8` |
| User section | Pinned bottom, border-t `white/8` |

### Navigation Items

| Route | Label | HugeIcon | Badge |
|---|---|---|---|
| `/admin` | Tableau de bord | `Home01Icon` | — |
| `/admin/products` | Produits | `ShoppingBag01Icon` | — |
| `/admin/categories` | Catégories | `GridIcon` | — |
| `/admin/promotions` | Promotions | `PercentIcon` | — |
| `/admin/announcements` | Annonces | `MegaphoneIcon` | — |
| `/admin/messages` | Messages | `Mail01Icon` | Unread count |
| `/admin/quotes` | Devis | `Invoice01Icon` | New count |
| `/admin/media` | Médias | `Image01Icon` | — |
| `/admin/activity` | Activité | `Clock01Icon` | — |
| — | *separator* | — | — |
| `/admin/settings` | Paramètres | `Settings01Icon` | — |

---

## 2. Dashboard (Tableau de bord)

**Route:** `/admin`

```
┌────────────────────────────────────────────────────┐
│  Tableau de bord                                    │
│  Vue d'ensemble de votre boutique                   │
│                                                     │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │📦 47    │ │✓  38    │ │📁  6    │ │✉  3     │  │
│  │Produits │ │Actifs   │ │Catégor. │ │Non lus  │  │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘  │
│                                                     │
│  ┌─────────┐                                        │
│  │🏷  2    │                                        │
│  │Promos   │                                        │
│  └─────────┘                                        │
│                                                     │
│  ┌─ Actions rapides ─────────────────────────────┐  │
│  │ [+ Ajouter un produit]  [+ Nouvelle promotion]│  │
│  │ [+ Nouveau devis]       [Voir les messages]   │  │
│  └───────────────────────────────────────────────┘  │
│                                                     │
│  ┌─ Derniers messages ───────────────────────────┐  │
│  │ ● Moussa Diop — Commande maillots    · 2h     │  │
│  │ ● Fatou Sow — Disponibilité ballons  · 5h     │  │
│  │ ○ Amadou Fall — Demande de prix      · hier   │  │
│  │ ○ Ibrahima Ndiaye — Livraison        · 22 mar │  │
│  │ ○ Aïssatou Ba — Retour produit       · 20 mar │  │
│  │                        [Voir tous →]           │  │
│  └───────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Metric Cards

- 4-col grid (lg), 2-col (md), 1-col (sm)
- Card: `h-28`, white bg, `border`, `rounded-lg`
- Icon: 28px muted, top-left
- Value: `text-3xl font-heading font-bold text-foreground`
- Label: `text-sm text-muted-foreground`
- Hover: `shadow-md` transition

### Quick Actions

- Row of `Button variant="outline"` with `+` prefix
- Links to `/admin/products/new`, `/admin/promotions/new`, `/admin/quotes/new`, `/admin/messages`

### Recent Messages

- List of 5 items, `●` = unread (blue dot), `○` = read
- Each row: sender name (bold if unread), subject, relative date
- "Voir tous →" link at bottom

---

## 3. Products (Produits)

### 3a. Product List — `/admin/products`

```
┌────────────────────────────────────────────────────┐
│  Produits                                [+ Ajouter]│
│  Gérez votre catalogue de produits                  │
│                                                     │
│  ┌─ Filters ────────────────────────────────────┐  │
│  │ [🔍 Rechercher...]  [Catégorie ▼]  [Statut ▼]│  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌─ Table ──────────────────────────────────────┐  │
│  │ □  Image  Nom         Catégorie  Prix   Actif │  │
│  │ ─────────────────────────────────────────────│  │
│  │ □  [img]  Ballon Ad.  Football  15 000  ✓    │  │
│  │ □  [img]  Maillot PSG Football  25 000  ✓    │  │
│  │ □  [img]  Chaussures  Running   35 000  ✗    │  │
│  │ □  [img]  Short Nike  Textile    8 000  ✓    │  │
│  │ ...                                           │  │
│  │──────────────────────────────────────────────│  │
│  │  Showing 1-10 of 47      [< 1 2 3 4 5 >]    │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

- **DataTable** with sortable columns, checkbox selection
- Columns: checkbox, thumbnail (40×40), name, category badge, price (FCFA formatted), active toggle
- Row actions (dropdown): Modifier, Dupliquer, Supprimer
- Bulk actions: Supprimer sélection, Exporter CSV
- Price format: `XX XXX FCFA` (space-separated thousands)

### 3b. Product Form — `/admin/products/new` & `/admin/products/[id]/edit`

```
┌────────────────────────────────────────────────────┐
│  Ajouter un produit                    [Enregistrer]│
│  ← Retour aux produits                              │
│                                                     │
│  ┌─ Informations ────────────────────────────────┐ │
│  │  Nom *            [________________________]  │ │
│  │  Description      [________________________]  │ │
│  │                   [________________________]  │ │
│  │  Catégorie *      [Football          ▼    ]  │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌─ Tarification ────────────────────────────────┐ │
│  │  Prix (FCFA) *    [15 000    ]                │ │
│  │  Ancien prix      [20 000    ]  (barré)       │ │
│  │  Stock            [50        ]                │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌─ Images ──────────────────────────────────────┐ │
│  │  [MediaPicker: drag & drop or click]          │ │
│  │  [img1] [img2] [img3]  [+ Ajouter]           │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌─ Options ─────────────────────────────────────┐ │
│  │  Produit actif      [  toggle  ]              │ │
│  │  Produit en vedette [  toggle  ]              │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│          [Annuler]              [Enregistrer]        │
└────────────────────────────────────────────────────┘
```

- Sections as `Card` with `CardHeader` + `CardContent`
- Form fields: shadcn `Input`, `Select`, `Textarea`, `Switch`
- MediaPicker component for image selection
- Zod validation, French error messages
- Edit mode: pre-populated fields, "Enregistrer les modifications"

---

## 4. Categories (Catégories)

**Route:** `/admin/categories`

```
┌────────────────────────────────────────────────────┐
│  Catégories                              [+ Ajouter]│
│  Organisez vos produits par catégorie               │
│                                                     │
│  ┌─ Grid (reorderable) ────────────────────────┐   │
│  │                                              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │   │
│  │  │ [image]  │ │ [image]  │ │ [image]  │    │   │
│  │  │ Football │ │ Basket   │ │ Running  │    │   │
│  │  │ 12 prod. │ │ 8 prod.  │ │ 6 prod.  │    │   │
│  │  │ [⋮ menu]│ │ [⋮ menu]│ │ [⋮ menu]│    │   │
│  │  └──────────┘ └──────────┘ └──────────┘    │   │
│  │                                              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐    │   │
│  │  │ [image]  │ │ [image]  │ │ [image]  │    │   │
│  │  │ Fitness  │ │ Natation │ │ Textile  │    │   │
│  │  │ 5 prod.  │ │ 3 prod.  │ │ 13 prod. │    │   │
│  │  │ [⋮ menu]│ │ [⋮ menu]│ │ [⋮ menu]│    │   │
│  │  └──────────┘ └──────────┘ └──────────┘    │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

- 3-col grid (lg), 2-col (md), 1-col (sm)
- Card: image top, name bold, product count muted, action menu
- Drag handle or order input for reordering
- Actions: Modifier, Supprimer (blocked if has products)
- Create/Edit modal or inline form: name, slug (auto), image (MediaPicker), description

---

## 5. Promotions

**Route:** `/admin/promotions`

```
┌────────────────────────────────────────────────────┐
│  Promotions                            [+ Nouvelle] │
│  Gérez vos offres spéciales                         │
│                                                     │
│  ┌─ Table ──────────────────────────────────────┐  │
│  │ Titre       Type    Valeur  Code    Période  │  │
│  │ ────────────────────────────────────────────  │  │
│  │ Rentrée     %       -20%   RENTR   ● Active  │  │
│  │ Sept.       Fixe   -5000   SEPT5   ○ Expirée │  │
│  │ ...                                [⋮]       │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Promotion Form

- Fields: titre, description, type de remise (% / fixe toggle), valeur, code promo, dates (début/fin), actif toggle
- Date range picker (shadcn Calendar)
- Badge: `Active` (green), `Expirée` (gray), `Planifiée` (blue)
- Validation: endsAt > startsAt, value 0-100 for %, > 0 for fixed

---

## 6. Announcements (Annonces)

**Route:** `/admin/announcements`

```
┌────────────────────────────────────────────────────┐
│  Annonces                              [+ Nouvelle] │
│  Bannières et notifications du site                 │
│                                                     │
│  ┌─ List (reorderable) ────────────────────────┐   │
│  │                                              │   │
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │ 🔴 BANNER · Soldes d'été -30%         │  │   │
│  │  │ Du 01/06 au 30/06 · Active    [⋮]     │  │   │
│  │  └────────────────────────────────────────┘  │   │
│  │                                              │   │
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │ 🔵 INFO · Livraison gratuite Dakar    │  │   │
│  │  │ Permanent · Active              [⋮]    │  │   │
│  │  └────────────────────────────────────────┘  │   │
│  │                                              │   │
│  │  ┌────────────────────────────────────────┐  │   │
│  │  │ ⚪ POPUP · Nouvelle collection         │  │   │
│  │  │ Du 15/03 au 30/03 · Expirée    [⋮]    │  │   │
│  │  └────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────┘
```

### Announcement Form

- Fields: titre, contenu (Textarea), type (`banner` | `popup` | `info`), dates, actif toggle, ordre
- Type badges: Banner (red), Info (blue), Popup (gray)
- Reorderable list with drag handles

---

## 7. Messages

**Route:** `/admin/messages`

```
┌────────────────────────────────────────────────────┐
│  Messages                              [Exporter ↓] │
│  3 non lus                                          │
│                                                     │
│  ┌─ Inbox ──────────────────────────────────────┐  │
│  │  ┌── Message Item ────────────────────────┐  │  │
│  │  │ ● Moussa Diop                    · 2h  │  │  │
│  │  │   Commande maillots club               │  │  │
│  │  │   Bonjour, je souhaite commander...    │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │
│  │  ┌── Message Item ────────────────────────┐  │  │
│  │  │ ● Fatou Sow                      · 5h  │  │  │
│  │  │   Disponibilité ballons Adidas         │  │  │
│  │  │   Est-ce que vous avez...              │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  │                                              │  │
│  │  ┌── Message Item (read) ─────────────────┐  │  │
│  │  │ ○ Amadou Fall                   · hier │  │  │
│  │  │   Demande de prix en gros              │  │  │
│  │  │   Nous sommes un club et...            │  │  │
│  │  └────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌─ Message Detail (expanded) ──────────────────┐  │
│  │  De: Moussa Diop · moussa@email.com          │  │
│  │  Tél: +221 77 123 45 67                      │  │
│  │  Sujet: Commande maillots club               │  │
│  │  Date: 06 avril 2026 à 16:30                 │  │
│  │  ──────────────────────────────               │  │
│  │  Bonjour,                                     │  │
│  │  Je souhaite commander 25 maillots pour       │  │
│  │  notre club de football...                    │  │
│  │                                               │  │
│  │  [Archiver]  [Supprimer]  [Répondre WhatsApp] │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Layout Options

- **Desktop:** 2-column split — list left (320px), detail right (flex-1)
- **Mobile:** Single column, click to navigate to detail view
- Unread: bold name + subject, blue dot indicator
- Actions per message: Marquer lu, Archiver, Supprimer (with confirm dialog)
- Filter tabs: Tous / Non lus / Archivés
- Export CSV button in header

---

## 8. Quotes (Devis)

**Route:** `/admin/quotes`

```
┌────────────────────────────────────────────────────┐
│  Devis                                 [+ Nouveau]  │
│  Demandes de devis clubs & associations             │
│                                                     │
│  ┌─ Table ──────────────────────────────────────┐  │
│  │ Club          Contact     Total    Statut     │  │
│  │ ─────────────────────────────────────────────│  │
│  │ FC Dakar      M. Diallo  250 000  ● Nouveau  │  │
│  │ ASC Pikine    A. Sow     180 000  ◐ En cours │  │
│  │ Club Guédi.   F. Ba       95 000  ✓ Envoyé   │  │
│  │ ...                                           │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

### Quote Detail — `/admin/quotes/[id]`

```
┌────────────────────────────────────────────────────┐
│  ← Retour aux devis          [Générer PDF] [⋮]     │
│                                                     │
│  FC Dakar — Devis #DK-2026-001                      │
│  Contact: Mamadou Diallo · mamadou@fcdk.sn          │
│  Tél: +221 77 555 12 34                             │
│                                                     │
│  ┌─ Articles ────────────────────────────────────┐ │
│  │ Produit          Qté   Prix unit.   Total     │ │
│  │ ───────────────────────────────────────────── │ │
│  │ Maillot home      25   10 000    250 000      │ │
│  │ Short match       25    5 000    125 000      │ │
│  │ Chaussettes       25    3 000     75 000      │ │
│  │ ───────────────────────────────────────────── │ │
│  │                     Total: 450 000 FCFA       │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  Statut: [Nouveau ▼]  → En cours / Envoyé / etc.   │
└────────────────────────────────────────────────────┘
```

### Status Badges

| Status | Label FR | Color |
|---|---|---|
| new | Nouveau | Blue |
| pending | En cours | Yellow |
| sent | Envoyé | Green |
| accepted | Accepté | Green (solid) |
| rejected | Refusé | Red |

---

## 9. Settings (Paramètres)

**Route:** `/admin/settings`

```
┌────────────────────────────────────────────────────┐
│  Paramètres                                         │
│  Configuration de votre boutique                    │
│                                                     │
│  ┌─ Informations générales ──────────────────────┐ │
│  │  Nom du site       [Dakar Sport           ]   │ │
│  │  Slogan            [Tout pour le Sport    ]   │ │
│  │  Email             [promosportsdakar@...  ]   │ │
│  │                             [Enregistrer]     │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌─ Contact ─────────────────────────────────────┐ │
│  │  Téléphones:                                  │ │
│  │  [+221 33 840 09 45] [×]                      │ │
│  │  [+221 77 634 51 15] [×]                      │ │
│  │  [+221 77 041 49 30] [×]                      │ │
│  │  [+ Ajouter un numéro]                        │ │
│  │                                               │ │
│  │  Adresse   [Ave. G. Pompidou en face...]      │ │
│  │                             [Enregistrer]     │ │
│  └──────────────────────────────────────────────┘ │
│                                                     │
│  ┌─ Réseaux sociaux ────────────────────────────┐  │
│  │  Facebook   [https://facebook.com/...     ]   │  │
│  │  Instagram  [https://instagram.com/...    ]   │  │
│  │  WhatsApp   [+221 77 634 51 15            ]   │  │
│  │                             [Enregistrer]     │  │
│  └──────────────────────────────────────────────┘  │
│                                                     │
│  ┌─ Apparence ──────────────────────────────────┐  │
│  │  Logo        [MediaPicker]                    │  │
│  │  Favicon     [MediaPicker]                    │  │
│  │                             [Enregistrer]     │  │
│  └──────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────┘
```

- Each section is a `Card` with its own save button
- Phones: dynamic list with add/remove
- Inline editing: change → save per section (optimistic update + toast)
- Social links: URL inputs with icon prefix

---

## 10. Component Library

### Shared Admin Components

| Component | Usage | shadcn Base | Notes |
|---|---|---|---|
| `PageHeader` | Every admin page top | Custom | Title (h1), description (p), optional action Button |
| `DataTable` | Products, messages, quotes, promos | `Table` + `@tanstack/react-table` | Sortable, filterable, paginated, checkbox select |
| `StatCard` | Dashboard metrics | `Card` | Icon + value + label, clickable |
| `StatusBadge` | Quotes, promos, announcements | `Badge` | Color-coded by status |
| `EmptyState` | Empty tables/lists | Custom | Icon + message + CTA button |
| `ConfirmDialog` | Delete actions | `AlertDialog` | French copy: "Êtes-vous sûr ?" |
| `SearchInput` | Filter bars | `Input` | Debounced, search icon prefix |
| `FormSection` | Product/settings forms | `Card` | CardHeader (title) + CardContent (fields) |
| `MediaPicker` | Image fields | `Dialog` + custom | Grid of uploaded media, select/upload |
| `NavItem` | Sidebar | Custom | Icon + label + optional badge |
| `MobileTopBar` | Mobile header | Custom | Hamburger + title + avatar |
| `DateRangePicker` | Promos, announcements | `Calendar` + `Popover` | Start/end date selection |

### Button Variants (shadcn)

| Variant | Usage | Example |
|---|---|---|
| `default` (primary) | Main CTA | "Enregistrer", "+ Ajouter" |
| `secondary` | Secondary actions | "Annuler", "Exporter" |
| `destructive` | Delete actions | "Supprimer" |
| `outline` | Tertiary / Quick actions | "Voir tous →" |
| `ghost` | Inline actions | Row action buttons |

### Form Field Patterns

- **Label** above input, required fields with `*`
- **Error messages** below input in red, French text
- **Helper text** below input in muted, when needed
- **Spacing** between fields: `space-y-4` within section, `space-y-6` between sections

---

## 11. Color Palette & Typography

### Colors

| Token | Hex | Usage |
|---|---|---|
| `--brand-blue` | `#1E40AF` | Primary CTA, links |
| `--brand-red` | `#DC2626` | Destructive, badges, accents |
| `--sidebar-bg` | `#1E3A5F` | Sidebar background |
| `--foreground` | `#111111` | Body text |
| `--muted-foreground` | `#64748B` | Secondary text, labels |
| `--border` | `#E2E8F0` | Card/table borders |
| `--success` | `#16A34A` | Active badges, success toasts |
| `--warning` | `#D97706` | Pending badges, warning toasts |
| `--background` | `#FFFFFF` | Page & card backgrounds |
| `--muted` | `#F8FAFC` | Subtle backgrounds (table rows, hover) |

### Typography

| Element | Font | Weight | Size | Leading |
|---|---|---|---|---|
| Page title (h1) | Plus Jakarta Sans | 700 | 28px | 36px |
| Section title (h2) | Plus Jakarta Sans | 600 | 20px | 28px |
| Card title (h3) | Plus Jakarta Sans | 600 | 16px | 24px |
| Body | Plus Jakarta Sans | 400 | 14px | 22px |
| Small / Caption | Plus Jakarta Sans | 400 | 12px | 18px |
| Metric value | Plus Jakarta Sans | 700 | 36px | 40px |
| Button | Plus Jakarta Sans | 500 | 14px | 20px |
| Nav item | Plus Jakarta Sans | 500 | 14px | 20px |
| Badge | Plus Jakarta Sans | 500 | 12px | 16px |

---

## 12. Responsive Layout Summary

| Breakpoint | Sidebar | Grid cols (cards) | Table | Messages |
|---|---|---|---|---|
| `<640px` (sm) | Hidden (Sheet) | 1 | Horizontal scroll | Single column |
| `640-1023px` (md) | Hidden (Sheet) | 2 | Horizontal scroll | Single column |
| `≥1024px` (lg) | Fixed 240px | 3-4 | Full table | 2-col split |

### Mobile Adaptations

- **Top bar:** h-14, hamburger + title + user avatar
- **Forms:** Full width, stacked sections
- **Tables:** Horizontal scroll with sticky first column, or card view toggle
- **Quick actions:** Stacked vertically
- **Modals/Dialogs:** Full-screen on mobile (`Sheet` from bottom)
