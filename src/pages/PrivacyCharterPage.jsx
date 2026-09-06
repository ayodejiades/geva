import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import wellnessSvg from '../assets/illustrations/wellness.svg';

export default function PrivacyCharterPage() {
  const [clearedMessage, setClearedMessage] = useState(false);
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

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear your local Geva sanctuary data? This cannot be undone.')) {
      localStorage.removeItem('geva_store_v1');
      setClearedMessage(true);
      setTimeout(() => setClearedMessage(false), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col font-body selection:bg-rose-light">
      <Header />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Hero Header */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-heading font-bold uppercase tracking-wider text-peach-dark block mb-2 sm:mb-3">
            Sacred Privacy Commitment
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-ink mb-4 sm:mb-5 leading-tight">
            Privacy Charter & <span className="text-rose">Local Guarantee</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-ink-muted leading-relaxed font-body">
            Your reproductive health and perinatal data belong exclusively to you. 
            Geva is built with zero cloud databases, zero tracking pixels, and a permanent $0.00 cost charter.
          </p>
        </section>

        {/* Quick Jump Bar */}
        <nav className="mb-10 sm:mb-14 p-2 bg-stone-50 rounded-card border border-stone-200/80 flex flex-wrap justify-center gap-1.5 sm:gap-2 text-xs font-heading font-bold">
          <a href="#privacy" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Privacy Charter
          </a>
          <a href="#clinical-standards" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Clinical Standards
          </a>
          <a href="#local-guarantee" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            Local Storage Guarantee
          </a>
          <a href="#zero-paywalls" className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white hover:bg-rose-light/40 text-ink shadow-soft transition-all">
            100% Free Forever
          </a>
        </nav>

        {/* Section 1: Privacy Charter */}
        <section id="privacy" className="scroll-mt-28 mb-12 sm:mb-16 bg-white border border-stone-200 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
                  Zero-Data-Collection Principle
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                The Sacred Privacy <span className="text-rose">Charter</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-6">
                In an era where reproductive healthcare apps sell location logs and cycle telemetry to commercial 
                brokers or face legal subpoenas, Geva guarantees that zero medical telemetry is transmitted across the internet.
              </p>

              <div className="space-y-3 text-xs font-body">
                <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                  <span className="w-2 h-2 rounded-full bg-sage mt-2 shrink-0" />
                  <div>
                    <strong className="font-heading font-bold text-ink block">No Remote Servers or User Accounts</strong>
                    <p className="text-ink-muted mt-0.5">We do not operate a user database. There is no remote account to hack, breach, or subpoena.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                  <span className="w-2 h-2 rounded-full bg-rose mt-2 shrink-0" />
                  <div>
                    <strong className="font-heading font-bold text-ink block">Zero Trackers or Advertising SDKs</strong>
                    <p className="text-ink-muted mt-0.5">Zero Google Analytics, zero Meta Pixels, zero third-party telemetry scripts, and zero advertising cookies.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200/70">
                  <span className="w-2 h-2 rounded-full bg-peach-dark mt-2 shrink-0" />
                  <div>
                    <strong className="font-heading font-bold text-ink block">Native Browser Voice Processing</strong>
                    <p className="text-ink-muted mt-0.5">Voice conversations with Gbemi run via your browser's native Web Speech API without sending audio to third-party telephony APIs.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/3 flex flex-col items-center justify-center p-6 bg-peach-light/30 rounded-2xl border border-peach/40 shadow-soft w-full text-center">
              <img src={wellnessSvg} alt="Privacy sanctuary" className="w-36 h-36 object-contain mb-3" />
              <strong className="font-heading font-bold text-ink text-sm block">100% Patient Sovereignty</strong>
              <p className="text-xs text-ink-muted font-body mt-1">
                Your medical journey remains strictly between you and your healthcare provider.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Clinical Standards */}
        <section id="clinical-standards" className="scroll-mt-28 mb-12 sm:mb-16 bg-sage-light/25 border border-sage-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sage-dark" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark">
                Educational Scope & Medical Safeguards
              </span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-ink mb-4">
              Clinical Standards & <span className="text-rose">Medical Scope</span>
            </h2>
            <p className="text-ink-muted leading-relaxed font-body mb-4">
              Geva is developed as an educational perinatal health companion, midwife-inspired guide, 
              and structured telemetry organizer. It is not a diagnostic medical device and is designed to complement, 
              never replace, the direct clinical judgment of your obstetrician, certified nurse-midwife, or maternal-fetal medicine specialist.
            </p>
            <div className="p-4 bg-white/90 rounded-xl border border-sage/40 text-xs font-body text-ink space-y-2">
              <strong className="font-heading font-bold text-sage-dark block uppercase tracking-wider">
                Clinical Use Guidelines
              </strong>
              <p>• If experiencing bleeding, sudden fluid leakage, severe headache with visual aura, or reduced fetal movement, immediately contact your hospital labor and delivery triage.</p>
              <p>• The synthetic fetal Doppler heartbeat feature is an educational audio simulation modeled at 145 BPM and does not measure actual real-time fetal cardiac status.</p>
              <p>• The 5-1-1 active labor rhythm counter calculates intervals mathematically and should be verified with your birthing team upon onset of labor.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Local Storage Guarantee */}
        <section id="local-guarantee" className="scroll-mt-28 mb-12 sm:mb-16 bg-rose-light/25 border border-rose-light/60 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            <div className="lg:w-2/3">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-rose" />
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark">
                  Browser-Level Sovereignty
                </span>
              </div>
              <h2 className="text-3xl font-heading font-bold text-ink mb-4">
                Local Storage <span className="text-rose">Guarantee</span>
              </h2>
              <p className="text-ink-muted leading-relaxed font-body mb-4">
                All daily logs, kick counts, contraction sessions, and profile preferences are saved to your 
                browser’s private client storage (`geva_store_v1`). You have the absolute right to purge, reset, 
                or modify your data at any instant.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleClearData}
                  className="py-2.5 px-5 rounded-xl bg-white border border-rose text-rose-dark hover:bg-rose hover:text-white font-heading font-bold text-xs transition-all shadow-soft cursor-pointer"
                >
                  Clear Local Sanctuary Data
                </button>
                {clearedMessage && (
                  <span className="text-xs font-body font-semibold text-rose-dark">
                    Local sanctuary data wiped successfully!
                  </span>
                )}
              </div>
            </div>

            <div className="lg:w-1/3 bg-white p-6 rounded-2xl border border-rose-light text-center w-full shadow-soft">
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark block mb-1">
                Data Storage Key
              </span>
              <code className="text-xs font-mono bg-stone-100 px-2 py-1 rounded block text-ink my-2">
                localStorage.geva_store_v1
              </code>
              <p className="text-[11px] text-ink-muted font-body">
                Sandboxed strictly within your web browser origin.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: 100% Free Forever */}
        <section id="zero-paywalls" className="scroll-mt-28 mb-12 sm:mb-16 bg-white border border-stone-200 rounded-card p-5 sm:p-8 lg:p-10 shadow-soft">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-sage" />
              <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark">
                Non-Commercial Health Charter
              </span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-ink mb-4">
              100% Free Forever <span className="text-rose">($0.00 Cost Guarantee)</span>
            </h2>
            <p className="text-ink-muted leading-relaxed font-body mb-4">
              Maternal mortality and birth equity are global imperatives. Geva operates on zero cloud infrastructure, 
              which means our operational cost is $0.00. We will never implement subscription paywalls, Stripe checkouts, 
              or premium feature locks.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 text-xs font-body pt-2">
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="font-heading font-bold text-ink block mb-1">No Paywalls</strong>
                <p className="text-ink-muted">Every clinical tool, audio generator, and kick tracker is 100% unlocked for everyone.</p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="font-heading font-bold text-ink block mb-1">No Telephony Fees</strong>
                <p className="text-ink-muted">Voice accompaniment utilizes in-browser Web Speech API instead of expensive paid third-party APIs.</p>
              </div>
              <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200">
                <strong className="font-heading font-bold text-ink block mb-1">No Cloud Server Bills</strong>
                <p className="text-ink-muted">Client-side synthesis and peer-to-peer sync eliminate recurring cloud hosting invoices.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
