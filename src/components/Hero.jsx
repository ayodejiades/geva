import { Link } from 'react-router-dom';
import { useGeva } from '../context/GevaContext';
import heroPregnancySvg from '../assets/illustrations/hero-pregnancy.svg';

function Hero() {
  const { switchPersona } = useGeva();

  return (
    <section className="flex flex-col md:flex-row items-center mb-12 sm:mb-20 gap-6 sm:gap-8 md:gap-10 pt-2 sm:pt-6">
      <div className="w-full md:w-1/2">
        <img 
          src={heroPregnancySvg} 
          alt="Serene Expectant Mother Feeling Baby Bump" 
          className="w-full max-w-[240px] xs:max-w-xs sm:max-w-sm md:max-w-lg mx-auto drop-shadow-sm" 
        />
      </div>
      <div className="w-full md:w-1/2 text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-6xl font-heading font-extrabold text-ink mb-4 sm:mb-6 leading-[1.15] tracking-tight">
          <span className="block">Every heartbeat.</span>
          <span className="block">Every milestone.</span>
          <span className="block text-rose">Nurtured together.</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-ink-muted mb-6 sm:mb-8 md:mb-10 leading-relaxed font-body">
          From preconception and pregnancy to fourth-trimester recovery, Geva provides grounded 
          clinical guidance, real-time partner sync, and Gbemi, your reassuring sister-midwife companion. 
          Completely private, local-first, and 100% free forever.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <Link to="/stage" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-rose text-white px-5 sm:px-8 md:px-10 py-3 sm:py-3.5 md:py-4 rounded-card text-sm sm:text-base md:text-lg font-heading font-bold hover:bg-rose-dark transition-all transform hover:-translate-y-0.5 shadow-warm cursor-pointer text-center">
              Begin Your Journey
            </button>
          </Link>
          <Link to="/dashboard" onClick={() => switchPersona('anjola')} className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white border-2 border-sage text-sage-dark px-5 sm:px-8 py-3 sm:py-3.5 md:py-4 rounded-card text-sm sm:text-base md:text-lg font-heading font-bold hover:bg-sage-light/50 transition-all transform hover:-translate-y-0.5 shadow-soft cursor-pointer text-center">
              Tour the Sanctuary
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
