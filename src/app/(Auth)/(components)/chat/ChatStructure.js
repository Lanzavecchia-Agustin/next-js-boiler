import MessagesList from './MessagesList';
import { useChat } from '../../(contexts)/ChatContext';
import Chat from './Chat';

export default function ChatStructure() {
  const {
    selectedConversation,
    isMessengerOpen,
    isExpanded,
    handleCloseMessenger,
  } = useChat();

  return (
    <div className="relative">
      <div className="fixed z-50 flex items-end justify-end">
        {isMessengerOpen && (
          <Chat
            isExpanded={isExpanded}
            conversation={selectedConversation}
            onClose={handleCloseMessenger}
          />
        )}
        <MessagesList />
      </div>
    </div>
  );
}
