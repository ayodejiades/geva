import React from 'react';
import familyCircleSvg from '../assets/illustrations/family-circle.svg';
import spotContractionSurge from '../assets/illustrations/spot-contraction-surge.svg';
import spotFetalKick from '../assets/illustrations/spot-fetal-kick.svg';
import spotPeerSync from '../assets/illustrations/spot-peer-sync.svg';

export const PartnerTelemetrySection = () => {
  return (
    <section className="mb-14 sm:mb-20 scroll-mt-24" id="partner-sync">
      <div className="bg-sage-light/30 border border-sage-light/70 rounded-sheet p-6 sm:p-10 lg:p-12 shadow-soft">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Column: Editorial Rationale */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-ink mb-4 leading-tight">
              Connected in real time. <span className="text-rose">Zero cloud servers required.</span>
            </h2>

            <p className="text-ink-muted font-body text-sm sm:text-base leading-relaxed mb-6">
              Partners often feel sidelined during labor or unsure when to offer hands-on support. Geva links both partners in real-time across browser windows using the browser's native BroadcastChannel API, completely bypassing central servers.
            </p>

            {/* Feature List */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 bg-white/90 rounded-2xl p-4 border border-sage-light/80 shadow-sm transition-all hover:shadow-soft">
                <img
                  src={spotContractionSurge}
                  alt="Live Contraction Surge Telemetry illustration"
                  className="w-12 h-12 flex-shrink-0 rounded-2xl shadow-xs"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-ink mb-0.5">
                    Live Contraction Surge Telemetry
                  </h4>
                  <p className="font-body text-xs text-ink-muted leading-relaxed">
                    When mom begins timing a contraction wave, partner's screen receives immediate visual cadence so they can step in with counter-pressure and paced breathing without asking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/90 rounded-2xl p-4 border border-sage-light/80 shadow-sm transition-all hover:shadow-soft">
                <img
                  src={spotFetalKick}
                  alt="Fetal Movement Broadcasts illustration"
                  className="w-12 h-12 flex-shrink-0 rounded-2xl shadow-xs"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-ink mb-0.5">
                    Fetal Movement Broadcasts
                  </h4>
                  <p className="font-body text-xs text-ink-muted leading-relaxed">
                    Evening kick count sessions sync directly to partner devices, fostering shared bonding and collaborative observation of fetal wake-sleep cycles.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/90 rounded-2xl p-4 border border-sage-light/80 shadow-sm transition-all hover:shadow-soft">
                <img
                  src={spotPeerSync}
                  alt="Zero Third-Party Accounts & Local Telemetry illustration"
                  className="w-12 h-12 flex-shrink-0 rounded-2xl shadow-xs"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-ink mb-0.5">
                    Zero Third-Party Accounts & Zero Fees
                  </h4>
                  <p className="font-body text-xs text-ink-muted leading-relaxed">
                    No credit cards, no monthly subscription add-ons for secondary users, and zero database storage. Telemetry transmits directly within your browser runtime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Illustration + Live Telemetry Visual Card */}
          <div className="w-full lg:w-1/2 flex flex-col items-center">
            {/* Storyset Rafiki Family Circle Illustration */}
            <div className="w-full max-w-md h-56 sm:h-64 flex items-center justify-center bg-white/90 rounded-2xl p-4 border border-sage/30 shadow-sm mb-6">
              <img
                src={familyCircleSvg}
                alt="Hospital family visit and partner sync illustration"
                className="h-full w-auto max-h-56 object-contain drop-shadow-sm"
              />
            </div>

            {/* Simulated Live Telemetry Badge Card */}
            <div className="w-full max-w-md bg-white rounded-2xl p-5 border border-sage/40 shadow-soft">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sage animate-ping" />
                  <span className="font-heading font-bold text-xs text-ink">
                    Live CareCircle Feed
                  </span>
                </div>
                <span className="text-[10px] font-body text-sage-dark font-semibold uppercase tracking-wider">
                  Multi-Tab Active
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-body">
                <div className="p-3 rounded-xl bg-rose-light/30 border border-rose-light/60 flex items-center justify-between">
                  <div>
                    <strong className="font-heading font-bold text-ink block">
                      Contraction Surged (62 seconds)
                    </strong>
                    <span className="text-ink-muted text-[11px]">
                      Interval: 4.5 minutes apart · Rest and breathe
                    </span>
                  </div>
                  <span className="text-ink-muted text-[10px] whitespace-nowrap">Just now</span>
                </div>

                <div className="p-3 rounded-xl bg-sage-light/35 border border-sage-light/60 flex items-center justify-between">
                  <div>
                    <strong className="font-heading font-bold text-ink block">
                      10 Kicks Verified in 18 mins
                    </strong>
                    <span className="text-ink-muted text-[11px]">
                      ACOG movement protocol threshold fulfilled
                    </span>
                  </div>
                  <span className="text-ink-muted text-[10px] whitespace-nowrap">14m ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerTelemetrySection;
