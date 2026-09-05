import testimonialPartnerSyncSvg from '../assets/illustrations/testimonial-partner-sync.svg';
import testimonialClinicalMidwifeSvg from '../assets/illustrations/testimonial-clinical-midwife.svg';
import testimonialPostpartumFamilySvg from '../assets/illustrations/testimonial-postpartum-family.svg';

function Testimonials() {
  const testimonials = [
    {
      name: "Folashade & Adebayo O.",
      role: "Expecting Parents · Week 33",
      text: "When contractions started keeping me awake at 2 AM, Gbemi's voice felt like having a calm senior sister sitting right beside our bed. The live partner sync let Adebayo track each wave from his own screen without hovering or asking questions.",
      rating: 5,
      avatar: testimonialPartnerSyncSvg,
      avatarAlt: "Expecting parents partner sync illustration",
      wash: "bg-rose-light/25 border-rose-light/50",
    },
    {
      name: "Dr. Olubunmi Adeyemi, MD, CNM",
      role: "Certified Nurse-Midwife & Perinatal Educator",
      text: "When my patients hand me Geva's one-page Clinical Passport, our appointments become twice as productive. The ACOG-structured vital trends, kick intervals, and symptom notes give clinical teams immediate, reliable context.",
      rating: 5,
      avatar: testimonialClinicalMidwifeSvg,
      avatarAlt: "Certified Nurse-Midwife clinical consultation illustration",
      wash: "bg-sage-light/25 border-sage-light/50",
    },
    {
      name: "Camila & Sofia M.",
      role: "Fourth Trimester Family · Week 6 Postpartum",
      text: "Most apps disappear the second labor is over. Geva's postpartum recovery logging and pelvic healing check-ins protected my physical and emotional well-being during the hardest, most vulnerable weeks of our lives.",
      rating: 5,
      avatar: testimonialPostpartumFamilySvg,
      avatarAlt: "Fourth trimester family with newborn stroller illustration",
      wash: "bg-peach-light/25 border-peach-light/50",
    }
  ];

  return (
    <section className="py-12 sm:py-16 scroll-mt-24 mb-12 sm:mb-16" id="testimonials">
      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-ink mb-8 sm:mb-12 text-center">
        Voices from our <span className="text-rose">sanctuary</span>
      </h2>
      <div className="space-y-8 sm:space-y-12">
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 sm:gap-8 items-center`}
          >
            <div className="md:w-1/3 flex flex-col items-center text-center">
              {/* Storyset Rafiki illustration avatar */}
              <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full ${testimonial.wash} border-2 flex items-center justify-center overflow-hidden mb-3 shadow-soft`}>
                <img
                  src={testimonial.avatar}
                  alt={testimonial.avatarAlt}
                  className="w-full h-full object-contain p-1.5"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-heading font-bold text-ink">
                {testimonial.name}
              </h3>
              <p className="text-xs sm:text-sm font-body text-ink-muted">{testimonial.role}</p>
              <div className="flex text-peach-dark mt-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
            <div className={`w-full md:w-2/3 ${index % 2 === 0 ? 'bg-rose-light/30 border-rose-light/70' : index === 1 ? 'bg-sage-light/30 border-sage-light/70' : 'bg-periwinkle-light/30 border-periwinkle-light/70'} p-6 sm:p-8 rounded-card border shadow-card hover:shadow-soft transition-all`}>
              <p className="text-base sm:text-lg text-ink font-body leading-relaxed">
                "{testimonial.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
