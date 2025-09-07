/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Heading,
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
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { listingFormSchema } from "../update/validationSchema";
import type { ListingFormValues } from "../update/validationSchema";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "../../data-access/gateway/listing.gateway";

export default function HotelCreatePage() {
  const {
    control,
    handleSubmit,
    reset,
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
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: ListingFormValues) => {
      // amenities is already an array
      return createListing(values as any);
    },
    onSuccess: () => {
      toast({
        title: "Το ξενοδοχείο δημιουργήθηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      reset();
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      setTimeout(() => navigate("/home"), 1000);
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

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} boxShadow="md" borderRadius="lg">
      <Heading mb={6} size="lg">
        Προσθήκη Ξενοδοχείου
      </Heading>
      <form onSubmit={handleSubmit((values) => mutation.mutate(values))}>
        <Stack spacing={4}>
          <FormControl isInvalid={!!errors.name} isRequired>
            <FormLabel>Όνομα</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.name && (
              <Box color="red.500" fontSize="sm" mt={1}>
                {errors.name.message}
              </Box>
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
              <Box color="red.500" fontSize="sm" mt={1}>
                {errors.description.message}
              </Box>
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
              <Box color="red.500" fontSize="sm" mt={1}>
                {errors.amenities.message as string}
              </Box>
            )}
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            isLoading={mutation.isPending}
            isDisabled={mutation.isPending}
          >
            Αποθήκευση
          </Button>
        </Stack>
      </form>
    </Box>
  );
};