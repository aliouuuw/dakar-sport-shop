"use client";

import { motion } from "framer-motion";
import { HugeiconsIcon } from "@hugeicons/react";
import { ZapIcon } from "@hugeicons/core-free-icons";

interface MarqueeProps {
  items: string[];
}

export function Marquee({ items }: MarqueeProps) {
  // Duplicate items to ensure smooth infinite scrolling
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden bg-[oklch(0.1_0.02_265)] text-white py-3 whitespace-nowrap relative z-30 border-y border-white/5">
      <motion.div
        className="flex items-center gap-0 font-sans"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 px-8">{item}</span>
            <span className="block w-px h-3 bg-white/15" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
