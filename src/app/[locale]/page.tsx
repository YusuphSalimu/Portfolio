import Image from "next/image";
import Link from "next/link";
import { getFeaturedProjects } from "@/lib/projects";
import ContactForm from "@/components/ContactForm";
import { Link as LocaleLink } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

const services = [
  "Business websites & catalogues",
  "Web platforms & authentication",
  "Backend APIs & SaaS",
  "Data & machine learning",
];

const processSteps = [
  { title: "Discover", description: "Align on business goals, user needs, and technical constraints." },
  { title: "Build", description: "Design and implement the product in verifiable milestones." },
  { title: "Launch", description: "Handle deployment, DNS, environment checks, and release readiness." },
  { title: "Support", description: "Stay close after launch to optimize and iterate." },
];

const skillGroups = [
  { title: "Frontend", items: ["TypeScript", "JavaScript", "Next.js", "React", "Angular", "HTML5", "CSS3"] },
  { title: "Backend", items: ["Django", "Node.js", "Express.js", "Spring Boot", "REST APIs", "Celery", "Java"] },
  { title: "Data & ML", items: ["Pandas", "NumPy", "scikit-learn", "Jupyter Notebook", "Data cleaning", "Predictive modeling"] },
  { title: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Redis", "SQL"] },
  { title: "DevOps & Tools", items: ["Git", "GitHub", "GitHub Actions", "CI/CD workflows", "DNS/SSL configuration", "VS Code"] },
  { title: "Web & Commerce", items: ["Headless WordPress", "WooCommerce integrations", "SEO-conscious websites", "Python", "C++"] },
];

const certificates = [
  "Python Django 101 (Simplilearn SkillUp, Aug 2026)",
  "Fundamentals of AI (Coursera, 2026)",
  "AI Brainstorming Ideas (Coursera, 2026)",
];

const languages = [
  "Kiswahili (bilingual)",
  "English (professional working)",
  "Arabic (conversational)",
];

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

  const nav = await getTranslations("nav");
  const hero = await getTranslations("hero");
  const impact = await getTranslations("impact");
  const about = await getTranslations("about");
  const servicesText = await getTranslations("services");
  const process = await getTranslations("process");
  const selectedWork = await getTranslations("selectedWork");
  const experience = await getTranslations("experience");
  const skills = await getTranslations("skills");
  const certificatesText = await getTranslations("certificates");
  const contact = await getTranslations("contact");
  const footer = await getTranslations("footer");

  const featuredProjects = getFeaturedProjects().slice(0, 3);

  return (
    <main id="main-content" className="bg-[#0A0A0F] text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-black"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0A0F]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 md:px-8">
          <LocaleLink href={`/${locale}`} className="flex items-center gap-3 text-sm font-semibold tracking-[0.08em] text-white">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-violet-200">
              YS
            </span>
            <span>{nav("logo")}</span>
          </LocaleLink>

          <nav aria-label="Main navigation" className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            <LocaleLink href={`/${locale}/#about`}>{nav("about")}</LocaleLink>
            <LocaleLink href={`/${locale}/#skills`}>{nav("skills")}</LocaleLink>
            <LocaleLink href={`/${locale}/#projects`}>{nav("projects")}</LocaleLink>
            <LocaleLink href={`/${locale}/#experience`}>{nav("experience")}</LocaleLink>
            <LocaleLink href={`/${locale}/#contact`}>{nav("contact")}</LocaleLink>
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
              Theme
            </button>
            <button type="button" className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/80">
              EN / SW / FR
            </button>
            <LocaleLink
              href={`/${locale}/#contact`}
              className="hidden rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-sm font-medium text-white md:inline-flex"
            >
              {nav("connect")}
            </LocaleLink>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <section id="home" className="grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr] md:items-center md:py-16">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-2 text-xs font-medium text-violet-100">
              {hero("availability")}
            </div>
            <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {hero("greeting")}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">{hero("subtitle")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-6 py-3 text-sm font-semibold text-white">
                {hero("work")}
              </a>
              <a href="#contact" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90">
                {hero("contact")}
              </a>
              <a href="/cv/Yusuph_Salimu_CV.pdf" className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90">
                {hero("cv")}
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 shadow-[0_0_40px_rgba(124,92,255,0.2)] backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-white/50">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              terminal
            </div>
            <div className="space-y-3 font-mono text-sm text-white/80">
              <p>$ whoami <span className="text-violet-200">→ {hero("terminalWhoami")}</span></p>
              <p>$ location <span className="text-violet-200">→ {hero("terminalLocation")}</span></p>
              <p>$ status <span className="text-violet-200">→ {hero("terminalStatus")}</span></p>
              <p>$ stack <span className="text-violet-200">→ {hero("terminalStack")}</span></p>
            </div>
          </div>
        </section>

        <section aria-label="Impact metrics" className="grid gap-4 border-y border-white/10 py-6 md:grid-cols-4">
          {[impact("title"), impact("languages"), impact("location"), impact("remote")].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center text-sm text-white/80">
              {item}
            </div>
          ))}
        </section>

        <section id="about" className="grid gap-8 py-16 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 p-3">
            <Image
              src="/images/yusuph-salimu.png"
              alt="Yusuph Salimu"
              width={720}
              height={920}
              priority
              className="h-full w-full rounded-[20px] object-cover"
            />
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{about("eyebrow")}</p>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold md:text-5xl">{about("title")}</h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">{about("description")}</p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">{about("education")}</p>
          </div>
        </section>

        <section aria-labelledby="services-title" className="py-6 md:py-10">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{servicesText("eyebrow")}</p>
            <h2 id="services-title" className="mt-4 text-3xl font-semibold md:text-4xl">{servicesText("title")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service} className="rounded-[24px] border border-white/10 bg-white/5 p-6 text-base text-white/80 shadow-[0_0_40px_rgba(124,92,255,0.12)]">
                {service}
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-white/65">{servicesText("footnote")}</p>
        </section>

        <section aria-labelledby="process-title" className="py-16">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{process("eyebrow")}</p>
            <h2 id="process-title" className="mt-4 text-3xl font-semibold md:text-4xl">{process("title")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-[24px] border border-white/10 bg-white/5 p-6">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="py-8 md:py-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{selectedWork("eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{selectedWork("title")}</h2>
            </div>
            <LocaleLink href={`/${locale}/projects`} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/85">
              {selectedWork("viewAll")}
            </LocaleLink>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <Link key={project.slug} href={`/${locale}/projects/${project.slug}`} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(124,92,255,0.25)]">
                <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-violet-500/40 to-blue-500/30">
                  <Image
                    src={project.heroImage.src}
                    alt={project.heroImage.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-200">{project.category}</p>
                  <h3 className="mt-3 text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="experience" className="py-16">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{experience("eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{experience("title")}</h2>
          </div>

          <div className="space-y-5">
            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-semibold">{experience("clientProjects")}</h3>
                <span className="text-sm text-white/60">{experience("clientMeta")}</span>
              </div>
              <p className="mt-4 text-white/75">{experience("clientBody")}</p>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/5 p-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <h3 className="text-xl font-semibold">{experience("educationTitle")}</h3>
                <span className="text-sm text-white/60">{experience("educationMeta")}</span>
              </div>
              <p className="mt-4 text-white/75">{experience("educationBody")}</p>
            </div>
          </div>
        </section>

        <section id="skills" className="py-6 md:py-10">
          <div className="mb-8 text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{skills("eyebrow")}</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">{skills("title")}</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-[24px] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-semibold">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/75">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="certificates-title" className="py-16">
          <div className="mb-8">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{certificatesText("eyebrow")}</p>
            <h2 id="certificates-title" className="mt-4 text-3xl font-semibold md:text-4xl">{certificatesText("title")}</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {certificates.map((item) => (
              <div key={item} className="rounded-[24px] border border-white/10 bg-white/5 p-5 text-white/80">
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[24px] border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold">{certificatesText("languageTitle")}</h3>
            <ul className="mt-4 space-y-2 text-white/75">
              {languages.map((language) => <li key={language}>{language}</li>)}
            </ul>
          </div>
        </section>

        <section id="contact" className="py-16">
          <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-violet-200">{contact("eyebrow")}</p>
              <h2 className="mt-4 text-3xl font-semibold md:text-5xl">{contact("title")}</h2>

              <div className="mt-6 space-y-5 text-white/70">
                <p><strong className="text-white">Email:</strong> yusuphsaalim@gmail.com</p>
                <p><strong className="text-white">Phone:</strong> +255 716 474 311</p>
                <p><strong className="text-white">LinkedIn:</strong> <a href="https://www.linkedin.com/in/yusuph-salimu-7818333aa/" className="text-violet-200">linkedin.com/in/yusuph-salimu-7818333aa</a></p>
                <p><strong className="text-white">GitHub:</strong> <a href="https://github.com/YusuphSalimu" className="text-violet-200">github.com/YusuphSalimu</a></p>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/5 p-5 md:p-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-white/10 bg-[#0A0A0F]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-lg font-semibold">{footer("name")}</p>
            <p className="text-sm text-white/60">{footer("tag")}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-white/75">
            <a href="https://github.com/YusuphSalimu" aria-label="GitHub" className="rounded-full border border-white/10 px-3 py-2">GitHub</a>
            <a href="https://www.linkedin.com/in/yusuph-salimu-7818333aa/" aria-label="LinkedIn" className="rounded-full border border-white/10 px-3 py-2">LinkedIn</a>
          </div>
          <p className="text-sm text-white/60">{footer("rights")}</p>
        </div>
      </footer>
    </main>
  );
}
