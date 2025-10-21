// src/components/ChatInput.tsx
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatInput({ onSendMessage, isLoading }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full space-x-2">
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="flex-1"
        placeholder="Escreva a sua pergunta..."
        disabled={isLoading}
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}
