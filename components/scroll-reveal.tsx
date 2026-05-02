"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function ScrollReveal({ 
  children, 
  className, 
  delay = 0,
  direction = "up"
}: ScrollRevealProps) {
  
  const getVariants = (): Variants => {
    const hidden = { opacity: 0 };
    const visible = { 
      opacity: 1, 
      transition: { 
        duration: 0.4, 
        delay: delay / 1000, 
        ease: "circOut" as const 
      } 
    };
    
    switch (direction) {
      case "up": return { hidden: { ...hidden, y: 20 }, visible: { ...visible, y: 0 } };
      case "down": return { hidden: { ...hidden, y: -20 }, visible: { ...visible, y: 0 } };
      case "left": return { hidden: { ...hidden, x: 20 }, visible: { ...visible, x: 0 } };
      case "right": return { hidden: { ...hidden, x: -20 }, visible: { ...visible, x: 0 } };
      case "none": return { hidden, visible };
      default: return { hidden, visible };
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={getVariants()}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

