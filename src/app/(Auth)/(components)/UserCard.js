import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function UserCard({ user, startChat }) {
  return (
    <Card className="flex flex-col items-center w-full max-w-sm gap-4 p-6">
      <Avatar className="w-16 h-16">
        <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="space-y-1 text-center">
        <h3 className="text-2xl font-semibold">{user.name}</h3>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
      <Button
        className="w-full"
        onClick={() => {
          startChat(user);
        }}
      >
        <MessageCircleIcon className="w-4 h-4 mr-2" />
        Start Chat
      </Button>
    </Card>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
