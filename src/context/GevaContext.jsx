import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PERSONAS } from '../data/personas';
import {
  createEmptyUser,
  calculateWeekFromDueDate,
  calculateCycleDayFromLMP,
  calculatePostpartumWeeks
} from '../data/defaultUser';
import { partnerSync } from '../utils/partnerSync';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'geva_store_v1';
const PERSONA_ID_KEY = 'geva_active_persona';

const GevaContext = createContext(null);

export const GevaProvider = ({ children }) => {
  const [activePersonaId, setActivePersonaId] = useState(() => {
    try {
      const savedId = localStorage.getItem(PERSONA_ID_KEY);
      if (savedId === 'elena') return 'anjola';
      if (savedId && PERSONAS[savedId]) return savedId;
      if (savedId) return savedId;
    } catch {
      // fallback
    }
    return 'custom';
  });

  const [state, setState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    // New user starts with a clean, unseeded empty profile
    return createEmptyUser();
  });

  const [partnerNotification, setPartnerNotification] = useState(null);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem(PERSONA_ID_KEY, activePersonaId);
    } catch {
      // storage unavailable
    }
  }, [state, activePersonaId]);

  // Subscribe to real-time partner sync
  useEffect(() => {
    const unsubscribe = partnerSync.subscribe((data) => {
      if (!data || !data.type) return;

      if (data.type === 'KICK_RECORDED') {
        setState((prev) => ({
          ...prev,
          kicks: [data.payload, ...(prev.kicks || [])]
        }));
        setPartnerNotification({
          type: 'kick',
          message: `Movement recorded: ${data.payload.count} kicks in ${data.payload.sessionMinutes} minutes.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      } else if (data.type === 'CONTRACTION_RECORDED') {
        setState((prev) => ({
          ...prev,
          contractions: [data.payload, ...(prev.contractions || [])]
        }));
        setPartnerNotification({
          type: 'contraction',
          message: `Contraction surged for ${data.payload.durationSec}s. Rest and breathe together.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const switchPersona = useCallback((personaId) => {
    const targetId = personaId === 'elena' ? 'anjola' : personaId;
    if (!PERSONAS[targetId]) return;
    const persona = JSON.parse(JSON.stringify(PERSONAS[targetId]));
    setActivePersonaId(targetId);
    setState(persona);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persona));
      localStorage.setItem(PERSONA_ID_KEY, targetId);
    } catch {
      // ignore
    }
  }, []);

  const setStage = useCallback((stage) => {
    setState((prev) => ({ ...prev, stage }));
  }, []);

  const registerNewPatient = useCallback((profileData) => {
    const cleanProfile = createEmptyUser(profileData);
    setActivePersonaId('custom');
    setState(cleanProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanProfile));
      localStorage.setItem(PERSONA_ID_KEY, 'custom');
    } catch {
      // storage unavailable
    }
  }, []);

  const resetToCleanSlate = useCallback(() => {
    const cleanProfile = createEmptyUser();
    setActivePersonaId('custom');
    setState(cleanProfile);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleanProfile));
      localStorage.setItem(PERSONA_ID_KEY, 'custom');
    } catch {
      // storage unavailable
    }
  }, []);

  const setUserProfile = useCallback((profileData) => {
    setState((prev) => {
      const newStage = profileData.stage || prev.stage;
      const targetDate = profileData.dueDate !== undefined ? profileData.dueDate : prev.user?.dueDate;
      let pregnancyWeek = prev.user?.pregnancyWeek;
      let cycleDay = prev.user?.conceptionCycleDay;
      let postpartumWeeks = prev.user?.postpartumWeeks;

      if (newStage === 'pregnancy' && targetDate) {
        pregnancyWeek = calculateWeekFromDueDate(targetDate);
      } else if (newStage === 'ttc' && targetDate) {
        cycleDay = calculateCycleDayFromLMP(targetDate);
      } else if (newStage === 'postpartum' && targetDate) {
        postpartumWeeks = calculatePostpartumWeeks(targetDate);
      }

      return {
        ...prev,
        stage: newStage,
        user: {
          ...prev.user,
          ...profileData,
          dueDate: targetDate || '',
          pregnancyWeek: pregnancyWeek || (newStage === 'pregnancy' ? 12 : undefined),
          conceptionCycleDay: cycleDay,
          cycleDay: cycleDay,
          postpartumWeeks: postpartumWeeks
        }
      };
    });
  }, []);

  const setWaterGlasses = useCallback((count) => {
    setState((prev) => {
      const newCount = Math.max(0, Math.min(8, count));
      const newLog = { ...prev.dailyLog, waterGlasses: newCount };
      
      // Check if all completed
      if (newCount === 8 && newLog.prenatalVitamins && newLog.gentleMovement) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#DDA59F', '#9CAF88', '#F4C095']
        });
      }
      return { ...prev, dailyLog: newLog };
    });
  }, []);

  const togglePrenatalVitamins = useCallback(() => {
    setState((prev) => {
      const updated = !prev.dailyLog?.prenatalVitamins;
      const newLog = { ...prev.dailyLog, prenatalVitamins: updated };
      if (updated && newLog.waterGlasses >= 8 && newLog.gentleMovement) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#DDA59F', '#9CAF88', '#F4C095']
        });
      }
      return { ...prev, dailyLog: newLog };
    });
  }, []);

  const toggleGentleMovement = useCallback(() => {
    setState((prev) => {
      const updated = !prev.dailyLog?.gentleMovement;
      const newLog = { ...prev.dailyLog, gentleMovement: updated };
      if (updated && newLog.waterGlasses >= 8 && newLog.prenatalVitamins) {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#DDA59F', '#9CAF88', '#F4C095']
        });
      }
      return { ...prev, dailyLog: newLog };
    });
  }, []);

  const updateJournalNote = useCallback((note) => {
    setState((prev) => ({
      ...prev,
      dailyLog: { ...prev.dailyLog, journalNote: note }
    }));
  }, []);

  const recordKickSession = useCallback((count, sessionMinutes) => {
    const session = {
      timestamp: new Date().toISOString(),
      count,
      sessionMinutes
    };
    setState((prev) => ({
      ...prev,
      kicks: [session, ...(prev.kicks || [])]
    }));
    partnerSync.broadcast('KICK_RECORDED', session);
  }, []);

  const recordContraction = useCallback((contractionData) => {
    setState((prev) => ({
      ...prev,
      contractions: [contractionData, ...(prev.contractions || [])]
    }));
    partnerSync.broadcast('CONTRACTION_RECORDED', contractionData);
  }, []);

  const addClinicalNote = useCallback((category, summary) => {
    const note = {
      date: new Date().toISOString().slice(0, 10),
      category,
      summary
    };
    setState((prev) => ({
      ...prev,
      clinicalNotes: [note, ...(prev.clinicalNotes || [])]
    }));
  }, []);

  const clearPartnerNotification = useCallback(() => {
    setPartnerNotification(null);
  }, []);

  return (
    <GevaContext.Provider
      value={{
        state,
        activePersonaId,
        switchPersona,
        setStage,
        setUserProfile,
        registerNewPatient,
        resetToCleanSlate,
        setWaterGlasses,
        togglePrenatalVitamins,
        toggleGentleMovement,
        updateJournalNote,
        recordKickSession,
        recordContraction,
        addClinicalNote,
        partnerNotification,
        clearPartnerNotification
      }}
    >
      {children}
    </GevaContext.Provider>
  );
};

export const useGeva = () => {
  const context = useContext(GevaContext);
  if (!context) {
    throw new Error('useGeva must be used within a GevaProvider');
  }
  return context;
};
