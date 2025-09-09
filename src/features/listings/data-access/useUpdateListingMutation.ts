import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateListing } from "./gateway/listing.gateway";
import { useToast } from "@chakra-ui/react";

export function useUpdateListingMutation(id: string) {
  const qc = useQueryClient();
  const toast = useToast();
  return useMutation<unknown, Error, Record<string, unknown>>({
    mutationFn: (data) => updateListing(id, data),
    onSuccess: () => {
      toast({
        title: "Το ξενοδοχείο ενημερώθηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      qc.invalidateQueries({ queryKey: ["listing", id] });
      qc.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (err: Error) => {
      toast({
        title: "Σφάλμα",
        description: err.message || "Αποτυχία ενημέρωσης ξενοδοχείου",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
    },
  });
}
