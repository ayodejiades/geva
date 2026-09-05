import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Dashboard from './Dashboard';
import Footer from '../components/Footer';
import ClinicalPassportModal from '../components/ClinicalPassportModal';
import VoiceSanctuary from '../components/VoiceSanctuary';

export const DashboardPage = () => {
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col min-h-screen justify-between bg-canvas">
      <Navigation
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenVoice={() => setIsVoiceOpen(true)}
      />
      <div className="flex-1 pb-16">
        <Dashboard
          onOpenPassportProp={() => setIsPassportOpen(true)}
          onOpenVoiceProp={() => setIsVoiceOpen(true)}
        />
      </div>
      <Footer />
      <ClinicalPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />
      <VoiceSanctuary
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;
