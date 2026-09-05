import wellnessSvg from '../assets/illustrations/wellness.svg';
import conceptionSvg from '../assets/illustrations/conception.svg';
import midwifeConsultationSvg from '../assets/illustrations/midwife-consultation.svg';

function Features() {
  return (
    <section className="mb-14 sm:mb-20 scroll-mt-24" id="features">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-8 sm:mb-12 text-center">
        Grounded care for <span className="text-rose">every chapter</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {/* Card 1: Gbemi Voice Sanctuary */}
        <div className="bg-rose-light/40 rounded-card p-6 sm:p-8 text-center border border-rose-light/70 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between">
          <div className="mb-6 flex justify-center items-center h-40 sm:h-48 md:h-52">
            <img src={wellnessSvg} alt="Gbemi Voice Sanctuary" className="h-full w-auto max-h-52 object-contain drop-shadow-sm" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-ink mb-3">Gbemi Voice Sanctuary</h3>
            <p className="text-ink-muted font-body leading-relaxed text-sm sm:text-base">
              Instant, compassionate reassurance in a sister-midwife voice. Powered natively in your browser with zero telephony fees and zero subscription paywalls.
            </p>
          </div>
        </div>

        {/* Card 2: Development & Doppler Telemetry */}
        <div className="bg-periwinkle-light/50 rounded-card p-6 sm:p-8 text-center border border-periwinkle-light/70 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between">
          <div className="mb-6 flex justify-center items-center h-40 sm:h-48 md:h-52">
            <img src={conceptionSvg} alt="Acoustic Doppler Telemetry" className="h-full w-auto max-h-52 object-contain drop-shadow-sm" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-ink mb-3">Development & Heartbeat</h3>
            <p className="text-ink-muted font-body leading-relaxed text-sm sm:text-base">
              Follow weekly anatomical growth and hear simulated real-time Doppler fetal heart tones modeled at 145 BPM, synthesized client-side with zero audio streaming bandwidth.
            </p>
          </div>
        </div>

        {/* Card 3: Clinical Triage & SBAR Passport */}
        <div className="bg-sage-light/40 rounded-card p-6 sm:p-8 text-center border border-sage-light/70 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 flex flex-col justify-between">
          <div className="mb-6 flex justify-center items-center h-40 sm:h-48 md:h-52">
            <img src={midwifeConsultationSvg} alt="Clinical Triage" className="h-full w-auto max-h-52 object-contain drop-shadow-sm" />
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-ink mb-3">Doctor-Ready Briefs</h3>
            <p className="text-ink-muted font-body leading-relaxed text-sm sm:text-base">
              ACOG-aligned red-flag symptom monitoring, kick counters, contraction timers, and 1-click printable SBAR summaries for your midwife or OB-GYN.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
