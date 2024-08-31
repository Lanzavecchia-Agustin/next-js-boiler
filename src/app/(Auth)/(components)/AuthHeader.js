'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useLogoutMutation } from '../hooks/useLogoutMutation';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { Button } from '@/components/ui/button';
import { MessageCircleIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState, useEffect } from 'react';
import { useChat } from '../(contexts)/ChatContext';

export default function AuthHeader() {
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pendingRoom, setPendingRoom] = useState(null); // Estado para manejar la navegación pendiente
  const { unreadMessages, joinRoom, clearUnreadMessages, setSelectedUser } =
    useChat(); // Añadir `setSelectedUser`

  const router = useRouter();
  const pathname = usePathname();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout(null, {
      onSuccess: () => {
        router.push('/login');
      },
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const hasUnread = Object.values(unreadMessages).some(
      (messages) => messages.length > 0
    );
    setHasNewMessages(hasUnread);
  }, [unreadMessages]);

  useEffect(() => {
    if (pendingRoom && pathname === '/home') {
      joinRoom(pendingRoom.senderId);
      setSelectedUser({
        _id: pendingRoom.senderId,
        name: pendingRoom.senderName,
      });
      clearUnreadMessages(pendingRoom.roomId);
      setPendingRoom(null);
    }
  }, [pathname, pendingRoom, joinRoom, clearUnreadMessages, setSelectedUser]);

  const handleSelectMessage = (roomId, senderId, senderName) => {
    if (pathname !== '/home') {
      setPendingRoom({ roomId, senderId, senderName }); // Almacenar senderName
      router.push('/home');
    } else {
      joinRoom(senderId);
      setSelectedUser({ _id: senderId, name: senderName }); // Setear el usuario seleccionado
      clearUnreadMessages(roomId);
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <h1 className="text-3xl font-bold text-primary">Auth Header</h1>
      <div className="flex items-center gap-4">
        <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={toggleMenu}
            >
              <MessageCircleIcon
                className={`h-5 w-5 ${hasNewMessages ? 'text-primary' : 'text-muted-foreground'}`}
              />
              {hasNewMessages && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            {hasNewMessages ? (
              Object.entries(unreadMessages).map(([roomId, messages]) =>
                messages.map((message, index) => (
                  <DropdownMenuItem
                    key={`${roomId}-${index}`}
                    className="p-2 border-b"
                    onClick={() =>
                      handleSelectMessage(
                        roomId,
                        message.senderId,
                        message.senderName
                      )
                    }
                  >
                    <strong className="pr-2 font-bold">
                      {message.senderName}:
                    </strong>
                    <p className="text-sm text-muted-foreground">
                      {message.content}
                    </p>
                  </DropdownMenuItem>
                ))
              )
            ) : (
              <DropdownMenuItem>No new messages</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
        <Button onClick={handleLogout} className="text-background">
          Logout
        </Button>
      </div>
    </div>
  );
}
