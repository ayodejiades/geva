import type { MLCEngine, InitProgressReport } from '@mlc-ai/web-llm';

// Default model: Qwen2.5-0.5B
// High coherence, low VRAM footprint (~350MB), downloads and caches in browser IndexedDB
const SELECTED_MODEL = 'Qwen2.5-0.5B-Instruct-q4f16_1-MLC';

export interface ModelProgress {
  text: string;
  progress: number;
}

export interface MidwifeContext {
  stage: string;
  week?: number;
  partnerName?: string;
}

class WebLlmEngine {
  private engine: MLCEngine | null = null;
  private isInitializing = false;
  private isReady = false;
  private initError: string | null = null;

  isWebGpuSupported(): boolean {
    return typeof navigator !== 'undefined' && 'gpu' in navigator;
  }

  async initEngine(onProgress?: (report: ModelProgress) => void): Promise<boolean> {
    if (this.isReady && this.engine) return true;
    if (this.isInitializing) return false;
    if (!this.isWebGpuSupported()) {
      this.initError = 'WebGPU is not enabled in this browser. Falling back to local clinical knowledge engine.';
      return false;
    }

    try {
      this.isInitializing = true;
      this.initError = null;

      // Dynamic import to prevent bundling 6MB WebLLM runtime into the initial entry bundle
      const { CreateMLCEngine } = await import('@mlc-ai/web-llm');

      this.engine = await CreateMLCEngine(SELECTED_MODEL, {
        initProgressCallback: (report: InitProgressReport) => {
          if (onProgress) {
            onProgress({
              text: report.text,
              progress: Math.round(report.progress * 100),
            });
          }
        },
      });

      this.isReady = true;
      this.isInitializing = false;
      return true;
    } catch (err) {
      console.warn('WebLLM initialization notice:', err);
      this.initError = err instanceof Error ? err.message : 'WebLLM initialization failed';
      this.isInitializing = false;
      this.isReady = false;
      return false;
    }
  }

  getStatus(): { isReady: boolean; isInitializing: boolean; isWebGpu: boolean; error: string | null } {
    return {
      isReady: this.isReady,
      isInitializing: this.isInitializing,
      isWebGpu: this.isWebGpuSupported(),
      error: this.initError,
    };
  }

  async generateMidwifeReply(userMessage: string, context: MidwifeContext): Promise<string> {
    if (!this.isReady || !this.engine) {
      throw new Error('WebLLM engine is not ready');
    }

    const systemPrompt = `You are Gbemi, a reassuring and experienced perinatal sister-midwife companion for Geva.
The mother is in the ${context.stage || 'pregnancy'} stage${context.week ? ` at week ${context.week}` : ''}.
Your demeanor is warm, grounded, reassuring, and respectful.
Under 21 U.S.C. 360j(o)(1)(E), you provide supportive maternal education and general wellness guidance, never definitive clinical diagnoses.
Always align with ACOG triage principles.
If the mother mentions severe red flags (severe persistent headache, sudden facial edema, visual changes, bright red bleeding, or contractions meeting the 5-1-1 rule), gently and firmly advise her to contact her midwife or labor triage immediately.
Keep responses concise (2 to 3 comforting sentences) suitable for clear speech synthesis.
Do not use emojis. Speak naturally as a calm human midwife without robotic jargon or corporate buzzwords.`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      { role: 'user' as const, content: userMessage },
    ];

    const response = await this.engine.chat.completions.create({
      messages,
      temperature: 0.6,
      max_tokens: 160,
    });

    return response.choices[0]?.message?.content?.trim() || 'I hear you. Take a slow, grounding breath and rest your shoulders.';
  }
}

export const webLlmEngine = new WebLlmEngine();
