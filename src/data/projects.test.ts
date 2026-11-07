import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("projects", () => {
  it("contains eight uniquely identified projects with empty media", () => {
    const slugs = projects.map((project) => project.slug);

    expect(projects).toHaveLength(8);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(projects.every((project) => project.media.length === 0)).toBe(true);
  });
});
