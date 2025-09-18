import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ px: 4, pt: 4, pb: 2, fontWeight: 'bold', fontSize: '1.25rem' }}>
        Update Room
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        
      </DialogTitle>
      <DialogContent sx={{ px: 4, pb: 4, pt: 2 }}>
        <RoomFormFields
          defaultValues={formValues}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Update"
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRoomModal;