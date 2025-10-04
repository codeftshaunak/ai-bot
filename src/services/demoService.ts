const DEMO_RESPONSES = [
  "Hello! I'm an AI assistant powered by advanced language models. I can help you with questions, creative tasks, analysis, coding, and much more. What would you like to explore today?",

  "That's a fascinating question! Let me break this down for you:\n\n• First, consider the context and background\n• Then we can explore the main concepts\n• Finally, I'll provide practical insights\n\nWhat specific aspect interests you most?",

  "I understand what you're asking. Here's what I can tell you:\n\nBased on current research and developments, this topic involves several key factors that we should consider. Would you like me to dive deeper into any particular area?",

  "Great question! AI technology has been advancing rapidly:\n\n🚀 Machine Learning: Becoming more sophisticated\n🧠 Neural Networks: Processing complex patterns\n💡 Applications: Expanding across industries\n🌐 Accessibility: More tools becoming available\n\nWhat aspects of AI interest you most?",

  "I'm here to help with any questions you might have! Some things I excel at:\n\n✨ Creative writing and brainstorming\n📊 Data analysis and explanations\n💻 Code review and programming help\n🎓 Learning and educational support\n🤔 Problem-solving and decision making\n\nFeel free to ask me anything!",

  "That's a complex topic with multiple dimensions. Let me break it down:\n\n1. **Background Context**: Understanding the fundamentals\n2. **Current State**: Where we are today\n3. **Key Challenges**: What obstacles exist\n4. **Future Outlook**: Potential developments\n\nWhich area would you like to explore first?",

  "I appreciate you asking! Here's my perspective:\n\nThis involves balancing multiple considerations and approaches. The key is finding the right strategy that works for your specific situation. \n\nWould you like me to provide more specific guidance based on your particular context?",

  "Thanks for the engaging conversation! 🎉\n\nI hope I've been helpful. If you have more questions or want to explore other topics, I'm here and ready to assist. \n\nIs there anything else you'd like to know or discuss?"
];

export const getDemoResponse = (userMessage: string): string => {
  const messageWords = userMessage.toLowerCase().split(' ');
  const message = userMessage.toLowerCase();

  // Greeting responses
  if (messageWords.includes('hello') || messageWords.includes('hi') || messageWords.includes('hey')) {
    return "Hello! 👋 I'm an AI assistant powered by advanced language models. I can help you with questions, creative tasks, analysis, coding, and much more. What would you like to explore today?";
  }

  // Coding/Programming related
  if (messageWords.includes('code') || messageWords.includes('programming') || messageWords.includes('javascript') || messageWords.includes('python') || messageWords.includes('react')) {
    return "I'd love to help with coding! 💻\n\nI can assist with:\n• Code review and debugging\n• Best practices and patterns\n• Framework-specific questions\n• Algorithm explanations\n• Project architecture advice\n\nWhat specific programming challenge are you working on?";
  }

  // AI/Technology related
  if (messageWords.includes('ai') || messageWords.includes('artificial') || messageWords.includes('machine') || messageWords.includes('learning')) {
    return "Great question about AI! 🤖\n\nAI technology has been advancing rapidly:\n\n🚀 Machine Learning: Becoming more sophisticated\n🧠 Neural Networks: Processing complex patterns\n💡 Applications: Expanding across industries\n🌐 Accessibility: More tools becoming available\n\nWhat aspects of AI interest you most?";
  }

  // How/What questions
  if (message.includes('how') || message.includes('what') || message.includes('why') || message.includes('explain')) {
    return "That's a fascinating question! Let me break this down for you:\n\n• First, consider the context and background\n• Then we can explore the main concepts\n• Finally, I'll provide practical insights\n\nWhat specific aspect interests you most?";
  }

  // Thank you responses
  if (messageWords.includes('thank') || messageWords.includes('thanks')) {
    return "You're very welcome! 😊 I'm glad I could help. Is there anything else you'd like to explore or discuss?";
  }

  // Goodbye responses
  if (messageWords.includes('bye') || messageWords.includes('goodbye') || messageWords.includes('see you')) {
    return "Goodbye! 👋 It was great chatting with you. Feel free to come back anytime if you have more questions!";
  }

  // Help requests
  if (messageWords.includes('help') || messageWords.includes('assist') || messageWords.includes('support')) {
    return "I'm here to help! ✨ Some things I excel at:\n\n📝 Creative writing and brainstorming\n📊 Data analysis and explanations\n💻 Code review and programming help\n🎓 Learning and educational support\n🤔 Problem-solving and decision making\n\nWhat would you like assistance with?";
  }

  // Default responses - pick a random one
  const randomIndex = Math.floor(Math.random() * DEMO_RESPONSES.length);
  return DEMO_RESPONSES[randomIndex];
};

export const simulateTypingDelay = (text: string): number => {
  const baseDelay = 500;
  const wordsPerMinute = 150;
  const words = text.split(' ').length;
  const typingTime = (words / wordsPerMinute) * 60 * 1000;
  return Math.min(baseDelay + typingTime, 3000);
};