// src/utils/heartbeatAudio.js
class HeartbeatAudioEngine {
  constructor() {
    this.audioCtx = null;
    this.intervalId = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  triggerPulse(time, freq, duration, gainValue) {
    if (!this.audioCtx) return;
    const osc = this.audioCtx.createOscillator();
    const filter = this.audioCtx.createBiquadFilter();
    const gain = this.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.65, time + duration);

    // Muffled fluid Doppler acoustic filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(115, time);

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(gainValue, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }

  startHeartbeat(bpm = 145) {
    this.init();
    if (!this.audioCtx) return;
    if (this.isPlaying) return;
    this.isPlaying = true;
    const intervalMs = (60 / bpm) * 1000;

    const playLubDub = () => {
      if (!this.isPlaying || !this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      // Lub (First acoustic pulse)
      this.triggerPulse(now, 72, 0.09, 0.45);
      // Dub (Second fluid reflection pulse)
      this.triggerPulse(now + 0.13, 62, 0.08, 0.35);
    };

    playLubDub();
    this.intervalId = setInterval(playLubDub, intervalMs);
  }

  stopHeartbeat() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const heartbeatAudio = new HeartbeatAudioEngine();
