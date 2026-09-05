import '@testing-library/jest-dom';

// Mock Web Audio API
class AudioContextMock {
  state = 'running';
  createOscillator(): unknown {
    return {
      type: 'sine',
      frequency: { setValueAtTime: (): void => {} },
      connect: (): void => {},
      start: (): void => {},
      stop: (): void => {},
    };
  }
  createGain(): unknown {
    return {
      gain: {
        setValueAtTime: (): void => {},
        exponentialRampToValueAtTime: (): void => {},
      },
      connect: (): void => {},
    };
  }
  createBiquadFilter(): unknown {
    return {
      type: 'lowpass',
      frequency: { setValueAtTime: (): void => {} },
      Q: { setValueAtTime: (): void => {} },
      connect: (): void => {},
    };
  }
  close(): Promise<void> {
    return Promise.resolve();
  }
}

(window as unknown as { AudioContext: typeof AudioContextMock }).AudioContext = AudioContextMock;
