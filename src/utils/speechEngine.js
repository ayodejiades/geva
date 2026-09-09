// src/utils/speechEngine.js
class SpeechEngine {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.activeUtterance = null;
    this.voices = [];

    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }

      if (window.speechSynthesis) {
        this.voices = window.speechSynthesis.getVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => {
            this.voices = window.speechSynthesis.getVoices();
          };
        }
      }
    }
  }

  startListening(onTranscript, onEnd, onError) {
    if (!this.recognition) return false;

    // Interrupt any ongoing speech synthesis so microphone doesn't capture Gbemi's voice
    this.stopSpeaking();

    this.recognition.onresult = (e) => {
      let fullTranscript = '';
      let isFinal = false;
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const item = e.results[i];
        if (item[0]?.transcript) {
          fullTranscript = item[0].transcript;
        }
        if (item.isFinal) {
          isFinal = true;
        }
      }
      onTranscript(fullTranscript, isFinal);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (onEnd) onEnd();
    };

    this.recognition.onerror = (err) => {
      this.isListening = false;
      if (onError) onError(err);
    };

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch {
      this.isListening = false;
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      try {
        this.recognition.stop();
      } catch {
        // ignore
      }
      this.isListening = false;
    }
  }

  stopSpeaking() {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.activeUtterance = null;
  }

  speak(text, onStart, onEnd) {
    if (typeof window === 'undefined' || !window.speechSynthesis || typeof SpeechSynthesisUtterance === 'undefined') return;

    this.stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    // Retain reference on instance to prevent Chromium V8 garbage collection mid-speech
    this.activeUtterance = utterance;

    if (!this.voices || this.voices.length === 0) {
      this.voices = window.speechSynthesis.getVoices();
    }

    const gentleVoice = this.voices.find(v => 
      v.name.includes('Google UK English Female') || 
      v.name.includes('Samantha') || 
      v.name.includes('Karen') || 
      (v.lang?.startsWith('en') && v.name?.includes('Natural'))
    );

    if (gentleVoice) utterance.voice = gentleVoice;
    utterance.pitch = 1.0;
    utterance.rate = 0.94;

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (err) => {
      console.warn('Speech synthesis notice:', err);
      this.activeUtterance = null;
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  }
}

export const speechEngine = new SpeechEngine();
export default speechEngine;
