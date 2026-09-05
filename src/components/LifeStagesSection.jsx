import React from 'react';
import { Link } from 'react-router-dom';
import conceptionSvg from '../assets/illustrations/conception.svg';
import pregnancyStagesSvg from '../assets/illustrations/pregnancy-stages.svg';
import motherhoodSvg from '../assets/illustrations/motherhood.svg';

export const LifeStagesSection = () => {
  const stages = [
    {
      id: 'ttc',
      title: 'Conception & Family Planning',
      tagline: 'Trying to Conceive (TTC)',
      description: 'Tune in to your biological feedback. Track morning basal temperature shifts, cervical fluid dynamics, and ovulation surge windows with quiet patience.',
      illustration: conceptionSvg,
      illustrationAlt: 'Conception and family planning illustration',
      wash: 'bg-periwinkle-light/35 border-periwinkle-light/60',
      badgeColor: 'text-periwinkle-dark',
      buttonWash: 'bg-periwinkle hover:bg-periwinkle-dark text-white',
      highlights: [
        'Basal body temperature trajectory',
        'Luteinizing hormone surge window',
        'Cervical fluid consistency logging',
        'Restorative follicular nutrition'
      ],
      link: '/signup?stage=ttc',
      linkText: 'Explore Conception Stage'
    },
    {
      id: 'pregnancy',
      title: 'Pregnancy & Gestational Care',
      tagline: 'Trimesters 1, 2, and 3',
      description: 'Follow anatomical benchmarks week by week, listen to real-time synthetic Doppler cardiac pulses, and monitor active labor rhythms with ACOG precision.',
      illustration: pregnancyStagesSvg,
      illustrationAlt: 'Pregnancy and gestational care illustration',
      wash: 'bg-rose-light/30 border-rose-light/60',
      badgeColor: 'text-rose-dark',
      buttonWash: 'bg-rose hover:bg-rose-dark text-white',
      highlights: [
        'Weekly fetal growth dictionary',
        'Synthetic Doppler audio (145 BPM)',
        'ACOG 10-kick fetal movement timer',
        '5-1-1 labor contraction cadence'
      ],
      link: '/signup?stage=pregnancy',
      linkText: 'Explore Pregnancy Stage'
    },
    {
      id: 'postpartum',
      title: 'Postpartum & Fourth Trimester',
      tagline: 'Maternal Healing & Infant Care',
      description: 'Protect your physical and emotional recovery. Track uterine involution, pelvic floor healing stages, feeding intervals, and restorative rest rhythms.',
      illustration: motherhoodSvg,
      illustrationAlt: 'Postpartum recovery and newborn care illustration',
      wash: 'bg-peach-light/40 border-peach-light/60',
      badgeColor: 'text-peach-dark',
      buttonWash: 'bg-peach-dark hover:bg-ink text-white',
      highlights: [
        'Pelvic floor restorative stages',
        'Infant feeding and diaper rhythm',
        'Postpartum mental health check-ins',
        'Lochia healing progression'
      ],
      link: '/signup?stage=postpartum',
      linkText: 'Explore Postpartum Stage'
    }
  ];

  return (
    <section className="mb-14 sm:mb-20 scroll-mt-24" id="stages">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-ink mb-4">
          One continuous sanctuary through <span className="text-rose">three life chapters</span>
        </h2>
        <p className="text-ink-muted font-body text-base sm:text-lg leading-relaxed">
          Geva adapts to your body's changing physiological needs, providing clinical grounding and emotional reassurance from preconception planning through full recovery.
        </p>
      </div>

      {/* 3-Column Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {stages.map((stage) => (
          <div
            key={stage.id}
            className={`${stage.wash} rounded-card p-6 sm:p-8 border shadow-soft flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-warm`}
          >
            <div>
              {/* Illustration Frame */}
              <div className="w-full h-44 sm:h-48 flex items-center justify-center bg-white/70 rounded-2xl p-4 mb-6 border border-white shadow-sm">
                <img
                  src={stage.illustration}
                  alt={stage.illustrationAlt}
                  className="h-full w-auto max-h-44 object-contain drop-shadow-sm"
                />
              </div>

              {/* Tagline & Title */}
              <span className={`text-xs font-heading font-bold uppercase tracking-wider block mb-1.5 ${stage.badgeColor}`}>
                {stage.tagline}
              </span>
              <h3 className="text-xl font-heading font-bold text-ink mb-3">
                {stage.title}
              </h3>
              <p className="text-ink-muted font-body text-sm leading-relaxed mb-6">
                {stage.description}
              </p>

              {/* Clinical Benchmark Bullets */}
              <div className="space-y-2.5 pt-4 border-t border-ink/5 mb-6">
                {stage.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs font-body text-ink">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink/40 mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Link */}
            <Link
              to={stage.link}
              className={`w-full py-3 px-4 rounded-xl font-heading font-bold text-xs text-center transition-all shadow-soft cursor-pointer block ${stage.buttonWash}`}
            >
              {stage.linkText}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifeStagesSection;
