
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
} from "@chakra-ui/react";

import { Controller } from "react-hook-form";
import { useHotelCreate } from "./useHotelCreate";

export default function HotelCreatePage() {
  const { control, handleSubmit, watch, errors, mutation } = useHotelCreate();
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
}