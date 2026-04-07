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
    <div className="flex overflow-hidden bg-[#DC2626] text-white py-3 whitespace-nowrap border-y border-red-800/50 relative z-30">
      <motion.div
        className="flex items-center space-x-8 text-sm font-black uppercase tracking-[0.2em]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center space-x-8 shrink-0">
            <span>{item}</span>
            <HugeiconsIcon icon={ZapIcon} size={16} className="text-amber-400" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
