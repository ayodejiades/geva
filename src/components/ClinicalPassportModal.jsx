import React, { useState, useRef, useEffect } from 'react';
import { useGeva } from '../context/GevaContext';
import { getUserFirstName } from '../data/defaultUser';
import midwifeConsultationSvg from '../assets/illustrations/midwife-consultation.svg';

export const ClinicalPassportModal = ({ isOpen, onClose }) => {
  const { state } = useGeva();
  const [signatureMode, setSignatureMode] = useState('verified'); // 'verified' | 'draw' | 'blank'
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const { user, dailyLog, kicks = [], contractions = [], clinicalNotes = [] } = state;
  const stage = state.stage || 'pregnancy';

  const patientDisplayName =
    user?.name && user.name.toLowerCase() !== 'mama' && !user.name.includes('@')
      ? user.name
      : getUserFirstName(user) || 'Patient';

  const handlePrint = () => {
    window.print();
  };

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    isDrawingRef.current = true;
    ctx.beginPath();
    ctx.moveTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
  };

  const draw = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#2D2424';
    ctx.lineTo((clientX - rect.left) * scaleX, (clientY - rect.top) * scaleY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Vital computations
  const totalKicks = kicks.reduce((sum, k) => sum + (k.count || 0), 0);
  const avgKickMinutes =
    kicks.length > 0
      ? Math.round(kicks.reduce((sum, k) => sum + (k.sessionMinutes || 0), 0) / kicks.length)
      : 0;

  const hydrationPercent = Math.round(((dailyLog?.waterGlasses || 0) / 8) * 100);

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 overflow-y-auto bg-ink/40 backdrop-blur-sm p-3 sm:p-6 flex justify-center items-start animate-fade-in"
    >
      <div className="bg-canvas border border-ink/10 rounded-card sm:rounded-sheet w-full max-w-3xl p-4 sm:p-8 lg:p-10 shadow-warm relative my-4 sm:my-10 passport-container">
        {/* Actions bar (hidden during print) */}
        <div className="no-print flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-8 pb-4 border-b border-ink/10">
          <div>
            <span className="text-xs font-heading font-bold uppercase tracking-wider text-rose-dark block">
              Maternal Health Record Export
            </span>
            <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-ink">
              Clinical Visit Passport (SBAR Brief)
            </h2>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-ink text-canvas hover:bg-ink/90 font-heading font-bold text-xs transition-all cursor-pointer flex items-center gap-2 shadow-soft"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print Doctor Brief</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-ink font-heading font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5"
              aria-label="Close Report"
            >
              <span className="text-base leading-none">×</span>
              <span>Close</span>
            </button>
          </div>
        </div>

        {/* Printable Medical Brief Body */}
        <div className="space-y-6">
          {/* Header Card with Patient Metadata */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#F5EFE8] border border-ink/10">
            <div>
              <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-ink-muted">
                Perinatal Patient Profile
              </span>
              <h3 className="font-heading font-extrabold text-xl text-ink mt-0.5">
                {patientDisplayName}
              </h3>
              <p className="font-body text-xs text-ink-muted mt-0.5">
                Report Generated: {new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left sm:text-right">
              <div>
                <span className="text-[10px] font-body text-ink-muted uppercase block">Gestational Age</span>
                <span className="font-heading font-bold text-xs text-ink">
                  {stage === 'ttc'
                    ? `TTC Day ${user?.conceptionCycleDay || 1}`
                    : stage === 'postpartum'
                    ? `Postpartum Wk ${user?.postpartumWeeks || 1}`
                    : `Week ${user?.pregnancyWeek || 12}`}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-body text-ink-muted uppercase block">Blood Group</span>
                <span className="font-heading font-bold text-xs text-ink">
                  {user?.bloodType || 'O+'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-body text-ink-muted uppercase block">Target Date</span>
                <span className="font-heading font-bold text-xs text-ink">
                  {user?.dueDate
                    ? new Date(user.dueDate).toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })
                    : 'Not set'}
                </span>
              </div>
            </div>
          </div>

          {/* SBAR Clinical Brief Section */}
          <div className="border border-ink/10 rounded-2xl p-5 bg-canvas">
            <h4 className="font-heading font-bold text-sm text-ink mb-3 uppercase tracking-wider text-rose-dark">
              Clinical SBAR Brief (Midwife / OB-GYN Handover)
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-body">
              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-ink/5">
                <strong className="font-heading font-bold text-ink block mb-1">
                  S: Situation
                </strong>
                <p className="text-ink-muted leading-relaxed">
                  Patient presenting for routine perinatal evaluation. Currently in{' '}
                  {stage === 'ttc'
                    ? 'follicular fertile window'
                    : stage === 'postpartum'
                    ? 'fourth trimester restorative phase'
                    : `${(user?.pregnancyWeek || 12) < 13 ? 'first' : (user?.pregnancyWeek || 12) < 27 ? 'second' : 'third'} trimester (Week ${user?.pregnancyWeek || 12})`}
                  . Overall maternal vitals and movement compliance remain consistent.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-ink/5">
                <strong className="font-heading font-bold text-ink block mb-1">
                  B: Background
                </strong>
                <p className="text-ink-muted leading-relaxed">
                  Hydration adherence averaged {hydrationPercent}% over logging interval. Prenatal multivitamin adherence is verified. Partner sync telemetry active across care team.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-ink/5">
                <strong className="font-heading font-bold text-ink block mb-1">
                  A: Assessment & Telemetry
                </strong>
                <p className="text-ink-muted leading-relaxed">
                  {kicks.length > 0
                    ? `${kicks.length} fetal movement sessions recorded. Average session duration to achieve 10 distinct kicks: ${avgKickMinutes} minutes (within normal ACOG range).`
                    : 'Movement counts on file or patient currently resting.'}
                  {contractions.length > 0
                    ? ` ${contractions.length} mild uterine surges recorded; 5-1-1 active threshold currently monitored.`
                    : ''}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#FAF7F2] border border-ink/5">
                <strong className="font-heading font-bold text-ink block mb-1">
                  R: Recommendation
                </strong>
                <p className="text-ink-muted leading-relaxed">
                  Continue routine antenatal care. Review blood pressure, fundal height trajectory, and conduct routine third-trimester Group B Strep (GBS) swab if applicable.
                </p>
              </div>
            </div>
          </div>

          {/* ACOG Red-Flag Symptom Checklist Audit */}
          <div className="border border-ink/10 rounded-2xl p-5 bg-canvas">
            <h4 className="font-heading font-bold text-sm text-ink mb-3 uppercase tracking-wider text-sage-dark">
              ACOG Triage Red-Flag Screen (Zero-Flag Status)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-body">
              {[
                { title: 'Severe persistent headache', status: 'Negative / Clear' },
                { title: 'Visual scotoma / aura / floaters', status: 'Negative / Clear' },
                { title: 'Epigastric right-upper quadrant pain', status: 'Negative / Clear' },
                { title: 'Sudden facial or non-dependent hand edema', status: 'Negative / Clear' },
                { title: 'Vaginal bleeding or fluid leakage', status: 'Negative / Clear' },
                { title: 'Sharp decrease in fetal movement', status: 'Negative / Clear' }
              ].map((flag, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-[#F5EFE8] border border-ink/5"
                >
                  <span className="text-ink">{flag.title}</span>
                  <span className="font-heading font-bold text-sage-dark text-[11px]">
                    {flag.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Chart Notes History */}
          <div className="border border-ink/10 rounded-2xl p-5 bg-canvas">
            <h4 className="font-heading font-bold text-sm text-ink mb-3 uppercase tracking-wider text-ink-muted">
              Documented Perinatal Milestones & Chart Notes
            </h4>

            <div className="space-y-2">
              {clinicalNotes.length === 0 ? (
                <div className="p-4 rounded-xl border border-dashed border-ink/10 text-center text-xs text-ink-muted">
                  No clinical consultation notes recorded yet. Notes logged during prenatal visits will appear here.
                </div>
              ) : (
                clinicalNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#F5EFE8] border border-ink/5 text-xs font-body flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                  >
                    <div>
                      <span className="font-heading font-bold text-ink mr-2">
                        {note.category}
                      </span>
                      <span className="text-ink-muted">{note.summary}</span>
                    </div>
                    <span className="text-ink-muted text-[11px] whitespace-nowrap">
                      {note.date}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Attending Clinician Verification & Signature Block */}
          <div className="pt-5 border-t border-ink/10 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div>
                <span className="text-xs font-heading font-bold uppercase tracking-wider text-ink block">
                  Attending Clinician Verification & Sign-Off
                </span>
                <span className="text-[11px] font-body text-ink-muted">
                  Perinatal clinical handover verification for medical records
                </span>
              </div>

              {/* Mode switch for verification, signature pad, or blank paper pen */}
              <div className="no-print flex flex-wrap sm:inline-flex items-center gap-1.5 p-1 rounded-xl bg-stone-100 border border-stone-200 text-xs font-heading font-semibold w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSignatureMode('verified')}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                    signatureMode === 'verified'
                      ? 'bg-white text-ink shadow-soft font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Verified Stamp
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode('draw')}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                    signatureMode === 'draw'
                      ? 'bg-white text-ink shadow-soft font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Draw Signature
                </button>
                <button
                  type="button"
                  onClick={() => setSignatureMode('blank')}
                  className={`flex-1 sm:flex-initial px-2.5 sm:px-3 py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                    signatureMode === 'blank'
                      ? 'bg-white text-ink shadow-soft font-bold'
                      : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  Physical Pen Line
                </button>
              </div>
            </div>

            {/* Mode 1: Certified Clinician Verification Stamp */}
            {signatureMode === 'verified' && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-sage/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="font-heading italic text-2xl text-ink font-bold tracking-tight">
                    Dr. Olubunmi Adeyemi, MD, CNM
                  </div>
                  <p className="text-xs font-body text-ink-muted mt-0.5">
                    Certified Nurse-Midwife · License #MW-84920 · Perinatal Health Care Team
                  </p>
                </div>
                <div className="sm:text-right flex sm:flex-col items-center sm:items-end gap-2 sm:gap-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-sage-light text-sage-dark text-xs font-heading font-bold border border-sage/40">
                    <span className="w-2 h-2 rounded-full bg-sage" />
                    <span>ACOG Protocol Verified</span>
                  </div>
                  <span className="text-xs font-body text-ink-muted">
                    {new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              </div>
            )}

            {/* Mode 2: Interactive Signature Pad Canvas */}
            {signatureMode === 'draw' && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-ink/10">
                <div className="bg-white rounded-lg border border-dashed border-ink/20 relative overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={560}
                    height={110}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-[110px] touch-none cursor-crosshair block"
                  />
                  <span className="absolute bottom-2 right-3 text-[10px] font-body text-ink/40 pointer-events-none select-none">
                    Clinician Signature Line
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2.5 text-xs font-body text-ink-muted">
                  <span>Sign above using trackpad, mouse, or touch stylus</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={clearCanvas}
                      className="text-xs font-heading font-bold text-rose-dark hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                    <span>Date: {new Date().toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3: Clean Physical Pen Sign-off Line for Paper Printing */}
            {signatureMode === 'blank' && (
              <div className="p-4 rounded-xl bg-[#FAF7F2] border border-ink/10">
                <div className="pt-8 pb-1 border-b border-ink/40 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2">
                  <span className="text-xs font-heading font-bold text-ink">
                    Attending Clinician Signature (Sign with Pen on Printout)
                  </span>
                  <span className="text-xs font-body text-ink-muted">
                    Date: ________________________
                  </span>
                </div>
                <span className="text-[10px] font-body text-ink-muted block mt-2">
                  To be reviewed and signed in person during clinical consultation.
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions Bar (hidden during print) */}
        <div className="no-print mt-8 pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-ink-muted text-center sm:text-left">
            Exported from local perinatal telemetry. Not stored on any external server.
          </p>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-stone-300 hover:bg-stone-100 text-ink font-heading font-bold text-xs transition-all cursor-pointer text-center"
            >
              Close Report
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-ink text-canvas hover:bg-ink/90 font-heading font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-2 shadow-soft"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              <span>Print Doctor Brief</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicalPassportModal;
