import { ChatContainer } from './components/ChatContainer';
import { useChat } from './hooks/useChat';

function App() {
  const { handleSendMessage, handlePlayTTS } = useChat();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ChatContainer
        onSendMessage={handleSendMessage}
        onPlayTTS={handlePlayTTS}
      />
    </div>
  );
}

export default App;
