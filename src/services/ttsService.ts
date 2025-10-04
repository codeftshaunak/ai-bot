const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export class TTSService {
  private audioElement: HTMLAudioElement | null = null;
  private onPlayingChange: ((isPlaying: boolean) => void) | null = null;

  setOnPlayingChange(callback: (isPlaying: boolean) => void) {
    this.onPlayingChange = callback;
  }

  async playText(text: string): Promise<void> {
    try {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement = null;
      }

      this.onPlayingChange?.(true);

      const response = await fetch(`${API_BASE_URL}/api/tts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      this.audioElement = new Audio(audioUrl);

      this.audioElement.addEventListener('ended', () => {
        this.onPlayingChange?.(false);
        URL.revokeObjectURL(audioUrl);
        this.audioElement = null;
      });

      this.audioElement.addEventListener('error', () => {
        this.onPlayingChange?.(false);
        URL.revokeObjectURL(audioUrl);
        this.audioElement = null;
      });

      await this.audioElement.play();
    } catch (error) {
      console.error('Error playing TTS:', error);
      this.onPlayingChange?.(false);

      this.fallbackSpeech(text);
    }
  }

  private fallbackSpeech(text: string) {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => this.onPlayingChange?.(true);
      utterance.onend = () => this.onPlayingChange?.(false);
      utterance.onerror = () => this.onPlayingChange?.(false);

      speechSynthesis.speak(utterance);
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

    this.onPlayingChange?.(false);
  }

  isPlaying(): boolean {
    return this.audioElement !== null && !this.audioElement.paused;
  }
}

export const ttsService = new TTSService();