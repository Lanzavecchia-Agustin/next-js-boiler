import { useMutation } from '@tanstack/react-query';
import Cookies from 'js-cookie';

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Clear the token from cookies
      Cookies.remove('token');
    },
    onSuccess: () => {
      // Optional: Additional logic after successful logout
    },
  });
};
