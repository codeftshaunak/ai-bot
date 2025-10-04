import { type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { useChatStore } from '../store/chatStore';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const { currentInput, setCurrentInput, isLoading } = useChatStore();

  const handleSend = () => {
    if (currentInput.trim() && !isLoading) {
      onSendMessage(currentInput.trim());
      setCurrentInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6">
      <div className="flex items-end space-x-4">
        <div className="flex-1">
          <div className="relative">
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="w-full p-4 pr-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm transition-all duration-200"
              rows={1}
              disabled={isLoading}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <div className="text-xs text-gray-400 dark:text-gray-500">
                {currentInput.length > 0 && `${currentInput.length}`}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={handleSend}
          disabled={!currentInput.trim() || isLoading}
          className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl disabled:shadow-sm transform hover:scale-105 disabled:transform-none"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};