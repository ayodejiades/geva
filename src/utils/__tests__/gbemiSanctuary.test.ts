import { describe, it, expect, vi } from 'vitest';
// @ts-ignore - VoiceSanctuary is a JSX component module
import { getClinicalMidwifeGuidance, getPromptSuggestions } from '../../components/VoiceSanctuary';
// @ts-ignore - speechEngine is a JavaScript module
import { speechEngine } from '../speechEngine';

describe('Gbemi Midwife Clinical Intelligence & Safety Triage', () => {
  describe('ACOG Emergency Red-Flag Triage', () => {
    it('immediately prioritizes preeclampsia triage when severe headache and facial swelling are mentioned', () => {
      const guidance = getClinicalMidwifeGuidance(
        'I have a severe headache, blurry vision, and my face is swollen',
        { stage: 'pregnancy', week: 34 }
      );

      expect(guidance).toContain('Midwife Clinical Triage');
      expect(guidance).toContain('preeclampsia');
      expect(guidance).toContain('maternity assessment unit');
      expect(guidance).not.toContain('Cantaloupe');
      expect(guidance).not.toContain('Braxton Hicks');
    });

    it('immediately prioritizes obstetric emergency triage when bright red bleeding is reported during pregnancy', () => {
      const guidance = getClinicalMidwifeGuidance(
        'I am bleeding bright red blood',
        { stage: 'pregnancy', week: 28 }
      );

      expect(guidance).toContain('Urgent Clinical Notice');
      expect(guidance).toContain('bright red vaginal bleeding');
      expect(guidance).toContain('labor triage unit or obstetrician immediately');
    });

    it('identifies postpartum hemorrhage warning signs when heavy bleeding is reported', () => {
      const guidance = getClinicalMidwifeGuidance(
        'I am bleeding through my pad every hour and passing clots',
        { stage: 'postpartum', postpartumWeeks: 2 }
      );

      expect(guidance).toContain('Postpartum Bleeding Guidance');
      expect(guidance).toContain('soaking more than one heavy sanitary pad in an hour');
      expect(guidance).toContain('maternity triage or emergency department');
    });

    it('applies 5-1-1 active labor assessment for full-term contractions', () => {
      const guidance = getClinicalMidwifeGuidance(
        'Contractions are coming every 4 minutes and my water broke',
        { stage: 'pregnancy', week: 39 }
      );

      expect(guidance).toContain('Labor Assessment (5-1-1 Rule)');
      expect(guidance).toContain('active labor');
      expect(guidance).toContain('clear or tinted fluid');
    });

    it('warns about preterm labor precautions if regular contractions occur before 37 weeks', () => {
      const guidance = getClinicalMidwifeGuidance(
        'I am having regular contractions every 8 minutes',
        { stage: 'pregnancy', week: 31 }
      );

      expect(guidance).toContain('Preterm Labor Precaution');
      expect(guidance).toContain('before 37 weeks');
      expect(guidance).toContain('phone your midwife or triage');
    });

    it('instructs immediate assessment if decreased fetal movement is reported in pregnancy', () => {
      const guidance = getClinicalMidwifeGuidance(
        'Baby is not moving as much today and movement feels decreased',
        { stage: 'pregnancy', week: 35 }
      );

      expect(guidance).toContain('Fetal Movement Protocol');
      expect(guidance).toContain('ten distinct movements');
      expect(guidance).toContain('do not wait');
    });
  });

  describe('Perinatal Stage-Specific Guidance (TTC, Pregnancy, Postpartum)', () => {
    it('explains Mittelschmerz and ovulatory twinges for TTC cramping rather than Braxton Hicks', () => {
      const guidance = getClinicalMidwifeGuidance('Are cramps normal right now?', {
        stage: 'ttc',
        cycleDay: 14,
      });

      expect(guidance).toContain('Mittelschmerz');
      expect(guidance).toContain('ovulatory');
      expect(guidance).not.toContain('Braxton Hicks');
    });

    it('explains uterine involution afterpains for postpartum cramping rather than Braxton Hicks', () => {
      const guidance = getClinicalMidwifeGuidance('Why am I having cramps while feeding my baby?', {
        stage: 'postpartum',
        postpartumWeeks: 3,
      });

      expect(guidance).toContain('afterpains');
      expect(guidance).toContain('oxytocin');
      expect(guidance).toContain('pre-pregnancy size');
      expect(guidance).not.toContain('Braxton Hicks');
    });

    it('provides fertile window guidance for ovulation questions in TTC', () => {
      const guidance = getClinicalMidwifeGuidance('When is my fertile window and LH peak?', {
        stage: 'ttc',
        cycleDay: 13,
      });

      expect(guidance).toContain('Fertile Window Midwife Guidance');
      expect(guidance).toContain('LH surge');
      expect(guidance).toContain('24 to 36 hours');
    });

    it('provides deep latch guidance for newborn feeding in postpartum', () => {
      const guidance = getClinicalMidwifeGuidance('How do I ensure baby has a deep latch?', {
        stage: 'postpartum',
        postpartumWeeks: 2,
      });

      expect(guidance).toContain('Newborn Feeding Midwife Guidance');
      expect(guidance).toContain('flanged');
      expect(guidance).toContain('IBCLC');
    });

    it('tailors fetal growth descriptions to the first trimester for early pregnancy', () => {
      const guidance = getClinicalMidwifeGuidance('How is my baby growing?', {
        stage: 'pregnancy',
        week: 8,
        milestone: { item: 'Raspberry', lengthCm: 1.6 },
      });

      expect(guidance).toContain('First Trimester Growth');
      expect(guidance).toContain('Raspberry');
      expect(guidance).not.toContain('Cantaloupe');
    });

    it('tailors fetal growth descriptions to the third trimester for late pregnancy', () => {
      const guidance = getClinicalMidwifeGuidance('How is my baby growing?', {
        stage: 'pregnancy',
        week: 34,
        milestone: { item: 'Cantaloupe', lengthCm: 45 },
      });

      expect(guidance).toContain('Third Trimester Growth');
      expect(guidance).toContain('Cantaloupe');
      expect(guidance).toContain('Alveolar surfactant');
    });
  });

  describe('Prompt Suggestions Adaptation', () => {
    it('returns conception-specific suggested queries for TTC stage', () => {
      const prompts = getPromptSuggestions('ttc');
      expect(prompts).toContain('How do I track my fertile window?');
      expect(prompts).toContain('Is mid-cycle cramping normal?');
      expect(prompts).not.toContain('How do I track movement counts?');
    });

    it('returns postpartum-specific suggested queries for postpartum stage', () => {
      const prompts = getPromptSuggestions('postpartum');
      expect(prompts).toContain('Are cramps normal while feeding?');
      expect(prompts).toContain('How do I know baby has a deep latch?');
      expect(prompts).not.toContain('How do I track movement counts?');
    });

    it('returns pregnancy-specific suggested queries for pregnancy stage', () => {
      const prompts = getPromptSuggestions('pregnancy');
      expect(prompts).toContain('How is my baby growing this week?');
      expect(prompts).toContain('How do I track movement counts?');
    });
  });

  describe('Speech Engine Lifecycle and Safety', () => {
    it('provides a stopSpeaking method to halt ongoing speech synthesis', () => {
      expect(typeof speechEngine.stopSpeaking).toBe('function');
      expect(() => speechEngine.stopSpeaking()).not.toThrow();
    });

    it('retains activeUtterance during speech synthesis to prevent V8 garbage collection', () => {
      const mockSpeak = vi.fn();
      const mockCancel = vi.fn();

      class MockUtterance {
        text: string;
        voice: SpeechSynthesisVoice | null = null;
        pitch = 1.0;
        rate = 1.0;
        onstart: (() => void) | null = null;
        onend: (() => void) | null = null;
        onerror: ((e: unknown) => void) | null = null;
        constructor(text: string) {
          this.text = text;
        }
      }

      // Mock window.speechSynthesis and global SpeechSynthesisUtterance
      const originalSynthesis = window.speechSynthesis;
      const originalUtterance = (globalThis as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance;

      (globalThis as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = MockUtterance;
      window.SpeechSynthesisUtterance = MockUtterance as unknown as typeof SpeechSynthesisUtterance;

      window.speechSynthesis = {
        speak: mockSpeak,
        cancel: mockCancel,
        getVoices: () => [],
        onvoiceschanged: null,
      } as unknown as SpeechSynthesis;

      speechEngine.speak('Hello Amara', vi.fn(), vi.fn());

      expect(speechEngine.activeUtterance).not.toBeNull();
      expect(speechEngine.activeUtterance?.text).toBe('Hello Amara');
      expect(mockSpeak).toHaveBeenCalled();

      // Release upon stopSpeaking
      speechEngine.stopSpeaking();
      expect(speechEngine.activeUtterance).toBeNull();
      expect(mockCancel).toHaveBeenCalled();

      // Restore
      window.speechSynthesis = originalSynthesis;
      (globalThis as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = originalUtterance;
    });
  });
});
