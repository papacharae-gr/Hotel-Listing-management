/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "../data-access/gateway/listing.gateway";
import type { ListingFormValues } from "../feature/update/validationSchema";

export function useCreateHotelMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: ListingFormValues) => {
      return createListing(values as any);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["listings"] });
    },
  });
}
