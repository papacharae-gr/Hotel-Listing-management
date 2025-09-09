

import { useUpdateListingMutation } from "./useUpdateListingMutation";
import type { ListingFormValues } from "../feature/update/validationSchema";
import { useToast } from "@chakra-ui/react";

export function useListingUpdateHandler(id: string) {
  const { mutateAsync, isPending } = useUpdateListingMutation(id);
  const toast = useToast();

  async function onSubmit(values: ListingFormValues) {
    try {
      await mutateAsync({ ...values });
      toast({
        title: "Listing updated",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      throw err;
    }
  }

  return { onSubmit, isPending };
}