export const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-gray-200 dark:bg-gray-700 rounded-lg px-4 py-2 max-w-xs">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-600 dark:text-gray-300">AI is typing</span>
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
            <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};