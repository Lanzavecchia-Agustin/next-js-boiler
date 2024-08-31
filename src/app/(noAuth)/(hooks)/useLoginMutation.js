import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { useState } from 'react';

// Function to handle the user login process
const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  const { token, user } = response.data;

  // Store the token and user ID in cookies
  Cookies.set('token', token);
  Cookies.set('userId', user._id);

  // Return the full user data
  return user;
};

// Custom hook to manage the login process
export const useLoginMutation = () => {
  const router = useRouter(); // Get the router instance to handle navigation
  const [error, setError] = useState(null);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      // Redirect to /home on successful login
      router.push('/home');
    },
    onError: (error) => {
      // Handle error (you can use the returned error from useMutation instead of setting it in state)
      setError(error.response?.data?.message || 'An unexpected error occurred');
    },
  });

  return { ...mutation, error };
};
