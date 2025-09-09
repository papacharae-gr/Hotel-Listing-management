/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "../data-access/gateway/listing.gateway";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import type { ListingFormValues } from "../feature/update/validationSchema";

export function useCreateHotelMutation(reset: () => void) {
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (values: ListingFormValues) => {
      return createListing(values as any);
    },
  onSuccess: async () => {
      toast({
        title: "Το ξενοδοχείο δημιουργήθηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["listings"] });
  await queryClient.refetchQueries({ queryKey: ["listings"] });
  navigate("/home");
    },
    onError: (err: any) => {
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
