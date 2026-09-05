// src/data/personas.js

export const PERSONAS = {
  clara: {
    id: 'clara',
    title: 'Clara (Conception)',
    stage: 'ttc',
    user: {
      name: 'Clara',
      pregnancyWeek: 0,
      conceptionCycleDay: 14,
      postpartumWeeks: 0,
      partnerConnected: true,
      bloodType: 'A+',
      dueDate: ''
    },
    dailyLog: {
      date: '2026-09-03',
      waterGlasses: 6,
      prenatalVitamins: true,
      gentleMovement: true,
      journalNote: 'Cycle Day 14. Clear LH surge on digital test this morning. Resting quietly with warm lemon water.'
    },
    kicks: [],
    contractions: [],
    clinicalNotes: [
      { date: '2026-08-20', category: 'Preconception Labs', summary: 'Thyroid TSH 1.8 mIU/L, Ferritin 48 ng/mL, Rubella immune.' },
      { date: '2026-08-28', category: 'Nutritional Intake', summary: 'Methylfolate 800 mcg and Choline daily compliance verified.' }
    ]
  },
  anjola: {
    id: 'anjola',
    title: 'Anjola (Week 34)',
    stage: 'pregnancy',
    user: {
      name: 'Anjola',
      pregnancyWeek: 34,
      conceptionCycleDay: 0,
      postpartumWeeks: 0,
      partnerConnected: true,
      bloodType: 'O+',
      dueDate: '2026-10-15'
    },
    dailyLog: {
      date: '2026-09-03',
      waterGlasses: 7,
      prenatalVitamins: true,
      gentleMovement: true,
      journalNote: 'Baby is very active after dinner. Felt gentle rhythmic hiccups for 10 minutes around 7 PM.'
    },
    kicks: [
      { timestamp: '2026-09-03T19:40:00Z', count: 10, sessionMinutes: 16 },
      { timestamp: '2026-09-03T13:15:00Z', count: 10, sessionMinutes: 21 },
      { timestamp: '2026-09-02T20:10:00Z', count: 10, sessionMinutes: 18 },
      { timestamp: '2026-09-02T12:45:00Z', count: 10, sessionMinutes: 24 },
      { timestamp: '2026-09-01T21:00:00Z', count: 10, sessionMinutes: 15 },
      { timestamp: '2026-09-01T14:20:00Z', count: 10, sessionMinutes: 19 },
      { timestamp: '2026-08-31T20:30:00Z', count: 10, sessionMinutes: 17 },
      { timestamp: '2026-08-30T19:50:00Z', count: 10, sessionMinutes: 22 },
      { timestamp: '2026-08-29T21:15:00Z', count: 10, sessionMinutes: 14 },
      { timestamp: '2026-08-28T20:05:00Z', count: 10, sessionMinutes: 20 },
      { timestamp: '2026-08-27T19:30:00Z', count: 10, sessionMinutes: 18 },
      { timestamp: '2026-08-26T21:40:00Z', count: 10, sessionMinutes: 25 },
      { timestamp: '2026-08-25T20:10:00Z', count: 10, sessionMinutes: 19 },
      { timestamp: '2026-08-24T18:50:00Z', count: 10, sessionMinutes: 23 },
      { timestamp: '2026-08-23T20:45:00Z', count: 10, sessionMinutes: 16 },
      { timestamp: '2026-08-22T19:15:00Z', count: 10, sessionMinutes: 21 },
      { timestamp: '2026-08-21T21:30:00Z', count: 10, sessionMinutes: 15 },
      { timestamp: '2026-08-20T20:00:00Z', count: 10, sessionMinutes: 17 },
      { timestamp: '2026-08-19T19:25:00Z', count: 10, sessionMinutes: 22 },
      { timestamp: '2026-08-18T21:10:00Z', count: 10, sessionMinutes: 19 },
      { timestamp: '2026-08-17T20:40:00Z', count: 10, sessionMinutes: 18 },
      { timestamp: '2026-08-16T18:30:00Z', count: 10, sessionMinutes: 24 },
      { timestamp: '2026-08-15T21:00:00Z', count: 10, sessionMinutes: 16 },
      { timestamp: '2026-08-14T19:45:00Z', count: 10, sessionMinutes: 20 }
    ],
    contractions: [
      { startTime: '2026-09-03T16:10:00Z', endTime: '2026-09-03T16:10:45Z', durationSec: 45, intervalMin: 28 },
      { startTime: '2026-09-03T16:38:00Z', endTime: '2026-09-03T16:38:40Z', durationSec: 40, intervalMin: 26 },
      { startTime: '2026-09-03T17:04:00Z', endTime: '2026-09-03T17:04:42Z', durationSec: 42, intervalMin: 25 }
    ],
    clinicalNotes: [
      { date: '2026-08-14', category: '28-Week Screening', summary: '1-hour GTT normal (118 mg/dL). Hemoglobin 12.2 g/dL. Blood pressure 114/72 mmHg.' },
      { date: '2026-08-28', category: 'Growth Ultrasound', summary: 'Fundal height 34 cm. Cephalic presentation confirmed. Amniotic fluid index 14 cm (normal).' },
      { date: '2026-09-02', category: 'Triage Check', summary: 'No visual disturbances, no epigastric discomfort. Fetal movement robust.' }
    ]
  },
  maya: {
    id: 'maya',
    title: 'Maya (Postpartum)',
    stage: 'postpartum',
    user: {
      name: 'Maya',
      pregnancyWeek: 40,
      conceptionCycleDay: 0,
      postpartumWeeks: 4,
      partnerConnected: true,
      bloodType: 'B+',
      dueDate: '2026-08-06'
    },
    dailyLog: {
      date: '2026-09-03',
      waterGlasses: 8,
      prenatalVitamins: true,
      gentleMovement: true,
      journalNote: 'Baby had 4 solid sleep windows today. Partner handled the morning swaddle and warm chamomile tea.'
    },
    kicks: [],
    contractions: [],
    clinicalNotes: [
      { date: '2026-08-06', category: 'Birth Summary', summary: 'Spontaneous physiological birth at 39w5d. Healthy golden hour latch, intact perineum.' },
      { date: '2026-08-20', category: '2-Week Postpartum Visit', summary: 'Uterine involution progressing normally. Lochia serosa minimal. Edinburgh score 3.' },
      { date: '2026-08-30', category: 'Lactation & Newborn', summary: 'Infant gaining 32 grams/day. Maternal nipple tissue healthy and comfortable.' }
    ]
  }
};

// Backward-compatibility alias for legacy saved sessions
PERSONAS.elena = PERSONAS.anjola;
