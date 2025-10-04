import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/chatStore';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { AvatarSection } from './AvatarSection';

interface ChatContainerProps {
  onSendMessage: (message: string) => void;
  onPlayTTS: (text: string) => void;
}

export const ChatContainer = ({ onSendMessage, onPlayTTS }: ChatContainerProps) => {
  const { messages, isLoading } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      <div className="flex-1 flex flex-col">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Powered by advanced AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-medium text-green-700 dark:text-green-400">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Welcome to AI Chat</h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">Start a conversation with your AI assistant. Ask questions, get help, or just chat!</p>
              <div className="mt-6 grid grid-cols-2 gap-3 max-w-lg">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 text-left">
                  <div className="text-sm font-medium text-gray-800 dark:text-white">Ask anything</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Get instant responses</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-3 text-left">
                  <div className="text-sm font-medium text-gray-800 dark:text-white">Voice playback</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">Hear AI responses</div>
                </div>
              </div>

              <div className="mt-8 w-full max-w-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">Try these examples:</p>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    "Hello! How can you help me today?",
                    "Explain how AI works",
                    "Help me with React programming",
                    "What are your capabilities?"
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => onSendMessage(example)}
                      className="text-left p-3 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-200 hover:shadow-sm group"
                    >
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                        {example}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onPlayTTS={() => onPlayTTS(message.content)}
            />
          ))}

          {isLoading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSendMessage={onSendMessage} />
      </div>

      <div className="hidden lg:flex lg:h-full">
        <AvatarSection />
      </div>
    </div>
  );
};