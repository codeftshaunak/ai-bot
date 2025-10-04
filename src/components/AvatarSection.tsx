import { useChatStore } from '../store/chatStore';

export const AvatarSection = () => {
  const { isConnected, isLoading, isTTSEnabled, setIsTTSEnabled } = useChatStore();

  return (
    <div className="w-full lg:w-80 h-full bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Avatar/Video Section */}
      <div className="p-6 flex flex-col items-center justify-center flex-1">
        <div className="relative mb-6">
          <div className={`w-32 h-32 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg ${isLoading ? 'animate-pulse' : ''}`}>
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-gray-800 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            AI Assistant
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isConnected ? 'Online' : 'Disconnected'}
          </p>
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
          <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700 dark:text-gray-300">Voice Playback</span>
              <button
                onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isTTSEnabled ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isTTSEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Status:</span>
                <span className={`font-medium ${isConnected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isConnected ? 'Online' : 'Offline'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Response:</span>
                <span className={`font-medium ${isLoading ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                  {isLoading ? 'Typing...' : 'Ready'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};