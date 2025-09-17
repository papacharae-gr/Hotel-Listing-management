

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "./gateway/hotel.gateway";

export function useDeleteHotelMutation(
  onSuccessNotification?: () => void,
  onErrorNotification?: (error: Error) => void
) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => deleteListing(id),
    onSuccess: () => {
      if (onSuccessNotification) onSuccessNotification();
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
    onError: (err: Error) => {
      if (onErrorNotification) onErrorNotification(err);
    },
  });
}