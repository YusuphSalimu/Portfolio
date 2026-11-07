import type { ProjectEntry } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid({ projects }: { projects: ProjectEntry[] }) {
  if (projects.length === 0) {
    return (
      <p className="empty-projects">
        No published projects in this category yet. Check back soon.
      </p>
    );
  }

  return (
    <div className="project-grid">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} priority={index === 0} />
      ))}
    </div>
  );
}
