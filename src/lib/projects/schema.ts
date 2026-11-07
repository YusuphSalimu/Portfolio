import { z } from "zod";

const imageSchema = z.object({
  src: z.string().min(1),
  alt: z.string().min(10, "Image alt text must be at least 10 characters"),
});

const clientSchema = z
  .object({
    name: z.string().min(1),
    location: z.string().optional(),
    consent: z.boolean().optional(),
  })
  .transform((client) => ({
    ...client,
    name: client.consent === true ? client.name : "Confidential client",
    consent: client.consent === true,
  }));

export const projectSchema = z
  .object({
    title: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
    summary: z.string().min(1).max(160),
    category: z.enum(["web", "data-ml", "saas", "competition", "mobile"]),
    status: z.enum(["live", "case-study", "competition"]),
    role: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
    year: z.number().int().min(2000).max(2100),
    featured: z.boolean(),
    order: z.number().int(),
    published: z.boolean(),
    heroImage: imageSchema,
    features: z.array(z.string().min(1)).optional(),
    screenshots: z.array(imageSchema).optional(),
    liveUrl: z.string().url().optional(),
    repoUrl: z
      .string()
      .url()
      .refine((url) => new URL(url).hostname === "github.com", "Repository URL must be on github.com")
      .optional(),
    videoUrl: z.string().url().optional(),
    client: clientSchema.optional(),
    metrics: z
      .array(
        z.object({
          label: z.string().min(1),
          value: z.string().min(1),
          verified: z.boolean(),
        }),
      )
      .optional(),
    seo: z.object({ description: z.string().min(1).max(320) }).optional(),
  })
  .superRefine((project, context) => {
    if (project.status === "live" && !project.liveUrl) {
      context.addIssue({
        code: "custom",
        path: ["liveUrl"],
        message: 'A project with status "live" must have a liveUrl',
      });
    }
  });

export type Project = z.infer<typeof projectSchema>;
export type ProjectCategory = Project["category"];
export type ProjectStatus = Project["status"];
export type ProjectImage = z.infer<typeof imageSchema>;

export function parseProject(data: unknown, folderSlug: string): Project {
  const project = projectSchema.parse(data);
  if (project.slug !== folderSlug) {
    throw new Error(
      `Project slug "${project.slug}" does not match its folder name "${folderSlug}".`,
    );
  }
  return project;
}
