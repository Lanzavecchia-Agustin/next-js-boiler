'use client';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import ChatLayout from './ChatLayout';
import { useChat } from '../../(contexts)/ChatContext';
import { useState } from 'react';

export default function Messenger({ conversation, onClose }) {
  const { userId, sendMessage, isExpanded } = useChat();
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = () => {
    if (messageContent.trim()) {
      sendMessage(conversation.conversationId, messageContent);
      setMessageContent('');
    }
  };

  return (
    <ChatLayout isExpanded={isExpanded}>
      <header className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-4 ">
          <Avatar className="w-8 h-8 bg-white text-primary sm:h-10 sm:w-10">
            <AvatarImage alt={conversation.name} />
            <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium ">{conversation.name}</div>
            <div className="text-sm text-muted-foreground">Online</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground"
          onClick={onClose}
        >
          <CloseIcon className="w-4 h-4" />
          <span className="sr-only">Close chat</span>
        </Button>
      </header>
      <div className="flex-1 p-3 overflow-auto ">
        <div className="grid gap-2">
          {conversation.messages.map((msg, index) => {
            const isLastInGroup =
              index === conversation.messages.length - 1 ||
              conversation.messages[index + 1].senderId !== msg.senderId;

            return (
              <div
                key={msg.messageId}
                className={`flex gap-2 -mt-2 ${
                  msg.senderId === userId && 'flex-row-reverse '
                } ${isLastInGroup ? 'mb-4' : 'mb-1'} items-end `}
              >
                <div
                  className={`grid gap-1 p-3 text-sm rounded-md max-w-xs ${
                    msg.senderId === userId
                      ? 'bg-primary text-primary-foreground text-right'
                      : 'bg-muted text-left'
                  }`}
                >
                  <p>{msg.content}</p>
                  <div className="text-xs text-muted-foreground">
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="relative">
        <Textarea
          placeholder="Type your message..."
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          className="min-h-[48px] w-full resize-none rounded-2xl border border-neutral-400 bg-primary p-4 pr-16 shadow-sm text-primary-foreground"
        />
        <Button
          type="submit"
          size="icon"
          onClick={handleSendMessage}
          className="absolute right-3 top-3"
        >
          <SendIcon className="w-4 h-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </ChatLayout>
  );
}

function CloseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function SendIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
