// src/data/milestones.js
export const babyMilestones = {
  4: { item: 'Poppy Seed', lengthCm: 0.1, weightGrams: 0.1, note: 'Blastocyst implanting into uterine lining.' },
  8: { item: 'Wild Raspberry', lengthCm: 1.6, weightGrams: 1.0, note: 'Facial features and tiny webbed fingers forming.' },
  12: { item: 'Sweet Plum', lengthCm: 5.4, weightGrams: 14.0, note: 'Reflexes active; vocal cords and fingernails present.' },
  16: { item: 'Creamy Avocado', lengthCm: 11.6, weightGrams: 100.0, note: 'Eyes moving; heart pumping 25 quarts of blood daily.' },
  20: { item: 'Cozy Banana', lengthCm: 25.6, weightGrams: 300.0, note: 'Midway ultrasound milestone; responsive to outside sound.' },
  24: { item: 'Ear of Sweetcorn', lengthCm: 30.0, weightGrams: 600.0, note: 'Lungs producing surfactant; footprints and brow formed.' },
  28: { item: 'Violet Eggplant', lengthCm: 37.6, weightGrams: 1000.0, note: 'Third trimester begins; rhythmic breathing motions.' },
  32: { item: 'Crisp Jicama', lengthCm: 42.4, weightGrams: 1700.0, note: 'Rapid brain development and bones hardening.' },
  34: { item: 'Cantaloupe', lengthCm: 45.0, weightGrams: 2150.0, note: 'Central nervous system maturing; settling into head-down position.' },
  36: { item: 'Romaine Leaf', lengthCm: 47.4, weightGrams: 2600.0, note: 'Immune system maturing; dropping lower in pelvis.' },
  40: { item: 'Watermelon', lengthCm: 51.2, weightGrams: 3400.0, note: 'Full term; ready to greet the world.' }
};

export const getMilestoneForWeek = (week) => {
  const weeks = Object.keys(babyMilestones).map(Number).sort((a, b) => a - b);
  if (!weeks.length) return null;
  const closest = weeks.reduce((prev, curr) => Math.abs(curr - week) < Math.abs(prev - week) ? curr : prev);
  return { week: closest, ...babyMilestones[closest] };
};

export const stageDetails = {
  ttc: {
    stage: 'ttc',
    name: 'Conception & Family Planning',
    subtitle: 'Nurturing your body before conception begins',
    affirmation: 'Every cycle provides valuable biological feedback. Treat your body with gentle patience and trust.',
    tips: [
      'Track your morning basal body temperature consistently.',
      'Maintain daily folic acid and pre-conception hydration.',
      'Plan restorative rest during your fertile window.'
    ]
  },
  pregnancy: {
    stage: 'pregnancy',
    name: 'Gestational Pregnancy',
    subtitle: 'Growing life day by day through three transformative trimesters',
    affirmation: 'Your body is doing sacred, complex work every second. You do not need to earn your rest today.',
    tips: [
      'Count distinct movements during your baby’s active evening hours.',
      'Sip water steadily through the afternoon to support amniotic fluid.',
      'Practice rhythmic belly breathing during Braxton Hicks surges.'
    ]
  },
  postpartum: {
    stage: 'postpartum',
    name: 'Postpartum Recovery',
    subtitle: 'Healing your maternal body while bonding with your newborn',
    affirmation: 'You were born alongside your baby today. Healing is not linear; gentle grace is your compass.',
    tips: [
      'Prioritize horizontal pelvic rest during the initial six weeks.',
      'Hydrate with nutrient-dense broths and room-temperature water.',
      'Accept community support freely for meals and household care.'
    ]
  }
};
