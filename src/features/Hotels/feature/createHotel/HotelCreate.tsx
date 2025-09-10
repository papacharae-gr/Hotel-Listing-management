import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { HotelFormValues } from "../updateHotel/validationSchema";
import { hotelFormSchema } from "../updateHotel/validationSchema";
import { useCreateHotelMutation } from "../../data-access/useCreateHotelMutation";

export function useHotelCreate() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
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
