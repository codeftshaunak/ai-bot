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
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end space-x-4">
          <div className="flex-1">
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!currentInput.trim() || isLoading}
            className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};