import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (content: string) => {
      // A chamada à API real acontecerá aqui.
      // Por agora, vamos simular uma resposta do backend.
      const response = await axios.post('https://api.kambalegal.com/chat', { prompt: content });
      return response.data;
    },
    onSuccess: (data) => {
      // Quando a API responder com sucesso, adicionamos a resposta da IA.
      const assistantMessage: Message = { role: 'assistant', content: data.response };

      // Substitui a mensagem "a pensar..." pela resposta real.
      setMessages(currentMessages => {
        const newMessages = [...currentMessages];
        newMessages[newMessages.length - 1] = assistantMessage;
        return newMessages;
      });
    },
    onError: (error) => {
      // Em caso de erro, informa o utilizador.
      console.error("Erro ao contactar a API:", error);
      const errorMessage: Message = { role: 'assistant', content: 'Desculpe, ocorreu um erro. Tente novamente mais tarde.' };
      setMessages(currentMessages => {
        const newMessages = [...currentMessages];
        newMessages[newMessages.length - 1] = errorMessage;
        return newMessages;
      });
    }
  });

  const handleSendMessage = (content: string) => {
    const userMessage: Message = { role: 'user', content };
    const thinkingMessage: Message = { role: 'assistant', content: 'A pensar...' };

    // Adiciona a mensagem do user e a mensagem de "a pensar..."
    setMessages(currentMessages => [...currentMessages, userMessage, thinkingMessage]);
    // Chama a mutação para enviar a mensagem para o backend
    sendMessage(content);
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
          <ChatInput onSendMessage={handleSendMessage} isLoading={isPending} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
