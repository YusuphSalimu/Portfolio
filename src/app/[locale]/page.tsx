import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getFeaturedProjects } from "@/lib/projects";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import { Link } from "@/i18n/routing";

const skillGroups = {
  frontend: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Next.js", "React", "Angular"],
  backend: ["Python", "Java", "C++", "SQL", "Django", "Node.js", "Express.js", "Spring Boot", "REST APIs", "Celery"],
  data: ["Pandas", "NumPy", "scikit-learn", "Jupyter Notebook", "Data cleaning", "Predictive modeling"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Redis"],
  devops: ["Git", "GitHub", "GitHub Actions", "CI/CD workflows", "DNS/SSL configuration", "VS Code"],
  web: ["Headless WordPress", "WooCommerce integrations", "SEO-conscious websites"],
} as const;

const services = [
  { key: "websites", icon: "◫" },
  { key: "platforms", icon: "◈" },
  { key: "apis", icon: "⌘" },
  { key: "ml", icon: "⌁" },
] as const;

const processSteps = ["discover", "build", "launch", "support"] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });
  return {
    title: { absolute: "Yusuph Salimu — Software Engineer | Full-Stack Developer" },
    description: t("subtitle"),
    alternates: {
      canonical: `/${locale}`,
      languages: { en: "/en", sw: "/sw", fr: "/fr" },
    },
  };
}

export default async function HomePage() {
  const t = await getTranslations();
  const projects = getFeaturedProjects().slice(0, 3);
  const testimonials: never[] = [];
  const contactCards = [
    { label: "Email", value: "yusuphsaalim@gmail.com", href: "mailto:yusuphsaalim@gmail.com", icon: "✉" },
    { label: "Phone", value: "+255 716 474 311", href: "tel:+255716474311", icon: "↗" },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/yusuph-salimu-7818333aa/", icon: "in" },
    { label: "GitHub", value: "YusuphSalimu", href: "https://github.com/YusuphSalimu", icon: "⌘" },
  ];
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Yusuph Salimu",
    jobTitle: "Software Engineer | Full-Stack Developer",
    url: "https://yusuph-portfolio.vercel.app",
    email: "mailto:yusuphsaalim@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dodoma",
      addressCountry: "TZ",
    },
    sameAs: [
      "https://www.linkedin.com/in/yusuph-salimu-7818333aa/",
      "https://github.com/YusuphSalimu",
    ],
  };

  return (
    <>
      <main id="main-content">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-section__glow" aria-hidden="true" />
          <div className="hero-layout page-shell">
            <Reveal className="hero-copy">
              <p className="availability-chip"><span aria-hidden="true" />{t("hero.availability")}</p>
              <h1 id="hero-title">{t("hero.greeting")}</h1>
              <p className="hero-subtitle">{t("hero.subtitle")}</p>
              <div className="hero-actions">
                <a className="button button--primary" href="#projects">{t("hero.viewWork")} <span aria-hidden="true">→</span></a>
                <a className="button" href="#contact">{t("hero.letsWork")}</a>
                <a className="text-button" href="/cv/Yusuph_Salimu_CV.pdf">{t("hero.downloadCv")} <span aria-hidden="true">↓</span></a>
              </div>
            </Reveal>
            <Reveal className="terminal-card glass-surface" delay={0.12}>
              <div className="terminal-card__chrome" aria-hidden="true"><i /><i /><i /><span>yusuph@portfolio</span></div>
              <dl>
                <div><dt>$ whoami</dt><dd>{t("hero.terminal.whoami")}</dd></div>
                <div><dt>$ location</dt><dd>{t("hero.terminal.location")}</dd></div>
                <div><dt>$ status</dt><dd>{t("hero.terminal.status")}</dd></div>
                <div><dt>$ stack</dt><dd>{t("hero.terminal.stack")}</dd></div>
              </dl>
            </Reveal>
          </div>
        </section>

        <div className="impact-strip page-shell" aria-label="At a glance">
          {(["clientWebsites", "siteLanguages", "location", "remoteReady"] as const).map((key) => (
            <div className="impact-item" key={key}><span className="impact-item__marker" aria-hidden="true" />{t(`impact.${key}`)}</div>
          ))}
        </div>

        <section className="content-section page-shell" id="about" aria-labelledby="about-title">
          <Reveal className="about-layout">
            <div className="about-photo">
              <Image
                src="/images/yusuph-salimu.png"
                alt="Portrait of Yusuph Salimu"
                fill
                priority
                sizes="(max-width: 760px) 80vw, 360px"
              />
            </div>
            <div className="about-copy">
              <p className="eyebrow">01 / {t("nav.about")}</p>
              <h2 className="section-title" id="about-title">{t("about.title")}</h2>
              <p>{t("about.paragraph")}</p>
              <p className="location-note">⌖ Dodoma, Tanzania</p>
            </div>
          </Reveal>
        </section>

        <section className="content-section page-shell" aria-labelledby="services-title">
          <Reveal>
            <SectionHeading eyebrow={`02 / ${t("services.title")}`} title={t("services.title")} />
            <div className="service-grid">
              {services.map(({ key, icon }, index) => (
                <Reveal key={key} delay={index * 0.06}>
                  <article className="glass-surface service-card">
                    <span className="service-card__icon" aria-hidden="true">{icon}</span>
                    <h3>{t(`services.items.${key}.title`)}</h3>
                    <p>{t(`services.items.${key}.description`)}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="deployment-note">{t("services.deploymentNote")}</p>
          </Reveal>
        </section>

        <section className="content-section page-shell" aria-labelledby="process-title">
          <Reveal>
            <SectionHeading eyebrow={`03 / ${t("process.title")}`} title={t("process.title")} />
            <div className="process-grid">
              {processSteps.map((step, index) => (
                <article className="process-step" key={step}>
                  <span className="process-step__number">0{index + 1}</span>
                  <h3>{t(`process.steps.${step}.title`).replace(/^\d+\.\s*/, "")}</h3>
                  <p>{t(`process.steps.${step}.description`)}</p>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="content-section page-shell" id="projects" aria-labelledby="projects-title">
          <Reveal>
            <SectionHeading eyebrow={`04 / ${t("nav.projects")}`} title={t("nav.projects")} description={t("projects.intro")} />
            <div id="projects-grid"><ProjectGrid projects={projects} variant="standard" /></div>
            <div className="home-projects__all">
              <Link className="button button--primary" href="/projects">{t("projects.viewAll")} <span aria-hidden="true">→</span></Link>
            </div>
          </Reveal>
        </section>

        <section className="content-section page-shell" id="experience" aria-labelledby="experience-title">
          <Reveal>
            <SectionHeading eyebrow={`05 / ${t("experience.title")}`} title={t("experience.title")} />
            <div className="timeline">
              <article className="timeline-entry">
                <span className="timeline-entry__dot" aria-hidden="true" />
                <div className="timeline-entry__meta"><span>{t("experience.timeline.independent.period")}</span><span>{t("experience.timeline.independent.location")}</span></div>
                <h3>{t("experience.timeline.independent.role")}</h3>
                <h4>{t("experience.timeline.independent.company")}</h4>
                <p>{t("experience.timeline.independent.description")}</p>
              </article>
              <article className="timeline-entry">
                <span className="timeline-entry__dot" aria-hidden="true" />
                <div className="timeline-entry__meta"><span>{t("experience.timeline.udom.period")}</span><span>{t("experience.timeline.udom.location")}</span></div>
                <h3>{t("experience.timeline.udom.role")}</h3>
                <h4>{t("experience.timeline.udom.company")}</h4>
                <p>{t("experience.timeline.udom.description")}</p>
              </article>
            </div>
          </Reveal>
        </section>

        <section className="content-section page-shell" id="skills" aria-labelledby="skills-title">
          <Reveal>
            <SectionHeading eyebrow={`06 / ${t("skills.title")}`} title={t("skills.title")} />
            <div className="skills-grid">
              {Object.entries(skillGroups).map(([group, skills]) => (
                <article className={`glass-surface skill-card skill-card--${group}`} key={group}>
                  <h3>{t(`skills.categories.${group}`)}</h3>
                  <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
                </article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="content-section page-shell" aria-labelledby="certificates-title">
          <Reveal>
            <SectionHeading eyebrow={`07 / ${t("certificates.title")}`} title={t("certificates.title")} />
            <div className="credentials-grid">
              <div>
                <h3 className="subsection-title">{t("certificates.certsTitle")}</h3>
                <ul className="certificate-list">
                  {(t.raw("certificates.items") as string[]).map((certificate) => <li className="glass-surface" key={certificate}>{certificate}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="subsection-title">{t("certificates.langsTitle")}</h3>
                <ul className="language-list">
                  {(t.raw("certificates.languages") as { name: string; level: string }[]).map((language) => (
                    <li key={language.name}><strong>{language.name}</strong><span>{language.level}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </section>

        <Testimonials items={testimonials} />

        <section className="content-section page-shell contact-section" id="contact" aria-labelledby="contact-title">
          <Reveal>
            <SectionHeading eyebrow={`08 / ${t("nav.contact")}`} title={t("contact.title")} description={t("contact.subtitle")} />
            <div className="contact-layout">
              <div className="contact-cards">
                {contactCards.map((card) => (
                  <a className="glass-surface contact-card" href={card.href} key={card.label} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>
                    <span aria-hidden="true">{card.icon}</span><span><small>{card.label}</small><strong>{card.value}</strong></span><span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </section>
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, "\\u003c") }} />
    </>
  );
}

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
