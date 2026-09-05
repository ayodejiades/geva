import React, { useState, useEffect } from 'react';
import { useGeva } from '../context/GevaContext';
import { getMilestoneForWeek } from '../data/milestones';
import { heartbeatAudio } from '../utils/heartbeatAudio';

import pregnancyStagesSvg from '../assets/illustrations/pregnancy-stages.svg';
import conceptionSvg from '../assets/illustrations/conception.svg';
import motherhoodSvg from '../assets/illustrations/motherhood.svg';

export const BabyDevelopmentCard = () => {
  const { state } = useGeva();
  const stage = state.stage || 'pregnancy';
  const week = state.user?.pregnancyWeek || 12;
  const milestone = getMilestoneForWeek(week);

  const [isPlayingHeartbeat, setIsPlayingHeartbeat] = useState(false);

  // Clean up heartbeat audio when unmounting or switching stages
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

  if (stage === 'ttc') {
    return (
      <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
              Follicular & Cellular Preparation
            </span>
            <span className="text-xs font-body text-ink-muted">Day 14 Window</span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2 flex justify-center">
              <img
                src={conceptionSvg}
                alt="Conception and family planning illustration"
                className="max-h-48 object-contain"
              />
            </div>
            <div className="w-full sm:w-1/2 space-y-3">
              <div>
                <h3 className="font-heading font-bold text-xl text-ink">
                  Egg Maturation & Receptivity
                </h3>
                <p className="font-body text-xs text-ink-muted mt-1 leading-relaxed">
                  Estrogen triggers the luteinizing hormone surge, signaling the dominant follicle to release a mature egg. The endometrial lining thickens to 8–11 mm.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/5">
                <div className="bg-peach-light/50 p-2.5 rounded-xl">
                  <span className="text-[10px] font-body text-ink-muted uppercase block">Endometrium</span>
                  <span className="font-heading font-bold text-sm text-ink">9.4 mm</span>
                </div>
                <div className="bg-sage-light/50 p-2.5 rounded-xl">
                  <span className="text-[10px] font-body text-ink-muted uppercase block">Follicle Size</span>
                  <span className="font-heading font-bold text-sm text-ink">21 mm</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-ink/5 flex items-center justify-between text-xs text-ink-muted">
          <span>Target Basal Temp: 36.6°C (97.9°F)</span>
          <span className="text-sage-dark font-semibold">LH Surge Verified</span>
        </div>
      </div>
    );
  }

  if (stage === 'postpartum') {
    const weeks = state.user?.postpartumWeeks || 1;
    return (
      <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark">
              Newborn Development & Maternal Healing
            </span>
            <span className="text-xs font-body text-ink-muted">Week {weeks} Postpartum</span>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-full sm:w-1/2 flex justify-center">
              <img
                src={motherhoodSvg}
                alt="Motherhood and newborn bonding illustration"
                className="max-h-48 object-contain"
              />
            </div>
            <div className="w-full sm:w-1/2 space-y-3">
              <div>
                <h3 className="font-heading font-bold text-xl text-ink">
                  Infant Visual Tracking & Cooing
                </h3>
                <p className="font-body text-xs text-ink-muted mt-1 leading-relaxed">
                  Your newborn can now briefly hold eye contact at 8 to 12 inches away and recognizes your scent and voice. Rhythmic skin-to-skin touch stabilizes infant body temperature and oxytocin production.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/5">
                <div className="bg-periwinkle-light/50 p-2.5 rounded-xl">
                  <span className="text-[10px] font-body text-ink-muted uppercase block">Feed Cadence</span>
                  <span className="font-heading font-bold text-sm text-ink">Every 2.5–3h</span>
                </div>
                <div className="bg-sage-light/50 p-2.5 rounded-xl">
                  <span className="text-[10px] font-body text-ink-muted uppercase block">Infant Weight Gain</span>
                  <span className="font-heading font-bold text-sm text-ink">+30 g / day</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-ink/5 flex items-center justify-between text-xs text-ink-muted">
          <span>Pelvic Floor Healing: Stage 2</span>
          <span className="text-periwinkle-dark font-semibold">Gentle Horizontal Rest</span>
        </div>
      </div>
    );
  }

  // Pregnancy Stage
  return (
    <div className="bg-canvas border border-ink/8 rounded-card p-6 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
            Fetal Growth & Anatomy
          </span>
          <span className="text-xs font-body text-ink-muted">Week {week}</span>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-full sm:w-1/2 flex justify-center">
            <img
              src={pregnancyStagesSvg}
              alt="Baby gestational development illustration"
              className="max-h-48 object-contain"
            />
          </div>

          <div className="w-full sm:w-1/2 space-y-3">
            <div>
              <span className="text-xs font-body text-rose-dark font-semibold block">
                Approximate Size
              </span>
              <h3 className="font-heading font-bold text-2xl text-ink">
                {milestone?.item || 'Sweet Plum'}
              </h3>
              <p className="font-body text-xs text-ink-muted mt-1 leading-relaxed">
                {milestone?.note || 'Rapid brain maturation and development continuing on schedule.'}
              </p>
            </div>

            {/* Anatomical Metrics */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ink/5">
              <div className="bg-rose-light/40 p-2.5 rounded-xl">
                <span className="text-[10px] font-body text-ink-muted uppercase block">Crown to Heel</span>
                <span className="font-heading font-bold text-sm text-ink">
                  {milestone?.lengthCm || 5.4} cm
                </span>
              </div>
              <div className="bg-sage-light/40 p-2.5 rounded-xl">
                <span className="text-[10px] font-body text-ink-muted uppercase block">Estimated Weight</span>
                <span className="font-heading font-bold text-sm text-ink">
                  {milestone?.weightGrams || 14} g
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synthetic Web Audio Doppler Bar */}
      <div className="mt-6 pt-4 border-t border-ink/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={toggleHeartbeat}
            className={`px-4 py-2 rounded-xl font-heading font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
              isPlayingHeartbeat
                ? 'bg-rose text-ink shadow-soft'
                : 'bg-canvas hover:bg-rose-light border border-ink/10 text-ink'
            }`}
          >
            {isPlayingHeartbeat ? (
              <>
                {/* Visualizer wave bars */}
                <span className="flex items-center gap-0.5 h-3">
                  <span className="w-1 bg-ink rounded-full animate-bounce" style={{ height: '80%', animationDelay: '0ms' }} />
                  <span className="w-1 bg-ink rounded-full animate-bounce" style={{ height: '100%', animationDelay: '150ms' }} />
                  <span className="w-1 bg-ink rounded-full animate-bounce" style={{ height: '60%', animationDelay: '300ms' }} />
                </span>
                <span>Pause Doppler Audio</span>
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

        <span className="text-[11px] font-body text-ink-muted hidden sm:inline">
          Synthetic Web Audio Doppler (Zero external MP3)
        </span>
      </div>
    </div>
  );
};

export default BabyDevelopmentCard;
