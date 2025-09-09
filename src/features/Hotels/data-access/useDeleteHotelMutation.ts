

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteListing } from "./gateway/hotel.gateway";
import { useToast } from "@chakra-ui/react";

export function useDeleteHotelMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation({
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
    onError: (err: Error) => {
      toast({
        title: "Σφάλμα",
        description: err.message || "Αποτυχία διαγραφής ξενοδοχείου",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
    },
  });
}