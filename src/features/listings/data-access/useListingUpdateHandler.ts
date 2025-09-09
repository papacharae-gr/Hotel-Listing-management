
import { useUpdateListingMutation } from "./useUpdateListingMutation";
import type { ListingFormValues } from "../feature/update/validationSchema";

export function useListingUpdateHandler(id: string) {
  const { mutateAsync, isPending } = useUpdateListingMutation(id);

  async function onSubmit(values: ListingFormValues) {
    return mutateAsync({ ...values });
  }

  return { onSubmit, isPending };
}