import type { Message } from '../types';
import { Volume2, VolumeX } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

interface ChatMessageProps {
  message: Message;
  onPlayTTS?: () => void;
}

export const ChatMessage = ({ message, onPlayTTS }: ChatMessageProps) => {
  const { isTTSEnabled, isPlaying } = useChatStore();

  return (
    <div className="max-w-4xl mx-auto mb-6 animate-fade-in">
      <div
        className={`flex ${
          message.sender === 'user' ? 'justify-end' : 'justify-start'
        }`}
      >
        <div className={`flex items-start max-w-2xl ${
          message.sender === 'user'
            ? 'flex-row-reverse space-x-reverse space-x-3 ml-12'
            : 'space-x-3 mr-12'
        }`}>
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            message.sender === 'user'
              ? 'bg-blue-500'
              : 'bg-gray-600 dark:bg-gray-400'
          }`}>
            {message.sender === 'user' ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          <div
            className={`relative px-4 py-3 rounded-2xl shadow-sm border ${
              message.sender === 'user'
                ? 'bg-blue-500 text-white border-blue-600 dark:bg-blue-600 dark:border-blue-700'
                : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700'
            } ${message.isTyping ? 'animate-pulse' : ''}`}
          >
          {message.sender === 'ai' && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">AI</span>
              {isTTSEnabled && onPlayTTS && (
                <button
                  onClick={onPlayTTS}
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isPlaying
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                  disabled={isPlaying}
                  title={isPlaying ? 'Playing...' : 'Play audio'}
                >
                  {isPlaying ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </button>
              )}
            </div>
          )}
          <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
          <div className={`text-xs mt-2 opacity-70 ${
            message.sender === 'user'
              ? 'text-blue-100'
              : 'text-gray-500 dark:text-gray-400'
          }`}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};