import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GbemiMascot from '../components/GbemiMascot';
import ClinicalPassportModal from '../components/ClinicalPassportModal';
import { heartbeatAudio } from '../utils/heartbeatAudio';
import midwifeConsultationSvg from '../assets/illustrations/midwife-consultation.svg';

export default function ClinicalFoundationsPage() {
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isPlayingHeartbeat, setIsPlayingHeartbeat] = useState(false);
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

  const toggleHeartbeat = () => {
    if (isPlayingHeartbeat) {
      heartbeatAudio.stopHeartbeat();
      setIsPlayingHeartbeat(false);
    } else {
      heartbeatAudio.startHeartbeat(145);
      setIsPlayingHeartbeat(true);
    }
  };

  useEffect(() => {
    return () => {
      heartbeatAudio.stopHeartbeat();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col font-body selection:bg-rose-light">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Page Hero Header */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark block mb-2 sm:mb-3">
            Clinical Documentation & Evidence
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-ink mb-4 sm:mb-5 leading-tight">
            Clinical Foundations & <span className="text-rose">Care Standards</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-ink-muted leading-relaxed font-body">
            Geva integrates clinical triage guidelines, patient-held SBAR handover briefs, 
            and zero-cost local architecture to bring calming hospital-grade safety to daily perinatal wellness.
          </p>
        </section>

        {/* Quick Anchor Navigation Strip */}
        <nav className="mb-10 sm:mb-14 p-2 bg-stone-50 rounded-card border border-stone-200/80 flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xs font-heading font-bold">
          <a href="#acog" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            ACOG Triage Protocols
          </a>
          <a href="#sbar" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            SBAR Doctor Briefs
          </a>
          <a href="#local-first" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Local-First Architecture
          </a>
          <a href="#doppler" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Doppler Audio Synthesis
          </a>
          <a href="#sister-midwife" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Sister-Midwife Philosophy
          </a>
        </nav>

        {/* Section 1: ACOG Triage Protocols */}
        <section id="acog" className="scroll-mt-28 mb-12 sm:mb-16 bg-sage-light/25 border border-sage-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-sage-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark">
                  Emergency Triage Safety
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                ACOG-Aligned Red-Flag <span className="text-rose">Symptom Matrix</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                Maternal health safety relies on prompt identification of emergent complications such as 
                preeclampsia, placental abruption, and reduced fetal movement. Geva’s clinical engine evaluates 
                daily logs against established American College of Obstetricians and Gynecologists (ACOG) guidelines.
              </p>

              {/* Triage Matrix Grid */}
              <div className="grid sm:grid-cols-2 gap-4 text-xs font-body">
                <div className="bg-white/90 p-4 rounded-xl border border-stone-200/80 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Persistent Severe Headache</strong>
                  <p className="text-ink-muted">Unresponsive to oral hydration, rest, or acetaminophen. Potential indicator of elevated intracranial pressure and gestational hypertension.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-stone-200/80 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Visual Disturbances & Aura</strong>
                  <p className="text-ink-muted">Flashing lights, scotoma, sudden floaters, or blurred vision requiring immediate clinical blood pressure assessment.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-stone-200/80 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Right Upper Quadrant Pain</strong>
                  <p className="text-ink-muted">Severe epigastric pain or tenderness beneath the rib cage indicating hepatic capsular stretch in preeclampsia.</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-stone-200/80 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Decreased Fetal Activity</strong>
                  <p className="text-ink-muted">Fewer than 10 distinct fetal kicks over 2 consecutive hours after 28 weeks gestation requires non-stress testing (NST).</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white/80 rounded-2xl border border-sage/30 shadow-soft w-full">
              <img
                src={midwifeConsultationSvg}
                alt="Midwife clinical consultation"
                className="w-44 h-44 object-contain mb-4"
              />
              <div className="text-center">
                <strong className="font-heading font-bold text-ink text-sm block">Always-On Safety Screening</strong>
                <p className="text-xs text-ink-muted font-body mt-1">If warning signs are logged, Geva immediately directs the family to their emergency triage number.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: SBAR Doctor Briefs */}
        <section id="sbar" className="scroll-mt-28 mb-12 sm:mb-16 bg-rose-light/25 border border-rose-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
                  Clinical Communication Standard
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                SBAR Clinical Briefs for <span className="text-rose">Doctor Handover</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                When patients visit prenatal appointments, clinical teams often have less than 15 minutes. 
                Geva structures 14 days of patient data into the standardized hospital **SBAR format** 
                (Situation, Background, Assessment, Recommendation), creating an immediate one-page summary 
                that doctors and midwives can read in 60 seconds.
              </p>

              <div className="grid sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-white/90 p-3.5 rounded-xl border border-rose-light/80 shadow-sm">
                  <span className="font-heading font-extrabold text-rose-dark block mb-0.5">S · Situation</span>
                  <p className="text-ink-muted">Gestational week, primary vital trends, and reason for consultation.</p>
                </div>
                <div className="bg-white/90 p-3.5 rounded-xl border border-rose-light/80 shadow-sm">
                  <span className="font-heading font-extrabold text-rose-dark block mb-0.5">B · Background</span>
                  <p className="text-ink-muted">Maternal parity, expected delivery date, blood group, and baseline vitals.</p>
                </div>
                <div className="bg-white/90 p-3.5 rounded-xl border border-rose-light/80 shadow-sm">
                  <span className="font-heading font-extrabold text-rose-dark block mb-0.5">A · Assessment</span>
                  <p className="text-ink-muted">Logged kick frequency, contraction intervals, and red-flag symptom audit.</p>
                </div>
                <div className="bg-white/90 p-3.5 rounded-xl border border-rose-light/80 shadow-sm">
                  <span className="font-heading font-extrabold text-rose-dark block mb-0.5">R · Recommendation</span>
                  <p className="text-ink-muted">Tailored discussion points and clinical confirmation checklist.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-rose-light shadow-soft w-full text-center">
              <div className="w-12 h-12 rounded-full bg-rose-light/40 flex items-center justify-center mb-3">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-rose">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-ink text-base mb-1">Printable Doctor Brief</h3>
              <p className="text-xs text-ink-muted font-body mb-4 leading-relaxed">
                Optimized with `@media print` CSS for physical clipboards and clinical document scanners.
              </p>
              <button
                onClick={() => setIsPassportOpen(true)}
                className="w-full py-2.5 px-4 rounded-xl bg-rose text-white font-heading font-bold text-xs hover:bg-rose-dark transition-colors shadow-soft cursor-pointer"
              >
                Preview Clinical Passport
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Local-First Architecture */}
        <section id="local-first" className="scroll-mt-28 mb-12 sm:mb-16 bg-white border border-stone-200 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-ink" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-ink-muted">
                100% Privacy & Sovereign Telemetry
              </span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-ink mb-4">
              Local-First Architecture <span className="text-rose">(Zero Server Overhead)</span>
            </h2>
            <p className="text-ink-muted leading-relaxed font-body mb-6">
              Maternal telemetry includes some of the most sensitive medical data in existence: menstrual cycles, 
              conception timing, contractions, and fetal movement. Unlike legacy applications that monetize user data 
              or store it on cloud servers vulnerable to subpoenas and data brokers, Geva is engineered strictly local-first.
            </p>

            <div className="space-y-3 font-body text-sm text-ink">
              <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="w-2 h-2 rounded-full bg-sage mt-2 shrink-0" />
                <div>
                  <strong className="font-heading font-bold text-ink block">Browser-Level Sandboxing</strong>
                  <p className="text-xs text-ink-muted mt-0.5">All state resides in your device's `localStorage` and IndexedDB. Nothing leaves your browser window.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0" />
                <div>
                  <strong className="font-heading font-bold text-ink block">Zero Cloud Server Bills</strong>
                  <p className="text-xs text-ink-muted mt-0.5">Zero AWS backend costs, zero database maintenance fees, and zero cloud hosting liabilities. Geva is free forever.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                <span className="w-2 h-2 rounded-full bg-periwinkle mt-2 shrink-0" />
                <div>
                  <strong className="font-heading font-bold text-ink block">Offline Operational Resilience</strong>
                  <p className="text-xs text-ink-muted mt-0.5">Works in hospital triage basements or rural areas without Wi-Fi or mobile reception.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Doppler Audio Synthesis */}
        <section id="doppler" className="scroll-mt-28 mb-12 sm:mb-16 bg-periwinkle-light/30 border border-periwinkle-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-periwinkle-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark">
                  Synthetic Acoustic Doppler Engine
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                Real-Time Fetal Doppler <span className="text-rose">Sound Synthesis</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                Hearing the baby's heartbeat provides immense psychological reassurance to expectant parents. 
                Instead of streaming external MP3 recordings that consume bandwidth or fail offline, Geva's 
                audio engine synthesizes realistic acoustic ultrasound fluid Doppler sounds in real-time via the browser's native **Web Audio API**.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 text-xs font-body">
                <div className="bg-white/90 p-4 rounded-xl border border-periwinkle/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">145 BPM Cadence</strong>
                  <p className="text-ink-muted">Modeled on normal physiological third-trimester fetal cardiac rates (110–160 BPM).</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-periwinkle/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Dual-Pulse Acoustics</strong>
                  <p className="text-ink-muted">Dual sine oscillators simulate the rapid lub-dub of atrioventricular valve closure (72Hz & 62Hz).</p>
                </div>
                <div className="bg-white/90 p-4 rounded-xl border border-periwinkle/30 shadow-sm">
                  <strong className="font-heading font-bold text-ink block mb-1">Amniotic Fluid Filtering</strong>
                  <p className="text-ink-muted">115Hz lowpass biquad filter simulates the muffled acoustic impedance of uterine fluid.</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-periwinkle/40 shadow-soft w-full text-center">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-periwinkle-dark block mb-2">
                Live Acoustic Synthesizer
              </span>
              <div className="my-3 flex items-center justify-center gap-1 h-10 w-24">
                <span className={`w-1.5 bg-periwinkle rounded-full transition-all ${isPlayingHeartbeat ? 'h-8 animate-pulse' : 'h-3'}`} />
                <span className={`w-1.5 bg-rose rounded-full transition-all ${isPlayingHeartbeat ? 'h-10 animate-pulse' : 'h-4'}`} style={{ animationDelay: '100ms' }} />
                <span className={`w-1.5 bg-sage rounded-full transition-all ${isPlayingHeartbeat ? 'h-7 animate-pulse' : 'h-2'}`} style={{ animationDelay: '200ms' }} />
                <span className={`w-1.5 bg-peach rounded-full transition-all ${isPlayingHeartbeat ? 'h-9 animate-pulse' : 'h-3'}`} style={{ animationDelay: '300ms' }} />
              </div>
              <button
                onClick={toggleHeartbeat}
                className="w-full py-3 px-4 rounded-xl bg-ink text-white font-heading font-bold text-xs hover:bg-ink/90 transition-colors shadow-soft cursor-pointer mt-2"
              >
                {isPlayingHeartbeat ? 'Stop Doppler Pulse' : 'Simulate Fetal Heartbeat (145 BPM)'}
              </button>
            </div>
          </div>
        </section>

        {/* Section 5: Sister-Midwife Philosophy */}
        <section id="sister-midwife" className="scroll-mt-28 mb-12 sm:mb-16 bg-peach-light/35 border border-peach-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-peach-dark" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-peach-dark">
                  Maternal Philosophy & Ethos
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                The Sister-Midwife <span className="text-rose">Philosophy</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-4">
                In many West African traditions, the name **Gbemi** carries the sacred meaning *"lift me up"* or *"carry me"*. 
                Historically, women never birthed alone; they were surrounded by seasoned sisters, aunties, and traditional midwives 
                who offered physical comfort, continuous presence, and emotional calm without condescension.
              </p>
              <p className="text-ink-muted leading-relaxed font-body">
                Geva preserves this sacred tradition through companion technology that speaks like a wise, loving elder sister. 
                Gbemi never panics, never spams you with alarmist popups, and never reduces birth to transactional metrics.
              </p>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-white/90 rounded-2xl border border-peach-light shadow-soft w-full text-center">
              <GbemiMascot size={90} state="idle" className="mb-4" />
              <strong className="font-heading font-bold text-ink text-base block">Meet Gbemi</strong>
              <p className="text-xs text-ink-muted font-body mt-1">
                Your reassuring perinatal companion, available 24/7 in your browser via zero-cost Web Speech.
              </p>
              <Link
                to="/dashboard"
                className="mt-4 inline-block py-2 px-6 rounded-xl bg-peach-dark text-white font-heading font-bold text-xs hover:bg-peach transition-colors shadow-soft"
              >
                Experience Sanctuary
              </Link>
            </div>
          </div>
        </section>
      </main>

      <ClinicalPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />

      <Footer />
    </div>
  );
}
