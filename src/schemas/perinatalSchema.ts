import { z } from 'zod';

export const KickRecordSchema = z.object({
  id: z.string().min(1),
  timestamp: z.string(),
  count: z.number().int().min(1).max(100),
  sessionMinutes: z.number().min(1).max(240),
  fetalRhythm: z.enum(['active', 'subtle', 'vigorous']),
  notes: z.string().max(500).optional(),
});

export const ContractionRecordSchema = z.object({
  id: z.string().min(1),
  timestamp: z.string(),
  durationSec: z.number().min(5).max(300),
  frequencyMinutes: z.number().min(0.1).max(60),
  intensity: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5)]),
  isFiveOneOneActive: z.boolean(),
});

export const DailyWellnessLogSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  waterGlasses: z.number().int().min(0).max(8),
  prenatalVitamins: z.boolean(),
  gentleMovement: z.boolean(),
  sleepHours: z.number().min(0).max(24).optional(),
  notes: z.string().max(500).optional(),
});
