# Design System — Dakar Sport

> **Framework:** shadcn/ui (Radix UI) + TailwindCSS 4
> **Style:** `radix-luma` · Icons: HugeIcons · Font: Plus Jakarta Sans
> **Philosophy:** Implementation-ready specs — every token maps to a Tailwind class or CSS variable

---

## Table of Contents

1. [Color Tokens](#1-color-tokens)
2. [Typography Scale](#2-typography-scale)
3. [Spacing Scale](#3-spacing-scale)
4. [Shadow Definitions](#4-shadow-definitions)
5. [Border Radius](#5-border-radius)
6. [Component Specs](#6-component-specs)
7. [Interaction Patterns](#7-interaction-patterns)
8. [Icons](#8-icons)

---

## 1. Color Tokens

### Brand Colors

| Token | Hex | OKLCH (CSS var) | Usage |
|---|---|---|---|
| `--brand-blue` | `#1E40AF` | `oklch(0.457 0.24 277)` | Primary buttons, links, active states |
| `--brand-red` | `#DC2626` | `oklch(0.577 0.245 27)` | Destructive actions, sale badges, accents |
| `--brand-white` | `#FFFFFF` | `oklch(1 0 0)` | Backgrounds, button text on dark |
| `--brand-black` | `#111111` | `oklch(0.145 0 0)` | Body text, headings |

### Semantic Tokens

| Token | Hex | Tailwind | Usage |
|---|---|---|---|
| `primary` | `#1E40AF` | `bg-primary text-primary-foreground` | Main CTA, brand identity |
| `secondary` | `#F1F5F9` | `bg-secondary text-secondary-foreground` | Secondary buttons, subtle backgrounds |
| `destructive` | `#DC2626` | `bg-destructive text-destructive-foreground` | Delete, error states |
| `success` | `#16A34A` | `text-green-600 bg-green-50` | Active badges, success toasts, stock |
| `warning` | `#D97706` | `text-amber-600 bg-amber-50` | Pending states, expiration warnings |
| `info` | `#2563EB` | `text-blue-600 bg-blue-50` | Informational badges, planned states |
| `muted` | `#F8FAFC` | `bg-muted text-muted-foreground` | Subtle backgrounds, disabled text |

### Surface Colors

| Token | Value | Usage |
|---|---|---|
| `--background` | `#FFFFFF` | Page background |
| `--card` | `#FFFFFF` | Card surfaces |
| `--muted` | `#F8FAFC` | Table row hover, subtle sections |
| `--border` | `#E2E8F0` | Card borders, dividers, input borders |
| `--input` | `#E2E8F0` | Input field borders |
| `--ring` | `#94A3B8` | Focus ring color |
| `--sidebar` | `#1E3A5F` | Admin sidebar background |

### Status Badge Colors

| Status | Background | Text | Border |
|---|---|---|---|
| Active / En stock | `bg-green-50` | `text-green-700` | `border-green-200` |
| Inactive / Expirée | `bg-slate-50` | `text-slate-500` | `border-slate-200` |
| Pending / En cours | `bg-amber-50` | `text-amber-700` | `border-amber-200` |
| New / Nouveau | `bg-blue-50` | `text-blue-700` | `border-blue-200` |
| Error / Refusé | `bg-red-50` | `text-red-700` | `border-red-200` |
| Sale / Promo | `bg-red-600` | `text-white` | — |

---

## 2. Typography Scale

**Font family:** Plus Jakarta Sans (`--font-sans` via `next/font/google`)
**Heading font:** Plus Jakarta Sans (`--font-heading`, same family, used for bold display)

### Scale

| Level | Element | Size | Weight | Line Height | Letter Spacing | Tailwind |
|---|---|---|---|---|---|---|
| Display | Hero heading | 48px / 3rem | 700 | 1.1 | -0.02em | `text-5xl font-bold tracking-tight` |
| H1 | Page title | 28px / 1.75rem | 700 | 1.3 | -0.01em | `text-3xl font-bold tracking-tight` |
| H2 | Section title | 20px / 1.25rem | 600 | 1.4 | 0 | `text-xl font-semibold` |
| H3 | Card title | 16px / 1rem | 600 | 1.5 | 0 | `text-base font-semibold` |
| H4 | Subsection | 14px / 0.875rem | 600 | 1.5 | 0 | `text-sm font-semibold` |
| Body | Default text | 14px / 0.875rem | 400 | 1.6 | 0 | `text-sm` |
| Body Large | Descriptions | 16px / 1rem | 400 | 1.6 | 0 | `text-base` |
| Small | Captions, help | 12px / 0.75rem | 400 | 1.5 | 0 | `text-xs` |
| Metric | Dashboard numbers | 36px / 2.25rem | 700 | 1.1 | -0.02em | `text-4xl font-bold tracking-tight` |
| Price | Product price | 24px / 1.5rem | 700 | 1.2 | 0 | `text-2xl font-bold` |
| Badge | Labels | 12px / 0.75rem | 500 | 1.3 | 0 | `text-xs font-medium` |
| Button | Button text | 14px / 0.875rem | 500 | 1.4 | 0 | `text-sm font-medium` |
| Nav | Sidebar items | 14px / 0.875rem | 500 | 1.4 | 0 | `text-sm font-medium` |

### Price Formatting

- Currency: **FCFA** (Franc CFA)
- Format: `XX XXX FCFA` — space-separated thousands
- Example: `15 000 FCFA`, `1 250 000 FCFA`
- Compare-at price: `line-through text-muted-foreground`
- Savings: `text-green-600 font-medium text-sm`

---

## 3. Spacing Scale

Based on a **4px base unit**. Use Tailwind spacing utilities.

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `0.5` | 2px | `p-0.5` | Micro gaps (icon padding) |
| `1` | 4px | `p-1` | Tight spacing (badge padding) |
| `1.5` | 6px | `p-1.5` | Small internal padding |
| `2` | 8px | `p-2` | Button padding-y, compact gaps |
| `3` | 12px | `p-3` | Card internal padding (sm) |
| `4` | 16px | `p-4` | Default card padding, form field gaps |
| `5` | 20px | `p-5` | Comfortable card padding |
| `6` | 24px | `p-6` | Main content padding-x, section gaps |
| `8` | 32px | `p-8` | Large section padding-y |
| `10` | 40px | `p-10` | Page-level spacing |
| `12` | 48px | `p-12` | Footer padding, hero padding |
| `16` | 64px | `p-16` | Major section separations |
| `24` | 96px | `p-24` | Full-page centered content (404) |

### Layout Spacing Patterns

| Context | Spacing | Tailwind |
|---|---|---|
| Form field to field | 16px | `space-y-4` |
| Form section to section | 24px | `space-y-6` |
| Card grid gap | 16px (sm), 24px (lg) | `gap-4 lg:gap-6` |
| Page header to content | 24px | `mb-6` |
| Main content padding | 24px horiz, 32px vert | `px-6 py-8` |
| Table cell padding | 12px horiz, 8px vert | `px-3 py-2` |
| Sidebar item padding | 8px vert, 12px horiz | `py-2 px-3` |

---

## 4. Shadow Definitions

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| None | `none` | `shadow-none` | Default flat cards |
| Subtle | `0 1px 2px rgba(0,0,0,0.05)` | `shadow-sm` | Elevated inputs, hover states |
| Default | `0 1px 3px rgba(0,0,0,0.1)` | `shadow` | Dropdown menus, popovers |
| Medium | `0 4px 6px rgba(0,0,0,0.1)` | `shadow-md` | Card hover, floating elements |
| Large | `0 10px 15px rgba(0,0,0,0.1)` | `shadow-lg` | Modals, sheets |
| XL | `0 20px 25px rgba(0,0,0,0.1)` | `shadow-xl` | Full-screen overlays |

---

## 5. Border Radius

From `components.json`: `--radius: 0.625rem` (10px)

| Token | Value | Tailwind | Usage |
|---|---|---|---|
| `sm` | 6px | `rounded-sm` | Badges, small elements |
| `md` | 8px | `rounded-md` | Inputs, buttons |
| `lg` | 10px | `rounded-lg` | Cards, modals |
| `xl` | 14px | `rounded-xl` | Large cards, hero images |
| `2xl` | 18px | `rounded-2xl` | Feature sections |
| `full` | 9999px | `rounded-full` | Avatars, badges, dots |

---

## 6. Component Specs

### 6.1 Button

**Base:** shadcn `Button` — `components/ui/button.tsx`

| Variant | Background | Text | Border | Usage |
|---|---|---|---|---|
| `default` | `bg-primary` | `text-primary-foreground` | — | Main CTA: "Enregistrer", "+ Ajouter" |
| `secondary` | `bg-secondary` | `text-secondary-foreground` | — | "Annuler", "Exporter" |
| `destructive` | `bg-destructive` | `text-destructive-foreground` | — | "Supprimer" |
| `outline` | `bg-transparent` | `text-foreground` | `border` | Tertiary actions, filters |
| `ghost` | `bg-transparent` | `text-foreground` | — | Inline row actions, nav items |
| `link` | `bg-transparent` | `text-primary underline` | — | Inline links |

| Size | Height | Padding | Font | Usage |
|---|---|---|---|---|
| `sm` | 32px | `px-3` | 12px | Table actions, compact UI |
| `default` | 36px | `px-4` | 14px | Standard buttons |
| `lg` | 40px | `px-6` | 14px | Hero CTAs, prominent actions |
| `icon` | 36×36px | `p-2` | — | Icon-only buttons |

**States:**

| State | Style |
|---|---|
| Default | As variant |
| Hover | `opacity-90` or variant-specific darker shade |
| Active/Pressed | `scale-[0.98]` subtle press |
| Focus | `ring-2 ring-ring ring-offset-2` |
| Disabled | `opacity-50 pointer-events-none` |
| Loading | Replace text with `Loader2` spinner icon, `animate-spin`, disabled |

---

### 6.2 Input

**Base:** shadcn `Input` — `components/ui/input.tsx`

| Property | Value |
|---|---|
| Height | 36px (`h-9`) |
| Border | `border border-input rounded-md` |
| Padding | `px-3 py-1` |
| Font | `text-sm` (14px) |
| Placeholder | `text-muted-foreground` |

**States:**

| State | Style |
|---|---|
| Default | `border-input bg-transparent` |
| Hover | `border-slate-400` |
| Focus | `ring-2 ring-ring border-ring` |
| Error | `border-destructive ring-destructive/20` |
| Disabled | `opacity-50 bg-muted cursor-not-allowed` |

**Label pattern:**
```
<Label>              ← text-sm font-medium, mb-1.5
<Input />            ← h-9
<p className="text-xs text-destructive mt-1">  ← Error (French)
<p className="text-xs text-muted-foreground mt-1">  ← Helper
```

---

### 6.3 Select

**Base:** shadcn `Select` — `components/ui/select.tsx`

Same dimensions as Input (`h-9`). Trigger shows selected value + chevron.
Content: `SelectItem` list with hover highlight.
Follows same states as Input.

---

### 6.4 Textarea

**Base:** shadcn `Textarea` — `components/ui/textarea.tsx`

| Property | Value |
|---|---|
| Min height | 80px (`min-h-20`) |
| Border | Same as Input |
| Resize | `resize-y` (vertical only) |
| Rows | Default 3, product descriptions: 5 |

Same states as Input.

---

### 6.5 Card

**Base:** shadcn `Card` — `components/ui/card.tsx`

| Property | Value |
|---|---|
| Background | `bg-card` (white) |
| Border | `border border-border rounded-lg` |
| Shadow | `shadow-none` default |
| Hover (clickable) | `hover:shadow-md transition-shadow` |

**Subcomponents:**

| Part | Tailwind |
|---|---|
| `CardHeader` | `px-6 pt-6 pb-2` |
| `CardTitle` | `text-base font-semibold` (h3 level) |
| `CardDescription` | `text-sm text-muted-foreground` |
| `CardContent` | `px-6 pb-6` |
| `CardFooter` | `px-6 pb-6 pt-0 flex justify-end gap-2` |

---

### 6.6 Table (DataTable)

**Base:** shadcn `Table` + `@tanstack/react-table`

| Property | Value |
|---|---|
| Header bg | `bg-muted/50` |
| Header text | `text-xs font-medium text-muted-foreground uppercase tracking-wider` |
| Row height | 48px minimum |
| Row border | `border-b border-border` |
| Row hover | `hover:bg-muted/50 transition-colors` |
| Cell padding | `px-3 py-2` |
| Checkbox col | 40px width |
| Actions col | 60px width, right-aligned |

**Features:** Sortable headers (icon indicator), filterable, paginated (10/25/50 per page), bulk select via checkbox.

**Pagination bar:**
```
Affichage de 1-10 sur 47          [< 1 2 3 ... 5 >]
```

---

### 6.7 Dialog / Modal

**Base:** shadcn `Dialog` — `components/ui/dialog.tsx`

| Property | Value |
|---|---|
| Overlay | `bg-black/50 backdrop-blur-sm` |
| Content | `bg-background rounded-lg shadow-xl max-w-lg mx-auto` |
| Padding | `p-6` |
| Header | Title (h2 semibold) + description (muted) |
| Footer | `flex justify-end gap-2 pt-4` |
| Close | `×` button top-right |
| Animation | Fade in + scale from 95% |

**Mobile:** Full-screen via `Sheet` component (slides from bottom).

**ConfirmDialog pattern:**
```
Title: "Êtes-vous sûr ?"
Description: "Cette action est irréversible. [entity] sera supprimé définitivement."
Actions: [Annuler (secondary)] [Supprimer (destructive)]
```

---

### 6.8 Toast (Sonner)

**Base:** Sonner library integration

| Variant | Icon | Border | Usage |
|---|---|---|---|
| Success | ✓ green | `border-green-200` | "Produit enregistré avec succès" |
| Error | ✗ red | `border-red-200` | "Erreur lors de la sauvegarde" |
| Warning | ⚠ amber | `border-amber-200` | "Ce produit sera désactivé" |
| Info | ℹ blue | `border-blue-200` | "Modification en cours..." |

**Position:** Bottom-right (desktop), bottom-center (mobile)
**Duration:** 4 seconds, dismissible
**Max visible:** 3 stacked

---

### 6.9 Badge

**Base:** shadcn `Badge` — `components/ui/badge.tsx`

| Property | Value |
|---|---|
| Height | 22px |
| Padding | `px-2.5 py-0.5` |
| Font | `text-xs font-medium` |
| Border radius | `rounded-full` |

| Variant | Style | Usage |
|---|---|---|
| `default` | `bg-primary text-primary-foreground` | Category labels |
| `secondary` | `bg-secondary text-secondary-foreground` | Neutral info |
| `destructive` | `bg-destructive text-destructive-foreground` | Error, expired |
| `outline` | `border text-foreground` | Subtle labels |
| Custom status | See Status Badge Colors table above | Active/Pending/etc. |

---

### 6.10 Switch

**Base:** shadcn `Switch` — `components/ui/switch.tsx`

| Property | Value |
|---|---|
| Width | 44px |
| Height | 24px |
| Thumb | 20px circle, white |
| Track off | `bg-input` |
| Track on | `bg-primary` |

**States:** Same focus/disabled pattern as other inputs.
**Usage:** Product active/featured toggle, announcement active, promotion active.
**Label pattern:** Label text left, switch right, aligned in row.

---

### 6.11 Sidebar NavItem

**Custom component** for admin sidebar navigation.

| Property | Value |
|---|---|
| Height | 40px |
| Padding | `py-2 px-3` |
| Border radius | `rounded-md` |
| Icon | 20px HugeIcon, `mr-3` |
| Text | `text-sm font-medium` |

| State | Style |
|---|---|
| Default | `text-slate-300` icon + text |
| Hover | `bg-white/5 text-slate-200` |
| Active | `bg-blue-500/10 text-white border-l-[3px] border-blue-500` |
| Badge | `bg-red-600 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center ml-auto` |

---

### 6.12 DateRangePicker

**Composed from:** shadcn `Calendar` + `Popover` + `Button`

| Property | Value |
|---|---|
| Trigger | `Button variant="outline"` showing "01/06/2026 — 30/06/2026" |
| Calendar | Two-month view (desktop), single month (mobile) |
| Selected range | `bg-primary/10` fill, endpoints `bg-primary text-white rounded-full` |
| Today | `ring-1 ring-primary` |

**Usage:** Promotion and announcement date ranges.

---

### 6.13 Sheet (Mobile Sidebar / Mobile Dialogs)

**Base:** shadcn `Sheet` — `components/ui/sheet.tsx`

| Property | Value |
|---|---|
| Side | `left` (mobile nav), `bottom` (mobile dialogs) |
| Overlay | `bg-black/50` |
| Width (left) | `w-72` (288px) |
| Animation | Slide in from side |

---

### 6.14 Composite: PageHeader

**Custom component** — used at the top of every admin page.

```
┌────────────────────────────────────────────────────┐
│  Title                              [Action Button] │
│  Description text                                   │
└────────────────────────────────────────────────────┘
```

| Property | Value |
|---|---|
| Title | `text-3xl font-bold tracking-tight` (h1) |
| Description | `text-muted-foreground text-sm mt-1` |
| Action | Optional `Button` aligned right |
| Spacing | `mb-6` below |
| Layout | `flex items-start justify-between` |

---

### 6.15 Composite: StatCard

**Custom component** — dashboard metric cards.

```
┌─────────────────┐
│ [Icon]           │
│                  │
│ 47               │  ← metric value
│ Produits         │  ← label
└─────────────────┘
```

| Property | Value |
|---|---|
| Size | Fills grid column, `h-28` |
| Background | `bg-card border rounded-lg` |
| Icon | 28px HugeIcon, `text-muted-foreground` |
| Value | `text-4xl font-bold tracking-tight font-heading` |
| Label | `text-sm text-muted-foreground` |
| Hover | `hover:shadow-md transition-shadow cursor-pointer` |
| Click | Navigates to related section |

---

### 6.16 Composite: EmptyState

**Custom component** — shown when tables/lists are empty.

```
         [Icon 48px, muted]

    Aucun produit trouvé

    Commencez par ajouter votre
    premier produit au catalogue.

    [+ Ajouter un produit]
```

| Property | Value |
|---|---|
| Icon | 48px HugeIcon, `text-muted-foreground` |
| Title | `text-lg font-semibold` |
| Message | `text-sm text-muted-foreground max-w-sm mx-auto` |
| CTA | `Button variant="outline"` |
| Layout | `text-center py-16` |

---

### 6.17 Composite: SearchInput

**Custom component** — debounced search with icon.

| Property | Value |
|---|---|
| Icon | `Search01Icon` 16px, inside input left |
| Input | `pl-9` to accommodate icon |
| Debounce | 300ms |
| Clear | `×` button appears when has value |
| Width | `w-full max-w-sm` |

---

## 7. Interaction Patterns

### Focus Management

- All interactive elements: `focus-visible:ring-2 ring-ring ring-offset-2`
- Tab order follows visual layout (top-to-bottom, left-to-right)
- Modal traps focus inside until closed
- Escape closes modals, sheets, dropdowns

### Hover States

| Element | Hover Effect |
|---|---|
| Button | `opacity-90` or bg shade change |
| Card (clickable) | `shadow-md` transition |
| Table row | `bg-muted/50` |
| Nav item | `bg-white/5` |
| Link | `underline` or `text-primary` |
| Image | `scale-[1.02]` with overflow hidden |

### Active/Pressed States

| Element | Effect |
|---|---|
| Button | `scale-[0.98]` subtle shrink |
| Card | `ring-2 ring-primary` |
| Tab / filter | `bg-primary text-primary-foreground` |

### Disabled States

Universal pattern: `opacity-50 pointer-events-none cursor-not-allowed`

### Loading States

| Context | Pattern |
|---|---|
| Button | Replace label with `Loader2` spinner + "Chargement..." |
| Page | Suspense with skeleton placeholders |
| Table | Skeleton rows (pulse animation) |
| Card grid | Skeleton cards (pulse animation) |
| Form submit | Button disabled + spinner, inputs readonly |

### Transition Defaults

```css
transition-all duration-200 ease-in-out
```

- Color changes: `duration-150`
- Layout/size: `duration-200`
- Shadow/transform: `duration-200`
- Page transitions: none (Next.js handles)

### Skeleton Pattern

```
<div className="animate-pulse">
  <div className="h-4 bg-muted rounded w-3/4 mb-2" />
  <div className="h-4 bg-muted rounded w-1/2" />
</div>
```

### Error States (Forms)

- Input border turns `border-destructive`
- Error message appears below: `text-xs text-destructive mt-1`
- All messages in French
- Common errors:
  - Required: "Ce champ est requis"
  - Email: "Adresse email invalide"
  - Min length: "Minimum X caractères"
  - Number: "Veuillez entrer un nombre valide"
  - Price: "Le prix doit être supérieur à 0"

---

## 8. Icons

**Library:** HugeIcons React (`@hugeicons/react`)

### Icon Sizes

| Context | Size | Tailwind |
|---|---|---|
| Inline (body text) | 16px | `size-4` |
| Button icon | 16px | `size-4` |
| Nav item | 20px | `size-5` |
| Card icon | 28px | `size-7` |
| Stat card icon | 28px | `size-7` |
| Empty state | 48px | `size-12` |
| Hero / 404 | 80px | `size-20` |

### Commonly Used Icons

| Context | Icon Name |
|---|---|
| Dashboard | `Home01Icon` |
| Products | `ShoppingBag01Icon` |
| Categories | `GridIcon` |
| Promotions | `PercentIcon` |
| Announcements | `MegaphoneIcon` |
| Messages | `Mail01Icon` |
| Quotes | `Invoice01Icon` |
| Media | `Image01Icon` |
| Activity | `Clock01Icon` |
| Settings | `Settings01Icon` |
| Search | `Search01Icon` |
| Add / Create | `Add01Icon` |
| Edit | `PencilEdit01Icon` |
| Delete / Trash | `Delete01Icon` |
| Close | `Cancel01Icon` |
| Check / Success | `Tick01Icon` |
| Warning | `Alert01Icon` |
| Phone | `SmartPhone01Icon` |
| WhatsApp | Custom or `Whatsapp01Icon` |
| Location | `Location01Icon` |
| Email | `Mail01Icon` |
| Upload | `Upload01Icon` |
| Download / Export | `Download01Icon` |
| Duplicate | `Copy01Icon` |
| Sort | `ArrowUpDown01Icon` |
| Filter | `FilterIcon` |
| Menu | `Menu01Icon` |
| Chevron | `ArrowDown01Icon` |
| External link | `LinkSquare01Icon` |
| Loading | `Loading01Icon` (or Lucide `Loader2` for spinning) |
