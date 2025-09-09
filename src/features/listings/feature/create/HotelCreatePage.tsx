

import { Box, Heading, useToast } from "@chakra-ui/react";
import { HotelForm } from "../../components/HotelForm";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createListing } from "../../data-access/gateway/listing.gateway";


export default function HotelCreatePage() {
  const navigate = useNavigate();
  const toast = useToast();
  const mutation = useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      toast({
        title: "Το ξενοδοχείο δημιουργήθηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      navigate("/home");
    },
    onError: (err) => {
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
      <HotelForm
        defaultValues={{
          name: "",
          description: "",
          amenities: [],
        }}
        onSubmit={(values) => mutation.mutate(values)}
        isLoading={mutation.isPending}
        submitText="Αποθήκευση"
      />
    </Box>
  );
}