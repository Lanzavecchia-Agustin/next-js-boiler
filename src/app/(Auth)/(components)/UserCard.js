import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import Cookies from 'js-cookie';

export default function UserCard({ user, joinRoom, sendMessage, leaveRoom }) {
  const userId = Cookies.get('userId');

  return (
    <Card className="flex flex-col items-center w-full max-w-sm gap-4 p-6">
      <Avatar className="w-16 h-16">
        <AvatarImage src="" alt="User Avatar" />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-center">
        <h3 className="text-2xl font-semibold">{user.name}</h3>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      <div className="flex items-center justify-around space-x-2">
        <Button className="w-[1/3]" onClick={() => joinRoom(user._id)}>
          Join Room
        </Button>
        <Button
          className="w-[1/3]"
          onClick={() =>
            sendMessage(userId, user._id, `Hola ${user.name} soy Ag`)
          }
        >
          Send Message
        </Button>
        <Button className="w-[1/3]" onClick={() => leaveRoom()}>
          Leave Room
        </Button>
      </div>
    </Card>
  );
}
