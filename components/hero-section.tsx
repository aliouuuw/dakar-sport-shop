"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const CONTAINER_VARIANTS = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const CLIP_REVEAL = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: {
    clipPath: "inset(0 0 0% 0)",
    transition: { duration: 0.78, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const FADE_UP = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const SWEEP_VARIANTS = {
  rest: { x: "-101%" },
  hover: {
    x: "0%",
    transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headlineY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [0, -110]
  );

  return (
    <section
      ref={sectionRef}
      className="relative noise-overlay bg-[oklch(0.08_0.02_265)] text-white overflow-hidden h-[92vh] min-h-[640px]"
    >
      {/* Background video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1518605368461-1e1252220a22?q=80&w=1920&auto=format&fit=crop"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/6077718/6077718-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-[oklch(0.08_0.02_265/0.72)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.08_0.02_265)] via-transparent to-transparent" />
      </div>

      {/* Swiss diagonal brand slash */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[22%] w-[3px] bg-[#DC2626] opacity-70 z-[5] hidden lg:block"
        style={{ transform: "skewX(-3.5deg)" }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[22.7%] w-[1px] bg-[#DC2626] opacity-20 z-[5] hidden lg:block"
        style={{ transform: "skewX(-3.5deg)" }}
      />

      {/* Edition label */}
      <motion.div
        className="absolute top-6 right-6 z-20 hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
          Dakar · Sénégal · Est. 2010
        </span>
      </motion.div>

      {/* Content — bottom-left anchored */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end px-5 sm:px-8 lg:px-14 pb-12 lg:pb-20 max-w-screen-xl mx-auto w-full"
        variants={CONTAINER_VARIANTS}
        initial="hidden"
        animate="show"
      >
        {/* Eyebrow */}
        <motion.div variants={CLIP_REVEAL} className="mb-4 flex items-center gap-3">
          <span className="block h-px w-8 bg-[#DC2626]" />
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            Spécialiste Sport — Dakar
          </span>
        </motion.div>

        {/* Headline with scroll parallax */}
        <motion.h1
          style={{ y: headlineY }}
          className="font-heading font-bold italic leading-[0.88] mb-8"
        >
          <motion.span
            variants={CLIP_REVEAL}
            className="block text-white text-[clamp(4.5rem,13vw,11rem)] tracking-tight"
          >
            Dakar
          </motion.span>
          <motion.span
            variants={CLIP_REVEAL}
            className="block text-[#DC2626] text-[clamp(4.5rem,13vw,11rem)] tracking-tight"
          >
            Sport
          </motion.span>
        </motion.h1>

        {/* Sub + CTAs */}
        <motion.div
          variants={FADE_UP}
          className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12"
        >
          <p className="text-sm sm:text-base text-white/60 max-w-xs font-medium leading-relaxed">
            L&apos;équipementier de référence pour les clubs et passionnés de
            sport au Sénégal.
          </p>
          <div className="flex items-center gap-4">
            {/* Sweep CTA — red fills from left on hover */}
            <motion.a
              href="https://wa.me/221770414930"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 text-xs font-bold uppercase tracking-widest overflow-hidden relative"
              initial="rest"
              whileHover="hover"
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-0 bg-[#DC2626]"
                variants={SWEEP_VARIANTS}
              />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-100">
                Commander
                <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
              </span>
            </motion.a>

            <Link
              href="/produits"
              className="inline-flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors duration-300"
            >
              Catalogue
              <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
            </Link>
          </div>
        </motion.div>

        {/* Animated scroll indicator — running line */}
        <motion.div
          variants={FADE_UP}
          className="absolute bottom-8 right-6 sm:right-14 flex flex-col items-center gap-2 opacity-40"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] rotate-90 origin-center translate-x-5">
            Scroll
          </span>
          <div className="relative w-px h-10 bg-white/20 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white"
              animate={{
                scaleY: [0, 1, 1, 0],
                y: ["0%", "0%", "0%", "100%"],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                repeatDelay: 0.4,
                times: [0, 0.4, 0.7, 1],
              }}
              style={{ transformOrigin: "top" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
