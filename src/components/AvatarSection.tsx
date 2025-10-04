import { useChatStore } from '../store/chatStore';

export const AvatarSection = () => {
  const { isConnected, isLoading, isTTSEnabled, setIsTTSEnabled } = useChatStore();

  return (
    <div className="w-full lg:w-80 h-full bg-gray-100 dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Avatar/Video Section */}
      <div className="p-6 flex flex-col items-center justify-center flex-1">
        <div className="relative mb-6">
          <div className={`w-40 h-40 rounded-3xl bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-1 shadow-2xl ${isLoading ? 'animate-pulse' : ''}`}>
            <div className="w-full h-full rounded-3xl bg-white dark:bg-gray-900 flex items-center justify-center overflow-hidden">
              {/* Avatar/Video Content */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Video Avatar Placeholder - Replace with real video file */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700">
                  {/* Animated background placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-indigo-600/20 animate-pulse"></div>

                  {/* Avatar icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                  </div>

                  {/* Video element - Ready for real video */}
                  <video
                    className="w-full h-full object-cover opacity-0 pointer-events-none"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onCanPlay={(e) => {
                      // Show video when loaded, hide placeholder
                      e.currentTarget.style.opacity = '1';
                      const placeholder = e.currentTarget.parentElement?.querySelector('.absolute');
                      if (placeholder) (placeholder as HTMLElement).style.display = 'none';
                    }}
                  >
                    <source src="/avatar-video.mp4" type="video/mp4" />
                    <source src="/avatar-video.webm" type="video/webm" />
                    {/* Video will be hidden until a real file is added */}
                  </video>

                  {/* Instructions for adding video (dev only) */}
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <div className="text-xs text-white/60 bg-black/20 backdrop-blur-sm rounded px-2 py-1">
                      Video Ready
                    </div>
                  </div>
                </div>
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