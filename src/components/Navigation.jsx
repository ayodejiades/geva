import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { useGeva } from '../context/GevaContext';

export const Navigation = ({ onOpenPassport, onOpenVoice }) => {
  const navigate = useNavigate();
  const { state, setStage, activePersonaId, resetToCleanSlate } = useGeva();
  const currentStage = state.stage || 'pregnancy';

  return (
    <header className="no-print sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100 px-6 py-4 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Global Sitewide Brand Logo */}
        <Logo className="text-3xl sm:text-4xl" />

        {/* Stage Selector Segmented Control */}
        <div className="hidden md:flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            onClick={() => setStage('ttc')}
            className={`px-3.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              currentStage === 'ttc'
                ? 'bg-white text-ink shadow-soft'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Conception
          </button>
          <button
            onClick={() => setStage('pregnancy')}
            className={`px-3.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              currentStage === 'pregnancy'
                ? 'bg-white text-ink shadow-soft'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Pregnancy
          </button>
          <button
            onClick={() => setStage('postpartum')}
            className={`px-3.5 py-1 rounded-lg text-xs font-heading font-bold transition-all cursor-pointer ${
              currentStage === 'postpartum'
                ? 'bg-white text-ink shadow-soft'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            Postpartum
          </button>
        </div>

        {/* Right Actions: Demo Indicator, Partner sync badge, Clinical Passport, Sign out */}
        <div className="flex items-center gap-3">
          {/* Guest Demo Indicator */}
          {activePersonaId !== 'custom' ? (
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-peach-light/70 border border-peach/50 text-ink text-xs font-body">
              <span className="font-heading font-bold text-ink">Demo Mode</span>
              <button
                onClick={() => {
                  resetToCleanSlate();
                  navigate('/stage');
                }}
                className="underline text-rose-dark hover:text-ink font-semibold ml-1 cursor-pointer"
                title="Exit demo and start a clean profile"
              >
                Start Fresh
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                resetToCleanSlate();
                navigate('/login');
              }}
              className="hidden sm:inline-flex items-center text-xs text-ink-muted hover:text-rose font-heading font-semibold px-2 py-1 transition-colors cursor-pointer"
              title="Sign out of local profile"
            >
              Sign Out
            </button>
          )}

          {/* Real-time Partner Live Sync Status */}
          <div
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-sage-light/60 border border-sage/30 text-sage-dark text-xs font-body font-medium"
            title="Real-time multi-tab BroadcastChannel active"
          >
            <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
            <span className="text-[11px]">Partner Telemetry Active</span>
          </div>

          {/* Clinical Passport Launcher */}
          <button
            onClick={onOpenPassport}
            className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-rose-light text-ink border border-stone-200 text-xs font-heading font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-soft"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>Doctor Brief</span>
          </button>
        </div>
      </div>

      {/* Mobile Stage Selector */}
      <div className="flex md:hidden items-center justify-center bg-stone-100 p-1 rounded-xl border border-stone-200 mt-3 max-w-sm mx-auto">
        <button
          onClick={() => setStage('ttc')}
          className={`flex-1 py-1 rounded-lg text-xs font-heading font-bold text-center transition-all cursor-pointer ${
            currentStage === 'ttc' ? 'bg-white text-ink shadow-soft' : 'text-ink-muted'
          }`}
        >
          Conception
        </button>
        <button
          onClick={() => setStage('pregnancy')}
          className={`flex-1 py-1 rounded-lg text-xs font-heading font-bold text-center transition-all cursor-pointer ${
            currentStage === 'pregnancy' ? 'bg-white text-ink shadow-soft' : 'text-ink-muted'
          }`}
        >
          Pregnancy
        </button>
        <button
          onClick={() => setStage('postpartum')}
          className={`flex-1 py-1 rounded-lg text-xs font-heading font-bold text-center transition-all cursor-pointer ${
            currentStage === 'postpartum' ? 'bg-white text-ink shadow-soft' : 'text-ink-muted'
          }`}
        >
          Postpartum
        </button>
      </div>
    </header>
  );
};

export default Navigation;
