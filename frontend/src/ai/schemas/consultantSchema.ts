import { z } from "zod";

export const EquipmentItemSchema = z.object({
  name: z.string(),
  quantity: z.number(),
  purpose: z.string(),
  estimatedCost: z.string(),
});

export const TimelineMilestoneSchema = z.object({
  stage: z.string(),
  weeks: z.string(),
  activities: z.array(z.string()),
  status: z.enum(["completed", "current", "upcoming"]),
});

export const BudgetBreakdownSchema = z.object({
  category: z.string(),
  amount: z.number(),
  percentage: z.number(),
  description: z.string(),
});

export const TrainingSessionSchema = z.object({
  module: z.string(),
  topic: z.string(),
  targetAudience: z.string(),
  duration: z.string(),
  outcomes: z.array(z.string()),
});

export const ExpansionPhaseSchema = z.object({
  horizon: z.string(),
  focus: z.string(),
  hardware: z.string(),
});

export const RoboticsConsultationResponseSchema = z.object({
  recommendedLabType: z.string(),
  rationale: z.string(),
  equipmentList: z.array(EquipmentItemSchema),
  productRecommendations: z.array(z.string()),
  curriculumRecommendation: z.object({
    title: z.string(),
    explanation: z.string(),
    recommendedGrades: z.array(z.string()),
    coreTopics: z.array(z.string()),
  }),
  timeline: z.array(TimelineMilestoneSchema),
  budgetBreakdown: z.array(BudgetBreakdownSchema),
  teacherTraining: z.array(TrainingSessionSchema),
  safetyGuidelines: z.array(z.string()),
  futureExpansionPlan: z.array(ExpansionPhaseSchema),
});

export type EquipmentItem = z.infer<typeof EquipmentItemSchema>;
export type TimelineMilestone = z.infer<typeof TimelineMilestoneSchema>;
export type BudgetBreakdown = z.infer<typeof BudgetBreakdownSchema>;
export type TrainingSession = z.infer<typeof TrainingSessionSchema>;
export type ExpansionPhase = z.infer<typeof ExpansionPhaseSchema>;
export type RoboticsConsultationResponse = z.infer<typeof RoboticsConsultationResponseSchema>;
