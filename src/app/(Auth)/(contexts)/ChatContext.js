'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import axiosInstance from '@/utils/axios';

const ChatContext = createContext();

export const useChat = () => useContext(ChatContext);

export const ChatProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentConversation, setCurrentConversation] = useState([]);
  const [unreadMessages, setUnreadMessages] = useState({});
  const currentUser = Cookies.get('userId');
  const [currentRoomId, setCurrentRoomId] = useState(null);

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

    socketConnection.on('join-room-status', (data) => {
      if (data.statusCode === 200 && data.roomId) {
        setCurrentRoomId(data.roomId); // Set current room ID when joining a room
        fetchRoomDetails(data.roomId);
      }
    });

    socketConnection.on('new-message', (message) => {
      console.log('New message received:', message);
      handleNewMessage(message);
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const fetchRoomDetails = async (roomId) => {
    try {
      if (!roomId) {
        console.error('Room ID is undefined');
        return;
      }
      const response = await axiosInstance.get(`/chat/room/${roomId}`);
      if (response.data) {
        setCurrentConversation(response.data.messages);
      }
    } catch (err) {
      console.error('Failed to fetch room details:', err);
    }
  };

  const joinRoom = (userBId) => {
    if (socket) {
      const roomId = generateRoomId(currentUser, userBId);
      console.log('Attempting to join room:', roomId);
      socket.emit('join-room', { userBId });

      setUnreadMessages((prev) => ({ ...prev, [roomId]: [] }));
      setCurrentRoomId(roomId); // Asegúrate de actualizar currentRoomId al unirse a un room
    }
  };

  const leaveRoom = (userId, userBId) => {
    const roomId = generateRoomId(userId, userBId);

    if (socket && roomId) {
      socket.emit('leave-room', { roomId, userId });
      setCurrentRoomId(null); // Restablece el ID del room actual al salir de un room
    }
  };

  const sendMessage = (userAId, userBId, message) => {
    const roomId = generateRoomId(userAId, userBId);

    if (socket && roomId) {
      // Emite el mensaje al servidor
      socket.emit('send-message', { roomId, message });

      // Actualiza inmediatamente la conversación actual con el nuevo mensaje
      const newMessage = {
        senderId: currentUser,
        content: message,
        timestamp: new Date().toISOString(),
        room: roomId,
      };
      updateConversation(newMessage);
    }
  };

  const handleNewMessage = (message) => {
    const normalizedMessage = {
      senderId: message.senderId || message.from._id,
      content: message.content || message.message,
      timestamp: message.timestamp || new Date().toISOString(),
      room: message.room || generateRoomId(currentUser, message.senderId),
    };

    // Update currentConversation if the message belongs to the current room
    if (normalizedMessage.room === currentRoomId) {
      updateConversation(normalizedMessage);
    } else {
      // Add message to unreadMessages if not in the current room
      if (normalizedMessage.senderId !== currentUser) {
        setUnreadMessages((prev) => ({
          ...prev,
          [normalizedMessage.room]: [
            ...(prev[normalizedMessage.room] || []),
            normalizedMessage,
          ],
        }));
        updateConversation(normalizedMessage);
      }
    }
  };

  const updateConversation = (newMessage) => {
    setCurrentConversation((prevMessages) => [...prevMessages, newMessage]);
  };

  const generateRoomId = (userAId, userBId) => {
    return [userAId, userBId].sort().join('-');
  };

  const isInConversation = (userId) => {
    return selectedUser && selectedUser._id === userId;
  };

  return (
    <ChatContext.Provider
      value={{
        joinRoom,
        leaveRoom,
        sendMessage,
        selectedUser,
        setSelectedUser,
        currentUser,
        currentConversation,
        unreadMessages,
        generateRoomId,
        isInConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
