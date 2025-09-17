
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "./gateway/hotel.gateway";
import type { HotelFormValues } from "../feature/updateHotel/validationSchema";

export function useCreateHotelMutation(
  onSuccessNotification?: () => void,
  onErrorNotification?: (error: Error) => void
) {
  const queryClient = useQueryClient();
  return useMutation<unknown, Error, HotelFormValues>({
    mutationFn: async (values: HotelFormValues) => {
      return createListing(values);
    },
    onSuccess: async () => {
      if (onSuccessNotification) onSuccessNotification();
      await queryClient.refetchQueries({ queryKey: ["hotels"] });
    },
    onError: (err: Error) => {
      if (onErrorNotification) onErrorNotification(err);
    },
  });
}
