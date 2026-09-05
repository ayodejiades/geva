import React from 'react';
import { useGeva } from '../context/GevaContext';

export const MilestoneRibbon = () => {
  const { state } = useGeva();
  const stage = state.stage || 'pregnancy';
  const { pregnancyWeek = 12, conceptionCycleDay = 1, postpartumWeeks = 1 } = state.user || {};

  if (stage === 'ttc') {
    const cycleDay = conceptionCycleDay || 1;
    const isFertile = cycleDay >= 11 && cycleDay <= 16;
    const progressPercent = Math.min(100, Math.round((cycleDay / 28) * 100));

    return (
      <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark block mb-1">
              Family Planning & Cycle Window
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-ink">
              Cycle Day {cycleDay} of 28
            </h2>
            <p className="font-body text-sm text-ink-muted mt-1">
              {isFertile
                ? 'High Fertility Window. Basal body temperature and LH surge align for conception.'
                : 'Luteal restorative phase. Keep body temperature supported and stay hydrated.'}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-body text-ink-muted block">Window Phase</span>
              <span className="font-heading font-bold text-sm text-rose-dark">
                {isFertile ? 'Peak Ovulation' : 'Resting Follicular'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-sage flex items-center justify-center bg-sage-light text-ink font-heading font-bold text-sm">
              D{cycleDay}
            </div>
          </div>
        </div>

        {/* Cycle Bar */}
        <div className="mt-5">
          <div className="h-2.5 w-full bg-[#EAE3DA] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-sage rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-body text-ink-muted mt-2">
            <span>Day 1 (Menses)</span>
            <span className="font-semibold text-rose-dark">Day 14 (Ovulation Window)</span>
            <span>Day 28 (Next Cycle)</span>
          </div>
        </div>
      </div>
    );
  }

  if (stage === 'postpartum') {
    const weeks = postpartumWeeks || 1;
    const progressPercent = Math.min(100, Math.round((weeks / 12) * 100));

    return (
      <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark block mb-1">
              Fourth Trimester Healing Journey
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-ink">
              Week {weeks} Postpartum Recovery
            </h2>
            <p className="font-body text-sm text-ink-muted mt-1">
              Gentle uterine involution and tissue remodeling. Prioritize nourishing broths and restorative sleep.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-xs font-body text-ink-muted block">Clinical Milestone</span>
              <span className="font-heading font-bold text-sm text-periwinkle-dark">
                {weeks <= 6 ? 'Early Tissue Healing' : 'Maturing Core Stability'}
              </span>
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-periwinkle flex items-center justify-center bg-periwinkle-light text-ink font-heading font-bold text-sm">
              W{weeks}
            </div>
          </div>
        </div>

        {/* 12-Week Fourth Trimester Bar */}
        <div className="mt-5">
          <div className="h-2.5 w-full bg-[#EAE3DA] rounded-full overflow-hidden flex">
            <div
              className="h-full bg-periwinkle rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] font-body text-ink-muted mt-2">
            <span>Birth</span>
            <span className="font-semibold text-periwinkle-dark">Week 6 (Midwife Follow-up)</span>
            <span>Week 12 (Fourth Trimester Complete)</span>
          </div>
        </div>
      </div>
    );
  }

  // Pregnancy Stage
  const week = pregnancyWeek || 12;
  const trimester = week < 13 ? 1 : week < 27 ? 2 : 3;
  const daysRemaining = state.user?.dueDate
    ? Math.max(0, Math.round((new Date(state.user.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : Math.max(0, (40 - week) * 7);
  const progressPercent = Math.min(100, Math.round((week / 40) * 100));

  return (
    <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
              Trimester {trimester} of 3
            </span>
            <span className="text-ink-faint">•</span>
            <span className="text-xs font-body text-ink-muted font-medium">
              {daysRemaining > 0 ? `${daysRemaining} days until estimated delivery` : 'Full term gestational window'}
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-ink">
            Week {week} of Pregnancy
          </h2>
          <p className="font-body text-sm text-ink-muted mt-1">
            {week >= 28
              ? 'Third trimester surge. Lungs and autonomic regulation practicing rhythmic breathing patterns.'
              : 'Second trimester stability. Steady fetal growth and bone mineralization.'}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-body text-ink-muted block">Estimated Due Date</span>
            <span className="font-heading font-bold text-sm text-ink">
              {state.user?.dueDate
                ? new Date(state.user.dueDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
                : 'Set Estimated Due Date'}
            </span>
          </div>
          <div className="w-13 h-13 rounded-full border-2 border-rose flex items-center justify-center bg-rose-light text-ink font-heading font-bold text-sm">
            W{week}
          </div>
        </div>
      </div>

      {/* Gestational Progress Track */}
      <div className="mt-5">
        <div className="h-2.5 w-full bg-[#EAE3DA] rounded-full overflow-hidden flex">
          <div
            className="h-full bg-rose rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-body text-ink-muted mt-2">
          <span>Week 1 (Conception)</span>
          <span className="hidden sm:inline">Week 13 (T2)</span>
          <span className="font-semibold text-rose-dark">Week 28 (T3)</span>
          <span>Week 40 (Full Term)</span>
        </div>
      </div>
    </div>
  );
};

export default MilestoneRibbon;
