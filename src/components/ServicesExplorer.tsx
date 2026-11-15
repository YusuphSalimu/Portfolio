"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { PanelsTopLeft, ShieldCheck, ServerCog, BrainCircuit, Pause, Play } from "lucide-react";
import { useReducedMotionPreference } from "@/hooks/useReducedMotionPreference";

const services = [
  { key: "websites", icon: PanelsTopLeft },
  { key: "platforms", icon: ShieldCheck },
  { key: "apis", icon: ServerCog },
  { key: "ml", icon: BrainCircuit },
] as const;

export default function ServicesExplorer() {
  const t = useTranslations("services");
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotionPreference();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="services-explorer" data-paused={paused || reducedMotion}>
      <div className="service-tabs" role="tablist" aria-label={t("title")} aria-orientation="vertical">
        {services.map((service, index) => (
          <button key={service.key} ref={(element) => { tabs.current[index] = element; }}
            type="button" role="tab" id={`service-tab-${service.key}`} aria-selected={selected === index}
            aria-controls={`service-panel-${service.key}`} tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)} onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % services.length;
              else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + services.length) % services.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End") next = services.length - 1;
              else return;
              event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
            }}>
            <span className="service-tab__icon" aria-hidden="true"><service.icon /></span>
            <span>{t(`items.${service.key}.title`)}</span>
          </button>
        ))}
      </div>
      {services.map((service, index) => (
        <div key={service.key} role="tabpanel" id={`service-panel-${service.key}`}
          aria-labelledby={`service-tab-${service.key}`} hidden={selected !== index} tabIndex={0} className="service-panel">
          <div className="service-visual" aria-hidden="true"><span className="service-icon-plinth"><service.icon strokeWidth={1.6} /></span></div>
          <p className="eyebrow">0{index + 1} / {t("title")}</p>
          <h3>{t(`items.${service.key}.title`)}</h3>
          <p>{t(`items.${service.key}.description`)}</p>
        </div>
      ))}
      <button className="motion-control service-motion-control" type="button" disabled={reducedMotion}
        aria-pressed={paused || reducedMotion} onClick={() => setPaused(!paused)}>
        {paused || reducedMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
        {paused ? t("resumeMotion") : t("pauseMotion")}
      </button>
    </div>
  );
}
