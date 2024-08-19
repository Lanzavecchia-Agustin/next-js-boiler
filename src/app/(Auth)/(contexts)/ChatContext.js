import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useWebSocket } from './WebSocket';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const {
    joinRoom,
    sendMessage: sendSocketMessage,
    socket,
    isConnected,
  } = useWebSocket();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [conversations, setConversations] = useState([]);
  const userId = Cookies.get('userId');

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsMessengerOpen(true);

    if (window.innerWidth < 640) {
      setIsExpanded(false);
    }

    if (isConnected && socket) {
      // Join the room for the selected conversation
      joinRoom(userId, conversation.recipientId);

      // Listen for the server's response here
      socket.on('join-room-success', (roomData) => {
        console.log('Room joined successfully:', roomData);
        // Update your state with the room's messages or other data if necessary
      });
    }
  };

  const handleCloseMessenger = () => {
    setIsMessengerOpen(false);
  };

  const sendMessage = (conversationId, content) => {
    if (!selectedConversation) return;

    const newMessage = {
      messageId: Date.now().toString(),
      senderId: userId,
      recipientId: selectedConversation.recipientId,
      timestamp: new Date().toLocaleTimeString(),
      content,
      status: 'delivered',
      type: 'text',
    };

    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.conversationId === conversationId
          ? {
              ...conv,
              messages: [...conv.messages, newMessage],
            }
          : conv
      )
    );

    // Send the message via WebSocket
    if (isConnected && socket) {
      sendSocketMessage(newMessage);
    }
  };

  const handleIsExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <ChatContext.Provider
      value={{
        userId,
        selectedConversation,
        isMessengerOpen,
        isExpanded,
        conversations,
        handleIsExpanded,
        handleCloseMessenger,
        handleSelectConversation,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
