"use client";

import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "@/components/brand/Logo";
import ScrollProgress from "./ScrollProgress";

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
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    function syncTheme() {
      let storedTheme: string | null = null;
      try { storedTheme = window.localStorage.getItem("portfolio-theme"); } catch { /* Storage can be unavailable in private browsing. */ }
      const theme = storedTheme === "light" || storedTheme === "dark" ? storedTheme : preference.matches ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      setLightTheme(theme === "light");
    }
    syncTheme();
    preference.addEventListener("change", syncTheme);
    window.addEventListener("storage", syncTheme);
    return () => { preference.removeEventListener("change", syncTheme); window.removeEventListener("storage", syncTheme); };
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
    function closeOnEscape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function handleMenuKeyDown(event: ReactKeyboardEvent<HTMLElement>) {
    if (event.key !== "Tab" || !menuRef.current) return;
    const focusable = Array.from(menuRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    )).filter((element) => element.getClientRects().length > 0);
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
    try { window.localStorage.setItem("portfolio-theme", nextIsLight ? "light" : "dark"); } catch { /* The theme still works for this visit. */ }
  }

  return (
    <>
      <a className="skip-link" href="#main-content">{t("skipToContent")}</a>
      <header className="site-header">
        <ScrollProgress />
        <div className="site-header__inner">
          <Logo href={`/${locale}`} />
          <nav className="desktop-nav" aria-label="Main navigation">
            {sectionLinks.map((section) => (
              <a key={section} href={`${onHomePage ? "" : `/${locale}` }#${section}`}>{t(section)}</a>
            ))}
          </nav>
          <div className="site-header__actions">
            <LanguageSwitcher />
            <button className="icon-button theme-toggle" type="button" onClick={toggleTheme} aria-label={lightTheme ? t("darkMode") : t("lightMode")} aria-pressed={lightTheme}>
              <svg className="theme-icon theme-icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5" /></svg>
              <svg className="theme-icon theme-icon--moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" /></svg>
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
        <LanguageSwitcher mobile enabled={menuOpen} />
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
