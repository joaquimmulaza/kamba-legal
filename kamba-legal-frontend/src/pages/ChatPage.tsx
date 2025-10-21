import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';

const ChatPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-2xl flex flex-col h-[80vh]">
        <CardHeader>
          <CardTitle>Kamba Legal Chat</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto">
          <ChatMessages />
        </CardContent>
        <CardFooter>
          <ChatInput />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatPage;
