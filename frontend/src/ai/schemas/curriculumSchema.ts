import { z } from "zod";

export const WeeklyCurriculumSchema = z.object({
  week: z.number(),
  title: z.string(),
  focus: z.string(),
  dailyPlan: z.array(z.string()),
});

export const LessonPlanSchema = z.object({
  topic: z.string(),
  duration: z.string(),
  keyConcepts: z.array(z.string()),
  activities: z.array(z.string()),
  homework: z.string(),
  teacherNotes: z.string(),
});

export const ActivitySchema = z.object({
  name: z.string(),
  materials: z.array(z.string()),
  steps: z.array(z.string()),
});

export const ProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  difficulty: z.string(),
  deliverables: z.array(z.string()),
});

export const AssessmentSchema = z.object({
  type: z.string(),
  details: z.string(),
  questions: z.array(z.string()),
});

export const CurriculumGenerationResponseSchema = z.object({
  metadata: z.object({
    subject: z.string(),
    grade: z.string(),
    duration: z.string(),
    difficulty: z.string(),
  }),
  learningOutcomes: z.array(z.string()),
  weeklyOverview: z.array(WeeklyCurriculumSchema),
  lessonPlans: z.array(LessonPlanSchema),
  activities: z.array(ActivitySchema),
  projects: z.array(ProjectSchema),
  assessments: z.array(AssessmentSchema),
  teacherNotes: z.string(),
});

export type WeeklyCurriculum = z.infer<typeof WeeklyCurriculumSchema>;
export type LessonPlan = z.infer<typeof LessonPlanSchema>;
export type Activity = z.infer<typeof ActivitySchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type Assessment = z.infer<typeof AssessmentSchema>;
export type CurriculumGenerationResponse = z.infer<typeof CurriculumGenerationResponseSchema>;
