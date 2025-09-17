import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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
    <Dialog open={isOpen} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ px: 4, pt: 4, pb: 2, fontWeight: 'bold', fontSize: '1.25rem' }}>
        Create Room
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ px: 4, pb: 4, pt: 2 }}>
        <RoomFormFields
          defaultValues={formValues}
          onSubmit={handleSubmit}
          loading={loading}
          submitLabel="Create"
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoomModal;