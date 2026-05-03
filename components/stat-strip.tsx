"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedCounter({ to, duration = 1.6 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLElement>(null);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v));
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
    });
    return controls.stop;
  }, [inView, count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

const STATS = [
  { animateTo: 150, suffix: "+", label: "Clubs équipés" },
  { text: "24h",          label: "Livraison Dakar" },
  { text: "Lun–Sam",      label: "09h – 19h30" },
  { text: "G. Pompidou",  label: "En face Ali Baba, Dakar" },
] as const;

export function StatStrip() {
  return (
    <section className="bg-[#1E40AF] text-white relative overflow-hidden">
      {/* Geometric corner accent */}
      <div
        aria-hidden="true"
        className="absolute right-0 inset-y-0 w-1/3 bg-white/[0.04] pointer-events-none"
        style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      />

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/15">
          {STATS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative py-10 px-6 lg:px-10 flex flex-col gap-1 cursor-default"
            >
              {/* Animated bottom-border on hover */}
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#DC2626] group-hover:w-full transition-all duration-500 ease-out"
              />

              <span className="font-heading font-bold italic text-3xl lg:text-4xl text-white tracking-tight leading-none">
                {"animateTo" in item ? (
                  <>
                    <AnimatedCounter to={item.animateTo} />
                    {item.suffix}
                  </>
                ) : (
                  item.text
                )}
              </span>

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mt-1">
                {item.label}
              </span>

              {/* Red accent dot */}
              <span
                aria-hidden="true"
                className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#DC2626] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
