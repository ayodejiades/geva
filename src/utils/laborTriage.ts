import type { ContractionRecord } from '../types/clinical';

export interface LaborTriageResult {
  isActiveLabor: boolean;
  consecutiveEligibleCount: number;
  message: string;
  recommendedAction: string;
  urgencyLevel: 'routine' | 'monitoring' | 'urgent';
}

export function evaluateFiveOneOneRule(contractions: ContractionRecord[]): LaborTriageResult {
  if (!contractions || contractions.length < 6) {
    return {
      isActiveLabor: false,
      consecutiveEligibleCount: 0,
      message: 'Rhythm is currently irregular or monitoring session is under 60 minutes.',
      recommendedAction: 'Rest comfortably, hydrate with water, and continue logging surges.',
      urgencyLevel: 'routine',
    };
  }

  // Check contractions in the last 60 minutes
  const oneHourAgo = Date.now() - 60 * 60 * 1000;
  const recent = contractions
    .filter((c) => new Date(c.timestamp).getTime() >= oneHourAgo)
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

  let eligibleCount = 0;
  for (const c of recent) {
    // 5-1-1 Rule: Frequency <= 5 mins apart AND duration >= 50-60s
    if (c.frequencyMinutes <= 5.5 && c.durationSec >= 50) {
      eligibleCount++;
    }
  }

  // If at least 8 contractions meet the criteria within the hour
  if (eligibleCount >= 8 && recent.length >= 8) {
    return {
      isActiveLabor: true,
      consecutiveEligibleCount: eligibleCount,
      message: '5-1-1 Active Labor threshold sustained over the past 60 minutes.',
      recommendedAction: 'Call your labor and delivery triage or attending midwife immediately.',
      urgencyLevel: 'urgent',
    };
  }

  return {
    isActiveLabor: false,
    consecutiveEligibleCount: eligibleCount,
    message: 'Contractions observed but 5-1-1 active labor rhythm is not yet sustained.',
    recommendedAction: 'Practice slow paced breathing. Rest between surges.',
    urgencyLevel: 'monitoring',
  };
}
