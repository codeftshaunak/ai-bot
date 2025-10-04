import { useChatStore } from '../store/chatStore';

export const AvatarSection = () => {
  const { isConnected, isLoading, isTTSEnabled, setIsTTSEnabled } = useChatStore();

  return (
    <div className="w-full lg:w-80 bg-gradient-to-b from-slate-50/80 via-blue-50/80 to-indigo-100/80 dark:from-gray-900/80 dark:via-slate-900/80 dark:to-indigo-950/80 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 flex flex-col">
      {/* Avatar/Video Section */}
      <div className="p-6 flex flex-col items-center justify-center flex-1">
        <div className="relative mb-6">
          <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-1 shadow-2xl ${isLoading ? 'animate-pulse' : ''}`}>
            <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              {/* Avatar/Video Content */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.847a4.5 4.5 0 003.09 3.09L15.75 12l-2.847.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                {/* Placeholder for future video */}
                {/* <video className="w-full h-full object-cover rounded-3xl" autoPlay muted loop>
                  <source src="/avatar-video.mp4" type="video/mp4" />
                </video> */}
              </div>
            </div>
          </div>
          <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-lg ${isConnected ? 'bg-green-500' : 'bg-red-500'} ${isConnected ? 'animate-pulse' : ''}`}></div>
        </div>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1">
            AI Assistant
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isConnected ? 'Online & Ready' : 'Disconnected'}
          </p>
        </div>

        {/* Controls */}
        <div className="w-full space-y-4">
          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Settings</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Voice Playback</span>
                <button
                  onClick={() => setIsTTSEnabled(!isTTSEnabled)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    isTTSEnabled ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
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
          </div>

          <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-3">Status</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Connection:</span>
                <span className={`font-medium ${isConnected ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isConnected ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Mode:</span>
                <span className="text-gray-800 dark:text-white font-medium">Chat</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Response:</span>
                <span className={`font-medium ${isLoading ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-white'}`}>
                  {isLoading ? 'Processing...' : 'Ready'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-300">Voice:</span>
                <span className={`font-medium ${isTTSEnabled ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`}>
                  {isTTSEnabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};