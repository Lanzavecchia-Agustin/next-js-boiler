'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const currentUser = Cookies.get('userId');

  useEffect(() => {
    const token = Cookies.get('token');
    const socketConnection = io('http://localhost:3001/chat', {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    setSocket(socketConnection);

    socketConnection.on('connection-status', (data) => {
      console.log('Connection status:', data.message);
    });

    socketConnection.on('new-message', (message) => {
      console.log('New message received:', message);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const joinRoom = (userBId) => {
    console.log('Joining room with userBId:', userBId);
    if (socket) {
      socket.emit('join-room', { userBId });
    }
  };

  const leaveRoom = (userId, userBId) => {
    const roomId = generateRoomId(userId, userBId);

    if (socket && roomId) {
      socket.emit('leave-room', { roomId, userId });
    }
  };

  const sendMessage = (userAId, userBId, message) => {
    const roomId = generateRoomId(userAId, userBId);

    if (socket && roomId) {
      socket.emit('send-message', { roomId, message });
    }
  };

  const generateRoomId = (userAId, userBId) => {
    return [userAId, userBId].sort().join('-');
  };

  const handleSelectConversation = () => {
    return;
  };

  return (
    <ChatContext.Provider
      value={{
        joinRoom,
        leaveRoom,
        sendMessage,
        handleSelectConversation,
        selectedUser,
        setSelectedUser,
        currentUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
