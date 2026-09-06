import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { babyMilestones, getMilestoneForWeek } from '../data/milestones';
import pregnancyStagesSvg from '../assets/illustrations/pregnancy-stages.svg';
import conceptionSvg from '../assets/illustrations/conception.svg';
import motherhoodSvg from '../assets/illustrations/motherhood.svg';
import familyCircleSvg from '../assets/illustrations/family-circle.svg';

export default function FamilyPathwaysPage() {
  const [selectedWeek, setSelectedWeek] = useState(34);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const milestone = getMilestoneForWeek(selectedWeek);

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col font-body selection:bg-rose-light">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Page Hero Header */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark block mb-2 sm:mb-3">
            The Three Life Stages
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-ink mb-4 sm:mb-5 leading-tight">
            Family Pathways & <span className="text-rose">Nurture Journeys</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-ink-muted leading-relaxed font-body">
            Grounded guidance for trying to conceive, gestational development, active labor timing, 
            and fourth-trimester healing, designed for mothers and their partners.
          </p>
        </section>

        {/* Quick Anchor Navigation Strip */}
        <nav className="mb-10 sm:mb-14 p-2 bg-stone-50 rounded-card border border-stone-200/80 flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xs font-heading font-bold">
          <a href="#cycle" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Cycle & Fertility
          </a>
          <a href="#milestones" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Fetal Milestones
          </a>
          <a href="#labor-timing" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            5-1-1 Labor Timing
          </a>
          <a href="#postpartum" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Postpartum Healing
          </a>
          <a href="#partner-telemetry" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            CareCircle Telemetry
          </a>
        </nav>

        {/* Section 1: Cycle & Fertility Insights */}
        <section id="cycle" className="scroll-mt-28 mb-12 sm:mb-16 bg-periwinkle-light/25 border border-periwinkle-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-periwinkle-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark">
                  Preconception & Family Planning
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                Cycle Tracking & <span className="text-rose">Fertility Insights</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                Conception requires identifying the 6-day fertile window when sperm viability and follicular 
                maturation coincide. Geva supports gentle cycle awareness without anxiety-inducing ovulation kits or invasive data mining.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 text-xs font-body">
                <div className="bg-white/90 p-4 rounded-xl border border-periwinkle/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Basal Temperature (BBT)</strong>
                  <p className="text-ink-muted">A subtle thermal shift of 0.3°–0.6°F confirms that ovulation and progesterone surge have occurred.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-periwinkle/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Cervical Fluid Dynamics</strong>
                  <p className="text-ink-muted">Clear, stretchy egg-white fluid primes the vaginal environment for sperm longevity up to 5 days.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-periwinkle/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Luteal Wellness</strong>
                  <p className="text-ink-muted">Tracking a sustained 12–14 day luteal phase supports healthy implantation into the uterine lining.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-periwinkle/40 shadow-soft w-full text-center">
              <img src={conceptionSvg} alt="Fertility and conception" className="w-40 h-40 object-contain mb-3" />
              <strong className="font-heading font-bold text-ink text-sm block">Clara's TTC Journey</strong>
              <p className="text-xs text-ink-muted font-body mt-1">
                Explore our pre-hydrated Cycle Day 14 pathway in the sanctuary dashboard.
              </p>
              <Link
                to="/stage"
                className="mt-4 py-2 px-5 rounded-xl bg-rose text-white font-heading font-bold text-xs hover:bg-rose-dark transition-colors shadow-soft"
              >
                Explore TTC Stage
              </Link>
            </div>
          </div>
        </section>

        {/* Section 2: Weekly Fetal Milestones */}
        <section id="milestones" className="scroll-mt-28 mb-12 sm:mb-16 bg-white border border-stone-200 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-rose" />
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
              Week-by-Week Developmental Dictionary
            </span>
          </div>
          <h2 className="text-3xl font-heading font-bold text-ink mb-4">
            Fetal Growth <span className="text-rose">Milestones Visualizer</span>
          </h2>
          <p className="text-ink-muted leading-relaxed font-body mb-8 max-w-3xl">
            Select any gestational week to inspect accurate anatomical measurements, 
            botanical scale comparators, and developmental benchmarks from week 4 to full term.
          </p>

          {/* Week Selector Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[4, 8, 12, 16, 20, 24, 28, 32, 34, 36, 40].map((w) => (
              <button
                key={w}
                onClick={() => setSelectedWeek(w)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-heading font-bold transition-all cursor-pointer ${
                  selectedWeek === w
                    ? 'bg-rose text-white shadow-soft scale-105'
                    : 'bg-stone-100 hover:bg-stone-200/80 text-ink'
                }`}
              >
                Week {w}
              </button>
            ))}
          </div>

          {/* Interactive Milestone Card */}
          <div className="bg-rose-light/20 border border-rose-light/70 rounded-2xl p-5 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-white p-3 flex items-center justify-center shadow-soft shrink-0">
              <img src={pregnancyStagesSvg} alt={`Week ${selectedWeek}`} className="max-h-full object-contain" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                <span className="px-3 py-1 rounded-lg bg-white text-ink text-xs font-heading font-bold border border-stone-200">
                  Week {selectedWeek} Gestation
                </span>
                <span className="text-xs font-body text-ink-muted">
                  Trimester {selectedWeek < 13 ? 1 : selectedWeek < 27 ? 2 : 3}
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-ink mb-1">
                Size of a {milestone?.item || 'Cantaloupe'}
              </h3>
              <p className="text-sm font-heading font-bold text-rose-dark mb-3">
                Length: {milestone?.lengthCm} cm · Estimated Weight: {milestone?.weightGrams} g
              </p>
              <p className="text-sm font-body text-ink-muted leading-relaxed">
                {milestone?.note}
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: 5-1-1 Active Labor Timing */}
        <section id="labor-timing" className="scroll-mt-28 mb-12 sm:mb-16 bg-rose-light/30 border border-rose-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
                  Labor Rhythm Protocol
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                The 5-1-1 Rule for <span className="text-rose">Active Labor</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                Knowing when to transition from home to hospital or birth center prevents premature triage visits 
                while safeguarding maternal health. Midwives and obstetricians universally utilize the 5-1-1 rule 
                as the threshold for active labor progress.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 text-xs font-body mb-6">
                <div className="bg-white p-4 rounded-xl border border-rose-light shadow-sm">
                  <strong className="text-rose-dark font-heading font-extrabold text-lg block mb-1">5 Minutes</strong>
                  <p className="text-ink-muted">Contractions occur every 5 minutes or closer, measured from the start of one contraction to the start of the next.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-light shadow-sm">
                  <strong className="text-rose-dark font-heading font-extrabold text-lg block mb-1">1 Minute</strong>
                  <p className="text-ink-muted">Each individual uterine contraction or surge lasts a full 60 seconds from onset to relaxation.</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-light shadow-sm">
                  <strong className="text-rose-dark font-heading font-extrabold text-lg block mb-1">1 Hour</strong>
                  <p className="text-ink-muted">This consistent rhythm has persisted steadily for at least 1 full hour without stopping or slowing.</p>
                </div>
              </div>

              {/* Braxton Hicks vs True Labor */}
              <div className="bg-white/90 p-4 rounded-xl border border-stone-200">
                <strong className="font-heading font-bold text-xs uppercase tracking-wider text-ink block mb-2">
                  True Labor Surges vs. Braxton Hicks
                </strong>
                <div className="grid sm:grid-cols-2 gap-3 text-xs font-body text-ink-muted">
                  <p>• <strong>Braxton Hicks:</strong> Irregular intervals, resolve with hydration or walking, felt primarily in front of abdomen.</p>
                  <p>• <strong>True Labor:</strong> Progressively closer and longer, intensify despite position changes, wrap from lower back around to pelvis.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-rose-light shadow-soft w-full text-center">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark block mb-2">
                Breathing Guide Integration
              </span>
              <div className="w-24 h-24 rounded-full border-4 border-rose-light flex items-center justify-center my-4 animate-pulse">
                <span className="font-heading font-bold text-sm text-ink">4s In · 4s Out</span>
              </div>
              <p className="text-xs text-ink-muted font-body mb-4">
                Geva's built-in contraction timer guides rhythmic calming respiration during every surge.
              </p>
              <Link
                to="/dashboard"
                className="py-2.5 px-6 rounded-xl bg-rose text-white font-heading font-bold text-xs hover:bg-rose-dark transition-colors shadow-soft"
              >
                Open Contraction Timer
              </Link>
            </div>
          </div>
        </section>

        {/* Section 4: Postpartum Healing Journals */}
        <section id="postpartum" className="scroll-mt-28 mb-12 sm:mb-16 bg-peach-light/35 border border-peach-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-peach-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-peach-dark">
                  Fourth Trimester Recovery
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                Postpartum Recovery & <span className="text-rose">Maternal Healing</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                Most pregnancy tools vanish the moment delivery concludes. Geva honors the Fourth Trimester, 
                recognizing that uterine involution, lochia monitoring, pelvic floor rest, and emotional stabilization 
                are vital medical milestones requiring tender, persistent support.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 text-xs font-body">
                <div className="bg-white/90 p-4 rounded-xl border border-peach/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Uterine Involution</strong>
                  <p className="text-ink-muted">Tracking the gradual return of the uterus to pre-pregnancy pelvis size over 6 weeks.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-peach/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Lochia Progression</strong>
                  <p className="text-ink-muted">Monitoring healthy color shift from lochia rubra (red) to serosa (pinkish) to alba (cream).</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-peach/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Postpartum Mood Care</strong>
                  <p className="text-ink-muted">Gentle emotional check-ins distinguishing baby blues from postpartum depression or anxiety.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-peach/40 shadow-soft w-full text-center">
              <img src={motherhoodSvg} alt="Postpartum recovery" className="w-40 h-40 object-contain mb-3" />
              <strong className="font-heading font-bold text-ink text-sm block">Maya's Postpartum Journey</strong>
              <p className="text-xs text-ink-muted font-body mt-1">
                Explore Week 4 recovery logs in our pre-loaded judge dashboard.
              </p>
              <Link
                to="/stage"
                className="mt-4 py-2 px-5 rounded-xl bg-peach-dark text-white font-heading font-bold text-xs hover:bg-peach transition-colors shadow-soft"
              >
                Explore Postpartum Stage
              </Link>
            </div>
          </div>
        </section>

        {/* Section 5: CareCircle Partner Telemetry */}
        <section id="partner-telemetry" className="scroll-mt-28 mb-12 sm:mb-16 bg-sage-light/25 border border-sage-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-sage-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark">
                  Real-Time Partner Synchronization
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                CareCircle Real-Time <span className="text-rose">Partner Sync</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                Partners often feel sidelined during pregnancy or anxious about when labor begins. 
                Geva's CareCircle operates client-side via the native browser `BroadcastChannel` API, 
                synchronizing kick counter taps and contraction timers between mom and partner in real-time across open windows, with zero server cost.
              </p>

              <div className="space-y-3 font-body text-xs text-ink">
                <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-sage/30">
                  <span className="w-2 h-2 rounded-full bg-rose mt-1.5 shrink-0" />
                  <p><strong>Live Kick Pulses:</strong> When the mother taps "Record Kick", partner screens light up instantly with baby movement alerts.</p>
                </div>
                <div className="flex items-start gap-2.5 p-3 bg-white rounded-xl border border-sage/30">
                  <span className="w-2 h-2 rounded-full bg-sage mt-1.5 shrink-0" />
                  <p><strong>Mirrored Labor Surges:</strong> Contraction durations and intervals update side-by-side so partners know exactly when active labor reaches the 5-1-1 mark.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-sage/40 shadow-soft w-full text-center">
              <img src={familyCircleSvg} alt="CareCircle partner sync" className="w-40 h-40 object-contain mb-3" />
              <div className="inline-flex items-center gap-2 text-sage-dark text-xs font-heading font-bold mb-2">
                <span className="w-2 h-2 rounded-full bg-sage animate-ping" />
                <span>BroadcastChannel Active</span>
              </div>
              <p className="text-xs text-ink-muted font-body">
                Open two tabs side-by-side to witness real-time partner sync in action!
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
