import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Box } from "@chakra-ui/react";
import { RoomFormFields } from "../../components/RoomForm";
import { useCreateRoomMutation } from "../../data-access/useCreateRoomMutation";
import type { RoomFormValues } from "../roomForm/validationSchema";

export const CreateRoomModal: React.FC<{ hotelId: string; isOpen: boolean; onClose: () => void; onSuccess?: () => void }> = ({ hotelId, isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<RoomFormValues>({
    roomNumber: "",
    type: "SINGLE",
    pricePerNight: 1,
    isAvailable: true,
  });
  const createRoom = useCreateRoomMutation(hotelId);

  const handleSubmit = async (values: RoomFormValues) => {
    setLoading(true);
    try {
      await createRoom.mutateAsync({ ...values, hotelId });
      setFormValues({ roomNumber: "", type: "SINGLE", pricePerNight: 1, isAvailable: true });
      onClose();
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent borderRadius="xl" boxShadow="2xl" p={2}>
        <ModalHeader px={6} pt={6} pb={2} fontWeight="bold" fontSize="xl">Create Room</ModalHeader>
        <ModalCloseButton top={4} right={4} />
        <Box px={6} pb={6} pt={2}>
          <RoomFormFields
            defaultValues={formValues}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Create"
            onCancel={onClose}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default CreateRoomModal;