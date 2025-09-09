import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingFormSchema } from "../update/validationSchema";
import type { ListingFormValues } from "../update/validationSchema";
import { useCreateHotelMutation } from "../../data-access/useCreateHotelMutation";

export function useHotelCreate() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues: {
      name: "",
      description: "",
      amenities: [],
    },
  });

  const mutation = useCreateHotelMutation();

  return {
    control,
    handleSubmit,
    watch,
    errors,
    mutation,
  };
}
