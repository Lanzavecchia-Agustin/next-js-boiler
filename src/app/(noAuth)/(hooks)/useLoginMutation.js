import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// Function to handle the user login process
const loginUser = async ({ email, password }) => {
  const response = await axiosInstance.post('/auth/login', {
    email,
    password,
  });

  const { token } = response.data;

  // Store the token in both localStorage and a cookie
  localStorage.setItem('token', token); // Store the token in localStorage
  Cookies.set('token', token); // Store the token in a cookie

  return response.data;
};

// Custom hook to manage the login process using React Query
export const useLoginMutation = () => {
  const router = useRouter(); // Get the router instance to handle navigation

  const mutation = useMutation({
    mutationFn: loginUser, // Set the mutation function to loginUser
    onSuccess: () => {
      router.push('/home'); // Redirect to /home on successful login
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  return mutation;
};
