import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "./gateway/listing.gateway";

export function useDeleteHotelMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => deleteListing(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });
}