import { create } from 'zustand';
import type { Message, ChatState } from '../types';

interface ChatStore extends ChatState {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  updateMessage: (id: string, updates: Partial<Message>) => void;
  setCurrentInput: (input: string) => void;
  setIsConnected: (connected: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setIsTTSEnabled: (enabled: boolean) => void;
  setIsPlaying: (playing: boolean) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isConnected: false,
  isLoading: false,
  currentInput: '',
  isTTSEnabled: true,
  isPlaying: false,

  addMessage: (message) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          ...message,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
    })),

  updateMessage: (id, updates) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    })),

  setCurrentInput: (currentInput) => set({ currentInput }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsTTSEnabled: (isTTSEnabled) => set({ isTTSEnabled }),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  clearMessages: () => set({ messages: [] }),
}));