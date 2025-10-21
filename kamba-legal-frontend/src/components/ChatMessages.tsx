// src/components/ChatMessages.tsx
import { ChatMessage } from "./ChatMessage";

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <div className="flex-1 space-y-4 p-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
