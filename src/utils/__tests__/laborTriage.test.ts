import { describe, it, expect } from 'vitest';
import { evaluateFiveOneOneRule } from '../laborTriage';
import type { ContractionRecord } from '../../types/clinical';

describe('ACOG 5-1-1 Labor Triage Evaluator', () => {
  it('should flag active labor when contractions are <= 5 min apart, lasting >= 50s over 60 mins', () => {
    const now = Date.now();
    const mockContractions: ContractionRecord[] = Array.from({ length: 10 }, (_, i) => ({
      id: `c-${i}`,
      timestamp: new Date(now - (9 - i) * 5 * 60 * 1000).toISOString(),
      durationSec: 60,
      frequencyMinutes: 5,
      intensity: 4,
      isFiveOneOneActive: false,
    }));

    const result = evaluateFiveOneOneRule(mockContractions);
    expect(result.isActiveLabor).toBe(true);
    expect(result.urgencyLevel).toBe('urgent');
  });

  it('should not flag active labor for irregular or brief Braxton Hicks contractions', () => {
    const mockContractions: ContractionRecord[] = [
      { id: '1', timestamp: new Date().toISOString(), durationSec: 25, frequencyMinutes: 12, intensity: 2, isFiveOneOneActive: false },
      { id: '2', timestamp: new Date().toISOString(), durationSec: 30, frequencyMinutes: 8, intensity: 2, isFiveOneOneActive: false },
    ];

    const result = evaluateFiveOneOneRule(mockContractions);
    expect(result.isActiveLabor).toBe(false);
    expect(result.urgencyLevel).toBe('routine');
  });
});
