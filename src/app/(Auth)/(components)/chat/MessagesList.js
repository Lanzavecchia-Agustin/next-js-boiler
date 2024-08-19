'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useState } from 'react';
import MessagesListLayout from './MessagesListLayout';

export default function MessagesList({
  onSelectConversation,
  setIsMessengerOpen,
  isExpanded,
  setIsExpanded,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredConversations, setFilteredConversations] = useState([]);

  const conversations = [
    {
      conversationId: '1',
      name: 'Jared Palmer',
      messages: [
        {
          messageId: 'm1',
          senderId: '1',
          recipientId: '2',
          timestamp: '10:30 AM',
          content: "Hey, how's it going?",
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm4',
          senderId: '1',
          recipientId: '2',
          timestamp: '10:31 AM',
          content: 'I need your help with this project.',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm2',
          senderId: '2',
          recipientId: '1',
          timestamp: '10:32 AM',
          content: "I'm good! How about you?",
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm5',
          senderId: '2',
          recipientId: '1',
          timestamp: '10:32 AM',
          content: 'yeah i can help you',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm6',
          senderId: '2',
          recipientId: '1',
          timestamp: '10:32 AM',
          content: 'Whats its about?',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm3',
          senderId: '1',
          recipientId: '2',
          timestamp: '10:35 AM',
          content: "I'm great, thanks for asking.",
          status: 'delivered',
          type: 'text',
        },
      ],
      timestamp: '10:35 AM',
      isRead: true,
    },
    {
      conversationId: '2',
      name: 'John Doe',
      messages: [
        {
          messageId: 'm4',
          senderId: '3',
          recipientId: '1',
          timestamp: 'Yesterday',
          content: "Let's catch up later.",
          status: 'read',
          type: 'text',
        },
      ],
      timestamp: 'Yesterday',
      isRead: false,
    },
    {
      conversationId: '3',
      name: 'Jane Smith',
      messages: [
        {
          messageId: 'm5',
          senderId: '4',
          recipientId: '1',
          timestamp: '2 days ago',
          content: "How's the project going?",
          status: 'read',
          type: 'text',
        },
      ],
      timestamp: '2 days ago',
      isRead: true,
    },
  ];

  const contacts = [
    { id: '4', name: 'Alice Johnson' },
    { id: '5', name: 'Bob Brown' },
  ];
  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (query === '') {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter((conv) =>
        conv.name.toLowerCase().includes(query)
      );
      setFilteredConversations(filtered);
    }
  };

  const handleSelectConversation = (conversation) => {
    onSelectConversation(conversation);
    setIsMessengerOpen(true);

    if (window.innerWidth < 640) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleStartNewChat = () => {
    const contact = contacts.find((c) =>
      c.name.toLowerCase().includes(searchQuery)
    );
    if (contact) {
      const newConversation = {
        conversationId: Date.now().toString(),
        name: contact.name,
        messages: [],
        timestamp: '',
        isRead: true,
      };
      handleSelectConversation(newConversation);
    } else {
      alert('No contacts found with that name.');
    }
  };

  const filteredList =
    searchQuery === '' ? conversations : filteredConversations;

  return (
    <MessagesListLayout isExpanded={isExpanded}>
      <Button
        onClick={toggleExpand}
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
        <div className="p-2 border-t">
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="mb-2 text-primary-foreground"
          />
          <ScrollArea className="h-[480px] p-2  text-background">
            <div className="grid gap-4">
              {filteredList.length > 0 ? (
                filteredList.map((conv) => (
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
          {filteredList.length === 0 && (
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
