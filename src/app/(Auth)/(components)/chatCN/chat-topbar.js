import React from 'react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Info, Phone, Video } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { useChat } from '../../(contexts)/ChatContext';
import { AvatarFallback } from '@radix-ui/react-avatar';

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar() {
  const { selectedUser } = useChat();

  return (
    <div className="flex items-center justify-between w-full h-20 p-4 border-b">
      <div className="flex items-center gap-2">
        {/* <Avatar className="flex items-center justify-center">
          <AvatarImage
            src={selectedUser?.avatar}
            alt={selectedUser?.name}
            width={6}
            height={6}
            className="w-10 h-10 "
          />
        </Avatar> */}
        <Avatar className="flex items-center justify-center bg-secondary">
          <AvatarImage
            src={selectedUser?.avatar}
            alt={selectedUser?.name}
            className="w-10 h-10 "
          />
          {!selectedUser?.avatar && (
            <AvatarFallback>
              {selectedUser?.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          )}
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium">{selectedUser?.name}</span>
          <span className="text-xs">Active 2 mins ago</span>
        </div>
      </div>

      <div>
        {TopbarIcons.map((icon, index) => (
          <Link
            key={index}
            href="#"
            className={cn(
              buttonVariants({ variant: 'ghost', size: 'icon' }),
              'h-9 w-9',
              'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
            )}
          >
            <icon.icon size={20} className="text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  );
}
