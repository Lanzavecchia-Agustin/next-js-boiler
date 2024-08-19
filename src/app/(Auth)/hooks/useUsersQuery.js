'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';

// Function to fetch users
const fetchUsers = async () => {
  const response = await axiosInstance.get('/user');
  return response.data; // Assuming the users are returned directly in the response
};

export const useUsersQuery = () => {
  const response = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  return response;
};
