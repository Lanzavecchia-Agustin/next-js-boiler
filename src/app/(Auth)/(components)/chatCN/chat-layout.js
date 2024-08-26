'use client';

import React, { useEffect, useState } from 'react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import { cn } from '@/lib/utils';
import { Sidebar } from './sidebar';
import { Chat } from './chat';
import { useUsersQuery } from '../../hooks/useUsersQuery';
import { useChat } from '../../(contexts)/ChatContext';

export function ChatLayout({
  defaultLayout = [320, 480],
  defaultCollapsed = false,
  navCollapsedSize,
}) {
  const { data } = useUsersQuery();
  const { joinRoom, selectedUser, setSelectedUser } = useChat();
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenWidth();
    window.addEventListener('resize', checkScreenWidth);
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  const handleUserSelect = (selectedUserFromChats) => {
    setSelectedUser(selectedUserFromChats);

    joinRoom(selectedUserFromChats._id);
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="items-stretch h-full"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 24}
        maxSize={isMobile ? 8 : 30}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed &&
            'min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out'
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          conversationsList={data?.data?.map((user) => ({
            _id: user._id,
            name: user.name,
            messages: user.messages ?? [],
            avatar: user.picture,
            variant: selectedUser?.name === user.name ? 'grey' : 'ghost',
          }))}
          isMobile={isMobile}
          onUserSelect={handleUserSelect}
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
        <Chat isMobile={isMobile} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
