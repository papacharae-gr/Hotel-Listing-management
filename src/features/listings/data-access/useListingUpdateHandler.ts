import { useToast } from "@chakra-ui/react";
import { useUpdateListingMutation } from "./useUpdateListingMutation";
import type { ListingFormValues } from "../feature/update/validationSchema";

export function useListingUpdateHandler(id: string) {
  const toast = useToast();
  const { mutateAsync, isPending } = useUpdateListingMutation(id);

  async function onSubmit(values: ListingFormValues) {
    try {
      await mutateAsync({ ...values });
      toast({
        title: "Listing updated",
        status: "success",
        duration: 2500,
        isClosable: true,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Update failed";
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return { onSubmit, isPending };
}