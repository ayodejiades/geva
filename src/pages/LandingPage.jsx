import React, { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import LifeStagesSection from '../components/LifeStagesSection';
import PartnerTelemetrySection from '../components/PartnerTelemetrySection';
import Testimonials from '../components/Testimonials';
import ComparisonCharter from '../components/ComparisonCharter';
import Footer from '../components/Footer';
import GbemiMascot from '../components/GbemiMascot';
import VoiceSanctuary from '../components/VoiceSanctuary';

function LandingPage() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas flex flex-col justify-between">
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Hero />
        <Features />
        <LifeStagesSection />
        <PartnerTelemetrySection />
        <Testimonials />
        <ComparisonCharter />
      </main>
      <Footer />

      {/* Floating Voice Companion Button: Sitewide Gbemi Presence */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 no-print">
        <button
          onClick={() => setIsVoiceOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white shadow-soft hover:shadow-warm transition-all hover:scale-105 cursor-pointer flex items-center justify-center border border-stone-200"
          title="Speak with Gbemi"
          aria-label="Open Gbemi Voice Sanctuary"
        >
          <GbemiMascot size={46} className="sm:hidden" state="idle" />
          <GbemiMascot size={56} className="hidden sm:inline-flex" state="idle" />
        </button>
      </div>

      <VoiceSanctuary
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </div>
  );
}

export default LandingPage;
