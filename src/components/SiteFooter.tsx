import { getTranslations } from "next-intl/server";
import Logo from "@/components/brand/Logo";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <div><Logo /><p>{t("shortLine")}</p></div>
        <nav aria-label="Social links" className="footer-socials">
          <a href="https://www.linkedin.com/in/yusuph-salimu-7818333aa/" aria-label="LinkedIn profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 8.2H2.1V22h3.1V8.2ZM3.7 2a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6ZM22 13.9c0-4.1-2.2-6-5.1-6a4.4 4.4 0 0 0-3.9 2.1V8.2H9.9V22H13v-7.1c0-1.9.4-3.8 2.8-3.8s2.4 2.2 2.4 3.9V22h3.1l.7-8.1Z" /></svg>
          </a>
          <a href="https://github.com/YusuphSalimu" aria-label="GitHub profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .9a11.2 11.2 0 0 0-3.5 21.8c.6.1.8-.2.8-.6v-2.1c-3.3.7-4-1.4-4-1.4-.5-1.3-1.2-1.6-1.2-1.6-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.7 1.3 3.3 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3 0 4.3-2.7 5.3-5.3 5.6.4.3.8 1 .8 2v3.2c0 .4.2.7.8.6A11.2 11.2 0 0 0 12 .9Z" /></svg>
          </a>
          <a href="mailto:yusuphsaalim@gmail.com" aria-label="Send email">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.2-.1L12 11.2l7.8-5.8H4.2ZM20 7.3l-7.4 5.5a1 1 0 0 1-1.2 0L4 7.3v11.2c0 .3.2.5.5.5h15c.3 0 .5-.2.5-.5V7.3Z" /></svg>
          </a>
        </nav>
        <small>© 2026 Yusuph Salimu. {t("rights")}</small>
      </div>
    </footer>
  );
}
