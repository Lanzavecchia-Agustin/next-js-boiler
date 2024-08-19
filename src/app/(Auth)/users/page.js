'use client';

import React from 'react';
import { useUsersQuery } from '../hooks/useUsersQuery';
import UserCard from '../(components)/UserCard';

export default function UsersPage() {
  const { data } = useUsersQuery();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {data?.data?.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
