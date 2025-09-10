
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "./gateway/hotel.gateway";
import { useToast } from "@chakra-ui/react";
import type { HotelFormValues } from "../feature/updateHotel/validationSchema";

export function useCreateHotelMutation() {
  const queryClient = useQueryClient();
  const toast = useToast();
  return useMutation<unknown, Error, HotelFormValues>({
    mutationFn: async (values: HotelFormValues) => {
      return createListing(values);
    },
    onSuccess: async () => {
      toast({
        title: "Το ξενοδοχείο δημιουργήθηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      await queryClient.refetchQueries({ queryKey: ["hotels"] });
    },
    onError: (err: Error) => {
      toast({
        title: "Σφάλμα",
        description: err?.message || "Αποτυχία δημιουργίας ξενοδοχείου",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
    },
  });
}
