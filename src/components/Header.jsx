import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-100/80 transition-all">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between gap-4">
        {/* Sitewide Unified Brand Logo */}
        <Logo className="text-2xl sm:text-3xl" />

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-7 font-heading font-semibold text-xs xl:text-sm text-ink-muted">
          <a
            href="/#features"
            className="hover:text-rose transition-colors py-1"
          >
            Care Suite
          </a>
          <a
            href="/#stages"
            className="hover:text-rose transition-colors py-1"
          >
            Life Stages
          </a>
          <a
            href="/#partner-sync"
            className="hover:text-rose transition-colors py-1"
          >
            Partner Sync
          </a>
          <a
            href="/#testimonials"
            className="hover:text-rose transition-colors py-1"
          >
            Family Voices
          </a>
          <a
            href="/#charter"
            className="hover:text-rose transition-colors py-1"
          >
            Charter
          </a>
          <Link
            to="/clinical-foundations"
            className="hover:text-rose transition-colors py-1"
          >
            Clinical Standards
          </Link>
        </div>

        {/* Right Desktop Actions */}
        <div className="hidden sm:flex items-center space-x-3 sm:space-x-4">
          <Link
            to="/login"
            className="text-xs sm:text-sm font-heading font-bold text-ink-muted hover:text-rose transition-colors px-3.5 py-2 rounded-xl hover:bg-stone-50"
          >
            Sign In
          </Link>
          <Link
            to="/stage"
            className="bg-rose hover:bg-rose-dark text-white px-5 py-2 rounded-xl font-heading font-bold text-xs sm:text-sm transition-all shadow-soft hover:shadow-warm active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Begin Journey
          </Link>
        </div>

        {/* Mobile Actions: Compact CTA + Hamburger Button */}
        <div className="flex sm:hidden items-center space-x-2">
          <Link
            to="/stage"
            className="bg-rose hover:bg-rose-dark text-white px-3.5 py-1.5 rounded-xl font-heading font-bold text-xs transition-all shadow-soft active:scale-95 whitespace-nowrap cursor-pointer"
          >
            Begin
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-ink hover:bg-stone-100 transition-colors focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-lg border-b border-stone-100 px-6 py-5 shadow-warm">
          <div className="flex flex-col space-y-4 font-heading font-semibold text-sm text-ink-muted">
            <a
              href="/#features"
              onClick={closeMenu}
              className="py-1 hover:text-rose transition-colors flex items-center justify-between"
            >
              <span>Care Suite</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose/40" />
            </a>
            <a
              href="/#stages"
              onClick={closeMenu}
              className="py-1 hover:text-rose transition-colors flex items-center justify-between"
            >
              <span>Life Stages</span>
              <span className="w-1.5 h-1.5 rounded-full bg-periwinkle/40" />
            </a>
            <a
              href="/#partner-sync"
              onClick={closeMenu}
              className="py-1 hover:text-rose transition-colors flex items-center justify-between"
            >
              <span>Partner Sync</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sage/40" />
            </a>
            <a
              href="/#testimonials"
              onClick={closeMenu}
              className="py-1 hover:text-rose transition-colors flex items-center justify-between"
            >
              <span>Family Voices</span>
              <span className="w-1.5 h-1.5 rounded-full bg-peach/40" />
            </a>
            <a
              href="/#charter"
              onClick={closeMenu}
              className="py-1 hover:text-rose transition-colors flex items-center justify-between"
            >
              <span>Sanctuary Charter</span>
              <span className="w-1.5 h-1.5 rounded-full bg-rose/40" />
            </a>
            <Link
              to="/clinical-foundations"
              onClick={closeMenu}
              className="py-1 hover:text-rose transition-colors flex items-center justify-between"
            >
              <span>Clinical Standards</span>
              <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
            </Link>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-2.5">
              <Link
                to="/login"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-xl border border-stone-200 text-ink font-heading font-bold text-xs hover:bg-stone-50 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/stage"
                onClick={closeMenu}
                className="w-full text-center py-2.5 rounded-xl bg-rose text-white font-heading font-bold text-xs hover:bg-rose-dark transition-all shadow-soft"
              >
                Begin Journey
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
