// src/components/ChatMessages.tsx
import { ChatMessage } from "./ChatMessage";
export function ChatMessages() {
  // Por enquanto, usaremos dados estáticos para visualizar a UI.
  const messages = [
    { role: 'assistant', content: 'Olá! Como posso ajudar sobre o Bilhete de Identidade?' },
    { role: 'user', content: 'Quanto custa para tratar o BI pela primeira vez?' }
  ] as const;
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <ChatMessage key={index} role={msg.role} content={msg.content} />
      ))}
    </div>
  );
}
