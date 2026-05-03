"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

/* ── Shared expo-out easing ─────────────────────────────────────── */
const EXPO = [0.16, 1, 0.3, 1] as const;

/* ── Cell clip-reveal variants ──────────────────────────────────── */
function cellVariant(direction: "up" | "down" | "left" | "right", delay: number) {
  const axis = direction === "left" || direction === "right" ? "x" : "y";
  const from =
    direction === "down" || direction === "right"
      ? { clipPath: "inset(100% 0 0 0)", [axis]: 60 }
      : direction === "up"
        ? { clipPath: "inset(0 0 100% 0)", [axis]: -60 }
        : { clipPath: "inset(0 100% 0 0)", [axis]: -60 };
  const to = { clipPath: "inset(0 0 0 0)", [axis]: 0 };

  return {
    hidden: { opacity: 0, ...from },
    show: {
      opacity: 1,
      ...to,
      transition: { duration: 0.88, delay, ease: EXPO },
    },
  };
}

const FADE_UP = (delay: number) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EXPO },
  },
});

const SWEEP = {
  rest: { x: "-101%" },
  hover: { x: "0%", transition: { duration: 0.38, ease: EXPO } },
};

export function HeroSection() {
  return (
    <section className="h-[100svh] min-h-[640px] max-h-[1000px] w-full overflow-hidden">

      {/* ── MOBILE: stacked layout ─────────────────────────────────── */}
      <div className="flex flex-col h-full lg:hidden">

        {/* Storefront image top half */}
        <motion.div
          className="relative flex-1 overflow-hidden"
          variants={cellVariant("down", 0)}
          initial="hidden"
          animate="show"
        >
          <Image
            src="/dakar-sport-storefront.jpeg"
            alt="Boutique Dakar Sport — Avenue G. Pompidou, Dakar"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

          {/* Mobile headline overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 pb-6 z-10">
            <motion.h1
              className="font-heading font-bold italic leading-[0.88]"
              variants={FADE_UP(0.3)}
              initial="hidden"
              animate="show"
            >
              <span className="block text-white text-6xl sm:text-7xl tracking-tight">Dakar</span>
              <span className="block text-[#DC2626] text-6xl sm:text-7xl tracking-tight">Sport</span>
            </motion.h1>
          </div>
        </motion.div>

        {/* CTA bottom strip */}
        <motion.div
          className="bg-[#1E40AF] px-5 py-6 flex flex-col gap-4"
          variants={cellVariant("up", 0.25)}
          initial="hidden"
          animate="show"
        >
          <p className="text-sm text-white/70 font-medium leading-relaxed max-w-xs">
            L&apos;équipementier de référence pour les clubs et passionnés de sport au Sénégal.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/221770414930"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-5 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#DC2626] hover:text-white transition-colors"
            >
              Commander <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </a>
            <Link
              href="/produits"
              className="inline-flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
            >
              Catalogue <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP: 2×2 asymmetric grid ───────────────────────────── */}
      <div
        className="hidden lg:grid h-full w-full"
        style={{
          gridTemplateColumns: "1.15fr 0.85fr",
          gridTemplateRows: "1.1fr 0.9fr",
          gap: "3px",
        }}
      >

        {/* ▸ Cell A — Storefront photo (top-left, large) */}
        <motion.div
          className="relative overflow-hidden noise-overlay"
          variants={cellVariant("down", 0)}
          initial="hidden"
          animate="show"
        >
          <Image
            src="/dakar-sport-storefront.jpeg"
            alt="Boutique Dakar Sport — Avenue G. Pompidou, Dakar"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 58vw"
            priority
          />
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-transparent" />

          {/* Edition stamp */}
          <motion.span
            className="absolute top-6 left-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6, ease: EXPO }}
          >
            Dakar · Sénégal · Est. 2010
          </motion.span>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-6 right-8 flex flex-col items-center gap-2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1.4, duration: 0.6, ease: EXPO }}
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white rotate-90 origin-center translate-x-5">
              Scroll
            </span>
            <div className="relative w-px h-10 bg-white/20 overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full bg-white"
                animate={{ scaleY: [0, 1, 1, 0], y: ["0%", "0%", "0%", "100%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.4, times: [0, 0.4, 0.7, 1] }}
                style={{ transformOrigin: "top" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ▸ Cell B — Red monogram (top-right) */}
        <motion.div
          className="relative overflow-hidden bg-[#DC2626] flex items-center justify-center"
          variants={cellVariant("left", 0.12)}
          initial="hidden"
          animate="show"
        >
          {/* Logo image */}
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: EXPO }}
            className="relative"
          >
            <Image
              src="/dakar-sport-logo.jpg"
              alt="Dakar Sport"
              width={200}
              height={200}
              className="w-[clamp(8rem,14vw,13rem)] h-auto object-contain brightness-0 invert opacity-20"
            />
          </motion.div>

          {/* Diagonal accent line */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[15%] w-[2px] bg-white/10"
            style={{ transform: "skewX(-6deg)" }}
          />

          {/* Eyebrow text */}
          <motion.div
            className="absolute bottom-6 left-8 right-8 flex items-center gap-3"
            variants={FADE_UP(0.7)}
            initial="hidden"
            animate="show"
          >
            <span className="block h-px w-6 bg-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/60">
              Spécialiste Sport
            </span>
          </motion.div>
        </motion.div>

        {/* ▸ Cell C — Blue type block (bottom-left) */}
        <motion.div
          className="relative overflow-hidden bg-[#1E40AF] flex flex-col justify-center px-8 xl:px-12"
          variants={cellVariant("right", 0.2)}
          initial="hidden"
          animate="show"
        >
          <motion.h1
            className="font-heading font-bold italic leading-[0.88]"
            variants={FADE_UP(0.55)}
            initial="hidden"
            animate="show"
          >
            <span className="block text-white text-[clamp(4rem,8vw,7.5rem)] tracking-tight">
              Dakar
            </span>
            <span className="block text-white/20 text-[clamp(4rem,8vw,7.5rem)] tracking-tight">
              Sport
            </span>
          </motion.h1>

          {/* Thin red rule */}
          <motion.div
            className="mt-5 h-[3px] bg-[#DC2626] origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.7, delay: 0.85, ease: EXPO }}
            style={{ width: "60px" }}
          />
        </motion.div>

        {/* ▸ Cell D — CTA + tagline (bottom-right) */}
        <motion.div
          className="relative overflow-hidden bg-white flex flex-col justify-center px-8 xl:px-12"
          variants={cellVariant("up", 0.3)}
          initial="hidden"
          animate="show"
        >
          <motion.p
            className="text-sm xl:text-base text-slate-500 font-medium leading-relaxed max-w-xs mb-8"
            variants={FADE_UP(0.75)}
            initial="hidden"
            animate="show"
          >
            L&apos;équipementier de référence pour les clubs et passionnés de sport au Sénégal.
          </motion.p>

          <motion.div
            className="flex flex-col gap-3"
            variants={FADE_UP(0.9)}
            initial="hidden"
            animate="show"
          >
            {/* Sweep CTA */}
            <motion.a
              href="https://wa.me/221770414930"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest overflow-hidden relative w-fit"
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-[#DC2626]"
                variants={SWEEP}
              />
              <span className="relative z-10 flex items-center gap-2">
                Commander
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
              </span>
            </motion.a>

            <Link
              href="/produits"
              className="group inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-900 transition-colors w-fit"
            >
              Tout le catalogue
              <HugeiconsIcon icon={ArrowRight01Icon} size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </Link>
          </motion.div>

          {/* Corner red dot accent */}
          <span
            aria-hidden="true"
            className="absolute top-5 right-5 w-2.5 h-2.5 rounded-full bg-[#DC2626]"
          />
        </motion.div>

      </div>
    </section>
  );
}
