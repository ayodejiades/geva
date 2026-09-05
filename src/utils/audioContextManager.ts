class AudioContextManager {
  private ctx: AudioContext | null = null;

  getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      const resume = (): void => {
        void this.ctx?.resume();
        window.removeEventListener('touchstart', resume);
        window.removeEventListener('click', resume);
      };
      window.addEventListener('touchstart', resume);
      window.addEventListener('click', resume);
    }
    return this.ctx;
  }
}

export const audioContextManager = new AudioContextManager();
