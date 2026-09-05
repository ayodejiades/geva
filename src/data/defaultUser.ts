export function calculateWeekFromDueDate(dueDateStr?: string): number {
  if (!dueDateStr) return 12;
  const due = new Date(dueDateStr).getTime();
  if (isNaN(due)) return 12;
  const now = Date.now();
  const diffDays = Math.round((due - now) / (1000 * 60 * 60 * 24));
  // 40 weeks = 280 days total gestation
  const currentDays = 280 - diffDays;
  const currentWeek = Math.floor(currentDays / 7);
  return Math.max(1, Math.min(42, currentWeek));
}

export function calculateCycleDayFromLMP(lmpStr?: string): number {
  if (!lmpStr) return 1;
  const lmp = new Date(lmpStr).getTime();
  if (isNaN(lmp)) return 1;
  const now = Date.now();
  const diffDays = Math.floor((now - lmp) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(35, (diffDays % 28) + 1));
}

export function calculatePostpartumWeeks(birthDateStr?: string): number {
  if (!birthDateStr) return 1;
  const birth = new Date(birthDateStr).getTime();
  if (isNaN(birth)) return 1;
  const now = Date.now();
  const diffDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(diffDays / 7);
  return Math.max(1, Math.min(52, weeks || 1));
}

export interface UserProfileInput {
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  stage?: 'ttc' | 'pregnancy' | 'postpartum';
  dueDate?: string;
  targetDate?: string;
  partnerName?: string;
  bloodType?: string;
}

export function createEmptyUser(profileData: UserProfileInput = {}) {
  const stage = profileData.stage || 'pregnancy';
  const rawDate = profileData.dueDate || profileData.targetDate || '';

  let pregnancyWeek: number | undefined;
  let cycleDay: number | undefined;
  let postpartumWeeks: number | undefined;
  let dueDate = '';

  if (stage === 'pregnancy') {
    dueDate = rawDate;
    pregnancyWeek = rawDate ? calculateWeekFromDueDate(rawDate) : 12;
  } else if (stage === 'ttc') {
    cycleDay = rawDate ? calculateCycleDayFromLMP(rawDate) : 1;
  } else if (stage === 'postpartum') {
    postpartumWeeks = rawDate ? calculatePostpartumWeeks(rawDate) : 1;
  }

  const cleanFirst = profileData.firstName?.trim() || (profileData.name ? profileData.name.trim().split(/\s+/)[0] : '');
  const cleanLast = profileData.lastName?.trim() || '';
  const fullName = profileData.name?.trim() || [cleanFirst, cleanLast].filter(Boolean).join(' ');

  return {
    stage: stage,
    isGuestDemo: false,
    user: {
      name: fullName,
      firstName: cleanFirst,
      lastName: cleanLast,
      email: profileData.email || '',
      partnerName: profileData.partnerName || '',
      dueDate: dueDate,
      pregnancyWeek: pregnancyWeek,
      conceptionCycleDay: cycleDay,
      cycleDay: cycleDay,
      postpartumWeeks: postpartumWeeks,
      bloodType: profileData.bloodType || 'O+',
    },
    dailyLog: {
      date: new Date().toISOString().slice(0, 10),
      waterGlasses: 0,
      prenatalVitamins: false,
      gentleMovement: false,
      journalNote: '',
    },
    kicks: [] as Array<{ timestamp: string; count: number; sessionMinutes: number }>,
    contractions: [] as Array<{ id?: string; startTime?: string; timestamp?: string; durationSec: number; intervalMin?: number; frequencyMinutes?: number; intensity?: number }>,
    clinicalNotes: [] as Array<{ date: string; category: string; summary: string }>,
  };
}

/**
 * Extracts a clean, capitalized first name for the user.
 * Avoids email addresses, email usernames with numbers, and generic placeholders like 'Mama'.
 */
export function getUserFirstName(user?: { name?: string; firstName?: string; email?: string } | null): string {
  if (!user) return '';

  // 1. Explicit firstName field
  if (user.firstName && typeof user.firstName === 'string') {
    const trimmed = user.firstName.trim();
    if (trimmed && !/\d/.test(trimmed) && !trimmed.includes('@') && trimmed.toLowerCase() !== 'mama') {
      const first = trimmed.split(/\s+/)[0];
      return first.charAt(0).toUpperCase() + first.slice(1);
    }
  }

  // 2. Check user.name
  if (user.name && typeof user.name === 'string') {
    const trimmed = user.name.trim();

    // If name contains '@' or digits (e.g. 'ayodejiadesegun20'), it is an email or username handle, not a real first name.
    const isEmail = trimmed.includes('@');
    const hasDigits = /\d/.test(trimmed);

    if (!isEmail && !hasDigits && trimmed.toLowerCase() !== 'mama') {
      // Extract first word from full name (e.g. "Amara Okafor" -> "Amara")
      const first = trimmed.split(/\s+/)[0];
      if (first && first.toLowerCase() !== 'mama' && !/\d/.test(first)) {
        return first.charAt(0).toUpperCase() + first.slice(1);
      }
    } else if (isEmail) {
      // If someone put an email in the name field, only extract if it's purely letters without digits
      const emailPrefix = trimmed.split('@')[0];
      const part = emailPrefix.split(/[._+-]/)[0];
      if (part && !/\d/.test(part) && part.length <= 15 && part.toLowerCase() !== 'mama') {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }
    }
  }

  // 3. Fallback to email ONLY if the email prefix is purely alphabetic without digits
  if (user.email && typeof user.email === 'string') {
    const trimmedEmail = user.email.trim();
    if (trimmedEmail.includes('@')) {
      const emailPrefix = trimmedEmail.split('@')[0];
      const part = emailPrefix.split(/[._+-]/)[0];
      if (part && !/\d/.test(part) && part.length <= 15 && part.toLowerCase() !== 'mama') {
        return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
      }
    }
  }

  return '';
}
