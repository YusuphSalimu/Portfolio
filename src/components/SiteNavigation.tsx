"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { routing } from "@/i18n/routing";
import Logo from "@/components/brand/Logo";

const sectionLinks = ["about", "skills", "projects", "experience", "contact"] as const;

export default function SiteNavigation() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const onHomePage = pathname === `/${locale}` || pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightTheme, setLightTheme] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const wasMenuOpen = useRef(false);

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
    if (menuOpen) {
      menuRef.current?.querySelector<HTMLElement>("[data-menu-first]")?.focus();
    } else if (wasMenuOpen.current) {
      menuButton.current?.focus();
    }
    wasMenuOpen.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function changeLocale(nextLocale: string) {
    window.location.assign(`/${nextLocale}${pathname.replace(/^\/(en|sw|fr)/, "") || ""}`);
  }

  function handleMenuKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab" || !menuRef.current) return;
    const focusable = menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], select:not([disabled])',
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

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
          <Logo href={`/${locale}`} />
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
                onChange={(event) => changeLocale(event.target.value)}
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
      <button
        className={`mobile-navigation-backdrop${menuOpen ? " mobile-navigation-backdrop--open" : ""}`}
        type="button"
        aria-label="Close navigation menu"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />
      <nav
        ref={menuRef}
        className={`mobile-navigation${menuOpen ? " mobile-navigation--open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        onKeyDown={handleMenuKeyDown}
      >
        {sectionLinks.map((section, index) => (
          <a
            key={section}
            href={`${onHomePage ? "" : `/${locale}` }#${section}`}
            tabIndex={menuOpen ? 0 : -1}
            data-menu-first={index === 0 ? "" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {t(section)}
          </a>
        ))}
        <label className="language-switcher language-switcher--mobile">
          <span>{t("language")}</span>
          <select
            value={locale}
            tabIndex={menuOpen ? 0 : -1}
            onChange={(event) => changeLocale(event.target.value)}
          >
            {routing.locales.map((availableLocale) => (
              <option value={availableLocale} key={availableLocale}>
                {availableLocale.toUpperCase()}
              </option>
            ))}
          </select>
        </label>
        <a
          className="button button--primary"
          href={`${onHomePage ? "" : `/${locale}` }#contact`}
          tabIndex={menuOpen ? 0 : -1}
          onClick={() => setMenuOpen(false)}
        >
          {t("letsConnect")}
        </a>
      </nav>
    </>
  );
}
