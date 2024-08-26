import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import { useChat } from '../../(contexts)/ChatContext';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export function Chat() {
  const { selectedUser } = useChat();

  return (
    <div className="flex flex-col justify-between w-full h-full">
      {selectedUser ? (
        <>
          <ChatTopbar />
          <ChatList />
        </>
      ) : (
        <Card className="flex items-center justify-center h-[76vh]">
          <CardContent className="flex flex-col items-center p-6 text-center">
            <MessageSquare className="w-12 h-12 mb-4 text-muted-foreground" />
            <h3 className="mb-2 text-lg font-semibold">No chat selected</h3>
            <p className="text-sm text-muted-foreground">
              Choose a conversation from the sidebar or start a new chat.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
