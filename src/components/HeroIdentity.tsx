"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";
import { useTranslations } from "next-intl";

export default function HeroIdentity() {
  const t = useTranslations("hero");
  const reducedMotion = useReducedMotionPreference();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 90, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 90, damping: 20 });

  return (
    <div className="hero-scene" data-paused={reducedMotion ? "true" : "false"}
      onPointerMove={(event) => {
        if (reducedMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10);
        y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <span className="hero-scene__label">01 / yusuph.dev</span>
      <div className="hero-scene__orbit" aria-hidden="true" />
      <motion.div className="hero-scene__object" style={{ rotateX: reducedMotion ? 0 : rotateX, rotateY: reducedMotion ? 0 : rotateY }}>
        <div className="hero-wordmark" aria-label="yusuph.dev">
          <span aria-hidden="true">&lt;</span>yusuph<span className="hero-wordmark__dot">.dev</span><span aria-hidden="true">/&gt;</span>
        </div>
        <div className="hero-gem" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      </motion.div>
      <div className="hero-scene__foot"><span>{t("terminal.location")}</span><span>TypeScript / Next.js / Django</span></div>
    </div>
  );
}
