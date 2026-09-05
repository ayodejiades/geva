export type LifeStage = 'ttc' | 'conception' | 'pregnancy' | 'postpartum';

export interface KickRecord {
  id: string;
  timestamp: string; // ISO 8601
  count: number;
  sessionMinutes: number;
  fetalRhythm: 'active' | 'subtle' | 'vigorous';
  notes?: string;
}

export interface ContractionRecord {
  id: string;
  timestamp: string; // ISO 8601
  durationSec: number;
  frequencyMinutes: number;
  intensity: 1 | 2 | 3 | 4 | 5;
  isFiveOneOneActive: boolean;
}

export interface DailyWellnessLog {
  date: string; // YYYY-MM-DD
  waterGlasses: number; // 0 to 8
  prenatalVitamins: boolean;
  gentleMovement: boolean;
  sleepHours?: number;
  notes?: string;
}

export interface ClinicalVitals {
  bloodPressureSystolic?: number;
  bloodPressureDiastolic?: number;
  pulseBpm?: number;
  bloodGlucoseMgDl?: number;
  edemaLevel?: 'none' | 'trace' | 'mild' | 'severe';
}

export interface SbarBrief {
  situation: string;
  background: string;
  assessment: string;
  recommendation: string;
  generatedAt: string;
  urgencyLevel: 'routine' | 'urgent' | 'emergency';
}

export interface UserPerinatalProfile {
  id: string;
  name: string;
  partnerName?: string;
  stage: LifeStage;
  gestationalWeek?: number;
  gestationalDay?: number;
  cycleDay?: number;
  postpartumWeek?: number;
  dueDate?: string; // ISO 8601
  careProvider?: {
    name: string;
    clinic: string;
    phone: string;
    emergencyLine: string;
  };
  kicks: KickRecord[];
  contractions: ContractionRecord[];
  dailyLogs: Record<string, DailyWellnessLog>;
  vitalsHistory: ClinicalVitals[];
}
