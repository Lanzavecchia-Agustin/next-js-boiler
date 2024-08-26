import Link from 'next/link';
import { MoreHorizontal, SquarePen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useChat } from '../../(contexts)/ChatContext'; // Importa el hook

export function Sidebar({ conversationsList, isCollapsed, onUserSelect }) {
  const {
    unreadMessages,
    currentUser,
    generateRoomId,
    selectedUser,
    isInConversation,
  } = useChat();

  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2"
    >
      {!isCollapsed && (
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2 text-2xl">
            <p className="font-medium">Chats</p>
            <span className="text-zinc-300">({conversationsList?.length})</span>
          </div>

          <div>
            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9'
              )}
            >
              <MoreHorizontal size={20} />
            </Link>

            <Link
              href="#"
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                'h-9 w-9'
              )}
            >
              <SquarePen size={20} />
            </Link>
          </div>
        </div>
      )}
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {conversationsList?.map((user, index) => {
          const roomId = generateRoomId(user._id, currentUser);
          const unreadMessagesForRoom = unreadMessages[roomId] || [];
          const hasUnreadMessages = unreadMessagesForRoom.length > 0;
          const lastUnreadMessage = hasUnreadMessages
            ? unreadMessagesForRoom[unreadMessagesForRoom.length - 1].content
            : '';

          // Check if the user is currently in a conversation with this user
          const isActiveConversation = isInConversation(user._id);

          return isCollapsed ? (
            <TooltipProvider key={index}>
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    onClick={() => onUserSelect(user)}
                    className={cn(
                      buttonVariants({ variant: user.variant, size: 'icon' }),
                      'h-11 w-11 md:h-16 md:w-16',
                      user.variant === 'grey' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white'
                    )}
                  >
                    <Avatar className="flex items-center justify-center">
                      <AvatarImage
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 "
                      />
                      <AvatarFallback>
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {!isActiveConversation && hasUnreadMessages && (
                      <span className="badge">!</span>
                    )}
                    <span className="sr-only">{user.name}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {user.name}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              key={index}
              href="#"
              onClick={() => onUserSelect(user)}
              className={cn(
                buttonVariants({ variant: user.variant, size: 'xl' }),
                user.variant === 'grey' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start gap-4',
                !isActiveConversation && hasUnreadMessages
                  ? 'bg-muted light:text-black hover:bg-muted hover:text-black dark:hover:text-white'
                  : ''
              )}
            >
              <Avatar className="flex items-center justify-center">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  className="w-10 h-10 "
                />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col max-w-28">
                <span>{user.name}</span>
                {!isActiveConversation && lastUnreadMessage && (
                  <p className="text-xs font-bold underline truncate text-muted-foreground">
                    {`Unread: ${lastUnreadMessage}`}
                  </p>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
