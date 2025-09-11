import React, { useState } from "react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, Box } from "@chakra-ui/react";
import { RoomFormFields } from "../../components/RoomForm";
import { useUpdateRoomMutation } from "../../data-access/useUpdateRoomMutation";
import type { RoomFormValues } from "../roomForm/validationSchema";

export interface UpdateRoomModalProps {
  room: RoomFormValues & { id: string; hotelId: string };
  onSuccess?: () => void;
}

export interface UpdateRoomModalProps {
  room: RoomFormValues & { id: string; hotelId: string };
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const UpdateRoomModal: React.FC<UpdateRoomModalProps> = ({ room, isOpen, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [formValues] = useState<RoomFormValues>({
    roomNumber: room.roomNumber,
    type: room.type,
    pricePerNight: room.pricePerNight,
    isAvailable: room.isAvailable,
  });
  const updateRoom = useUpdateRoomMutation(room.hotelId);

  const handleSubmit = async (values: RoomFormValues) => {
    setLoading(true);
    try {
      await updateRoom.mutateAsync({ roomId: room.id, data: values });
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
        <ModalHeader px={6} pt={6} pb={2} fontWeight="bold" fontSize="xl">Update Room</ModalHeader>
        <ModalCloseButton top={4} right={4} />
        <Box px={6} pb={6} pt={2}>
          <RoomFormFields
            defaultValues={formValues}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Update"
            onCancel={onClose}
          />
        </Box>
      </ModalContent>
    </Modal>
  );
};

export default UpdateRoomModal;