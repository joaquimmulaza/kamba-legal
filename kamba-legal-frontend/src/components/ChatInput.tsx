// src/components/ChatInput.tsx
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendHorizontal } from "lucide-react";
export function ChatInput() {
  return (
    <form className="flex items-center p-4">
      <Input className="flex-1 mr-2" placeholder="Escreva a sua pergunta..." />
      <Button type="submit" size="icon">
        <SendHorizontal className="h-4 w-4" />
      </Button>
    </form>
  );
}
