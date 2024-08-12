import { useMutation } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { useRouter } from 'next/navigation';

// Function to handle the user registration process
const registerUser = async ({ name, email, password, role }) => {
  // Make a POST request to the '/auth/register' endpoint with the user data
  const response = await axiosInstance.post('/auth/register', {
    name,
    email,
    password,
    role,
  });

  // Return the data from the response (the registered user's information)
  return response.data;
};

// Custom hook to manage the signup process using React Query
export const useSignupMutation = () => {
  const router = useRouter(); // Get the router instance to handle navigation

  // Create a mutation using the useMutation hook
  const mutation = useMutation({
    mutationFn: registerUser, // Set the mutation function to registerUser
    onSuccess: () => {
      // When the registration is successful, navigate the user to the login page
      router.push('/login');
    },
    onError: (error) => {
      // If there is an error during the registration, log it to the console
      console.error('Registration failed:', error);
    },
  });

  // Return the mutation object to allow interaction with the mutation in a component
  return mutation;
};
