export class TTSService {
  private audioElement: HTMLAudioElement | null = null;
  private onPlayingChange: ((isPlaying: boolean) => void) | null = null;
  private isUsingFallback: boolean = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  setOnPlayingChange(callback: (isPlaying: boolean) => void) {
    this.onPlayingChange = callback;
  }

  async playText(text: string): Promise<void> {
    this.stop();
    this.fallbackSpeech(text);
  }

  private fallbackSpeech(text: string) {
    if ('speechSynthesis' in window) {
      this.isUsingFallback = true;
      this.currentUtterance = new SpeechSynthesisUtterance(text);

      this.currentUtterance.onstart = () => {
        this.isUsingFallback = true;
        this.onPlayingChange?.(true);
      };
      this.currentUtterance.onend = () => {
        this.isUsingFallback = false;
        this.currentUtterance = null;
        this.onPlayingChange?.(false);
      };
      this.currentUtterance.onerror = () => {
        this.isUsingFallback = false;
        this.currentUtterance = null;
        this.onPlayingChange?.(false);
      };

      this.onPlayingChange?.(true);
      speechSynthesis.speak(this.currentUtterance);
    }
  }

  stop() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement = null;
    }

    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }

    this.isUsingFallback = false;
    this.currentUtterance = null;
    this.onPlayingChange?.(false);
  }

  isPlaying(): boolean {
    if (this.audioElement) {
      return !this.audioElement.paused;
    }
    return this.isUsingFallback && speechSynthesis.speaking;
  }
}

export const ttsService = new TTSService();