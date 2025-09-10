import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, FormControl, FormLabel, Input, Select, Switch, FormErrorMessage, Stack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { Room } from '../domain/room.model';
import { useCreateRoomMutation } from '../data-access/useCreateRoomMutation';
import { useUpdateRoomMutation } from '../data-access/useUpdateRoomMutation';

const roomTypes = ['SINGLE', 'DOUBLE', 'SUITE', 'FAMILY'] as const;

const roomFormSchema = z.object({
  roomNumber: z.string().min(1, 'Room number is required'),
  type: z.enum(roomTypes),
  pricePerNight: z.number().positive('Price must be greater than 0'),
  isAvailable: z.boolean(),
});
type RoomFormValues = {
  roomNumber: string;
  type: (typeof roomTypes)[number];
  pricePerNight: number;
  isAvailable: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  hotelId: string;
  initialRoom?: Room | null;
};

export default function RoomForm({ isOpen, onClose, hotelId, initialRoom }: Props) {
  const isEdit = Boolean(initialRoom?.id);
  const createMutation = useCreateRoomMutation(hotelId);
  const updateMutation = useUpdateRoomMutation(hotelId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      roomNumber: initialRoom?.roomNumber ?? '',
      type: (initialRoom?.type as RoomFormValues['type']) ?? 'SINGLE',
      pricePerNight: initialRoom?.pricePerNight ?? 0,
      isAvailable: initialRoom?.isAvailable ?? true,
    },
  });

  // Reset when opening/closing or switching room
  // (αν θέλεις πιο «σφιχτό» control, βάλε useEffect με reset(...) όταν αλλάζει initialRoom)
  const onSubmit: import('react-hook-form').SubmitHandler<RoomFormValues> = async (values) => {
    try {
      if (isEdit && initialRoom) {
        await updateMutation.mutateAsync({
          roomId: initialRoom.id,
          data: {
            roomNumber: values.roomNumber,
            type: values.type,
            pricePerNight: values.pricePerNight,
            isAvailable: values.isAvailable,
          },
        });
      } else {
        await createMutation.mutateAsync({
          hotelId,
          roomNumber: values.roomNumber,
          type: values.type,
          pricePerNight: values.pricePerNight,
          isAvailable: values.isAvailable,
        });
      }
      reset();
      onClose();
    } catch (err: unknown) {
      const message = (err as Error)?.message || '';
      // Αν έρθει 409 (duplicate room number), «κάρφωσε» το μήνυμα στο πεδίο roomNumber
      if (message.toLowerCase().includes('conflict') || message.toLowerCase().includes('already')) {
        setError('roomNumber', { message: 'Το room number υπάρχει ήδη σε αυτό το ξενοδοχείο.' });
      }
      // αλλιώς, αφήνουμε τα toasts από τα mutations να εμφανιστούν
    }
  };



  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? 'Edit Room' : 'Add Room'}</ModalHeader>
        <ModalBody>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.roomNumber}>
              <FormLabel>Room Number</FormLabel>
              <Input placeholder="e.g. 101 or A2" {...register('roomNumber')} />
              <FormErrorMessage>{errors.roomNumber?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.type}>
              <FormLabel>Type</FormLabel>
              <Select {...register('type')}>
                {roomTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </Select>
              <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.pricePerNight}>
              <FormLabel>Price per night</FormLabel>
              <Input type="number" step="1" min="1" {...register('pricePerNight')} />
              <FormErrorMessage>{errors.pricePerNight?.message}</FormErrorMessage>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Available</FormLabel>
              <Switch {...register('isAvailable')} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>Cancel</Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting || createMutation.isPending || updateMutation.isPending}
          >
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
