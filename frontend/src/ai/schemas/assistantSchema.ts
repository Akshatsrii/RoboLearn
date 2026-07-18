import { z } from "zod";

export const LabPackageSchema = z.object({
  tier: z.string(),
  budget: z.string(),
  grades: z.array(z.string()),
  students: z.string(),
  focus: z.string(),
  kits: z.array(z.string()),
  time: z.string(),
  badge: z.string().optional()
});

export const CurriculumItemSchema = z.object({
  title: z.string(),
  topics: z.array(z.string()),
  link: z.string().optional()
});

export const ProductSchema = z.object({
  name: z.string(),
  price: z.string(),
  tag: z.string(),
  link: z.string().optional()
});

export const ATLDataSchema = z.object({
  grant: z.string(),
  eligibility: z.string(),
  steps: z.array(z.string()),
  duration: z.string()
});

export const AssistantResponseSchema = z.object({
  type: z.enum([
    "greeting",
    "lab_recommendation",
    "products",
    "atl",
    "curriculum",
    "training",
    "booking",
    "tour",
    "fallback"
  ]),
  text: z.string(),
  package: LabPackageSchema.optional(),
  curriculum: CurriculumItemSchema.optional(),
  allCurriculum: z.record(z.string(), z.any()).optional(),
  products: z.array(ProductSchema).optional(),
  data: ATLDataSchema.optional(),
  gradeMentioned: z.enum(["1-5", "6-8", "9-12"]).nullable().optional(),
  studentCount: z.number().nullable().optional(),
  quickReplies: z.array(z.string())
});

export type LabPackage = z.infer<typeof LabPackageSchema>;
export type CurriculumItem = z.infer<typeof CurriculumItemSchema>;
export type Product = z.infer<typeof ProductSchema>;
export type ATLData = z.infer<typeof ATLDataSchema>;
export type AssistantResponse = z.infer<typeof AssistantResponseSchema>;
