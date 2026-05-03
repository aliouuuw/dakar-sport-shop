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
    <div className="flex overflow-hidden bg-[#1E40AF] text-white py-3.5 whitespace-nowrap relative z-30">
      <motion.div
        className="flex items-center gap-0 font-sans"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center shrink-0">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-white/75 px-8">{item}</span>
            <span className="block w-1.5 h-1.5 rounded-full bg-[#DC2626] opacity-80" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
