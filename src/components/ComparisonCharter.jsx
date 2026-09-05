import React from 'react';
import { Link } from 'react-router-dom';

export const ComparisonCharter = () => {
  const comparisonRows = [
    {
      dimension: 'Pricing & Business Model',
      legacy: '$50 to $120 / year subscriptions, credit card paywalls, and locked features.',
      geva: '100% Free Forever. Zero paywalls, zero subscription modals, zero charges.',
      gevaAdvantage: true,
    },
    {
      dimension: 'Reproductive Data Privacy',
      legacy: 'Cloud databases vulnerable to data broker sales, marketing trackers, and subpoenas.',
      geva: '100% Local-First on this device. Zero server storage, zero HIPAA cloud liability.',
      gevaAdvantage: true,
    },
    {
      dimension: 'Voice Midwife Assistance',
      legacy: 'Paid cloud telephony APIs charging $0.15/min, requiring personal phone numbers.',
      geva: 'Native in-browser Web Speech API and on-device WebLLM at zero operational cost.',
      gevaAdvantage: true,
    },
    {
      dimension: 'Partner Synchronization',
      legacy: 'Requires secondary account sign-ups, passwords, and centralized cloud servers.',
      geva: 'Real-time multi-tab sync via browser BroadcastChannel API. Zero server latency.',
      gevaAdvantage: true,
    },
    {
      dimension: 'Clinical Handover Reports',
      legacy: 'Unstructured phone screenshots that clutter prenatal appointments.',
      geva: 'Standard 1-page printable SBAR doctor brief designed for OB-GYN and midwife review.',
      gevaAdvantage: true,
    },
    {
      dimension: 'Interface & Ad Ecosystem',
      legacy: 'Cluttered baby product banner ads, sponsored popups, and intrusive notifications.',
      geva: 'Quiet, editorial sanctuary. Zero advertisements, zero sponsorships, zero tracking.',
      gevaAdvantage: true,
    },
  ];

  return (
    <section className="mb-14 sm:mb-20 scroll-mt-24" id="charter">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-ink mb-4">
          Built differently from <span className="text-rose">commercial trackers</span>
        </h2>
        <p className="text-ink-muted font-body text-base sm:text-lg leading-relaxed">
          Pregnancy and postpartum recovery are sacred life passages, not ad-targeting opportunities. Here is how Geva compares to commercial alternatives.
        </p>
      </div>

      {/* Comparison Container */}
      <div className="bg-white border border-stone-200 rounded-card shadow-soft overflow-hidden">
        {/* Mobile View: Stacked Comparison Cards (sm:hidden) */}
        <div className="block sm:hidden divide-y divide-stone-100">
          {comparisonRows.map((row, index) => (
            <div key={index} className="p-4 space-y-3">
              <span className="font-heading font-bold text-xs uppercase tracking-wider text-ink block">
                {row.dimension}
              </span>
              
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs font-body">
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-ink-muted block mb-1">
                  Legacy Platforms (Bump / Flo)
                </span>
                <div className="flex items-start gap-2 text-ink-muted">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-faint flex-shrink-0 mt-0.5">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  <span>{row.legacy}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-rose-light/20 border border-rose-light/60 text-xs font-body">
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-rose-dark block mb-1">
                  Geva Sanctuary
                </span>
                <div className="flex items-start gap-2 text-ink font-medium">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-sage-dark flex-shrink-0 mt-0.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{row.geva}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop / Tablet View: Table (hidden sm:block) */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-stone-200 bg-stone-50/70">
                <th className="p-4 sm:p-6 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-ink-muted w-1/4">
                  Evaluation Dimension
                </th>
                <th className="p-4 sm:p-6 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-ink-muted w-3/8">
                  Legacy Platforms (Bump / Flo)
                </th>
                <th className="p-4 sm:p-6 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider text-rose-dark bg-rose-light/20 w-3/8">
                  Geva Sanctuary
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-xs sm:text-sm font-body">
              {comparisonRows.map((row, index) => (
                <tr key={index} className="hover:bg-stone-50/50 transition-colors">
                  <td className="p-4 sm:p-6 font-heading font-bold text-ink">
                    {row.dimension}
                  </td>
                  <td className="p-4 sm:p-6 text-ink-muted leading-relaxed">
                    <div className="flex items-start gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-ink-faint flex-shrink-0 mt-0.5">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      <span>{row.legacy}</span>
                    </div>
                  </td>
                  <td className="p-4 sm:p-6 text-ink leading-relaxed bg-rose-light/10 font-medium">
                    <div className="flex items-start gap-2.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-sage-dark flex-shrink-0 mt-0.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span>{row.geva}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Banner */}
        <div className="p-5 sm:p-8 bg-stone-50/60 border-t border-stone-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-heading font-bold text-sm sm:text-base text-ink mb-1">
              Read our complete local storage and clinical commitments
            </h4>
            <p className="font-body text-xs text-ink-muted">
              Inspect our open privacy charter and clinical foundations documentation.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 flex-shrink-0 w-full sm:w-auto">
            <Link
              to="/privacy-charter"
              className="py-2.5 px-5 rounded-xl border border-stone-200 text-ink font-heading font-bold text-xs hover:bg-white transition-colors text-center"
            >
              Privacy Charter
            </Link>
            <Link
              to="/clinical-foundations"
              className="py-2.5 px-5 rounded-xl bg-rose text-white font-heading font-bold text-xs hover:bg-rose-dark transition-colors shadow-soft text-center"
            >
              Clinical Foundations
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonCharter;
