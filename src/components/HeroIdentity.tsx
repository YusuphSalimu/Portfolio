"use client";

import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useTranslations } from "next-intl";

export default function HeroIdentity() {
  const t = useTranslations("hero");
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 90, damping: 20 });
  const rotateY = useSpring(y, { stiffness: 90, damping: 20 });

  return (
    <div className="hero-scene" data-paused={paused || reducedMotion ? "true" : "false"}
      onPointerMove={(event) => {
        if (paused || reducedMotion || event.pointerType !== "mouse") return;
        const bounds = event.currentTarget.getBoundingClientRect();
        x.set((0.5 - (event.clientY - bounds.top) / bounds.height) * 10);
        y.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
      }}
      onPointerLeave={() => { x.set(0); y.set(0); }}
    >
      <span className="hero-scene__label">01 / YUSUPH.DEV</span>
      <div className="hero-scene__orbit" aria-hidden="true" />
      <motion.div className="hero-scene__object" style={{ rotateX: paused || reducedMotion ? 0 : rotateX, rotateY: paused || reducedMotion ? 0 : rotateY }}>
        <div className="hero-wordmark" aria-label="Yusuph.dev">
          <span aria-hidden="true">&lt;</span>Yusuph<span className="hero-wordmark__dot">.dev</span><span aria-hidden="true">/&gt;</span>
        </div>
        <div className="hero-gem" aria-hidden="true"><i /><i /><i /></div>
      </motion.div>
      <div className="hero-scene__foot"><span>{t("terminal.location")}</span><span>TypeScript / Next.js / Django</span></div>
      <button className="scene-control" type="button" aria-pressed={paused || !!reducedMotion}
        disabled={!!reducedMotion} aria-label={paused ? t("resumeMotion") : t("pauseMotion")}
        onClick={() => setPaused((value) => !value)}>
        <span aria-hidden="true">{paused || reducedMotion ? "▷" : "Ⅱ"}</span>
      </button>
    </div>
  );
}
