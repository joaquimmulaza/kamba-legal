// src/components/ChatInput.tsx
import { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!inputValue.trim()) return;
    
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
      />
      <Button type="submit" size="icon">
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}
