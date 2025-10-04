import { ChatContainer } from './components/ChatContainer';
import { useChat } from './hooks/useChat';

function App() {
  const { handleSendMessage, handlePlayTTS, handleStopTTS, currentlyPlayingId } = useChat();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ChatContainer
        onSendMessage={handleSendMessage}
        onPlayTTS={handlePlayTTS}
        onStopTTS={handleStopTTS}
        currentlyPlayingId={currentlyPlayingId}
      />
    </div>
  );
}

export default App;
