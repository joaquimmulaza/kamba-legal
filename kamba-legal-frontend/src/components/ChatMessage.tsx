// src/components/ChatMessage.tsx
import { cn } from "../lib/utils";
interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
}
export function ChatMessage({ role, content }: ChatMessageProps) {
  return (
    <div className={cn(
      'mb-4 flex',
      role === 'user' ? 'justify-end' : 'justify-start'
    )}>
      <div className={cn(
        'rounded-lg px-4 py-2 text-white',
        role === 'user' ? 'bg-blue-600' : 'bg-gray-700'
      )}>
        <p>{content}</p>
      </div>
    </div>
  );
}
