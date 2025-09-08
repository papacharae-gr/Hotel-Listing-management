import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "./gateway/listing.gateway";
import { useToast } from "@chakra-ui/react";

export function useDeleteHotelMutation() {
  const toast = useToast();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteListing(id),
    onSuccess: () => {
      toast({
        title: "Το ξενοδοχείο διαγράφηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (err: unknown) => {
      toast({
        title: "Σφάλμα διαγραφής",
        description: err instanceof Error ? err.message : "Αποτυχία διαγραφής ξενοδοχείου",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
    },
  });

  return deleteMutation;
}