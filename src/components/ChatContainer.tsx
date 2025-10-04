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
    <div className="flex h-screen bg-white dark:bg-gray-900">
      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Assistant
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400">Chat with AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50 dark:bg-gray-900">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-8">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">Good evening</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">How can I help you today?</p>

              <div className="w-full max-w-lg space-y-3">
                {[
                  "Hello! How can you help me today?",
                  "Explain how AI works",
                  "Help me with React programming",
                  "What are your capabilities?"
                ].map((example, index) => (
                  <button
                    key={index}
                    onClick={() => onSendMessage(example)}
                    className="w-full text-left p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 hover:shadow-sm group"
                  >
                    <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {example}
                    </span>
                  </button>
                ))}
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