import { cn } from "@/lib/utils";
import type React from "react";

type StorePageHeaderVariant = "blue" | "red" | "light";

interface StorePageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  variant?: StorePageHeaderVariant;
  className?: string;
}

const headerVariants: Record<StorePageHeaderVariant, string> = {
  blue: "bg-[#1E40AF] text-white",
  red: "bg-[#DC2626] text-white",
  light: "bg-white text-slate-900 border-b border-slate-100",
};

const eyebrowVariants: Record<StorePageHeaderVariant, string> = {
  blue: "text-white/45",
  red: "text-white/45",
  light: "text-[#DC2626]",
};

const descriptionVariants: Record<StorePageHeaderVariant, string> = {
  blue: "text-white/65",
  red: "text-white/65",
  light: "text-slate-600",
};

export function StorePageHeader({
  eyebrow,
  title,
  description,
  variant = "blue",
  className,
}: StorePageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden", headerVariants[variant], className)}>
      <div className="mx-auto max-w-screen-xl px-5 py-20 sm:px-8 lg:px-14 lg:py-28">
        <span className={cn("mb-4 block text-[10px] font-bold uppercase tracking-[0.3em]", eyebrowVariants[variant])}>
          {eyebrow}
        </span>
        <h1 className="font-heading text-6xl font-bold italic leading-none tracking-tight lg:text-7xl">
          {title}
        </h1>
        <p className={cn("mt-3 max-w-2xl text-sm font-medium", descriptionVariants[variant])}>
          {description}
        </p>
      </div>
    </div>
  );
}

interface StoreSectionLabelProps {
  number?: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}

export function StoreSectionLabel({ number, children, tone = "dark" }: StoreSectionLabelProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="block h-px w-6 bg-[#DC2626]" />
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.3em]",
          tone === "light" ? "text-white/60" : "text-slate-900"
        )}
      >
        {number ? `${number} — ` : null}{children}
      </span>
    </div>
  );
}

export const storeCtaClassName = {
  primary: "bg-[#1E40AF] text-white hover:bg-[#DC2626]",
  sale: "bg-[#DC2626] text-white hover:bg-[#1E40AF]",
  inverse: "bg-white text-slate-900 hover:bg-[#DC2626] hover:text-white",
  dark: "bg-[oklch(0.1_0.02_265)] text-white hover:bg-[#1E40AF]",
} as const;

export const storeSurfaceClassName = "bg-white border border-slate-200";
