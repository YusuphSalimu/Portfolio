"use client";

import { useEffect, useRef, useState, useId } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Globe2, ChevronDown, Check } from "lucide-react";
import { routing } from "@/i18n/routing";

const names = { en: "English", sw: "Kiswahili", fr: "Français" };

export default function LanguageSwitcher({ mobile = false, enabled = true }: { mobile?: boolean; enabled?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);
  return <div ref={root} className={`language-switcher${mobile ? " language-switcher--mobile" : ""}`}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
    onKeyDown={(event) => { if (event.key === "Escape" && open) { event.stopPropagation(); setOpen(false); trigger.current?.focus(); } }}>
    <button ref={trigger} type="button" className="language-trigger" aria-label={t("language")}
      aria-expanded={open && enabled} aria-controls={id} tabIndex={enabled ? 0 : -1} onClick={() => setOpen(!open)}>
      <Globe2 aria-hidden="true" /><span>{locale.toUpperCase()}</span><ChevronDown aria-hidden="true" />
    </button>
    <div id={id} className="language-options" hidden={!open || !enabled}>
      {routing.locales.map((language) => <a key={language} href={`/${language}${pathname.replace(/^\/(en|sw|fr)/, "")}`}
        lang={language} hrefLang={language} aria-current={language === locale ? "true" : undefined}
        onClick={(event) => { event.preventDefault(); window.location.assign(`${event.currentTarget.pathname}${window.location.search}${window.location.hash}`); }}>
        <span className="language-code">{language.toUpperCase()}</span><span>{names[language]}</span>
        {language === locale && <Check aria-hidden="true" />}
      </a>)}
    </div>
  </div>;
}
