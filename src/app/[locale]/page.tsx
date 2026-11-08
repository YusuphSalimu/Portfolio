import { Link } from "@/i18n/routing";
import { getAllProjects } from "@/lib/projects";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateStaticParams() {
  return ["en", "sw", "fr"].map((locale) => ({ locale }));
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "hero" });
  const projects = getAllProjects().slice(0, 3);

  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 md:px-8">
      <header className="glass-surface rounded-3xl border border-white/10 p-6 md:p-10">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-white/60">
          {t("availability")}
        </p>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          {t("greeting")}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-white/70">{t("subtitle")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/projects`}
            className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-medium text-white transition hover:brightness-110"
          >
            {t("work")}
          </Link>
          <Link
            href={`/${locale}/#contact`}
            className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 transition hover:bg-white/10"
          >
            {t("contact")}
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            className="glass-surface overflow-hidden rounded-3xl border border-white/10"
          >
            <div className="aspect-[16/9] w-full bg-gradient-to-br from-violet-500/40 to-blue-500/30" />
            <div className="p-5">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                {project.category}
              </p>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="mt-2 text-sm text-white/70">{project.summary}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
