import { useState } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { ChatMessages, type Message } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';

const ChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Como posso ajudar sobre o Bilhete de Identidade?' }
  ]);

  const handleSendMessage = (content: string) => {
    // Adiciona a mensagem do utilizador
    const userMessage: Message = { role: 'user', content };
    
    // Placeholder para a resposta da IA
    const assistantMessage: Message = { role: 'assistant', content: 'Estou a processar a sua pergunta...' };
    setMessages(currentMessages => [...currentMessages, userMessage, assistantMessage]);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-[440px] h-[700px] grid grid-rows-[auto,1fr,auto]">
        <CardHeader>
          <CardTitle>Kamba Legal AI</CardTitle>
        </CardHeader>
        <CardContent className="overflow-y-auto">
          <ChatMessages messages={messages} />
        </CardContent>
        <CardFooter>
          <ChatInput onSendMessage={handleSendMessage} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
