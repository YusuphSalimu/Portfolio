"use client";

import { motion, useScroll } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />;
}
