"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Compass, CodeXml, Rocket, LifeBuoy, Pause, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

const steps = [
  { key: "discover", icon: Compass },
  { key: "build", icon: CodeXml },
  { key: "launch", icon: Rocket },
  { key: "support", icon: LifeBuoy },
] as const;
const dwellMs = 5000;

export default function ProcessJourney() {
  const t = useTranslations("process");
  const reducedMotion = useReducedMotionPreference();
  const container = useRef<HTMLDivElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reading, setReading] = useState(false);
  const playing = visible && pageVisible && !paused && !reducedMotion && !reading;
  const current = steps[active];
  const title = (key: typeof current.key) => t(`steps.${key}.title`).replace(/^\d+\.\s*/, "");

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (container.current) observer.observe(container.current);
    const syncVisibility = () => setPageVisible(document.visibilityState === "visible");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => { observer.disconnect(); document.removeEventListener("visibilitychange", syncVisibility); };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => setActive((value) => (value + 1) % steps.length), dwellMs);
    return () => window.clearTimeout(timer);
  }, [playing, active]);

  function select(index: number) {
    setActive((index + steps.length) % steps.length);
    setPaused(true);
  }

  return (
    <div ref={container} className="process-journey" data-playing={playing} data-step={current.key}
      role="region" aria-roledescription={t("carousel")} aria-label={t("title")}>
      <div className="process-orbit">
        <svg className="process-orbit__ring" viewBox="0 0 280 280" aria-hidden="true">
          <circle cx="140" cy="140" r="102" />
          <circle className="process-orbit__progress" cx="140" cy="140" r="102" pathLength="100"
            strokeDasharray={`${(active + 1) * 25} 100`} />
        </svg>
        <div className="process-orbit__core" aria-hidden="true">
          <current.icon strokeWidth={1.4} />
          <span>0{active + 1}<small> / 04</small></span>
        </div>
        <ol className="process-orbit__steps">
          {steps.map((step, index) => (
            <li key={step.key}>
              <button type="button" aria-current={active === index ? "step" : undefined}
                aria-label={`${index + 1}. ${title(step.key)}`} onClick={() => select(index)}>
                <step.icon aria-hidden="true" /><span>{title(step.key)}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="process-story">
        <div className="process-story__viewport" aria-live={paused || reducedMotion ? "polite" : "off"} aria-atomic="true"
          onMouseEnter={() => setReading(true)} onMouseLeave={() => setReading(false)}
          onTouchStart={(event) => { const touch = event.touches[0]; touchStart.current = { x: touch.clientX, y: touch.clientY }; }}
          onTouchEnd={(event) => {
            const start = touchStart.current; touchStart.current = null;
            if (!start) return;
            const dx = event.changedTouches[0].clientX - start.x;
            const dy = event.changedTouches[0].clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) select(active + (dx < 0 ? 1 : -1));
          }}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.article key={current.key} className="process-story__step"
              initial={reducedMotion ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? undefined : { opacity: 0, y: -12 }} transition={{ duration: reducedMotion ? 0 : .25 }}>
              <p className="eyebrow">{t("stepCount", { current: active + 1, total: steps.length })}</p>
              <h3>{title(current.key)}</h3>
              <p>{t(`steps.${current.key}.description`)}</p>
            </motion.article>
          </AnimatePresence>
        </div>
        <div className="process-timeline" aria-hidden="true">
          {steps.map((step, index) => <span key={step.key} data-active={index === active} data-complete={index < active}>
            {index === active && <i key={`${active}-${playing}`} style={{ animationPlayState: playing ? "running" : "paused" }} />}
          </span>)}
        </div>
        <div className="process-controls">
          <button className="motion-control" type="button" disabled={reducedMotion} aria-pressed={paused || reducedMotion}
            onClick={() => setPaused(!paused)}>
            {paused || reducedMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
            {paused ? t("resume") : t("pause")}
          </button>
          <div className="process-controls__arrows">
            <button className="icon-button" type="button" aria-label={t("previous")} onClick={() => select(active - 1)}><ChevronLeft aria-hidden="true" /></button>
            <button className="icon-button" type="button" aria-label={t("next")} onClick={() => select(active + 1)}><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
