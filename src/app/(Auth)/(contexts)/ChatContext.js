import Cookies from 'js-cookie';
import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const useChat = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }) => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState([
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
          messageId: 'm2',
          senderId: '2',
          recipientId: '1',
          timestamp: '10:31 AM',
          content: "I'm good! How about you?",
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm3',
          senderId: '1',
          recipientId: '2',
          timestamp: '10:32 AM',
          content: "I'm doing well, thanks!",
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm4',
          senderId: '2',
          recipientId: '1',
          timestamp: '10:33 AM',
          content: 'Great to hear!',
          status: 'read',
          type: 'text',
        },
      ],
      timestamp: '10:35 AM',
      isRead: false,
    },
    {
      conversationId: '2',
      name: 'John Doe',
      messages: [
        {
          messageId: 'm5',
          senderId: '1',
          recipientId: '3',
          timestamp: '9:15 AM',
          content: 'Hey John, are you coming to the meeting later?',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm6',
          senderId: '3',
          recipientId: '1',
          timestamp: '9:17 AM',
          content: 'Yes, I’ll be there in 10 minutes.',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm7',
          senderId: '1',
          recipientId: '3',
          timestamp: '9:18 AM',
          content: 'Perfect, see you soon!',
          status: 'read',
          type: 'text',
        },
      ],
      timestamp: '9:18 AM',
      isRead: true,
    },
    {
      conversationId: '3',
      name: 'Jane Smith',
      messages: [
        {
          messageId: 'm8',
          senderId: '1',
          recipientId: '4',
          timestamp: 'Yesterday 3:45 PM',
          content: 'Hi Jane, did you finish the report?',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm9',
          senderId: '4',
          recipientId: '1',
          timestamp: 'Yesterday 3:50 PM',
          content: 'Yes, I just sent it to your email.',
          status: 'read',
          type: 'text',
        },
        {
          messageId: 'm10',
          senderId: '1',
          recipientId: '4',
          timestamp: 'Yesterday 3:52 PM',
          content: 'Got it, thanks!',
          status: 'read',
          type: 'text',
        },
      ],
      timestamp: 'Yesterday 3:52 PM',
      isRead: true,
    },
  ]);

  const [contacts, setContacts] = useState([
    { id: '4', name: 'Alice Johnson' },
    { id: '5', name: 'Bob Brown' },
  ]);

  const userId = Cookies.get('userId');

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsMessengerOpen(true);

    if (window.innerWidth < 640) {
      setIsExpanded(false);
    }
  };

  const handleCloseMessenger = () => {
    setIsMessengerOpen(false);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleIsExpanded = () => {
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
      setConversations([...conversations, newConversation]);
      handleSelectConversation(newConversation);
    } else {
      alert('No contacts found with that name.');
    }
  };

  const sendMessage = (conversationId, content) => {
    const newMessage = {
      messageId: Date.now().toString(),
      senderId: userId,
      recipientId: selectedConversation ? selectedConversation.recipientId : '',
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
  };

  const filteredConversations = searchQuery
    ? conversations.filter((conv) =>
        conv.name.toLowerCase().includes(searchQuery)
      )
    : conversations;

  return (
    <ChatContext.Provider
      value={{
        userId,
        selectedConversation,
        isMessengerOpen,
        isExpanded,
        searchQuery,
        filteredConversations,
        handleCloseMessenger,
        handleSelectConversation,
        handleIsExpanded,
        handleSearchChange,
        handleStartNewChat,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
