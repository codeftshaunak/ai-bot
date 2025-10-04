const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

export class SSEService {
  private eventSource: EventSource | null = null;
  private listeners: Map<string, (data: any) => void> = new Map();

  connect(endpoint: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.eventSource = new EventSource(`${API_BASE_URL}${endpoint}`);

        this.eventSource.onopen = () => {
          console.log('SSE connection opened');
          resolve();
        };

        this.eventSource.onerror = (error) => {
          console.error('SSE connection error:', error);
          reject(error);
        };

        this.eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.listeners.forEach((listener) => listener(data));
          } catch (error) {
            console.error('Error parsing SSE data:', error);
          }
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  addListener(id: string, callback: (data: any) => void) {
    this.listeners.set(id, callback);
  }

  removeListener(id: string) {
    this.listeners.delete(id);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
    this.listeners.clear();
  }

  isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN;
  }
}

export const sendMessage = async (message: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const sseService = new SSEService();