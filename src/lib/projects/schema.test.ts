import { describe, expect, it } from "vitest";
import { getAllProjects } from "./index";
import { parseProject } from "./schema";

const validProject = {
  title: "Test Project",
  slug: "test-project",
  summary: "A verified project summary for testing.",
  category: "web",
  status: "live",
  role: "Lead Developer",
  stack: ["TypeScript"],
  year: 2026,
  featured: false,
  order: 1,
  published: true,
  heroImage: {
    src: "/projects/test-project/hero.webp",
    alt: "A test project cover image",
  },
  liveUrl: "https://example.com",
};

describe("project schema and loader", () => {
  it("accepts valid project metadata", () => {
    expect(parseProject(validProject, "test-project").slug).toBe("test-project");
  });

  it("accepts approved project summaries longer than 160 characters", () => {
    expect(
      parseProject(
        { ...validProject, summary: "x".repeat(200) },
        "test-project",
      ).summary,
    ).toHaveLength(200);
  });

  it("rejects hero images with missing alt text", () => {
    expect(() =>
      parseProject(
        { ...validProject, heroImage: { src: "/hero.webp", alt: "" } },
        "test-project",
      ),
    ).toThrow(/alt text/);
  });

  it("replaces a client name when consent is false", () => {
    const project = parseProject(
      { ...validProject, client: { name: "Private Client", consent: false } },
      "test-project",
    );
    expect(project.client?.name).toBe("Confidential client");
  });

  it("rejects live projects without a live URL", () => {
    expect(() =>
      parseProject(
        { ...validProject, status: "live", liveUrl: undefined },
        "test-project",
      ),
    ).toThrow(/must have a liveUrl/);
  });

  it("requires placeholder projects to be marked as drafts", () => {
    expect(() =>
      parseProject(
        {
          ...validProject,
          heroImage: {
            src: "/projects/_placeholder/hero.webp",
            alt: "Shared project placeholder image",
          },
        },
        "test-project",
      ),
    ).toThrow(/must be marked draft/);
  });

  it("excludes draft projects when loading in production mode", () => {
    const published = getAllProjects({ environment: "production" });
    expect(published.every((project) => project.published)).toBe(true);
    expect(published.some((project) => !project.published)).toBe(false);
  });
});
