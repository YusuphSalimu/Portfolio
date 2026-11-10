import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";

export default async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer className="site-footer">
      <div className="page-shell site-footer__inner">
        <div><Link className="site-logo" href="/">Yusuph Salimu</Link><p>{t("shortLine")}</p></div>
        <nav aria-label="Social links" className="footer-socials">
          <a href="https://www.linkedin.com/in/yusuph-salimu-7818333aa/" aria-label="LinkedIn profile">LinkedIn</a>
          <a href="https://github.com/YusuphSalimu" aria-label="GitHub profile">GitHub</a>
          <a href="mailto:yusuphsaalim@gmail.com" aria-label="Send email">Email</a>
        </nav>
        <small>© 2026 Yusuph Salimu. {t("rights")}</small>
      </div>
    </footer>
  );
}
