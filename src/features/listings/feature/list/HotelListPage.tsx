/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import { useListHotelsQuery } from '../../data-access/useListHotelsQuery';
import { HotelList } from './HotelList';
import { Link, useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";

import { useRef, useState } from "react";
import DeleteDialog from "../../../../components/DeleteDialog";
import { useDeleteHotelMutation } from "../../data-access/useDeleteHotelMutation";

export default function HotelListPage() {
  const navigate = useNavigate();
  const { data, isLoading, error } = useListHotelsQuery();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const deleteMutation = useDeleteHotelMutation();

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
      <DeleteDialog
        isDialogOpen={isDialogOpen}
        handleCancelDelete={handleCancelDelete}
        handleConfirmDelete={handleConfirmDelete}
        deleteMutation={deleteMutation}
        cancelRef={cancelRef}
      />
    </Box>
  );
}
