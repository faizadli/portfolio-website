import { z } from "zod";

export const createProjectSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().optional(),
  url: z.string().url("invalid url").optional(),
  tags: z.array(z.string()).optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const createCertificateSchema = z.object({
  name: z.string().min(1, "name is required"),
  issuer: z.string().optional(),
  issued_at: z
    .string()
    .optional()
    .refine(
      (val) => !val || !Number.isNaN(Date.parse(val)),
      "issued_at must be a valid date (YYYY-MM-DD)",
    ),
  url: z.string().url("invalid url").optional(),
  skills: z.array(z.string()).optional(),
});

export const updateCertificateSchema = createCertificateSchema.partial();
