import React from "react";
import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Badge,
  Flex,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingFormSchema } from "../feature/update/validationSchema";
import type { ListingFormValues } from "../feature/update/validationSchema";

interface HotelFormProps {
  defaultValues: ListingFormValues;
  onSubmit: (values: ListingFormValues) => void;
  isLoading?: boolean;
  submitText?: string;
}

export const HotelForm: React.FC<HotelFormProps> = ({
  defaultValues,
  onSubmit,
  isLoading = false,
  submitText = "Αποθήκευση",
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<ListingFormValues>({
    resolver: zodResolver(listingFormSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>Όνομα</FormLabel>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && (
            <span style={{ color: "red" }}>{errors.name.message}</span>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.description} isRequired>
          <FormLabel>Περιγραφή</FormLabel>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Textarea {...field} />}
          />
          {errors.description && (
            <span style={{ color: "red" }}>{errors.description.message}</span>
          )}
        </FormControl>
        <FormControl isInvalid={!!errors.amenities}>
          <FormLabel>Amenities</FormLabel>
          <Controller
            name="amenities"
            control={control}
            render={({ field }) => (
              <CheckboxGroup value={field.value} onChange={field.onChange}>
                <Stack direction="row" flexWrap="wrap">
                  {['WiFi', 'Pool', 'Gym', 'Parking', 'Spa', 'Restaurant', 'Bar', 'Pet Friendly', 'Air Conditioning'].map((amenity) => (
                    <Checkbox key={amenity} value={amenity}>
                      {amenity}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            )}
          />
          <Flex gap={2} mt={2} flexWrap="wrap">
            {watch("amenities")?.map((a: string) => (
              <Badge key={a} colorScheme="blue">
                {a}
              </Badge>
            ))}
          </Flex>
          {errors.amenities && (
            <span style={{ color: "red" }}>{errors.amenities.message as string}</span>
          )}
        </FormControl>
        <Button
          type="submit"
          colorScheme="teal"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          {submitText}
        </Button>
      </Stack>
    </form>
  );
};

export default HotelForm;
