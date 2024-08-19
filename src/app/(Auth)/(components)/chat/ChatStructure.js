import MessagesList from './MessagesList';
import Messenger from './Chat';
import { useChat } from '../../(contexts)/ChatContext';

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
          <Messenger
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
