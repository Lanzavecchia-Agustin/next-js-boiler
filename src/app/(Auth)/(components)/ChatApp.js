import { useState } from 'react';
import MessagesList from './chat/MessagesList';
import Messenger from './chat/Chat';

export default function ChatApp() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setIsMessengerOpen(true);
  };

  const handleCloseMessenger = () => {
    setIsMessengerOpen(false);
  };

  return (
    <div className="relative">
      <div className="fixed z-50 flex items-end justify-end ">
        {isMessengerOpen && (
          <Messenger
            isExpanded={isExpanded}
            conversation={selectedConversation}
            onClose={handleCloseMessenger}
          />
        )}
        <MessagesList
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          onSelectConversation={handleSelectConversation}
          setIsMessengerOpen={setIsMessengerOpen}
        />
      </div>
    </div>
  );
}
