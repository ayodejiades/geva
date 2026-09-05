import { describe, it, expect } from 'vitest';
import {
  calculateWeekFromDueDate,
  calculateCycleDayFromLMP,
  calculatePostpartumWeeks,
  createEmptyUser,
  getUserFirstName,
} from '../defaultUser';

describe('Clean Patient Sanctuary & Gestational Date Calculations', () => {
  it('accurately calculates gestational week from due date', () => {
    const now = Date.now();
    // 6 weeks (42 days) remaining until due date => 40 - 6 = week 34
    const dueDateSixWeeksOut = new Date(now + 42 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    const week = calculateWeekFromDueDate(dueDateSixWeeksOut);
    expect(week).toBe(34);

    // 28 weeks (196 days) remaining => 40 - 28 = week 12
    const dueDate28WeeksOut = new Date(now + 196 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    expect(calculateWeekFromDueDate(dueDate28WeeksOut)).toBe(12);

    // Empty or invalid due date returns week 12 baseline
    expect(calculateWeekFromDueDate('')).toBe(12);
    expect(calculateWeekFromDueDate('invalid-date')).toBe(12);
  });

  it('accurately calculates cycle day from LMP for TTC', () => {
    const now = Date.now();
    // 13 days ago => Cycle Day 14
    const lmp13DaysAgo = new Date(now - 13 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    expect(calculateCycleDayFromLMP(lmp13DaysAgo)).toBe(14);

    expect(calculateCycleDayFromLMP('')).toBe(1);
  });

  it('accurately calculates postpartum weeks from baby birth date', () => {
    const now = Date.now();
    // 28 days ago => 4 weeks
    const birthFourWeeksAgo = new Date(now - 28 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    expect(calculatePostpartumWeeks(birthFourWeeksAgo)).toBe(4);

    expect(calculatePostpartumWeeks('')).toBe(1);
  });

  it('generates a 100% clean, unseeded profile for a newly signed-up pregnant patient', () => {
    const now = Date.now();
    const dueDate = new Date(now + 70 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10); // 10 weeks out => Week 30

    const patient = createEmptyUser({
      name: 'Amara Okafor',
      email: 'amara@example.com',
      stage: 'pregnancy',
      dueDate: dueDate,
      partnerName: 'Chidi',
    });

    // Profile verification
    expect(patient.user.name).toBe('Amara Okafor');
    expect(patient.user.name).not.toBe('Anjola');
    expect(patient.user.email).toBe('amara@example.com');
    expect(patient.user.partnerName).toBe('Chidi');
    expect(patient.stage).toBe('pregnancy');
    expect(patient.isGuestDemo).toBe(false);
    expect(patient.user.pregnancyWeek).toBe(30);

    // Unseeded clinical data verification (STRICT ZERO SEEDED DATA)
    expect(patient.kicks).toEqual([]);
    expect(patient.kicks.length).toBe(0);
    expect(patient.contractions).toEqual([]);
    expect(patient.contractions.length).toBe(0);
    expect(patient.clinicalNotes).toEqual([]);
    expect(patient.clinicalNotes.length).toBe(0);

    // Unseeded daily log
    expect(patient.dailyLog.waterGlasses).toBe(0);
    expect(patient.dailyLog.prenatalVitamins).toBe(false);
    expect(patient.dailyLog.gentleMovement).toBe(false);
    expect(patient.dailyLog.journalNote).toBe('');
  });

  it('does not seed name as Anjola if name is omitted', () => {
    const patient = createEmptyUser({});
    expect(patient.user.name).not.toBe('Anjola');
    expect(patient.user.name).toBe('');
  });

  it('handles separate firstName and lastName gracefully', () => {
    const patient = createEmptyUser({
      firstName: 'Folashade',
      lastName: 'Adeyemi',
    });
    expect(patient.user.name).toBe('Folashade Adeyemi');
    expect(patient.user.firstName).toBe('Folashade');
    expect(patient.user.lastName).toBe('Adeyemi');
    expect(getUserFirstName(patient.user)).toBe('Folashade');
  });

  describe('getUserFirstName', () => {
    it('extracts and capitalizes first name from full name', () => {
      expect(getUserFirstName({ name: 'Amara Okafor' })).toBe('Amara');
      expect(getUserFirstName({ name: 'folashade adebayo' })).toBe('Folashade');
    });

    it('never returns generic placeholder "Mama"', () => {
      expect(getUserFirstName({ name: 'Mama' })).toBe('');
      expect(getUserFirstName({ name: 'mama' })).toBe('');
    });

    it('extracts clean first name from email and never displays raw email', () => {
      expect(getUserFirstName({ name: 'amara@example.com' })).toBe('Amara');
      expect(getUserFirstName({ email: 'folashade.o@gmail.com' })).toBe('Folashade');
      expect(getUserFirstName({ name: 'Mama', email: 'chidi_k@domain.com' })).toBe('Chidi');
    });

    it('rejects email usernames with numbers and does not use them as first names', () => {
      expect(getUserFirstName({ name: 'Ayodejiadesegun20' })).toBe('');
      expect(getUserFirstName({ email: 'ayodejiadesegun20@gmail.com' })).toBe('');
      expect(getUserFirstName({ name: 'ayodejiadesegun20@gmail.com' })).toBe('');
      expect(getUserFirstName({ name: 'john99' })).toBe('');
    });

    it('prioritizes clean firstName when provided', () => {
      expect(getUserFirstName({ firstName: 'Ayodeji', name: 'Ayodejiadesegun20' })).toBe('Ayodeji');
      expect(getUserFirstName({ firstName: 'ayodeji' })).toBe('Ayodeji');
      expect(getUserFirstName({ name: 'Ayodeji' })).toBe('Ayodeji');
    });

    it('returns empty string when no name or valid email is provided', () => {
      expect(getUserFirstName({})).toBe('');
      expect(getUserFirstName(null)).toBe('');
      expect(getUserFirstName({ email: '12345@domain.com' })).toBe('');
    });
  });
});
