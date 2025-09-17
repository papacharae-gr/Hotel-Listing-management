import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListing } from "./gateway/hotel.gateway";
export function useUpdateHotelMutation(
  id: string,
  onSuccessNotification?: () => void,
  onErrorNotification?: (error: Error) => void
) {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, Record<string, unknown>>({
    mutationFn: (data) => updateListing(id, data),
    onSuccess: () => {
      if (onSuccessNotification) onSuccessNotification();
      queryClient.invalidateQueries({ queryKey: ["hotel", id] });
      queryClient.invalidateQueries({ queryKey: ["hotels"] });
    },
    onError: (err: Error) => {
      if (onErrorNotification) onErrorNotification(err);
    },
  });
}
