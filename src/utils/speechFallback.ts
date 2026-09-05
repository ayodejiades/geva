export interface SpeechPromptChip {
  id: string;
  text: string;
  category: 'fetal-health' | 'labor-timing' | 'recovery';
}

export const CONTEXTUAL_PROMPT_CHIPS: SpeechPromptChip[] = [
  { id: '1', text: 'How many kicks should I feel in one hour?', category: 'fetal-health' },
  { id: '2', text: 'Am I in active labor under the 5-1-1 rule?', category: 'labor-timing' },
  { id: '3', text: 'What warning signs require calling labor triage?', category: 'labor-timing' },
  { id: '4', text: 'How do I care for my pelvic floor this week?', category: 'recovery' },
];

export function isSpeechRecognitionSupported(): boolean {
  return typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
}
