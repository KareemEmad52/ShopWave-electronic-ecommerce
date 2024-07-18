// hooks/useAddToWishlist.js
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserWishlist } from '../utils/api'; // Adjust the import path as necessary

export const useAddToWishlist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ token, productID }) => updateUserWishlist({ token, productID }),
    onSuccess: () => {
      // Invalidate the wishlist query to refetch data
      queryClient.invalidateQueries(['wishlist']);
    },
    onError: (error) => {
      console.error('Error adding to wishlist:', error);
    }
  });
};
