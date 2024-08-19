import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axios';
import { useToast } from '@/components/ui/use-toast';

// Function to update user data
const updateUser = async (updatedData) => {
  try {
    const { oldPassword, newPassword, ...userInfo } = updatedData;

    // Update user general information if provided
    if (Object.keys(userInfo).length > 0) {
      await axiosInstance.patch(`/user`, userInfo);
    }

    // Change password if oldPassword and newPassword are provided
    if (oldPassword && newPassword) {
      await axiosInstance.patch(`/user/change-password`, {
        oldPassword,
        newPassword,
      });
    }

    return { success: true };
  } catch (error) {
    console.error('Error in PATCH request:', error);
    throw error; // Re-throw the error so it can be handled by the mutation's onError
  }
};

// Custom hook to manage updating user information
export const useUpdateUserInformation = () => {
  const queryClient = useQueryClient(); // Get the query client to invalidate the cache after an update
  const { toast } = useToast();
  return useMutation({
    mutationFn: updateUser, // The mutation function to be called when the mutation is triggered
    onSuccess: (data) => {
      // Invalidate the 'user' query cache so that it refetches the updated data
      queryClient.invalidateQueries(['user']);

      // Show success toast
      toast({
        title: 'Success',
        description: 'Your profile has been updated successfully.',
        status: 'success',
      });
    },
    onError: (error) => {
      // Handle errors here if needed
      console.error('Failed to update user:', error);

      // Show error toast
      toast({
        title: 'Error',
        description: 'Failed to update your profile. Please try again.',
        status: 'error',
      });
    },
  });
};
