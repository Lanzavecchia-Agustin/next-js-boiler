'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import MessagesListLayout from './MessagesListLayout';
import { useChat } from '../../(contexts)/ChatContext';

export default function MessagesList() {
  const {
    isExpanded,
    handleIsExpanded,
    searchQuery,
    filteredConversations,
    handleSearchChange,
    handleSelectConversation,
    handleStartNewChat,
  } = useChat();

  return (
    <MessagesListLayout isExpanded={isExpanded}>
      <Button
        onClick={handleIsExpanded}
        variant="outline"
        className={`flex items-center justify-center p-2 border-b cursor-pointer ${
          isExpanded ? 'w-full p-6' : 'w-full'
        }`}
      >
        {!isExpanded ? (
          <Avatar className="w-8 h-8 sm:h-5 sm:w-5">
            <AvatarImage alt="John Doe" />
            <AvatarFallback>M</AvatarFallback>
          </Avatar>
        ) : (
          <>
            <Avatar className="w-8 h-8 mr-4 sm:h-10 sm:w-10 bg-primary">
              <AvatarImage alt="John Doe" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            Messages
          </>
        )}
      </Button>
      {isExpanded && (
        <div className="p-2 border-t ">
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="mb-2 text-primary"
          />
          <ScrollArea className="h-[480px] p-2  text-background">
            <div className="grid gap-4">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <div
                    key={conv.conversationId}
                    className={`flex items-center gap-4 cursor-pointer p-2 ${
                      !conv.isRead ? 'bg-gray-400 text-primary-foreground' : ''
                    }`}
                    onClick={() => handleSelectConversation(conv)}
                  >
                    <Avatar className="text-primary sm:h-10 sm:w-10">
                      <AvatarImage alt={conv.name} />
                      <AvatarFallback>{conv.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between font-medium text-primary-foreground">
                        <span>{conv.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {conv.timestamp}
                        </span>
                      </div>
                      <p
                        className={`text-sm text-primary-foreground ${
                          conv.isRead
                            ? 'text-muted-foreground'
                            : 'text-primary font-bold'
                        }`}
                      >
                        {conv.messages[conv.messages.length - 1]?.content ||
                          'Start a new conversation'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  No conversations found.
                </div>
              )}
            </div>
          </ScrollArea>
          {filteredConversations.length === 0 && searchQuery && (
            <div className="flex justify-center p-4">
              <Button onClick={handleStartNewChat}>
                Start a New Chat with "{searchQuery}"
              </Button>
            </div>
          )}
        </div>
      )}
    </MessagesListLayout>
  );
}
