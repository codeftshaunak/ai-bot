import { type KeyboardEvent } from "react";
import { Send } from "lucide-react";
import { useChatStore } from "../store/chatStore";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

export const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const { currentInput, setCurrentInput, isLoading } = useChatStore();

  const handleSend = () => {
    if (currentInput.trim() && !isLoading) {
      onSendMessage(currentInput.trim());
      setCurrentInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 sm:px-6 py-2 lg:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex space-x-2 sm:space-x-3">
          <div className="flex-1 min-w-0">
            <textarea
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="w-full p-2 sm:p-3 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg sm:rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500 min-h-[36px] max-h-24"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!currentInput.trim() || isLoading}
            className="px-4 sm:px-6 py-1.5 bg-blue-600 text-white rounded-lg sm:rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0 max-h-[46px]"
          >
            <Send className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
