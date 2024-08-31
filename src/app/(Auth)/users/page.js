'use client';

import { useUsersQuery } from '../hooks/useUsersQuery';
import UserCard from '../(components)/UserCard';
import { useChat } from '../(contexts)/ChatContext';
import Cookies from 'js-cookie';

export default function UsersPage() {
  const { data } = useUsersQuery();
  const { joinRoom, leaveRoom, sendMessage } = useChat();

  const userId = Cookies.get('userId');

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data?.data
        ?.filter((user) => user._id !== userId)
        .map((user) => (
          <UserCard
            key={user._id}
            user={user}
            joinRoom={joinRoom}
            sendMessage={sendMessage}
            leaveRoom={leaveRoom}
          />
        ))}
    </div>
  );
}
