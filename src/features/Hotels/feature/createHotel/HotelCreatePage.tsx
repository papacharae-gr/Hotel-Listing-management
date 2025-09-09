

import { Box, Heading } from "@chakra-ui/react";
import { HotelForm } from "../../components/HotelForm";
import { useCreateHotelMutation } from "../../data-access/useCreateHotelMutation";
import { useNavigate } from "react-router-dom";

export default function HotelCreatePage() {
  const mutation = useCreateHotelMutation();
  const navigate = useNavigate();

  interface HotelFormValues {
    name: string;
    description: string;
    amenities: string[];
  }

  function handleSubmit(values: HotelFormValues) {
    mutation.mutate(values, {
      onSuccess: () => {
        navigate("/home");
      },
    });
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={8} boxShadow="md" borderRadius="lg">
      <Heading mb={6} size="lg">
        Προσθήκη Ξενοδοχείου
      </Heading>
      <HotelForm
        defaultValues={{
          name: "",
          description: "",
          amenities: [],
        }}
        onSubmit={handleSubmit}
        isLoading={mutation.isPending}
        submitText="Αποθήκευση"
      />
    </Box>
  );
}