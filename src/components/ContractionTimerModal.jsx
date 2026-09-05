import React, { useState, useEffect, useRef } from 'react';
import { useGeva } from '../context/GevaContext';

export const ContractionTimerModal = ({ isOpen, onClose }) => {
  const { state, recordContraction } = useGeva();
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [breathPhase, setBreathPhase] = useState('inhale'); // inhale or exhale (4s cycle)
  const startTimeRef = useRef(null);
  const intervalRef = useRef(null);
  const breathIntervalRef = useRef(null);

  // Main contraction timer
  useEffect(() => {
    if (isActive) {
      startTimeRef.current = new Date();
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);

      // 4-second breathing cycle guide
      breathIntervalRef.current = setInterval(() => {
        setBreathPhase((prev) => (prev === 'inhale' ? 'exhale' : 'inhale'));
      }, 4000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (breathIntervalRef.current) clearInterval(breathIntervalRef.current);
    };
  }, [isActive]);

  if (!isOpen) return null;

  const handleToggle = () => {
    if (!isActive) {
      setSeconds(0);
      setIsActive(true);
    } else {
      setIsActive(false);
      const endTime = new Date();
      const startTime = startTimeRef.current || new Date(endTime.getTime() - seconds * 1000);
      const durationSec = Math.max(1, seconds);

      // Calculate interval from previous contraction
      const lastContraction = state.contractions?.[0];
      let intervalMin = 0;
      if (lastContraction && lastContraction.startTime) {
        const lastStart = new Date(lastContraction.startTime).getTime();
        const thisStart = startTime.getTime();
        intervalMin = Math.round((thisStart - lastStart) / 60000);
      }

      recordContraction({
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        durationSec,
        intervalMin: intervalMin > 0 ? intervalMin : 0
      });

      setSeconds(0);
    }
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const contractions = state.contractions || [];

  // Check 5-1-1 Rule:
  // Contractions 5 minutes apart (or less), lasting 1 minute (60s+), persisting for 1 hour
  const recentContractions = contractions.slice(0, 8);
  const meets511 =
    recentContractions.length >= 4 &&
    recentContractions.every(
      (c) => c.durationSec >= 50 && c.intervalMin > 0 && c.intervalMin <= 5.5
    );

  // Calculate hourly averages
  const avgDuration =
    contractions.length > 0
      ? Math.round(
          contractions.slice(0, 5).reduce((acc, c) => acc + c.durationSec, 0) /
            Math.min(5, contractions.length)
        )
      : 0;

  const validIntervals = contractions.filter((c) => c.intervalMin > 0).slice(0, 5);
  const avgInterval =
    validIntervals.length > 0
      ? Math.round(
          validIntervals.reduce((acc, c) => acc + c.intervalMin, 0) / validIntervals.length
        )
      : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-ink/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-canvas border border-ink/10 rounded-card sm:rounded-sheet w-full max-w-lg p-5 sm:p-8 shadow-warm relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 sm:top-6 sm:right-6 w-8 h-8 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal Header */}
        <div className="mb-5 sm:mb-6 pr-8">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark block mb-1">
            Maternal Rhythm & Labor Telemetry
          </span>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-ink">
            Contraction Rhythm Timer
          </h2>
          <p className="font-body text-xs text-ink-muted mt-1 leading-relaxed">
            Record contraction surges to monitor frequency, duration, and labor progression toward the standard 5-1-1 milestone.
          </p>
        </div>

        {/* 5-1-1 Alert Banner */}
        {meets511 && (
          <div className="mb-6 p-3.5 sm:p-4 rounded-2xl bg-rose-light/70 border-2 border-rose text-ink">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-dark animate-ping" />
              <strong className="font-heading font-extrabold text-sm text-ink">
                5-1-1 Active Labor Threshold Met
              </strong>
            </div>
            <p className="font-body text-xs text-ink-muted leading-relaxed">
              Your contractions have arrived 5 minutes apart, lasting at least 60 seconds, consistently for the past hour. Please contact your hospital triage, birthing center, or community midwife to prepare for admission.
            </p>
          </div>
        )}

        {/* Live Timer Card */}
        <div className="bg-canvas/80 border border-ink/10 rounded-2xl p-4 sm:p-6 text-center shadow-soft mb-6">
          <span className="text-xs font-body text-ink-muted block uppercase tracking-wider">
            {isActive ? 'Contraction In Progress' : 'Ready to Time Next Surge'}
          </span>

          <div className="my-2 sm:my-3 font-heading font-extrabold text-4xl sm:text-5xl text-ink tracking-tight">
            {formatTimer(seconds)}
          </div>

          {/* Breathing Guide Animation */}
          {isActive && (
            <div className="my-4 flex flex-col items-center">
              <div
                className={`px-4 py-1.5 rounded-xl text-xs font-heading font-bold transition-all duration-1000 ${
                  breathPhase === 'inhale'
                    ? 'bg-sage text-canvas scale-110'
                    : 'bg-rose text-ink scale-100'
                }`}
              >
                {breathPhase === 'inhale' ? 'Inhale Slowly (4s)' : 'Exhale Softly (4s)'}
              </div>
              <span className="text-[11px] font-body text-ink-muted mt-2">
                Release your jaw and drop your shoulders with every out-breath
              </span>
            </div>
          )}

          {/* Trigger Button */}
          <div className="mt-4">
            <button
              onClick={handleToggle}
              className={`w-full py-4 rounded-2xl font-heading font-extrabold text-sm tracking-wide transition-all cursor-pointer ${
                isActive
                  ? 'bg-rose text-ink shadow-warm animate-pulse'
                  : 'bg-ink hover:bg-ink/90 text-canvas shadow-soft'
              }`}
            >
              {isActive ? 'Stop Contraction (Surge Ended)' : 'Start Contraction Surge'}
            </button>
          </div>

          {/* Recent Averages */}
          <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-ink/5">
            <div className="bg-[#F4EFEA] p-2.5 rounded-xl">
              <span className="text-[10px] font-body text-ink-muted uppercase block">
                Avg Duration (Last 5)
              </span>
              <span className="font-heading font-bold text-sm text-ink">
                {avgDuration > 0 ? `${avgDuration} sec` : '-'}
              </span>
            </div>
            <div className="bg-[#F4EFEA] p-2.5 rounded-xl">
              <span className="text-[10px] font-body text-ink-muted uppercase block">
                Avg Interval (Last 5)
              </span>
              <span className="font-heading font-bold text-sm text-ink">
                {avgInterval > 0 ? `${avgInterval} min apart` : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div>
          <h3 className="font-heading font-bold text-sm text-ink mb-3 flex items-center justify-between">
            <span>Recent Contraction Waves</span>
            <span className="text-[11px] font-body text-periwinkle-dark font-semibold">
              Broadcast to Partner
            </span>
          </h3>

          {contractions.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-ink/10 text-center text-xs text-ink-muted">
              No contractions recorded today. When a wave begins, press the button above.
            </div>
          ) : (
            <div className="space-y-2">
              {contractions.slice(0, 5).map((c, i) => {
                const dateObj = new Date(c.startTime);
                const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F4EFEA] border border-ink/5 text-xs font-body"
                  >
                    <div>
                      <span className="font-heading font-bold text-ink">
                        {c.durationSec}s duration
                      </span>
                      {c.intervalMin > 0 && (
                        <span className="text-ink-muted ml-2">
                          ({c.intervalMin}m apart)
                        </span>
                      )}
                    </div>
                    <span className="text-ink-muted text-[11px]">at {timeStr}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Midwife Rule of 5-1-1 Educational Note */}
        <div className="mt-6 p-3.5 rounded-xl bg-sage-light/50 border border-sage/40 text-[11px] font-body text-ink-muted leading-relaxed">
          <strong className="font-heading font-bold text-ink block mb-0.5">
            The 5-1-1 Clinical Guideline
          </strong>
          Active labor is commonly recognized when contractions occur every 5 minutes or closer, last at least 1 minute each, and hold this cadence for 1 full hour. Always call triage immediately if you observe fluid leakage or bright bleeding.
        </div>
      </div>
    </div>
  );
};

export default ContractionTimerModal;
