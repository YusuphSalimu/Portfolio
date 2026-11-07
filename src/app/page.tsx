import Link from "next/link";
import ProjectGrid from "@/components/projects/ProjectGrid";
import { getFeaturedProjects } from "@/lib/projects";

export default function Home() {
  const projects = getFeaturedProjects().slice(0, 3);

  return (
    <main className="page-shell home-projects">
      <section aria-labelledby="selected-work-title">
        <header className="page-heading">
          <p className="eyebrow">Portfolio / Selected work</p>
          <h1 id="selected-work-title">Selected Work</h1>
          <p>Thoughtful software, data, and product work built to solve real problems.</p>
        </header>
        <ProjectGrid projects={projects} />
        <div className="home-projects__all">
          <Link className="button button--primary" href="/projects">
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
