import React from 'react';
import { useGeva } from '../context/GevaContext';
import GbemiMascot from './GbemiMascot';

export const DailyChecklist = () => {
  const {
    state,
    setWaterGlasses,
    togglePrenatalVitamins,
    toggleGentleMovement
  } = useGeva();

  const dailyLog = state.dailyLog || {
    waterGlasses: 0,
    prenatalVitamins: false,
    gentleMovement: false
  };

  const waterGlasses = dailyLog.waterGlasses || 0;
  const vitaminsCompleted = !!dailyLog.prenatalVitamins;
  const movementCompleted = !!dailyLog.gentleMovement;
  const hydrationCompleted = waterGlasses >= 8;

  const completedCount =
    (hydrationCompleted ? 1 : 0) +
    (vitaminsCompleted ? 1 : 0) +
    (movementCompleted ? 1 : 0);

  const isAllComplete = completedCount === 3;

  return (
    <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark block">
              Daily Nurture Checklist
            </span>
            <h3 className="font-heading font-extrabold text-xl text-ink mt-0.5">
              Self-Care Adherence
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-heading font-bold text-ink-muted">
              {completedCount} of 3 Complete
            </span>
            <GbemiMascot
              state={isAllComplete ? 'celebrating' : 'idle'}
              size={48}
            />
          </div>
        </div>

        {/* 1. Hydration Droplets */}
        <div className="bg-canvas/60 border border-ink/5 rounded-2xl p-4 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="font-heading font-bold text-sm text-ink">
              Hydration Balance
            </span>
            <span className="font-body text-xs font-semibold text-sage-dark">
              {waterGlasses} / 8 Glasses ({Math.round((waterGlasses / 8) * 100)}%)
            </span>
          </div>

          {/* 8 Clickable Water Droplet SVGs */}
          <div className="grid grid-cols-8 gap-1.5 pt-1">
            {Array.from({ length: 8 }, (_, i) => {
              const isFilled = i < waterGlasses;
              return (
                <button
                  key={i}
                  onClick={() => {
                    if (waterGlasses === i + 1) {
                      setWaterGlasses(i);
                    } else {
                      setWaterGlasses(i + 1);
                    }
                  }}
                  className={`aspect-square rounded-xl border flex items-center justify-center transition-all cursor-pointer ${
                    isFilled
                      ? 'bg-sage border-sage-dark text-canvas shadow-sm scale-105'
                      : 'bg-canvas border-ink/15 text-ink/20 hover:border-sage hover:text-sage/50'
                  }`}
                  title={`Glass ${i + 1} of water`}
                >
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4"
                    viewBox="0 0 24 24"
                    fill={isFilled ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                  </svg>
                </button>
              );
            })}
          </div>
          <p className="text-[11px] font-body text-ink-muted mt-2">
            Adequate hydration maintains amniotic fluid levels and reduces uterine irritability.
          </p>
        </div>

        {/* 2. Prenatal Vitamins & Micronutrients */}
        <div
          onClick={togglePrenatalVitamins}
          className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer mb-3 ${
            vitaminsCompleted
              ? 'bg-rose-light/50 border-rose/50 text-ink'
              : 'bg-canvas/60 border-ink/5 text-ink-muted hover:border-ink/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                vitaminsCompleted
                  ? 'bg-rose border-rose-dark text-ink'
                  : 'bg-canvas border-ink/30'
              }`}
            >
              {vitaminsCompleted && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-ink block">
                Prenatal Nutrients & Methylfolate
              </span>
              <span className="font-body text-[11px] text-ink-muted">
                Essential vitamins supporting neural tube and maternal iron reserves
              </span>
            </div>
          </div>
          <span className="text-xs font-heading font-semibold text-rose-dark">
            {vitaminsCompleted ? 'Taken' : 'Pending'}
          </span>
        </div>

        {/* 3. Gentle Movement / Pelvic Floor */}
        <div
          onClick={toggleGentleMovement}
          className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
            movementCompleted
              ? 'bg-sage-light/50 border-sage/50 text-ink'
              : 'bg-canvas/60 border-ink/5 text-ink-muted hover:border-ink/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                movementCompleted
                  ? 'bg-sage border-sage-dark text-canvas'
                  : 'bg-canvas border-ink/30'
              }`}
            >
              {movementCompleted && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-ink block">
                Gentle Movement & Pelvic Alignment
              </span>
              <span className="font-body text-[11px] text-ink-muted">
                15 minutes of restorative walking, cat-cow, or diaphragmatic breathing
              </span>
            </div>
          </div>
          <span className="text-xs font-heading font-semibold text-sage-dark">
            {movementCompleted ? 'Done' : 'Pending'}
          </span>
        </div>
      </div>

      {isAllComplete && (
        <div className="mt-4 p-3 bg-peach-light rounded-xl border border-peach/40 text-center">
          <p className="font-heading font-bold text-xs text-ink">
            Gbemi is blooming! All daily self-care markers fulfilled.
          </p>
        </div>
      )}
    </div>
  );
};

export default DailyChecklist;
