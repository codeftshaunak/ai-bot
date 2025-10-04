# AI Chat Demo

A modern, responsive AI chat web application built with React, TypeScript, and TailwindCSS. Features real-time messaging, text-to-speech functionality, and a clean, interactive UI.

## 🚀 Features

- **Real-time Chat**: SSE (Server-Sent Events) and WebSocket support for live messaging
- **Text-to-Speech**: Integrated TTS functionality with fallback to browser speech synthesis
- **Responsive Design**: Clean, modern UI that works on desktop and mobile
- **Avatar Section**: Interactive AI assistant status display
- **Smooth Animations**: Fade-in effects and typing indicators
- **TypeScript**: Full type safety throughout the application
- **State Management**: Zustand for efficient state management

## 🛠️ Tech Stack

- **Frontend**: React 18 + Vite + TypeScript
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Real-time**: Server-Sent Events (SSE)

## 📦 Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ai-chat-demo
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Start the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

- `VITE_API_BASE_URL`: Backend API base URL (default: `http://localhost:3001`)
- `VITE_ENABLE_TTS`: Enable/disable TTS functionality (default: `true`)
- `VITE_ENABLE_SSE`: Enable/disable SSE connection (default: `true`)

### Backend API Requirements

The application expects the following backend endpoints:

1. **Chat Endpoint**: `POST /api/chat`
   - Body: `{ message: string }`
   - Response: `{ message: string }`

2. **SSE Stream**: `GET /api/stream`
   - Sends events with: `{ type: 'message' | 'typing', content?: string, isTyping?: boolean }`

3. **TTS Endpoint**: `POST /api/tts`
   - Body: `{ text: string }`
   - Response: Audio blob

## 🚀 Deployment

### Vercel

1. Connect your repository to Vercel
2. The `vercel.json` configuration is already set up
3. Deploy with automatic builds

### Netlify

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ChatContainer.tsx    # Main chat interface
│   ├── ChatMessage.tsx      # Individual message component
│   ├── ChatInput.tsx        # Message input component
│   ├── TypingIndicator.tsx  # Typing animation
│   └── AvatarSection.tsx    # AI avatar and status
├── hooks/              # Custom React hooks
│   └── useChat.ts          # Chat functionality hook
├── services/           # API and external services
│   ├── apiService.ts       # SSE and HTTP API calls
│   └── ttsService.ts       # Text-to-speech service
├── store/              # State management
│   └── chatStore.ts        # Zustand chat store
├── types/              # TypeScript type definitions
│   └── index.ts           # Shared types
└── utils/              # Utility functions
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom themes
- Update `src/index.css` for custom animations
- Component styles use TailwindCSS utility classes

### Features
- Add new message types in `src/types/index.ts`
- Extend the chat store in `src/store/chatStore.ts`
- Add new API endpoints in `src/services/apiService.ts`

## 🔍 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Components

1. **ChatContainer**: Main layout with message list and input
2. **ChatMessage**: Individual message rendering with TTS button
3. **ChatInput**: Message composition with send functionality
4. **AvatarSection**: AI status display and metadata
5. **useChat**: Hook managing all chat functionality

## 📝 License

MIT License - feel free to use this project for your own applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For questions or issues, please open an issue in the repository.
