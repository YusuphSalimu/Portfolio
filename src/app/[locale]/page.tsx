import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { getAllProjects } from "@/lib/projects";
import HomeProjects from "@/components/projects/HomeProjects";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import Testimonials from "@/components/Testimonials";
import HeroIdentity from "@/components/HeroIdentity";
import ServicesExplorer from "@/components/ServicesExplorer";
import ContactIcon from "@/components/ContactIcon";
import LocationPin from "@/components/LocationPin";
import ProcessJourney from "@/components/ProcessJourney";

const skillGroups = {
  frontend: ["TypeScript", "JavaScript", "HTML5", "CSS3", "Next.js", "React", "Angular"],
  backend: ["Python", "Java", "C++", "SQL", "Django", "Node.js", "Express.js", "Spring Boot", "REST APIs", "Celery"],
  data: ["Pandas", "NumPy", "scikit-learn", "Jupyter Notebook", "Data cleaning", "Predictive modeling"],
  databases: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Redis"],
  devops: ["Git", "GitHub", "GitHub Actions", "CI/CD workflows", "DNS/SSL configuration", "VS Code"],
  web: ["Headless WordPress", "WooCommerce integrations", "SEO-conscious websites"],
} as const;


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
  const projects = getAllProjects({ environment: "production" });
  const testimonials: never[] = [];
  const contactCards = [
    { label: "Email", value: "yusuphsaalim@gmail.com", href: "mailto:yusuphsaalim@gmail.com" },
    { label: "Phone", value: "+255 716 474 311", href: "tel:+255716474311" },
    { label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/in/yusuph-salimu-7818333aa/" },
    { label: "GitHub", value: "YusuphSalimu", href: "https://github.com/YusuphSalimu" },
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
            <HeroIdentity />
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
                width={826}
                height={1062}
                sizes="(min-width: 761px) 200px, 150px"
              />
            </div>
            <div className="about-copy">
              <p className="eyebrow">01 / {t("nav.about")}</p>
              <h2 className="section-title" id="about-title">{t("about.title")}</h2>
              <p>{t("about.paragraph")}</p>
              <p className="location-note"><LocationPin /> Dodoma, Tanzania</p>
            </div>
          </Reveal>
        </section>

        <section className="content-section page-shell" aria-labelledby="services-title">
          <Reveal>
            <SectionHeading id="services-title" eyebrow={`02 / ${t("services.title")}`} title={t("services.title")} />
            <ServicesExplorer />
            <p className="deployment-note">{t("services.deploymentNote")}</p>
          </Reveal>
        </section>

        <section className="content-section page-shell" aria-labelledby="process-title">
          <Reveal>
            <SectionHeading id="process-title" eyebrow={`03 / ${t("process.title")}`} title={t("process.title")} />
            <ProcessJourney />
          </Reveal>
        </section>

        <section className="content-section page-shell" id="projects" aria-labelledby="projects-title">
          <Reveal>
            <SectionHeading id="projects-title" eyebrow={`04 / ${t("nav.projects")}`} title={t("nav.projects")} description={t("projects.intro")} />
            <HomeProjects projects={projects} />
          </Reveal>
        </section>

        <section className="content-section page-shell" id="experience" aria-labelledby="experience-title">
          <Reveal>
            <SectionHeading id="experience-title" eyebrow={`05 / ${t("experience.title")}`} title={t("experience.title")} />
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
            <SectionHeading id="skills-title" eyebrow={`06 / ${t("skills.title")}`} title={t("skills.title")} />
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
            <SectionHeading id="certificates-title" eyebrow={`07 / ${t("certificates.title")}`} title={t("certificates.title")} />
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
            <SectionHeading id="contact-title" eyebrow={`08 / ${t("nav.contact")}`} title={t("contact.title")} description={t("contact.subtitle")} />
            <div className="contact-layout">
              <div className="contact-cards">
                {contactCards.map((card) => (
                  <a className="glass-surface contact-card" href={card.href} key={card.label} target={card.href.startsWith("http") ? "_blank" : undefined} rel={card.href.startsWith("http") ? "noreferrer" : undefined}>
                    <span className={`contact-icon contact-icon--${card.label.toLowerCase()}`}><ContactIcon name={card.label} /></span><span><small>{card.label}</small><strong>{card.value}</strong></span>
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

function SectionHeading({ id, eyebrow, title, description }: { id: string; eyebrow: string; title: string; description?: string }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title" id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </header>
  );
}
