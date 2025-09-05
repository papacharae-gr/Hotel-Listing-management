import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListing, type UpdateListingInput } from "./gateway/listing.gateway";

export function useUpdateListingMutation(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateListingInput) => updateListing(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listing", id] });
    },
  });
}
