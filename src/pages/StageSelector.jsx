import { useNavigate, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useGeva } from '../context/GevaContext';

import conceptionSvg from '../assets/illustrations/conception.svg';
import pregnancyStagesSvg from '../assets/illustrations/pregnancy-stages.svg';
import motherhoodSvg from '../assets/illustrations/motherhood.svg';

export const StageSelector = () => {
  const navigate = useNavigate();
  const { setStage, switchPersona } = useGeva();

  const handleSelectStage = (selectedStage) => {
    setStage(selectedStage);
    navigate(`/signup?stage=${selectedStage}`);
  };

  const handleGuestDemo = () => {
    switchPersona('anjola');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between font-body selection:bg-rose-light">
      {/* Centered Logo Header */}
      <header className="pt-8 pb-4 text-center">
        <Logo className="text-4xl" />
      </header>

      {/* Main Container */}
      <main className="flex flex-col items-center justify-center max-w-xl mx-auto px-4 py-6 sm:py-8 w-full">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-ink mb-6 sm:mb-8 text-center">
          Where are you on your <span className="text-rose">journey</span>?
        </h1>

        {/* Stacked Vertical List */}
        <div className="space-y-4 sm:space-y-6 w-full">
          {/* Card 1: Conception */}
          <div
            onClick={() => handleSelectStage('ttc')}
            className="bg-periwinkle-light/35 rounded-card p-4 sm:p-6 flex items-center space-x-3 sm:space-x-6 cursor-pointer border border-periwinkle-light/60 hover:bg-periwinkle-light/50 transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <img
              src={conceptionSvg}
              alt="Conception & Family Planning"
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 drop-shadow-sm"
            />
            <div className="text-left">
              <h2 className="font-heading font-bold text-base sm:text-xl text-ink mb-1">
                Conception & Family Planning
              </h2>
              <p className="font-body text-ink-muted text-xs sm:text-sm leading-relaxed">
                Track cycles, basal body temp, fertile windows, and gentle wellness.
              </p>
            </div>
          </div>

          {/* Card 2: Pregnancy */}
          <div
            onClick={() => handleSelectStage('pregnancy')}
            className="bg-rose-light/30 rounded-card p-4 sm:p-6 flex items-center space-x-3 sm:space-x-6 cursor-pointer border border-rose-light/60 hover:bg-rose-light/50 transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <img
              src={pregnancyStagesSvg}
              alt="Pregnancy & Gestational Care"
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 drop-shadow-sm"
            />
            <div className="text-left">
              <h2 className="font-heading font-bold text-lg sm:text-xl text-ink mb-1">
                Pregnancy & Gestational Care
              </h2>
              <p className="font-body text-ink-muted text-xs sm:text-sm leading-relaxed">
                Week-by-week fetal growth, synthetic Doppler heartbeat, and contraction timing.
              </p>
            </div>
          </div>

          {/* Card 3: Postpartum */}
          <div
            onClick={() => handleSelectStage('postpartum')}
            className="bg-peach-light/40 rounded-card p-4 sm:p-6 flex items-center space-x-3 sm:space-x-6 cursor-pointer border border-peach-light/60 hover:bg-peach-light/60 transition-all hover:-translate-y-1 hover:shadow-soft"
          >
            <img
              src={motherhoodSvg}
              alt="Postpartum & Fourth Trimester"
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain flex-shrink-0 drop-shadow-sm"
            />
            <div className="text-left">
              <h2 className="font-heading font-bold text-base sm:text-xl text-ink mb-1">
                Postpartum & Fourth Trimester
              </h2>
              <p className="font-body text-ink-muted text-xs sm:text-sm leading-relaxed">
                Physical healing, feeding rhythms, sleep tracking, and emotional recovery.
              </p>
            </div>
          </div>
        </div>

        {/* Alternate Sign In / Guest routes */}
        <div className="mt-8 text-center space-y-2 text-xs">
          <Link
            to="/login"
            className="text-ink-muted hover:text-rose transition-colors font-body block"
          >
            Already have an account? <span className="font-heading font-bold text-ink hover:text-rose">Sign In</span>
          </Link>
          <button
            type="button"
            onClick={handleGuestDemo}
            className="text-ink-muted hover:text-ink transition-colors font-body block text-[11px] mx-auto cursor-pointer"
          >
            Or explore as guest with pre-loaded demo data
          </button>
        </div>
      </main>

      {/* Clean quiet footer */}
      <footer className="py-6 text-center text-xs text-ink-muted font-body">
        100% Free Forever • Zero Subscription Paywalls • Private Local-First Charter
      </footer>
    </div>
  );
};

export default StageSelector;
