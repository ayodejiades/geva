# Geva Release Notes: v1.0.0

Geva v1.0.0 is the foundational release of our free, sovereign perinatal health sanctuary. It delivers private, continuous maternal care across conception, pregnancy, and postpartum recovery directly in the browser with zero server overhead, zero subscription paywalls, and zero cloud database liability.

---

## What You Can Now Do

### 1. Navigate Your Full Perinatal Journey Across 3 Life Stages
- **Conception & Family Planning:** Track menstrual cycle days, identify ovulation windows, log LH surges, and maintain preconception vitamin habits.
- **Pregnancy & Labor Monitoring:** Follow 40 weeks of clinical fetal growth milestones, count fetal kicks with interval tracking, time contractions with active labor triage, and listen to a synthetic fetal heartbeat.
- **Postpartum Fourth Trimester:** Track newborn feeding and sleep windows, log lochia progression, follow pelvic floor recovery milestones, and screen maternal emotional well-being using the Edinburgh Postnatal Depression Scale.

### 2. Speak with Gbemi, Your Sister-Midwife Voice Companion
- Ask questions anytime using natural speech via the browser native Web Speech API at zero cost.
- See instant visual confirmation when Gbemi hears your question with a dedicated request-received state before advice begins.
- Receive reassuring, evidence-based guidance in a warm, grounded human voice powered by client-side WebLLM intelligence.

### 3. Share Real-Time Updates with Your Partner (CareCircle)
- Open a second browser window for your partner or support person.
- Log fetal kicks, contraction surges, and hydration marks on the mother console.
- Watch the partner console display live kick animations and contraction wave timers in real time via the browser BroadcastChannel API, without needing user accounts, passwords, or server relays.

### 4. Time Contractions with the Clinical 5-1-1 Active Labor Rule
- Record the exact duration of each surge and the interval from the prior surge.
- Automatic evaluation against the American College of Obstetricians and Gynecologists (ACOG) 5-1-1 active labor benchmark (contractions 5 minutes apart, lasting 60 seconds, persisting for at least 1 hour).
- Receive clear, reassuring guidance distinguishing Braxton Hicks practice surges from active labor.

### 5. Export a One-Page SBAR Clinical Visit Passport
- Produce an organized clinical summary formatted in the healthcare standard Situation, Background, Assessment, and Recommendation (SBAR) structure.
- Review recent blood pressure readings, kick telemetry, contraction frequency, and flagged symptoms in a single view.
- Print or save a clean, single-page summary to bring directly to your OB-GYN or midwife appointments.

### 6. Explore Pre-Loaded Personas in One Click
- **Clara (Conception):** Cycle Day 14 with LH surge confirmed and preconception labs logged.
- **Anjola (Pregnancy):** Week 34 with 28 historical kick sessions, recent Braxton Hicks surges, and normal vitals.
- **Maya (Postpartum):** Week 4 with newborn feeding logs, pelvic floor recovery milestones, and postpartum wellness screening.

---

## Core Pillars & Design Integrity

- **100% Free Forever:** Zero server costs. All storage runs locally in your browser (IndexedDB and localStorage). Voice recognition and speech synthesis use built-in browser capabilities.
- **Complete On-Device Privacy:** No personal health data ever leaves your device. No analytics trackers, no advertising brokers, and no cloud database liability.
- **Clean Nurturing Palette:** Warm Rose (#DDA59F), Soft Sage (#9CAF88), Warm Peach (#F4C095), and Deep Espresso Slate (#2D2424) on a pure white canvas.
- **Zero-Emoji Policy:** A clean, editorial interface free of floating pill gimmicks, generic icons, and emoji clutter.

---

## Technical Specifications

- **Framework:** React 19, Vite 6, Tailwind CSS 3.4
- **Voice Intelligence:** Browser Web Speech API (SpeechRecognition + SpeechSynthesis) paired with WebLLM client-side inference
- **Acoustics:** Web Audio API synthesizer for 145 BPM fetal Doppler simulation
- **Multi-Window Sync:** Native BroadcastChannel API (`geva_care_circle`)
- **Local Persistence:** Dexie.js (IndexedDB) with localStorage fallback
- **Test Suite:** Vitest with JSDOM (14/14 automated tests passing)
- **Compliance:** Automated zero-emoji and editorial tone scanning
