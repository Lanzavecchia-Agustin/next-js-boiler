'use client';

import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import Cookies from 'js-cookie';

const fetchUserData = async () => {
  const userId = Cookies.get('userId');
  if (!userId) {
    throw new Error('User ID not found');
  }
  const {
    data: { data }, // estu cara de nalga mira lo que tengo que hacer por tu culpa
  } = await axiosInstance.get(`/user/${userId}`);

  return data;
};

export const useUserData = () => {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
    staleTime: 1000 * 60 * 5,
  });

  return { data };
};
