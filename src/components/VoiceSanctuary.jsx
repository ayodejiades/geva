import React, { useState, useEffect } from 'react';
import { useGeva } from '../context/GevaContext';
import { GbemiMascot } from './GbemiMascot';
import { speechEngine } from '../utils/speechEngine';
import { webLlmEngine } from '../utils/webLlmEngine';
import { getMilestoneForWeek } from '../data/milestones';
import {
  getUserFirstName,
  calculateCycleDayFromLMP,
  calculatePostpartumWeeks
} from '../data/defaultUser';

/**
 * Midwife Clinical Rule Engine (Fallback & Local Knowledge)
 * Accurately handles:
 * 1. ACOG Emergency Triage (Preeclampsia, Hemorrhage, 5-1-1 Active Labor, Decreased Kicks)
 * 2. Stage-Specific Perinatal Care (TTC, Pregnancy, Postpartum Recovery)
 */
export const getClinicalMidwifeGuidance = (input, context = {}) => {
  if (!input || !input.trim()) return '';
  const text = input.toLowerCase().trim();
  const stage = context.stage || 'pregnancy';
  const week = context.week;
  const postpartumWeeks = context.postpartumWeeks;
  const milestone = context.milestone;

  // 1. TIER 1: CRITICAL ACOG EMERGENCY RED FLAGS (Overrides all general topics)

  // 1a. Preeclampsia & Hypertensive Emergencies
  if (
    (text.includes('headache') && (text.includes('severe') || text.includes('bad') || text.includes('constant') || text.includes('pounding') || text.includes('worst'))) ||
    text.includes('blurry vision') || text.includes('blurred vision') || text.includes('seeing spots') || text.includes('visual') ||
    ((text.includes('swelling') || text.includes('swollen') || text.includes('edema')) && (text.includes('face') || text.includes('facial') || text.includes('hand') || text.includes('sudden'))) ||
    text.includes('epigastric') || text.includes('right upper') || text.includes('preeclampsia')
  ) {
    return 'Midwife Clinical Triage: A severe persistent headache, sudden visual changes like blurriness or spots, and acute swelling in your face or hands can be clinical signs of preeclampsia. Please contact your maternity assessment unit, labor triage line, or midwife immediately for urgent blood pressure and urine protein evaluation. Do not wait for a routine visit.';
  }

  // 1b. Vaginal Bleeding & Hemorrhage
  if (text.includes('bleed') || text.includes('bleeding') || text.includes('blood') || text.includes('hemorrhag')) {
    if (stage === 'postpartum') {
      return 'Postpartum Bleeding Guidance: While lochia bleeding is expected, soaking more than one heavy sanitary pad in an hour, passing blood clots larger than a golf ball, or feeling dizzy or faint requires immediate medical evaluation. Please phone your maternity triage or emergency department right away.';
    } else if (stage === 'ttc') {
      return 'Cycle Bleeding and Spotting: Light pink or brown spotting around cycle days 20 to 24 can sometimes reflect blastocyst implantation. If bleeding is bright red with severe one-sided pelvic pain, please consult your healthcare provider promptly to rule out an ectopic complication.';
    } else {
      return 'Urgent Clinical Notice: Any bright red vaginal bleeding during pregnancy requires prompt professional evaluation to rule out placental complications or cervical changes. Please contact your labor triage unit or obstetrician immediately. Rest on your side and do not insert anything vaginally.';
    }
  }

  // 1c. Contractions & Active Labor (5-1-1 Rule / Water Breaking)
  if (
    text.includes('contraction') || text.includes('contractions') || text.includes('labor') || text.includes('5-1-1') ||
    text.includes('water broke') || text.includes('amniotic') || text.includes('fluid leak') || text.includes('gush')
  ) {
    if (stage === 'postpartum') {
      return 'Postpartum Afterpains: Cramping sensations after birth, especially while nursing, are uterine afterpains caused by oxytocin helping your uterus contract back to its pre-pregnancy size. Warm compresses and resting in a comfortable position provide gentle relief. Contact your midwife if pain becomes severe or accompanied by fever.';
    } else if (stage === 'ttc') {
      return 'Cycle Cramping: Mild uterine sensations during your cycle may correspond to ovulatory follicle release or premenstrual changes. Resting with a warm water bottle and staying well-hydrated eases tension.';
    } else {
      if (week && week < 37) {
        return 'Preterm Labor Precaution: Regular uterine tightenings before 37 weeks require timely clinical assessment. Drink two large glasses of water, rest on your left side for thirty minutes, and phone your midwife or triage if tightenings continue every ten minutes or more.';
      }
      return 'Labor Assessment (5-1-1 Rule): If your contractions occur every 4 to 5 minutes, last at least 60 seconds each, and have continued consistently for over an hour, you are likely entering active labor. Also phone your labor triage immediately if your water breaks with clear or tinted fluid.';
    }
  }

  // 1d. Reduced Fetal Movement
  if (
    (text.includes('kick') || text.includes('movement') || text.includes('moving')) &&
    (text.includes('less') || text.includes('not') || text.includes('decreased') || text.includes('stop') || text.includes('slow') || text.includes('quiet'))
  ) {
    if (stage === 'pregnancy') {
      return 'Fetal Movement Protocol: If your baby feels less active than usual, drink a cold glass of water, rest quietly on your left side, and focus solely on movements. If you do not feel ten distinct movements within two hours, do not wait—contact your maternity assessment unit today for a non-stress test.';
    }
  }

  // 2. TIER 2: STAGE-SPECIFIC MIDWIFE GUIDANCE

  // 2a. Conception & Family Planning (TTC)
  if (stage === 'ttc') {
    if (text.includes('cramp') || text.includes('pain') || text.includes('twinge') || text.includes('mittelschmerz')) {
      return 'Cycle Sensation Guidance: Mild twinges around mid-cycle are often Mittelschmerz ovulatory discomfort as the mature follicle releases an egg. Later in the luteal phase, subtle cramping can occasionally accompany implantation. Keep your abdomen warm, drink soothing teas, and track any basal body temperature shifts.';
    }
    if (text.includes('ovulat') || text.includes('fertile') || text.includes('window') || text.includes('lh') || text.includes('peak')) {
      return 'Fertile Window Midwife Guidance: Your fertile window includes the five days preceding ovulation plus the day of ovulation itself. An LH surge on a home test typically indicates ovulation will occur within 24 to 36 hours. Focus on rest, gentle connection, and steady hydration.';
    }
    if (text.includes('vitamin') || text.includes('supplement') || text.includes('folate') || text.includes('folic') || text.includes('choline') || text.includes('diet')) {
      return 'Preconception Nourishment: A daily intake of 400 to 800 mcg of active methylfolate and 450 mg of choline supports healthy cellular division and early neural tube formation even before a pregnancy test shows positive.';
    }
    if (text.includes('grow') || text.includes('baby') || text.includes('develop') || text.includes('size')) {
      return 'Conception Preparation: In this chapter, your body is cultivating the ideal endometrial sanctuary and follicle quality. Nourish yourself with restful sleep, gentle warmth, and balanced nutrition as your cycle progresses.';
    }
    if (text.includes('affirmation') || text.includes('anxious') || text.includes('worried') || text.includes('stress') || text.includes('hope')) {
      return 'Midwife Affirmation: Your body possesses innate biological wisdom. Conception is a sacred process of patience and harmony. Allow yourself to rest deeply today without self-judgment.';
    }
    if (text.includes('water') || text.includes('hydrat')) {
      return 'Hydration sustains cervical mucus quality and optimal cellular circulation throughout your follicular and luteal phases. Aim for six to eight glasses of clean water daily.';
    }
  }

  // 2b. Postpartum Recovery
  if (stage === 'postpartum') {
    if (text.includes('cramp') || text.includes('afterpain') || text.includes('pain') || text.includes('uterus')) {
      return 'Postpartum Afterpains: Cramping sensations after birth, particularly while nursing, are known as afterpains. They are driven by natural oxytocin surges signaling your uterus to contract back to its pre-pregnancy size. Applying a warm heat pack to your lower belly and emptying your bladder frequently offers comfort.';
    }
    if (text.includes('feed') || text.includes('latch') || text.includes('breast') || text.includes('nurs') || text.includes('milk') || text.includes('bottle')) {
      return 'Newborn Feeding Midwife Guidance: A comfortable latch should feel like firm, rhythmic drawing without sharp pinching. Ensure your baby’s mouth takes in a generous portion of the lower areola with lips flanged outward. Reach out to an IBCLC or your midwife if nipple discomfort persists.';
    }
    if (text.includes('grow') || text.includes('baby') || text.includes('weight') || text.includes('size') || text.includes('milestone')) {
      const wkStr = postpartumWeeks ? `week ${postpartumWeeks}` : 'the early postpartum period';
      return `Newborn Care Guidance: In ${wkStr}, your baby is adjusting to the world through skin-to-skin touch, tuning into familiar voices, and establishing feeding cues. Healthy newborns steadily regain their birth weight within ten to fourteen days and gain roughly 20 to 30 grams daily thereafter.`;
    }
    if (text.includes('lochia') || text.includes('discharge') || text.includes('heal') || text.includes('perine') || text.includes('recovery')) {
      return 'Fourth Trimester Healing: Your lochia naturally progresses from bright red (rubra) to pinkish-brown (serosa), and eventually a pale cream hue (alba) over four to six weeks. Keep perineal areas clean with warm peri-bottle rinses and prioritize horizontal rest.';
    }
    if (text.includes('sleep') || text.includes('tired') || text.includes('exhaust')) {
      return 'Postpartum Rest Sanctuary: Newborn sleep cycles naturally occur in 90 to 120 minute intervals. Protect your recovery by resting when your baby sleeps and allowing your support circle to care for meals and household chores.';
    }
    if (text.includes('affirmation') || text.includes('anxious') || text.includes('worried') || text.includes('cry') || text.includes('blues') || text.includes('mood')) {
      return 'Fourth Trimester Midwife Affirmation: You do not need to bounce back; you are blossoming into a mother. Take this journey breath by breath, and remember that asking for support is an act of deep maternal strength.';
    }
    if (text.includes('water') || text.includes('hydrat')) {
      return 'Postpartum Hydration: Nursing and tissue healing require ample fluid intake. Keep a large glass of warm water or broth near your nursing chair and drink whenever baby feeds.';
    }
  }

  // 2c. Pregnancy Stage
  if (text.includes('grow') || text.includes('baby') || text.includes('size') || text.includes('weight')) {
    if (week && week < 14) {
      const item = milestone?.item || 'Sweet Pea';
      const cm = milestone?.lengthCm || 1;
      return `First Trimester Growth: In week ${week}, your little one is approximately the size of a ${item}, measuring around ${cm} centimeter. Critical organ foundations, neural connections, and tiny limb buds are developing rapidly.`;
    } else if (week && week < 28) {
      const item = milestone?.item || 'Papaya';
      const cm = milestone?.lengthCm || 28;
      return `Second Trimester Growth: In week ${week}, your baby is approximately the size of a ${item}, measuring about ${cm} centimeters from crown to heel. Hearing pathways are active and movement patterns are becoming more distinct.`;
    } else {
      const item = milestone?.item || 'Cantaloupe';
      const cm = milestone?.lengthCm || 45;
      return `Third Trimester Growth: In week ${week || 34}, your baby is approximately the size of a ${item}, measuring around ${cm} centimeters crown to heel. Alveolar surfactant and brain pathways are maturing steadily in preparation for birth.`;
    }
  }

  if (text.includes('cramp') || text.includes('tight') || text.includes('braxton')) {
    return 'Pregnancy Tightening Guidance: Mild, irregular uterine tightenings that ease when you change position or drink water are typically Braxton Hicks practice surges. If surges become rhythmic, intensify, or occur every five minutes, please phone your midwife or triage team.';
  }

  if (text.includes('kick') || text.includes('movement')) {
    return 'Fetal Kick Tracking: Aim to count ten distinct kicks, rolls, or flutters over a two-hour window during your baby’s regular active hours. You can use our interactive kick counter on your dashboard anytime.';
  }

  if (text.includes('water') || text.includes('hydrat')) {
    return 'Hydration Balance: Drinking eight to ten glasses of room-temperature water daily supports healthy amniotic fluid levels, maintains placental circulation, and eases uterine irritability.';
  }

  if (text.includes('affirmation') || text.includes('anxious') || text.includes('worried') || text.includes('scared')) {
    return 'Midwife Affirmation: Your body was built to carry life with wisdom and grace. Every breath you take nourishes both you and your little one. You do not need to earn your rest today.';
  }

  // 3. DEFAULT MIDWIFE GUIDANCE
  if (stage === 'ttc') {
    return 'I hear you. Preparing to conceive is a thoughtful, gentle journey. Please take slow, grounding breaths, keep your body warm, and consult your care team for any clinical questions.';
  }
  if (stage === 'postpartum') {
    return 'I hear you. The fourth trimester demands patience, nourishment, and grace. Please take gentle sips of water, rest your shoulders, and speak with your community midwife for any clinical concerns.';
  }
  return 'I hear you. Remember that your body is completing extraordinary biological work. Please take gentle sips of water, rest your shoulders, and speak with your community midwife for any clinical concerns.';
};

/**
 * Returns stage-appropriate suggested conversation queries
 */
export const getPromptSuggestions = (stage) => {
  if (stage === 'ttc') {
    return [
      'How do I track my fertile window?',
      'Is mid-cycle cramping normal?',
      'What vitamins support conception?',
      'Give me a calming midwife affirmation.'
    ];
  }
  if (stage === 'postpartum') {
    return [
      'Are cramps normal while feeding?',
      'How do I know baby has a deep latch?',
      'What should my recovery lochia look like?',
      'Give me a soothing fourth-trimester affirmation.'
    ];
  }
  return [
    'How is my baby growing this week?',
    'Are mild cramps normal right now?',
    'How do I track movement counts?',
    'Give me a calming midwife affirmation.'
  ];
};

export const VoiceSanctuary = ({ isOpen, onClose }) => {
  const { state } = useGeva();
  const [mascotState, setMascotState] = useState('idle'); // idle | listening | speaking | celebrating | thinking
  const [transcript, setTranscript] = useState('');
  const [spokenResponse, setSpokenResponse] = useState('');
  const [isMicAvailable, setIsMicAvailable] = useState(true);
  const [llmStatus, setLlmStatus] = useState(webLlmEngine.getStatus());
  const [llmProgress, setLlmProgress] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const stage = state.stage || 'pregnancy';
  const week = state.user?.pregnancyWeek || (stage === 'pregnancy' ? 12 : undefined);
  const postpartumWeeks =
    state.user?.postpartumWeeks ||
    (stage === 'postpartum' ? calculatePostpartumWeeks(state.user?.targetDate) : undefined);
  const cycleDay =
    state.user?.conceptionCycleDay ||
    (stage === 'ttc' ? calculateCycleDayFromLMP(state.user?.targetDate) : undefined);

  const milestone = week ? getMilestoneForWeek(week) : null;

  useEffect(() => {
    if (!isOpen) {
      speechEngine.stopListening();
      speechEngine.stopSpeaking();
      setMascotState('idle');
      setTranscript('');
      setSpokenResponse('');
      setTextInput('');
    } else {
      // Formulate stage-aware greeting
      const firstName = getUserFirstName(state.user);
      const isGuestLanding =
        !state.user?.name &&
        !state.user?.email &&
        stage === 'pregnancy' &&
        !state.user?.dueDate;

      let greeting = '';
      if (isGuestLanding) {
        greeting =
          'Welcome to Geva. I am Gbemi, your sister-midwife companion. Whether you are planning, expecting, or recovering, I am here to walk alongside you. How can I support you today?';
      } else if (stage === 'ttc') {
        const day = cycleDay || 14;
        greeting = firstName
          ? `Welcome ${firstName}. We are on Cycle Day ${day} together. How can I support your family planning today?`
          : `Welcome. We are on Cycle Day ${day} together. How can I support your family planning today?`;
      } else if (stage === 'postpartum') {
        const ppWk = postpartumWeeks || 4;
        greeting = firstName
          ? `Welcome back ${firstName}. We are in postpartum week ${ppWk} together. I am here for your healing and baby care.`
          : `Welcome back. We are in postpartum week ${ppWk} together. I am here for your healing and baby care.`;
      } else {
        const wk = week || 12;
        greeting = firstName
          ? `Hello ${firstName}. We are in week ${wk} together. What is on your mind today?`
          : `Hello. We are in week ${wk} together. What is on your mind today?`;
      }

      setSpokenResponse(greeting);

      if (!isMuted) {
        speechEngine.speak(
          greeting,
          () => setMascotState('speaking'),
          () => setMascotState('idle')
        );
      } else {
        setMascotState('idle');
      }

      // Warm up on-device WebLLM if supported and not yet ready
      if (
        webLlmEngine.isWebGpuSupported() &&
        !webLlmEngine.getStatus().isReady &&
        !webLlmEngine.getStatus().isInitializing
      ) {
        webLlmEngine
          .initEngine((report) => {
            setLlmProgress(report);
            setLlmStatus(webLlmEngine.getStatus());
          })
          .then((ready) => {
            if (ready) {
              setLlmStatus(webLlmEngine.getStatus());
              setLlmProgress(null);
            }
          })
          .catch(() => {
            setLlmStatus(webLlmEngine.getStatus());
          });
      }
    }
  }, [isOpen, stage, week, postpartumWeeks, cycleDay, isMuted]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    // Stop ongoing speech before opening microphone
    speechEngine.stopSpeaking();
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
        // Functional update ensures no stale closure trap
        setMascotState((prev) => (prev === 'listening' ? 'idle' : prev));
      },
      (err) => {
        console.warn('Speech recognition notice:', err);
        setIsMicAvailable(false);
        setMascotState((prev) => (prev === 'listening' ? 'idle' : prev));
      }
    );

    if (!started) {
      setIsMicAvailable(false);
      setMascotState('idle');
      setTranscript('Speech recognition is not active in this browser view. You can type your question below or click a suggested query.');
    }
  };

  const handleStopListening = () => {
    speechEngine.stopListening();
    if (transcript && transcript.trim()) {
      processUserInput(transcript);
    } else {
      setMascotState('idle');
    }
  };

  const processUserInput = async (input) => {
    if (!input || !input.trim() || isGenerating) return;
    const cleanInput = input.trim();
    setTranscript(cleanInput);
    setIsGenerating(true);
    setMascotState('thinking');

    let reply = '';
    const status = webLlmEngine.getStatus();

    const contextPayload = {
      stage,
      week,
      postpartumWeeks,
      cycleDay,
      milestone,
      partnerName: state.user?.partnerName
    };

    if (status.isReady) {
      try {
        reply = await webLlmEngine.generateMidwifeReply(cleanInput, contextPayload);
      } catch (err) {
        console.warn('WebLLM generation fallback notice:', err);
        reply = getClinicalMidwifeGuidance(cleanInput, contextPayload);
      }
    } else {
      reply = getClinicalMidwifeGuidance(cleanInput, contextPayload);
    }

    setIsGenerating(false);
    setSpokenResponse(reply);

    if (!isMuted) {
      speechEngine.speak(
        reply,
        () => setMascotState('speaking'),
        () => setMascotState('idle')
      );
    } else {
      setMascotState('idle');
    }
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textInput.trim() || isGenerating) return;
    const query = textInput.trim();
    setTextInput('');
    processUserInput(query);
  };

  const handleReplayAudio = () => {
    if (!spokenResponse || isGenerating) return;
    speechEngine.speak(
      spokenResponse,
      () => setMascotState('speaking'),
      () => setMascotState('idle')
    );
  };

  const promptSuggestions = getPromptSuggestions(stage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-canvas/95 backdrop-blur-md animate-fade-in overflow-y-auto">
      {/* Top action bar: Close button & Quiet Mode Toggle */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
        <button
          onClick={() => {
            const nextMuted = !isMuted;
            setIsMuted(nextMuted);
            if (nextMuted) {
              speechEngine.stopSpeaking();
              setMascotState('idle');
            }
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-heading font-semibold border transition-colors cursor-pointer ${
            isMuted
              ? 'bg-rose-light text-rose-dark border-rose-light/80'
              : 'bg-white/80 hover:bg-white text-ink-muted border-stone-200'
          }`}
          title={isMuted ? 'Voice muted (Quiet Mode)' : 'Voice audio on'}
          aria-label={isMuted ? 'Unmute voice' : 'Mute voice for quiet mode'}
        >
          {isMuted ? 'Quiet Mode (Muted)' : 'Voice On'}
        </button>

        <button
          onClick={onClose}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center font-bold text-lg sm:text-xl cursor-pointer transition-colors"
          aria-label="Close Voice Sanctuary"
        >
          ×
        </button>
      </div>

      <div className="max-w-xl w-full flex flex-col items-center text-center px-2 sm:px-4 py-5 sm:py-8 my-auto">
        <span className="text-xs font-heading font-bold uppercase tracking-wider text-sage-dark mb-1.5 sm:mb-2">
          Gbemi
        </span>
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-ink">
          Voice Sanctuary
        </h2>
        <p className="font-body text-xs text-ink-muted mt-1 max-w-md">
          A quiet, private space powered by native browser speech synthesis. Speak naturally or type quietly to Gbemi without cloud recording.
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
          <div className="w-full bg-[#F4EFEA] border border-ink/8 rounded-2xl p-5 min-h-[100px] flex flex-col justify-center text-left shadow-soft mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-rose-dark flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose" />
                Gbemi's Guidance
              </span>
              <div className="flex items-center gap-2">
                {mascotState === 'speaking' && (
                  <span className="text-[10px] font-heading font-semibold text-ink-muted flex items-center gap-1">
                    <span className="w-1 h-2 bg-rose rounded-full animate-pulse" />
                    <span className="w-1 h-3 bg-sage rounded-full animate-pulse" />
                    <span>Speaking aloud</span>
                  </span>
                )}
                {spokenResponse && !isMuted && mascotState !== 'speaking' && (
                  <button
                    onClick={handleReplayAudio}
                    className="text-[10px] font-heading font-bold text-ink-muted hover:text-ink underline cursor-pointer"
                  >
                    Replay Audio
                  </button>
                )}
              </div>
            </div>
            <p className="font-body text-sm text-ink leading-relaxed font-medium">
              "{spokenResponse || 'Tap the microphone below or type quietly to converse with Gbemi...'}"
            </p>
          </div>
        )}

        {/* Audio Visualizer Waves */}
        <div className="flex items-center gap-1.5 h-6 mb-4">
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
        <div className="mb-4">
          {mascotState === 'listening' ? (
            <button
              onClick={handleStopListening}
              className="px-8 py-3.5 rounded-xl bg-rose text-ink font-heading font-bold text-sm shadow-warm animate-pulse flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-ink animate-ping" />
              <span>Listening... Tap to Submit</span>
            </button>
          ) : isGenerating ? (
            <button
              disabled
              className="px-8 py-3.5 rounded-xl bg-stone-100 text-ink-muted font-heading font-bold text-sm flex items-center gap-2 cursor-not-allowed opacity-80"
            >
              <span className="w-2 h-2 rounded-full bg-peach animate-ping" />
              <span>Gbemi is Thinking...</span>
            </button>
          ) : (
            <button
              onClick={handleStartListening}
              className="px-8 py-3.5 rounded-xl bg-ink hover:bg-ink/90 text-canvas font-heading font-bold text-sm shadow-warm flex items-center gap-2.5 cursor-pointer transition-transform active:scale-95"
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

        {/* Quiet-Room Text Input (Accessible typing alternative) */}
        <form onSubmit={handleTextSubmit} className="w-full max-w-md mb-6 flex items-center gap-2">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder="Or type a quiet question to Gbemi..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-stone-200 text-ink text-xs font-body focus:outline-none focus:border-rose transition-colors placeholder:text-ink-muted/70"
            aria-label="Type your question for Gbemi"
          />
          <button
            type="submit"
            disabled={!textInput.trim() || isGenerating}
            className="px-4 py-2.5 rounded-xl bg-ink hover:bg-ink/90 disabled:opacity-40 text-canvas font-heading font-bold text-xs cursor-pointer transition-colors"
          >
            Ask
          </button>
        </form>

        {/* Stage-Appropriate Suggested Queries */}
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
