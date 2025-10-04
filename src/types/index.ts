export interface Message {
  id: string;
  content: string;
  timestamp: Date;
  sender: 'user' | 'ai';
  isTyping?: boolean;
}

export interface ChatState {
  messages: Message[];
  isConnected: boolean;
  isLoading: boolean;
  currentInput: string;
  isTTSEnabled: boolean;
  isPlaying: boolean;
}

export interface TTSResponse {
  audioUrl: string;
  text: string;
}