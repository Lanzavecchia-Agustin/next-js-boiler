'use client';

import React from 'react';
import { useUsersQuery } from '../hooks/useUsersQuery';
import UserCard from '../(components)/UserCard';
import { useChat } from '../(contexts)/ChatContext';

export default function UsersPage() {
  const { data } = useUsersQuery();

  const { handleSelectConversation, conversations } = useChat();

  const startChat = (user) => {
    const existingConversation = conversations.find(
      (conv) => conv.recipientId === user.id
    );

    if (existingConversation) {
      handleSelectConversation(existingConversation);
    } else {
      const newConversation = {
        conversationId: Date.now().toString(),
        name: user.name,
        recipientId: user.id,
        messages: [],
        timestamp: new Date().toLocaleTimeString(),
        isRead: true,
      };
      handleSelectConversation(newConversation);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data?.data?.map((user) => (
        <UserCard key={user.id} user={user} startChat={startChat} />
      ))}
    </div>
  );
}
