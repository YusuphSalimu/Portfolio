import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import ProjectsCatalog from "@/components/projects/ProjectsCatalog";
import { getAllProjects } from "@/lib/projects";

export async function generateStaticParams() {
  return ["en", "sw", "fr"].map((locale) => ({ locale }));
}

export default async function LocaleProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const projects = getAllProjects();

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 md:px-8">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-white/60">
          Portfolio / Projects
        </p>
        <h1 className="mt-2 text-4xl font-semibold md:text-5xl">Selected Work</h1>
      </header>

      <Suspense fallback={<p className="text-white/70">Loading project filters…</p>}>
        <ProjectsCatalog projects={projects} />
      </Suspense>
    </main>
  );
}
