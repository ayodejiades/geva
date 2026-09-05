import React, { useState, useEffect, useRef } from 'react';
import { useGeva } from '../context/GevaContext';

export const KickCounterModal = ({ isOpen, onClose }) => {
  const { state, recordKickSession } = useGeva();
  const [currentCount, setCurrentCount] = useState(0);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const timerRef = useRef(null);

  // Timer logic
  useEffect(() => {
    if (isSessionActive) {
      timerRef.current = setInterval(() => {
        setSessionSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isSessionActive]);

  if (!isOpen) return null;

  const handleTapMovement = () => {
    if (!isSessionActive) {
      setIsSessionActive(true);
    }
    setCurrentCount((prev) => prev + 1);
  };

  const handleFinishSession = () => {
    setIsSessionActive(false);
    const sessionMinutes = Math.max(1, Math.round(sessionSeconds / 60));
    recordKickSession(currentCount, sessionMinutes);
    setCurrentCount(0);
    setSessionSeconds(0);
    onClose();
  };

  const formatTimer = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const pastSessions = state.kicks || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-canvas border border-ink/10 rounded-sheet w-full max-w-lg p-6 sm:p-8 shadow-warm relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center font-bold text-lg cursor-pointer transition-colors"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark block mb-1">
            ACOG Fetal Movement Protocol
          </span>
          <h2 className="font-heading font-extrabold text-2xl text-ink">
            Baby Movement Counter
          </h2>
          <p className="font-body text-xs text-ink-muted mt-1 leading-relaxed">
            Choose an hour when your baby is typically active. A healthy benchmark is feeling at least 10 distinct movements within two hours.
          </p>
        </div>

        {/* Live Active Session Panel */}
        <div className="bg-canvas/80 border border-ink/10 rounded-2xl p-6 text-center shadow-soft mb-6">
          <div className="flex items-center justify-between text-xs text-ink-muted mb-4">
            <span>Session Duration: <strong className="text-ink font-heading">{formatTimer(sessionSeconds)}</strong></span>
            <span>Target: <strong className="text-rose-dark font-heading">10 Kicks</strong></span>
          </div>

          {/* Large Tap Target */}
          <div className="my-4 flex flex-col items-center justify-center">
            <button
              onClick={handleTapMovement}
              className="w-36 h-36 rounded-full bg-rose hover:bg-rose-dark active:scale-95 text-ink shadow-warm border-4 border-canvas flex flex-col items-center justify-center transition-all cursor-pointer select-none"
            >
              <span className="font-heading font-extrabold text-4xl leading-none">
                {currentCount}
              </span>
              <span className="font-body text-xs uppercase tracking-wider font-bold mt-1 text-ink/80">
                Tap Movement
              </span>
            </button>
            <span className="text-[11px] font-body text-ink-muted mt-3">
              Tap each time you feel a distinct kick, roll, or flutter
            </span>
          </div>

          {/* Session Actions */}
          <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-ink/5">
            <button
              onClick={handleFinishSession}
              disabled={currentCount === 0}
              className="px-5 py-2.5 rounded-xl bg-ink hover:bg-ink/90 disabled:opacity-40 text-canvas font-heading font-bold text-xs transition-all cursor-pointer"
            >
              Complete & Save Session
            </button>
            {currentCount > 0 && (
              <button
                onClick={() => {
                  setCurrentCount(0);
                  setSessionSeconds(0);
                  setIsSessionActive(false);
                }}
                className="px-4 py-2 rounded-xl border border-ink/15 text-ink-muted hover:text-ink font-body text-xs transition-colors cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Movement History / Telemetry Graph */}
        <div>
          <h3 className="font-heading font-bold text-sm text-ink mb-3 flex items-center justify-between">
            <span>Recent Logged Movement Sessions</span>
            <span className="text-[11px] font-body text-periwinkle-dark font-semibold">
              Synced to Partner
            </span>
          </h3>

          {pastSessions.length === 0 ? (
            <div className="p-4 rounded-xl border border-dashed border-ink/10 text-center text-xs text-ink-muted">
              No previous kick sessions logged. Start tapping above to record your first movement period.
            </div>
          ) : (
            <div className="space-y-2">
              {pastSessions.slice(0, 5).map((session, index) => {
                const dateObj = new Date(session.timestamp);
                const dateStr = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });
                const timeStr = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F4EFEA] border border-ink/5 text-xs font-body"
                  >
                    <div>
                      <span className="font-heading font-bold text-ink">
                        {session.count} Movements
                      </span>
                      <span className="text-ink-muted ml-2">
                        in {session.sessionMinutes} minutes
                      </span>
                    </div>
                    <div className="text-right text-ink-muted text-[11px]">
                      <span>{dateStr} at {timeStr}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ACOG Clinical Notice */}
        <div className="mt-6 p-3.5 rounded-xl bg-peach-light/60 border border-peach/50 text-[11px] font-body text-ink-muted leading-relaxed">
          <strong className="font-heading font-bold text-ink block mb-0.5">Clinical Note</strong>
          If you notice a sharp decrease in your baby's routine movement patterns, or if you feel fewer than 10 movements over a two-hour rest period on your side, contact your maternity triage or community midwife without delay.
        </div>
      </div>
    </div>
  );
};

export default KickCounterModal;
