"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";

const services = [
  { key: "websites", icon: "◫" },
  { key: "platforms", icon: "◈" },
  { key: "apis", icon: "⌘" },
  { key: "ml", icon: "⌁" },
] as const;

export default function ServicesExplorer() {
  const t = useTranslations("services");
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = services[selected];

  return (
    <div className="services-explorer">
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
            <span className="service-tab__icon" aria-hidden="true">{service.icon}</span>
            <span>{t(`items.${service.key}.title`)}</span><span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {services.map((service, index) => (
        <div key={service.key} role="tabpanel" id={`service-panel-${service.key}`}
          aria-labelledby={`service-tab-${service.key}`} hidden={selected !== index} tabIndex={0} className="service-panel">
          <div className="service-visual" aria-hidden="true"><span>{current.icon}</span><i /><i /><i /></div>
          <p className="eyebrow">0{index + 1} / {t("title")}</p>
          <h3>{t(`items.${service.key}.title`)}</h3>
          <p>{t(`items.${service.key}.description`)}</p>
        </div>
      ))}
    </div>
  );
}
