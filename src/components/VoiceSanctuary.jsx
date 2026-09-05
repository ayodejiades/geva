import React, { useState, useEffect } from 'react';
import { useGeva } from '../context/GevaContext';
import { GbemiMascot } from './GbemiMascot';
import { speechEngine } from '../utils/speechEngine';
import { webLlmEngine } from '../utils/webLlmEngine';
import { getMilestoneForWeek } from '../data/milestones';
import { getUserFirstName } from '../data/defaultUser';

export const VoiceSanctuary = ({ isOpen, onClose }) => {
  const { state } = useGeva();
  const [mascotState, setMascotState] = useState('idle'); // idle | listening | speaking | celebrating
  const [transcript, setTranscript] = useState('');
  const [spokenResponse, setSpokenResponse] = useState('');
  const [isMicAvailable, setIsMicAvailable] = useState(true);
  const [llmStatus, setLlmStatus] = useState(webLlmEngine.getStatus());
  const [llmProgress, setLlmProgress] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const stage = state.stage || 'pregnancy';
  const week = state.user?.pregnancyWeek || 12;
  const milestone = getMilestoneForWeek(week);

  useEffect(() => {
    if (!isOpen) {
      speechEngine.stopListening();
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setMascotState('idle');
      setTranscript('');
      setSpokenResponse('');
    } else {
      // Welcome greeting
      const firstName = getUserFirstName(state.user);
      const greeting =
        stage === 'ttc'
          ? 'Welcome to your calm space. How can I support your family planning today?'
          : stage === 'postpartum'
          ? 'Welcome back. I am here to support your recovery and newborn care.'
          : firstName
          ? `Hello ${firstName}. We are in week ${week} together. What is on your mind today?`
          : `Hello. We are in week ${week} together. What is on your mind today?`;
      
      setSpokenResponse(greeting);
      setMascotState('speaking');
      speechEngine.speak(
        greeting,
        () => setMascotState('speaking'),
        () => setMascotState('idle')
      );

      // Warm up on-device WebLLM if supported and not yet ready
      if (webLlmEngine.isWebGpuSupported() && !webLlmEngine.getStatus().isReady && !webLlmEngine.getStatus().isInitializing) {
        webLlmEngine.initEngine((report) => {
          setLlmProgress(report);
          setLlmStatus(webLlmEngine.getStatus());
        }).then((ready) => {
          if (ready) {
            setLlmStatus(webLlmEngine.getStatus());
            setLlmProgress(null);
          }
        }).catch(() => {
          setLlmStatus(webLlmEngine.getStatus());
        });
      }
    }
  }, [isOpen, stage, week]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    setTranscript('');
    setMascotState('listening');

    const started = speechEngine.startListening(
      (text, isFinal) => {
        setTranscript(text);
        if (isFinal) {
          processUserInput(text);
        }
      },
      () => {
        // on end
        if (mascotState === 'listening') {
          setMascotState('idle');
        }
      },
      (err) => {
        console.warn('Speech recognition error:', err);
        setIsMicAvailable(false);
        setMascotState('idle');
      }
    );

    if (!started) {
      setIsMicAvailable(false);
      setMascotState('idle');
      setTranscript('Speech recognition is not active in this browser view. Try clicking one of the midwife queries below.');
    }
  };

  const handleStopListening = () => {
    speechEngine.stopListening();
    if (transcript) {
      processUserInput(transcript);
    } else {
      setMascotState('idle');
    }
  };

  const getFallbackReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('baby') || lower.includes('growing') || lower.includes('size')) {
      return `Your baby is approximately the size of a ${milestone?.item || 'Cantaloupe'}, measuring around ${milestone?.lengthCm || 45} centimeters from crown to heel. Brain pathways and alveolar surfactant are maturing steadily.`;
    } else if (lower.includes('cramp') || lower.includes('pain') || lower.includes('braxton')) {
      return `Mild, irregular tightness is often Braxton Hicks practice surges. Drink a large glass of warm water, change your physical position, and rest on your left side. If surges become regular or occur every five minutes, contact your midwife.`;
    } else if (lower.includes('water') || lower.includes('hydrat')) {
      return `Aim for eight to ten glasses of clean, room-temperature water daily. Hydration sustains your amniotic fluid volume and eases uterine irritability.`;
    } else if (lower.includes('affirmation') || lower.includes('anxious') || lower.includes('worried') || lower.includes('scared')) {
      return `Your body was built to carry life with wisdom and grace. Every breath you take nourishes both you and your little one. You do not need to earn your rest today.`;
    } else if (lower.includes('kick') || lower.includes('movement')) {
      return `Aim for ten distinct movements over two hours during your baby's regular active hours. You can use our kick counter on the dashboard anytime.`;
    } else {
      return `I hear you. Remember that your body is completing extraordinary biological work. Please take gentle sips of water, rest your shoulders, and speak with your community midwife for any clinical concerns.`;
    }
  };

  const processUserInput = async (input) => {
    if (!input || !input.trim()) return;
    const cleanInput = input.trim();
    setTranscript(cleanInput);
    setIsGenerating(true);
    setMascotState('thinking');

    let reply = '';
    const status = webLlmEngine.getStatus();

    if (status.isReady) {
      try {
        reply = await webLlmEngine.generateMidwifeReply(cleanInput, {
          stage,
          week,
          partnerName: state.user?.partnerName
        });
      } catch (err) {
        console.warn('WebLLM generation fallback:', err);
        reply = getFallbackReply(cleanInput);
      }
    } else {
      reply = getFallbackReply(cleanInput);
    }

    setIsGenerating(false);
    setSpokenResponse(reply);
    speechEngine.speak(
      reply,
      () => setMascotState('speaking'),
      () => setMascotState('idle')
    );
  };

  const promptSuggestions = [
    'How is my baby growing this week?',
    'Are mild cramps normal right now?',
    'Give me a calming midwife affirmation.',
    'How do I track movement counts?'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-canvas/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="fixed top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center font-bold text-lg sm:text-xl cursor-pointer transition-colors z-10"
        aria-label="Close Voice Sanctuary"
      >
        ×
      </button>

      <div className="max-w-xl w-full flex flex-col items-center text-center px-2 sm:px-4 py-5 sm:py-8 my-auto">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark mb-1.5 sm:mb-2">
          Gbemi
        </span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
          Voice Sanctuary
        </h2>
        <p className="font-body text-xs text-ink-muted mt-1 max-w-md">
          A quiet, private space powered by native browser speech synthesis. Speak naturally to Gbemi without cloud recording.
        </p>

        {/* WebLLM Engine Status & Progress */}
        <div className="mt-3 inline-flex flex-col items-center max-w-xs w-full">
          {llmProgress && (
            <div className="w-full bg-stone-100 rounded-full h-1.5 overflow-hidden border border-stone-200/80 mb-1.5">
              <div
                className="bg-sage h-full transition-all duration-300 rounded-full"
                style={{ width: `${llmProgress.progress}%` }}
              />
            </div>
          )}

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl text-[11px] font-heading font-medium bg-stone-50 border border-stone-200/80 text-ink-muted">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                llmStatus.isReady
                  ? 'bg-sage animate-pulse'
                  : llmStatus.isInitializing
                  ? 'bg-peach animate-ping'
                  : 'bg-stone-400'
              }`}
            />
            <span>
              {llmProgress
                ? `Waking Gbemi on-device AI (${llmProgress.progress}%)`
                : llmStatus.isReady
                ? 'On-Device WebLLM AI Live (100% Private)'
                : llmStatus.isWebGpu
                ? 'On-Device WebLLM Engine Ready'
                : 'Lightweight Local Midwife Mode'}
            </span>
          </div>
        </div>

        {/* Mascot Centerpiece */}
        <div className="my-5 sm:my-8 relative flex items-center justify-center">
          <GbemiMascot state={mascotState} size={110} className="sm:hidden" />
          <GbemiMascot state={mascotState} size={145} className="hidden sm:inline-flex" />
        </div>

        {/* State 1: Active Listening Bar (Live speech in progress) */}
        {mascotState === 'listening' && (
          <div className="w-full bg-rose-light/35 border border-rose-light/60 rounded-2xl p-4 mb-4 text-left flex items-start gap-3 animate-fade-in shadow-soft">
            <div className="w-2.5 h-2.5 rounded-full bg-rose animate-ping mt-1.5 flex-shrink-0" />
            <div className="flex-1">
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-rose-dark block mb-0.5">
                Listening to your voice...
              </span>
              <p className="font-body text-sm text-ink font-medium italic">
                {transcript ? `"${transcript}"` : 'Listening... speak softly to Gbemi.'}
              </p>
            </div>
          </div>
        )}

        {/* State 2: Explicit "Gbemi Heard" Acknowledgment Card (Request captured) */}
        {transcript && mascotState !== 'listening' && (
          <div className="w-full bg-sage-light/40 border border-sage/40 rounded-2xl p-4 mb-4 text-left flex items-start gap-3 animate-fade-in shadow-soft">
            <div className="w-2.5 h-2.5 rounded-full bg-sage mt-1 flex-shrink-0" />
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-sage-dark">
                  Gbemi Heard
                </span>
                <span className="text-[10px] font-heading font-bold text-sage-dark bg-white/90 px-2 py-0.5 rounded-lg border border-sage/30 shadow-xs">
                  Request Received
                </span>
              </div>
              <p className="font-body text-sm text-ink font-bold">
                "{transcript}"
              </p>
            </div>
          </div>
        )}

        {/* State 3: Thinking / Formulating Guidance (While generating response) */}
        {isGenerating ? (
          <div className="w-full bg-[#FAF7F2] border border-peach/40 rounded-2xl p-6 min-h-[95px] flex flex-col items-center justify-center gap-2.5 shadow-soft mb-6 animate-pulse">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 rounded-full bg-sage animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 rounded-full bg-peach animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            <span className="text-xs font-heading font-bold text-ink-muted">
              Gbemi is formulating your clinical guidance...
            </span>
          </div>
        ) : (
          /* State 4: Spoken Response Guidance Display */
          <div className="w-full bg-[#F4EFEA] border border-ink/8 rounded-2xl p-5 min-h-[100px] flex flex-col justify-center text-left shadow-soft mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-rose-dark flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                Gbemi's Guidance
              </span>
              {mascotState === 'speaking' && (
                <span className="text-[10px] font-heading font-semibold text-ink-muted flex items-center gap-1">
                  <span className="w-1 h-2 bg-rose rounded-full animate-pulse" />
                  <span className="w-1 h-3 bg-sage rounded-full animate-pulse" />
                  <span>Speaking aloud</span>
                </span>
              )}
            </div>
            <p className="font-body text-sm text-ink leading-relaxed font-medium">
              "{spokenResponse || 'Tap the microphone below and speak softly to Gbemi...'}"
            </p>
          </div>
        )}

        {/* Audio Visualizer Waves */}
        <div className="flex items-center gap-1.5 h-6 mb-6">
          <span
            className={`w-1.5 rounded-full transition-all duration-300 ${
              mascotState === 'speaking' || mascotState === 'listening'
                ? 'h-6 bg-rose animate-pulse'
                : mascotState === 'thinking'
                ? 'h-4 bg-peach animate-pulse'
                : 'h-2 bg-ink/20'
            }`}
          />
          <span
            className={`w-1.5 rounded-full transition-all duration-300 ${
              mascotState === 'speaking' || mascotState === 'listening'
                ? 'h-8 bg-sage animate-pulse delay-75'
                : mascotState === 'thinking'
                ? 'h-5 bg-sage animate-pulse delay-75'
                : 'h-3 bg-ink/20'
            }`}
          />
          <span
            className={`w-1.5 rounded-full transition-all duration-300 ${
              mascotState === 'speaking' || mascotState === 'listening'
                ? 'h-5 bg-peach animate-pulse delay-150'
                : mascotState === 'thinking'
                ? 'h-3 bg-rose animate-pulse delay-150'
                : 'h-2 bg-ink/20'
            }`}
          />
        </div>

        {/* Microphone Button */}
        <div className="mb-6">
          {mascotState === 'listening' ? (
            <button
              onClick={handleStopListening}
              className="px-8 py-4 rounded-xl bg-rose text-ink font-heading font-bold text-sm shadow-warm animate-pulse flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-ink animate-ping" />
              <span>Listening... Tap to Submit</span>
            </button>
          ) : isGenerating ? (
            <button
              disabled
              className="px-8 py-4 rounded-xl bg-stone-100 text-ink-muted font-heading font-bold text-sm flex items-center gap-2 cursor-not-allowed opacity-80"
            >
              <span className="w-2 h-2 rounded-full bg-peach animate-ping" />
              <span>Gbemi is Thinking...</span>
            </button>
          ) : (
            <button
              onClick={handleStartListening}
              className="px-8 py-4 rounded-xl bg-ink hover:bg-ink/90 text-canvas font-heading font-bold text-sm shadow-warm flex items-center gap-2.5 cursor-pointer transition-transform active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
              <span>Speak with Gbemi</span>
            </button>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="w-full">
          <span className="text-[11px] font-heading font-bold uppercase tracking-wider text-ink-muted block mb-2">
            Suggested Midwife Conversations
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {promptSuggestions.map((query, index) => (
              <button
                key={index}
                onClick={() => processUserInput(query)}
                className="px-3 py-1.5 rounded-xl bg-canvas border border-ink/10 hover:border-rose text-ink text-xs font-body transition-colors cursor-pointer"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceSanctuary;
