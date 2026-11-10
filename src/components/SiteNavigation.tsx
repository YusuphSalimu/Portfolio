"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { routing } from "@/i18n/routing";

const sectionLinks = ["about", "skills", "projects", "experience", "contact"] as const;

export default function SiteNavigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const onHomePage = pathname === `/${locale}` || pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("portfolio-theme");
    const useLightTheme = storedTheme === "light";
    setLightTheme(useLightTheme);
    document.documentElement.dataset.theme = useLightTheme ? "light" : "dark";
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function toggleTheme() {
    const nextIsLight = !lightTheme;
    setLightTheme(nextIsLight);
    document.documentElement.dataset.theme = nextIsLight ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", nextIsLight ? "light" : "dark");
  }

  return (
    <>
      <a className="skip-link" href="#main-content">{t("skipToContent")}</a>
      <header className="site-header">
        <div className="site-header__inner">
          <Link className="site-logo" href={`/${locale}`} aria-label="Yusuph Salimu home">
            <span aria-hidden="true">&gt;_</span> yusuph.dev
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            {sectionLinks.map((section) => (
              <a key={section} href={`${onHomePage ? "" : `/${locale}` }#${section}`}>{t(section)}</a>
            ))}
          </nav>
          <div className="site-header__actions">
            <label className="language-switcher">
              <span className="visually-hidden">{t("language")}</span>
              <select
                value={locale}
                onChange={(event) => {
                  window.location.assign(`/${event.target.value}${pathname.replace(/^\/(en|sw|fr)/, "") || ""}`);
                }}
              >
                {routing.locales.map((availableLocale) => (
                  <option value={availableLocale} key={availableLocale}>
                    {availableLocale.toUpperCase()}
                  </option>
                ))}
              </select>
            </label>
            <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={t("themeToggle")} aria-pressed={lightTheme}>
              {lightTheme ? "☾" : "☼"}
            </button>
            <a className="button button--primary header-connect" href={`${onHomePage ? "" : `/${locale}` }#contact`}>{t("letsConnect")}</a>
            <button
              ref={menuButton}
              className="icon-button mobile-menu-toggle"
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
            </button>
          </div>
        </div>
      </header>
      <nav
        className={`mobile-navigation${menuOpen ? " mobile-navigation--open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {sectionLinks.map((section) => (
          <a key={section} href={`${onHomePage ? "" : `/${locale}` }#${section}`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{t(section)}</a>
        ))}
        <a className="button button--primary" href={`${onHomePage ? "" : `/${locale}` }#contact`} tabIndex={menuOpen ? 0 : -1} onClick={() => setMenuOpen(false)}>{t("letsConnect")}</a>
      </nav>
    </>
  );
}
