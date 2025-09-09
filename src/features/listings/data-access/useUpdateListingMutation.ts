/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListing } from "./gateway/listing.gateway";

export function useUpdateListingMutation(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: any) => updateListing(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listing", id] });
    },
  });
}
