'use client';

import { cn } from '@/lib/utils';
import React, { useRef } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import ChatBottombar from './chat-bottombar';
import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from '../../(contexts)/ChatContext';

export function ChatList({ isMobile }) {
  const messagesContainerRef = useRef(null);
  const { selectedUser, currentUser, currentConversation } = useChat();

  console.log('currentConversation:', currentConversation);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [currentConversation]);

  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  return (
    <div className="flex flex-col w-full h-[80vh] overflow-x-hidden overflow-y-auto">
      <div
        ref={messagesContainerRef}
        className="flex flex-col w-full h-full overflow-x-hidden overflow-y-auto"
      >
        <AnimatePresence>
          {currentConversation.map((message, index) => (
            <motion.div
              key={message._id || index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: 'spring',
                  bounce: 0.3,
                  duration: index * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                'flex flex-col gap-2 p-4 whitespace-pre-wrap',
                message.senderId === currentUser ? 'items-end' : 'items-start'
              )}
            >
              <div className="flex items-center gap-3">
                {message.senderId !== currentUser && (
                  <Avatar className="flex items-center justify-center bg-slate-300">
                    {message.avatar ? (
                      <AvatarImage
                        src={message.avatar}
                        alt={selectedUser.name}
                        width={6}
                        height={6}
                      />
                    ) : (
                      <AvatarFallback>
                        {getInitial(selectedUser?.name || '')}
                      </AvatarFallback>
                    )}
                  </Avatar>
                )}
                <span className="max-w-xs p-3 rounded-md bg-accent">
                  {message.content}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar isMobile={isMobile} />
    </div>
  );
}
