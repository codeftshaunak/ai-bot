import { useEffect, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';
import { sseService, sendMessage } from '../services/apiService';
import { ttsService } from '../services/ttsService';
import { getDemoResponse, simulateTypingDelay } from '../services/demoService';

export const useChat = () => {
  const {
    addMessage,
    setIsConnected,
    setIsLoading,
    setIsPlaying,
    isTTSEnabled,
  } = useChatStore();

  const connectToStream = useCallback(async () => {
    try {
      await sseService.connect('/api/stream');
      setIsConnected(true);

      sseService.addListener('chat', (data) => {
        if (data.type === 'message') {
          addMessage({
            content: data.content,
            sender: 'ai',
          });
          setIsLoading(false);
        } else if (data.type === 'typing') {
          setIsLoading(data.isTyping);
        }
      });
    } catch (error) {
      console.error('Failed to connect to stream:', error);
      setIsConnected(false);
    }
  }, [addMessage, setIsConnected, setIsLoading]);

  const handleSendMessage = useCallback(async (message: string) => {
    addMessage({
      content: message,
      sender: 'user',
    });

    setIsLoading(true);

    try {
      if (sseService.isConnected()) {
        console.log('Message sent via SSE stream');
      } else {
        try {
          const response = await sendMessage(message);
          addMessage({
            content: response.message || 'Sorry, I couldn\'t process that.',
            sender: 'ai',
          });
          setIsLoading(false);
        } catch (apiError) {
          console.log('API not available, using demo mode');

          const typingDelay = simulateTypingDelay(message);
          setTimeout(() => {
            const demoResponse = getDemoResponse(message);
            addMessage({
              content: demoResponse,
              sender: 'ai',
            });
            setIsLoading(false);
          }, typingDelay);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage({
        content: 'Sorry, there was an error processing your message.',
        sender: 'ai',
      });
      setIsLoading(false);
    }
  }, [addMessage, setIsLoading]);

  const handlePlayTTS = useCallback(async (text: string) => {
    if (!isTTSEnabled) return;

    try {
      await ttsService.playText(text);
    } catch (error) {
      console.error('Error playing TTS:', error);
    }
  }, [isTTSEnabled]);

  useEffect(() => {
    ttsService.setOnPlayingChange(setIsPlaying);

    const initializeConnection = async () => {
      try {
        await connectToStream();
      } catch (error) {
        console.log('SSE not available, falling back to HTTP requests');
      }
    };

    initializeConnection();

    return () => {
      sseService.disconnect();
      ttsService.stop();
    };
  }, [connectToStream, setIsPlaying]);

  return {
    handleSendMessage,
    handlePlayTTS,
    connectToStream,
  };
};