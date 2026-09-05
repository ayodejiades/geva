// src/utils/speechEngine.js
class SpeechEngine {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
    }
  }

  startListening(onTranscript, onEnd, onError) {
    if (!this.recognition) return false;
    this.recognition.onresult = (e) => {
      const current = e.resultIndex;
      const transcript = e.results[current][0].transcript;
      onTranscript(transcript, e.results[current].isFinal);
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

  speak(text, onStart, onEnd) {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const gentleVoice = voices.find(v => 
      v.name.includes('Google UK English Female') || 
      v.name.includes('Samantha') || 
      v.name.includes('Karen') || 
      (v.lang.startsWith('en') && v.name.includes('Natural'))
    );
    if (gentleVoice) utterance.voice = gentleVoice;
    utterance.pitch = 1.0;
    utterance.rate = 0.94;
    utterance.onstart = onStart;
    utterance.onend = onEnd;
    window.speechSynthesis.speak(utterance);
  }
}

export const speechEngine = new SpeechEngine();
