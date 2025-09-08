/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Heading, Flex, Button, useToast, AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay } from "@chakra-ui/react";
import { useListHotelsQuery } from '../../data-access/useListHotelsQuery';
import { deleteListing } from '../../data-access/gateway/listing.gateway';
import { HotelList } from './HotelList';
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FiPlus } from "react-icons/fi";

import { useRef, useState } from "react";

export default function HotelListPage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useListHotelsQuery();
  const queryClient = useQueryClient();
  const toast = useToast();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteListing(id),
    onSuccess: () => {
      toast({
        title: "Το ξενοδοχείο διαγράφηκε!",
        status: "success",
        duration: 2500,
        isClosable: true,
        position: "top",
      });
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
    onError: (err: unknown) => {
      toast({
        title: "Σφάλμα διαγραφής",
        description: err instanceof Error ? err.message : "Αποτυχία διαγραφής ξενοδοχείου",
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
    },
  });

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
    setDialogOpen(false);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setDeleteId(null);
  };

  if (isLoading) {
    return <Box p={8}>Loading...</Box>;
  }
  if (error) {
    return <Box p={8} color="red.500">Error: {(error as any).message}</Box>;
  }

  return (
    <Box p={8} minH="80vh" display="flex" flexDirection="column">
      <Flex align="center" justify="space-between" mb={6}>
        <Heading>Hotels</Heading>
        
      </Flex>
      {(!data || data.length === 0) ? (
        <Box border="1px dashed" borderColor="gray.300" borderRadius="lg" p={10} textAlign="center" flex="1">
          <Heading size="md" mb={2}>No hotels yet</Heading>
          <Button colorScheme="teal" size="lg" leftIcon={<FiPlus />} onClick={() => navigate("/listings/create")}>Create Hotel</Button>
        </Box>
      ) : (
        <HotelList hotels={data} onDelete={handleDeleteClick} isDeleting={deleteMutation.isPending} />
      )}
      <AlertDialog isOpen={isDialogOpen} leastDestructiveRef={cancelRef} onClose={handleCancelDelete} isCentered>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">Διαγραφή ξενοδοχείου</AlertDialogHeader>
            <AlertDialogBody>Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το ξενοδοχείο; Η ενέργεια δεν μπορεί να αναιρεθεί.</AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleCancelDelete}>Ακύρωση</Button>
              <Button colorScheme="red" onClick={handleConfirmDelete} ml={3} isLoading={deleteMutation.isPending}>Διαγραφή</Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Flex justify="center" mt="auto">

        
        <Button
          leftIcon={<FiPlus />}
          colorScheme="green"
          as={Link}
          to="/listings/create"
          mt={8} // Προσθέτει λίγο κενό πάνω από το κουμπί
        >
          Create Hotel
        </Button>
      </Flex>
    </Box>
  );
}
