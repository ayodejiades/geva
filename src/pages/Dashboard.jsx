import React, { useState, useEffect } from 'react';
import { useGeva } from '../context/GevaContext';
import { getMilestoneForWeek, stageDetails } from '../data/milestones';
import { heartbeatAudio } from '../utils/heartbeatAudio';
import { getUserFirstName } from '../data/defaultUser';
import GbemiMascot from '../components/GbemiMascot';

import KickCounterModal from '../components/KickCounterModal';
import ContractionTimerModal from '../components/ContractionTimerModal';
import ClinicalPassportModal from '../components/ClinicalPassportModal';
import VoiceSanctuary from '../components/VoiceSanctuary';

import pregnancyStagesSvg from '../assets/illustrations/pregnancy-stages.svg';
import conceptionSvg from '../assets/illustrations/conception.svg';
import motherhoodSvg from '../assets/illustrations/motherhood.svg';

export const Dashboard = ({ onOpenPassportProp, onOpenVoiceProp }) => {
  const {
    state,
    setUserProfile,
    setWaterGlasses,
    togglePrenatalVitamins,
    toggleGentleMovement,
    partnerNotification,
    clearPartnerNotification
  } = useGeva();

  const stage = state.stage || 'pregnancy';
  const user = state.user || {};
  const firstName = getUserFirstName(user);
  const week = user.pregnancyWeek || 12;
  const milestone = getMilestoneForWeek(week);
  const stageInfo = stageDetails[stage] || stageDetails.pregnancy;

  // Name editing state
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState('');

  // Modals state
  const [isKickModalOpen, setIsKickModalOpen] = useState(false);
  const [isContractionModalOpen, setIsContractionModalOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isPlayingHeartbeat, setIsPlayingHeartbeat] = useState(false);

  const handleOpenPassport = onOpenPassportProp || (() => setIsPassportOpen(true));
  const handleOpenVoice = onOpenVoiceProp || (() => setIsVoiceOpen(true));

  useEffect(() => {
    return () => {
      heartbeatAudio.stopHeartbeat();
    };
  }, [stage]);

  const toggleHeartbeat = () => {
    if (isPlayingHeartbeat) {
      heartbeatAudio.stopHeartbeat();
      setIsPlayingHeartbeat(false);
    } else {
      heartbeatAudio.startHeartbeat(145);
      setIsPlayingHeartbeat(true);
    }
  };

  // Calculations for gestational milestone ribbon
  const trimester = week < 13 ? 1 : week < 27 ? 2 : 3;
  const daysRemaining = user.dueDate
    ? Math.max(0, Math.round((new Date(user.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : Math.max(0, (40 - week) * 7);
  const progressPercent = Math.min(100, Math.round((week / 40) * 100));

  // Checklist adherence
  const dailyLog = state.dailyLog || { waterGlasses: 0, prenatalVitamins: false, gentleMovement: false };
  const waterGlasses = dailyLog.waterGlasses || 0;
  const vitaminsDone = !!dailyLog.prenatalVitamins;
  const movementDone = !!dailyLog.gentleMovement;
  const hydrationDone = waterGlasses >= 8;
  const allChecklistDone = hydrationDone && vitaminsDone && movementDone;

  return (
    <main className="max-w-6xl mx-auto px-6 py-6 w-full">
      {/* Real-time Partner Telemetry Banner */}
      {partnerNotification && (
        <div className="mb-6 bg-sage-light/60 border border-sage/60 text-ink rounded-card p-4 flex items-center justify-between shadow-soft animate-fade-in">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
            <div>
              <strong className="font-heading font-bold text-xs uppercase tracking-wider text-sage-dark block">
                CareCircle Live Telemetry ({partnerNotification.timestamp})
              </strong>
              <p className="font-body text-xs text-ink mt-0.5">
                {partnerNotification.message}
              </p>
            </div>
          </div>
          <button
            onClick={clearPartnerNotification}
            className="w-7 h-7 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            ×
          </button>
        </div>
      )}

      {/* Welcome Row */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          {isEditingName ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const cleaned = nameInput.trim();
                if (cleaned) {
                  const first = cleaned.split(/\s+/)[0];
                  setUserProfile({ name: cleaned, firstName: first });
                }
                setIsEditingName(false);
              }}
              className="flex items-center gap-2 mb-2"
            >
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="e.g. Folashade"
                className="px-3 py-1.5 rounded-xl border border-rose text-base font-heading font-bold text-ink bg-white focus:outline-none shadow-sm"
                autoFocus
              />
              <button
                type="submit"
                className="bg-rose hover:bg-rose-dark text-white px-3.5 py-1.5 rounded-lg text-xs font-heading font-bold cursor-pointer transition-colors"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="bg-stone-100 hover:bg-stone-200 text-ink-muted px-3 py-1.5 rounded-lg text-xs font-heading font-semibold cursor-pointer transition-colors"
              >
                Cancel
              </button>
            </form>
          ) : (
            <div className="flex items-center gap-2.5 mb-1 flex-wrap">
              <h1 className="text-3xl font-heading font-bold text-ink">
                {firstName ? `Welcome back, ${firstName}!` : 'Welcome back!'}
              </h1>
              <button
                type="button"
                onClick={() => {
                  setNameInput(firstName || '');
                  setIsEditingName(true);
                }}
                className="text-xs font-heading font-semibold text-rose-dark hover:text-ink cursor-pointer underline underline-offset-4 transition-colors"
                title={firstName ? 'Change your name' : 'Set your first name'}
              >
                {firstName ? 'Edit name' : 'Set your name'}
              </button>
            </div>
          )}
          <p className="text-lg text-ink-muted font-body">
            It's a great day to carry greatness.
          </p>
        </div>

        {/* Expected Delivery Date Countdown Badge */}
        <div className="w-full md:w-auto bg-gradient-to-r from-rose-light/40 to-peach-light/40 rounded-card p-4 border border-rose-light/40 text-center">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-ink-muted block">
            {stage === 'ttc' ? 'Target Fertile Window' : stage === 'postpartum' ? 'Recovery Phase' : 'Estimated Delivery'}
          </span>
          <span className="font-heading font-extrabold text-xl text-ink block mt-0.5">
            {stage === 'ttc'
              ? 'Peak Ovulation Window'
              : stage === 'postpartum'
              ? `Week ${user.postpartumWeeks || 1} Postpartum`
              : user.dueDate
              ? new Date(user.dueDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
              : 'Set Estimated Due Date'}
          </span>
          <span className="text-xs font-body font-semibold text-rose-dark block mt-0.5">
            {stage === 'ttc'
              ? `Cycle Day ${user.cycleDay || 1} of 28`
              : stage === 'postpartum'
              ? 'Fourth Trimester Healing'
              : `${daysRemaining} days to go`}
          </span>
        </div>
      </section>

      {/* Hero Milestone Ribbon */}
      <section className="bg-white rounded-card p-6 shadow-soft border border-stone-100 mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-ink-muted">
            {stage === 'ttc'
              ? 'Ovulation Cycle Trajectory'
              : stage === 'postpartum'
              ? 'Fourth Trimester Recovery Track'
              : `Trimester ${trimester} · Gestational Progression`}
          </span>
          <span className="font-heading font-bold text-sm text-ink">
            {stage === 'ttc'
              ? `Day ${user.cycleDay || 1} (${Math.round(((user.cycleDay || 1) / 28) * 100)}%)`
              : stage === 'postpartum'
              ? `Week ${user.postpartumWeeks || 1} of 12`
              : `Week ${week} (${progressPercent}%)`}
          </span>
        </div>

        {/* Progress Track with Smooth Gradient */}
        <div className="relative w-full h-2.5 bg-stone-100 rounded-full mb-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose to-peach rounded-full transition-all duration-500"
            style={{ width: `${stage === 'ttc' ? Math.round(((user.cycleDay || 1) / 28) * 100) : stage === 'postpartum' ? Math.round(((user.postpartumWeeks || 1) / 12) * 100) : progressPercent}%` }}
          />
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-3 text-xs font-body text-ink-muted text-center pt-1">
          <div className="flex flex-col items-center">
            <span className={`w-2 h-2 rounded-full mb-1 ${week >= 1 ? 'bg-rose' : 'bg-stone-200'}`} />
            <span className="font-semibold text-ink">
              {stage === 'ttc' ? 'Menses (D1)' : stage === 'postpartum' ? 'Early Recovery (W1)' : 'Trimester 1 (W1)'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`w-2 h-2 rounded-full mb-1 ${week >= 13 ? 'bg-rose' : 'bg-stone-200'}`} />
            <span className="font-semibold text-ink">
              {stage === 'ttc' ? 'Ovulation (D14)' : stage === 'postpartum' ? 'Midwife Check (W6)' : 'Trimester 2 (W13)'}
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className={`w-2 h-2 rounded-full mb-1 ${week >= 28 ? 'bg-rose' : 'bg-stone-200'}`} />
            <span className="font-semibold text-ink">
              {stage === 'ttc' ? 'Next Cycle (D28)' : stage === 'postpartum' ? 'Maturing Core (W12)' : 'Trimester 3 (W28)'}
            </span>
          </div>
        </div>
      </section>

      {/* Row 1 Cards Grid (3 Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card A: Baby Size & Synthetic Doppler Heartbeat */}
        <div className="bg-periwinkle-light/30 rounded-card p-6 min-h-[340px] flex flex-col justify-between border border-periwinkle-light/60 transition-transform hover:-translate-y-1">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark">
                {stage === 'ttc' ? 'Follicular Growth' : stage === 'postpartum' ? 'Newborn Size' : 'Weekly Anatomy'}
              </span>
              <span className="text-xs font-body text-ink-muted">
                {stage === 'ttc' ? 'Cycle Day 14' : stage === 'postpartum' ? `Week ${user.postpartumWeeks || 4}` : `Week ${week}`}
              </span>
            </div>

            <div className="flex items-center gap-4 my-2">
              <div className="w-16 h-16 rounded-2xl bg-white/80 p-2 flex items-center justify-center shadow-soft shrink-0">
                <img
                  src={stage === 'ttc' ? conceptionSvg : stage === 'postpartum' ? motherhoodSvg : pregnancyStagesSvg}
                  alt="Development"
                  className="max-h-full object-contain"
                />
              </div>
              <div>
                <h2 className="font-heading font-bold text-xl text-ink">
                  {stage === 'ttc' ? 'Mature Follicle' : stage === 'postpartum' ? 'Cooing & Social Smile' : milestone?.item || 'Sweet Plum'}
                </h2>
                <p className="text-xs font-body text-ink-muted mt-0.5">
                  {stage === 'ttc'
                    ? '21 mm dominant follicle'
                    : stage === 'postpartum'
                    ? '4.2 kg average weight'
                    : `${milestone?.lengthCm || 5.4} cm · ${milestone?.weightGrams || 14} g`}
                </p>
              </div>
            </div>

            <p className="text-xs font-body text-ink-muted mt-3 leading-relaxed">
              {stage === 'ttc'
                ? 'Estrogen triggers LH release, priming the dominant follicle for ovulation.'
                : stage === 'postpartum'
                ? 'Recognizes familiar family voices and maintains sustained eye contact at 8-12 inches.'
                : milestone?.note || 'Rapid brain maturation and bone mineralization continue on schedule.'}
            </p>
          </div>

          {/* Doppler Button */}
          <div className="pt-4 border-t border-periwinkle-light/80">
            <button
              onClick={toggleHeartbeat}
              className={`w-full py-2.5 px-4 rounded-lg font-heading font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isPlayingHeartbeat
                  ? 'bg-rose text-white shadow-soft'
                  : 'bg-white hover:bg-periwinkle-light text-ink border border-periwinkle/40 shadow-soft'
              }`}
            >
              {isPlayingHeartbeat ? (
                <>
                  <span className="flex items-center gap-0.5 h-3">
                    <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '70%', animationDelay: '0ms' }} />
                    <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                    <span className="w-1 bg-white rounded-full animate-bounce" style={{ height: '60%', animationDelay: '300ms' }} />
                  </span>
                  <span>Pause Fetal Doppler (145 BPM)</span>
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>Listen to Heartbeat (145 BPM)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Card B: Daily Care Checklist */}
        <div className="bg-rose-light/30 rounded-card p-6 min-h-[340px] flex flex-col justify-between border border-rose-light/60 transition-transform hover:-translate-y-1">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
                Daily Care Checklist
              </span>
              <span className="text-xs font-body text-ink-muted">
                {hydrationDone && vitaminsDone && movementDone ? '3 of 3 Complete' : 'Self-Care Tracking'}
              </span>
            </div>

            {/* Hydration Ticks: 8 Droplets */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-xs font-body mb-1.5">
                <span className="font-heading font-semibold text-ink">Hydration (8 Glasses)</span>
                <span className="text-rose-dark font-bold">{waterGlasses}/8</span>
              </div>
              <div className="grid grid-cols-8 gap-1.5">
                {Array.from({ length: 8 }, (_, i) => {
                  const filled = i < waterGlasses;
                  return (
                    <button
                      key={i}
                      onClick={() => setWaterGlasses(waterGlasses === i + 1 ? i : i + 1)}
                      className={`aspect-square rounded-lg border flex items-center justify-center transition-all cursor-pointer p-1 sm:p-1.5 ${
                        filled
                          ? 'bg-sage border-sage-dark text-white shadow-sm'
                          : 'bg-white border-stone-200 text-stone-300 hover:border-sage'
                      }`}
                      title={`Glass ${i + 1}`}
                    >
                      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                      </svg>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Vitamin Toggle */}
            <div
              onClick={togglePrenatalVitamins}
              className={`flex items-center justify-between p-2.5 rounded-xl border mb-2.5 cursor-pointer transition-all ${
                vitaminsDone ? 'bg-white border-rose/50 shadow-sm' : 'bg-white/60 border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${vitaminsDone ? 'bg-rose border-rose-dark text-white' : 'border-stone-300'}`}>
                  {vitaminsDone && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-heading font-semibold text-ink">Prenatal Vitamins</span>
              </div>
              <span className="text-[11px] font-body text-ink-muted">{vitaminsDone ? 'Taken' : 'Pending'}</span>
            </div>

            {/* Movement Toggle */}
            <div
              onClick={toggleGentleMovement}
              className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                movementDone ? 'bg-white border-sage/50 shadow-sm' : 'bg-white/60 border-stone-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${movementDone ? 'bg-sage border-sage-dark text-white' : 'border-stone-300'}`}>
                  {movementDone && (
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-xs font-heading font-semibold text-ink">Gentle Movement</span>
              </div>
              <span className="text-[11px] font-body text-ink-muted">{movementDone ? 'Done' : 'Pending'}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-rose-light/80 flex items-center justify-between text-xs text-ink-muted">
            <span>{allChecklistDone ? 'All self-care fulfilled!' : 'Nurture yourself today'}</span>
            <GbemiMascot size={32} state={allChecklistDone ? 'celebrating' : 'idle'} />
          </div>
        </div>

        {/* Card C: Midwife Daily Affirmation */}
        <div className="bg-peach-light/40 rounded-card p-6 min-h-[340px] flex flex-col justify-between border border-peach-light/60 transition-transform hover:-translate-y-1">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-peach-dark">
                Midwife Affirmation
              </span>
              <span className="text-xs font-body text-ink-muted">Daily Stillness</span>
            </div>

            <div className="my-3">
              <p className="font-heading font-bold text-lg text-ink leading-relaxed">
                "{stageInfo.affirmation}"
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-peach/30 space-y-1.5">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-ink-muted block">
                Today's Guidance
              </span>
              <ul className="space-y-1 text-xs font-body text-ink">
                {stageInfo.tips.slice(0, 2).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-peach mt-1.5 shrink-0" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-3 border-t border-peach-light flex items-center justify-between text-xs text-ink-muted">
            <span className="italic">Sister-midwife care</span>
            <span className="text-peach-dark font-semibold">Grounded & Calm</span>
          </div>
        </div>
      </section>

      {/* Row 2 Cards Grid (2 Cards) */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Card D: Did You Know & Clinical Triage */}
        <div className="bg-sage-light/35 rounded-card p-6 border border-sage-light/60 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark">
                Clinical Insight & Safety
              </span>
              <span className="text-xs font-body text-ink-muted">ACOG Triage Standards</span>
            </div>

            <h2 className="font-heading font-bold text-xl text-ink mb-2">
              Did You Know? {stage === 'pregnancy' ? `(Week ${week})` : ''}
            </h2>

            <p className="font-body text-sm text-ink leading-relaxed mb-4">
              {stage === 'ttc'
                ? 'During the fertile window, cervical fluid shifts to an egg-white consistency that nourishes and transports sperm for up to five days.'
                : stage === 'postpartum'
                ? 'Uterine involution reaches the true pelvis around day 10-14. Rest and hydration prevent secondary postpartum hemorrhage.'
                : `By week ${week}, baby is the size of a ${milestone?.item || 'Sweet Plum'}. ${milestone?.note || 'Rapid brain maturation and bone mineralization continuing on schedule.'}`}
            </p>

            <div className="bg-white/80 rounded-xl p-3.5 border border-sage/40 space-y-2">
              <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-sage-dark block">
                ACOG Red-Flag Quick Screen
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body text-ink-muted">
                <span>• Severe sudden headache: None</span>
                <span>• Visual spots or aura: Clear</span>
                <span>• Sharp abdominal pain: None</span>
                <span>• Sudden facial edema: Clear</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sage/30 flex items-center justify-between text-xs text-ink-muted">
            <span>Always contact community triage if symptoms emerge</span>
            <span className="text-sage-dark font-semibold">Normal Baseline</span>
          </div>
        </div>

        {/* Card E: Quick Nurture Launchers */}
        <div className="bg-white rounded-card p-6 border border-stone-100 shadow-soft flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-ink-muted block">
                  Perinatal Telemetry
                </span>
                <h2 className="font-heading font-bold text-xl text-ink mt-0.5">
                  Care Tools & Doctor Brief
                </h2>
              </div>
              <span className="text-xs font-body text-ink-muted">1-Tap Modals</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Kick Counter */}
              <button
                onClick={() => setIsKickModalOpen(true)}
                className="p-3.5 rounded-xl bg-periwinkle-light/30 hover:bg-periwinkle-light/60 border border-periwinkle-light/80 text-left transition-all cursor-pointer group"
              >
                <span className="text-xs font-heading font-bold text-periwinkle-dark block">Kicks</span>
                <strong className="text-sm font-heading font-bold text-ink block mt-0.5">Kick Counter</strong>
                <p className="text-[11px] font-body text-ink-muted mt-1 leading-snug">10 in 2h ACOG count</p>
                <span className="text-[11px] font-heading font-bold text-periwinkle-dark mt-2 block">Open</span>
              </button>

              {/* Contraction Timer */}
              <button
                onClick={() => setIsContractionModalOpen(true)}
                className="p-3.5 rounded-xl bg-rose-light/30 hover:bg-rose-light/60 border border-rose-light/80 text-left transition-all cursor-pointer group"
              >
                <span className="text-xs font-heading font-bold text-rose-dark block">Surges</span>
                <strong className="text-sm font-heading font-bold text-ink block mt-0.5">Contractions</strong>
                <p className="text-[11px] font-body text-ink-muted mt-1 leading-snug">5-1-1 active rule</p>
                <span className="text-[11px] font-heading font-bold text-rose-dark mt-2 block">Open</span>
              </button>

              {/* Clinical Passport */}
              <button
                onClick={handleOpenPassport}
                className="p-3.5 rounded-xl bg-sage-light/30 hover:bg-sage-light/60 border border-sage-light/80 text-left transition-all cursor-pointer group"
              >
                <span className="text-xs font-heading font-bold text-sage-dark block">SBAR</span>
                <strong className="text-sm font-heading font-bold text-ink block mt-0.5">Doctor Brief</strong>
                <p className="text-[11px] font-body text-ink-muted mt-1 leading-snug">Printable 14-day log</p>
                <span className="text-[11px] font-heading font-bold text-sage-dark mt-2 block">Print</span>
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-ink-muted">
            <span>{state.kicks?.length || 0} kick sessions logged</span>
            <span>{state.contractions?.length || 0} contractions timed</span>
          </div>
        </div>
      </section>

      {/* Floating Voice Companion Button */}
      <div className="fixed bottom-6 right-6 z-50 no-print">
        <button
          onClick={handleOpenVoice}
          className="w-16 h-16 rounded-full bg-white shadow-soft hover:shadow-warm transition-all hover:scale-105 cursor-pointer flex items-center justify-center border border-stone-200"
          title="Speak with Gbemi"
          aria-label="Open Gbemi Voice Sanctuary"
        >
          <GbemiMascot size={56} state="idle" />
        </button>
      </div>

      {/* Modals */}
      <KickCounterModal
        isOpen={isKickModalOpen}
        onClose={() => setIsKickModalOpen(false)}
      />

      <ContractionTimerModal
        isOpen={isContractionModalOpen}
        onClose={() => setIsContractionModalOpen(false)}
      />

      {!onOpenPassportProp && (
        <ClinicalPassportModal
          isOpen={isPassportOpen}
          onClose={() => setIsPassportOpen(false)}
        />
      )}

      {!onOpenVoiceProp && (
        <VoiceSanctuary
          isOpen={isVoiceOpen}
          onClose={() => setIsVoiceOpen(false)}
        />
      )}
    </main>
  );
};

export default Dashboard;
