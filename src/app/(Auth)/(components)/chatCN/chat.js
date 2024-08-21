import React, { useEffect } from 'react';
import ChatTopbar from './chat-topbar';
import { ChatList } from './chat-list';
import { useChat } from '../../(contexts)/ChatContext';

export function Chat({ isMobile }) {
  const {
    selectedConversation,
    handleSelectConversation,
    conversations = [],
    selectedUser,
  } = useChat();

  useEffect(() => {
    if (selectedUser) {
      let existingConversation = conversations.find(
        (conv) => conv.recipientId === selectedUser._id
      );

      if (!existingConversation) {
        const newConversation = {
          conversationId: Date.now().toString(),
          name: selectedUser.name,
          recipientId: selectedUser._id,
          messages: [],
        };
        handleSelectConversation(newConversation);
      } else {
        handleSelectConversation(existingConversation);
      }
    }
  }, [selectedUser, conversations, handleSelectConversation]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <ChatTopbar />

      <ChatList
        messages={selectedConversation?.messages || []}
        isMobile={isMobile}
      />
    </div>
  );
}
