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
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "../../data-access/gateway/listing.gateway";

// Define the form values type
interface HotelFormValues {
  name: string;
  description: string;
  amenities: string;
}

export default function HotelCreatePage() {
  const { control, handleSubmit, reset } = useForm<HotelFormValues>({
    defaultValues: {
      name: "",
      description: "",
      amenities: "",
    },
  });
  const toast = useToast();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (values: HotelFormValues) => {
      // amenities: comma separated string to array
      const payload = {
        ...values,
        amenities: values.amenities
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
      };
      return createListing(payload as any);
    },
    onSuccess: () => {
      toast({ title: "Hotel created!", status: "success", duration: 2000 });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      navigate("/home");
    },
    onError: (err: any) => {
      toast({
        title: "Error",
        description: err.message || "Failed to create hotel",
        status: "error",
        duration: 3000,
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
          <FormControl isRequired>
            <FormLabel>Όνομα</FormLabel>
            <Controller
              name="name"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Περιγραφή</FormLabel>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Amenities (χωρισμένα με κόμμα)</FormLabel>
            <Controller
              name="amenities"
              control={control}
              render={({ field }) => <Input {...field} placeholder="WiFi, Pool, Gym" />}
            />
            <Flex gap={2} mt={2} flexWrap="wrap">
              {control._formValues.amenities?.split(",").map((a: string) =>
                a.trim() ? (
                  <Badge key={a.trim()} colorScheme="blue">
                    {a.trim()}
                  </Badge>
                ) : null
              )}
            </Flex>
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
