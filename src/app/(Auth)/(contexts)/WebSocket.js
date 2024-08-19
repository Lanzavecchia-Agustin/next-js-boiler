import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext(null);

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};

export const WebSocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const socket = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socket.current = io('localhost:3001/chat');

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket server');
      setIsConnected(true); // Mark connection as established
    });

    socket.current.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
      setIsConnected(false); // Mark connection as disconnected
    });

    return () => {
      // Cleanup the socket connection on component unmount
      socket.current.disconnect();
    };
  }, []);

  const joinRoom = (userAId, userBId) => {
    if (isConnected && socket.current) {
      const roomId = `room-${userAId}-${userBId}`;
      socket.current.emit('join-room', { userAId, userBId });
    }
  };

  const sendMessage = (message) => {
    if (isConnected && socket.current) {
      socket.current.emit('send-message', message);
    }
  };

  return (
    <WebSocketContext.Provider
      value={{ socket: socket.current, joinRoom, sendMessage, isConnected }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
