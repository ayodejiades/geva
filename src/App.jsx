import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GevaProvider } from './context/GevaContext';
import LandingPage from './pages/LandingPage';
import StageSelector from './pages/StageSelector';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

import ClinicalFoundationsPage from './pages/ClinicalFoundationsPage';
import FamilyPathwaysPage from './pages/FamilyPathwaysPage';
import PrivacyCharterPage from './pages/PrivacyCharterPage';

export default function App() {
  return (
    <GevaProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-canvas text-ink flex flex-col font-body selection:bg-rose-light overflow-x-hidden">


          {/* Application Route Views */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/stage" element={<StageSelector />} />
            <Route path="/signup" element={<AuthPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Dedicated Editorial Subpages */}
            <Route path="/clinical-foundations" element={<ClinicalFoundationsPage />} />
            <Route path="/clinical-standards" element={<ClinicalFoundationsPage />} />
            <Route path="/family-pathways" element={<FamilyPathwaysPage />} />
            <Route path="/privacy-charter" element={<PrivacyCharterPage />} />
            <Route path="/privacy" element={<PrivacyCharterPage />} />
            <Route path="/local-guarantee" element={<PrivacyCharterPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GevaProvider>
  );
}
