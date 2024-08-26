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

    socketConnection.on('join-room-status', (data) => {
      console.log('Join room status:', data.message);
      console.log('Data received:', data);
      if (data.statusCode === 200 && data.roomId) {
        fetchRoomDetails(data.roomId); // Usamos el roomId recibido desde el servidor
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
    console.log('Fetching room details for roomId:', roomId); // Log para verificar que roomId está presente
    try {
      if (!roomId) {
        console.error('Room ID is undefined');
        return; // Evitar hacer la solicitud si roomId no está definido
      }
      const response = await axiosInstance.get(`/chat/room/${roomId}`);
      if (response.data) {
        console.log('Room details fetched:', response.data); // Log de la respuesta completa del backend
        setCurrentConversation(response.data.messages); // Asigna los mensajes a la conversación actual
      }
    } catch (err) {
      console.error('Failed to fetch room details:', err);
    }
  };

  const joinRoom = (userBId) => {
    if (socket) {
      const roomId = generateRoomId(currentUser, userBId);
      console.log('Attempting to join room:', roomId); // Log antes de emitir el evento
      socket.emit('join-room', { userBId }); // Emitimos el evento sin usar roomId aquí
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
      // Eliminar la actualización manual del estado aquí
    }
  };

  // Función para manejar los nuevos mensajes y normalizarlos
  const handleNewMessage = (message) => {
    if (message.from && message.message) {
      // Mensaje recibido a través de WebSocket
      const normalizedMessage = {
        senderId: message.from._id,
        content: message.message,
        timestamp: new Date().toISOString(),
      };
      updateConversation(normalizedMessage);
    } else {
      // Mensaje ya tiene la estructura correcta
      updateConversation(message);
    }
  };

  const updateConversation = (newMessage) => {
    setCurrentConversation((prevMessages) => [...prevMessages, newMessage]);
  };

  const generateRoomId = (userAId, userBId) => {
    return [userAId, userBId].sort().join('-');
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
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
