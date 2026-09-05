import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import Logo from '../components/Logo';
import { useGeva } from '../context/GevaContext';
import familyCircleSvg from '../assets/illustrations/family-circle.svg';

export const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const { state, setStage, setUserProfile, registerNewPatient, switchPersona } = useGeva();

  // Determine mode from route: /login → sign in, /signup → sign up
  const isSignUp = location.pathname === '/signup';
  const [mode, setMode] = useState(isSignUp ? 'signup' : 'signin');

  useEffect(() => {
    setMode(location.pathname === '/signup' ? 'signup' : 'signin');
  }, [location.pathname]);

  const initialStage = searchParams.get('stage') || state.stage || 'pregnancy';

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [stage, setLocalStage] = useState(initialStage);
  const [targetDate, setTargetDate] = useState(
    new Date(Date.now() + 42 * 86400000).toISOString().slice(0, 10)
  );
  const [partnerName, setPartnerName] = useState('');

  useEffect(() => {
    if (searchParams.get('stage')) {
      setLocalStage(searchParams.get('stage'));
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'signup') {
      const cleanFirst = firstName.trim();
      const cleanLast = lastName.trim();
      const fullName = [cleanFirst, cleanLast].filter(Boolean).join(' ');

      registerNewPatient({
        name: fullName,
        firstName: cleanFirst,
        lastName: cleanLast,
        email: email.trim() || '',
        stage: stage,
        dueDate: targetDate,
        targetDate: targetDate,
        partnerName: partnerName.trim()
      });
    } else {
      if (email) {
        const emailTrimmed = email.trim();
        setUserProfile({
          email: emailTrimmed
        });
      }
    }
    navigate('/dashboard');
  };

  const handleGuestDemo = () => {
    switchPersona('anjola');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-ink flex flex-col font-body selection:bg-rose-light">
      {/* Header */}
      <header className="pt-8 pb-4 text-center">
        <Logo className="text-4xl" />
      </header>

      {/* Main Auth Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-6 max-w-md mx-auto w-full">
        <div className="bg-white border border-stone-100 rounded-card p-6 sm:p-8 shadow-soft w-full">
          {/* Family Circle Hero Illustration */}
          <div className="text-center mb-6">
            <div className="w-full max-w-xs h-40 sm:h-44 mx-auto flex items-center justify-center bg-peach-light/35 rounded-2xl p-3 border border-peach-light/60 shadow-soft transition-all">
              <img
                src={familyCircleSvg}
                alt="Family circle celebration"
                className="h-full w-full object-contain drop-shadow-sm"
              />
            </div>
            <p className="text-xs font-heading font-semibold text-rose mt-2.5">
              Care for the entire family circle
            </p>
          </div>

          {/* Sign In / Sign Up Toggle Tabs */}
          <div className="flex bg-stone-100 p-1 rounded-xl mb-6 border border-stone-200">
            <button
              type="button"
              onClick={() => { setMode('signin'); navigate('/login', { replace: true }); }}
              className={`flex-1 py-2 rounded-lg text-sm font-heading font-bold transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-white text-ink shadow-soft'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); navigate('/signup', { replace: true }); }}
              className={`flex-1 py-2 rounded-lg text-sm font-heading font-bold transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-ink shadow-soft'
                  : 'text-ink-muted hover:text-ink'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Heading */}
          <h1 className="font-heading font-bold text-xl text-ink text-center mb-1">
            {mode === 'signup' ? 'Create Your Sanctuary Profile' : 'Welcome Back'}
          </h1>
          <p className="font-body text-xs text-ink-muted text-center mb-5 leading-relaxed">
            {mode === 'signup'
              ? 'Stored 100% locally on this device. Zero server storage.'
              : 'Your data lives on this device. Pick up right where you left off.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name: sign up only */}
            {mode === 'signup' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Folashade"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose bg-white text-ink text-sm outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="e.g. Adeyemi"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose bg-white text-ink text-sm outline-none transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Email: both modes */}
            <div>
              <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. folashade@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose bg-white text-ink text-sm outline-none transition-colors"
                required
              />
              <span className="text-[10px] font-body text-ink-faint mt-1 block">
                Stored locally on this device. Never sent to any server.
              </span>
            </div>

            {/* Life Stage: sign up only */}
            {mode === 'signup' && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-heading font-bold text-ink">
                      Life Stage
                    </label>
                    <Link to="/stage" className="text-[11px] font-body text-rose hover:underline">
                      ← Change stage
                    </Link>
                  </div>
                  <select
                    value={stage}
                    onChange={(e) => setLocalStage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose bg-white text-ink text-sm outline-none transition-colors cursor-pointer"
                  >
                    <option value="ttc">Conception & Family Planning (TTC)</option>
                    <option value="pregnancy">Pregnancy & Gestational Care</option>
                    <option value="postpartum">Postpartum Recovery (Fourth Trimester)</option>
                  </select>
                </div>

                {/* Milestone Date */}
                <div>
                  <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                    {stage === 'ttc'
                      ? 'Last Menstrual Period (LMP)'
                      : stage === 'postpartum'
                      ? "Baby's Birth Date"
                      : 'Estimated Due Date'}
                  </label>
                  <input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose bg-white text-ink text-sm outline-none transition-colors"
                  />
                </div>

                {/* Partner Sync */}
                <div>
                  <label className="block text-xs font-heading font-bold text-ink mb-1.5">
                    Partner Sync Label (Optional)
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => setPartnerName(e.target.value)}
                    placeholder="e.g. Adebayo"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:border-rose bg-white text-ink text-sm outline-none transition-colors"
                  />
                  <span className="text-[10px] font-body text-ink-faint mt-1 block">
                    Syncs peer-to-peer across browser tabs via BroadcastChannel.
                  </span>
                </div>
              </>
            )}

            {/* Submit */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3.5 rounded-card bg-rose hover:bg-rose-dark text-white font-heading font-bold text-sm tracking-wide shadow-warm transition-all cursor-pointer"
              >
                {mode === 'signup' ? 'Create Profile & Enter' : 'Sign In to Sanctuary'}
              </button>
            </div>
          </form>

          {/* Guest Demo Fallback */}
          <div className="mt-5 pt-4 border-t border-stone-100 text-center text-xs">
            <button
              type="button"
              onClick={handleGuestDemo}
              className="text-ink-muted hover:text-ink transition-colors font-body text-[12px] inline-flex items-center justify-center gap-1 cursor-pointer"
            >
              Or explore as guest with pre-loaded demo data
            </button>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-ink-muted font-body">
        100% Free Forever • Zero Subscription Paywalls • Private Local-First Charter
      </footer>
    </div>
  );
};

export default AuthPage;
