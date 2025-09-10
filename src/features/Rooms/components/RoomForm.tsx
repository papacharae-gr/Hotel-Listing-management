/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, FormControl, FormLabel, Input, Select, Switch, FormErrorMessage, Stack
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import type { Room } from '../domain/room.model';
import { useCreateRoomMutation } from '../data-access/useCreateRoomMutation';
import { useUpdateRoomMutation } from '../data-access/useUpdateRoomMutation';
import { roomFormSchema, roomTypes, type RoomFormValues } from '../feature/roomForm/validationSchema';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  hotelId: string;
  initialRoom?: Room | null; // αν υπάρχει -> edit mode
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
    watch,
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomFormSchema),
    defaultValues: {
      roomNumber: initialRoom?.roomNumber ?? '',
      type: (initialRoom?.type as RoomFormValues['type']) ?? 'SINGLE',
      pricePerNight: initialRoom?.pricePerNight ?? 0,
      isAvailable: initialRoom?.isAvailable ?? true,
    },
  });

  // Reset κάθε φορά που ανοίγει με άλλο initialRoom
  useEffect(() => {
    if (isOpen) {
      reset({
        roomNumber: initialRoom?.roomNumber ?? '',
        type: (initialRoom?.type as RoomFormValues['type']) ?? 'SINGLE',
        pricePerNight: initialRoom?.pricePerNight ?? 0,
        isAvailable: initialRoom?.isAvailable ?? true,
      });
    }
  }, [isOpen, initialRoom, reset]);

  const onSubmit = async (values: RoomFormValues) => {
    try {
      if (isEdit && initialRoom) {
        await updateMutation.mutateAsync({
          roomId: initialRoom.id,
          data: {
            roomNumber: values.roomNumber.trim(),
            type: values.type,
            pricePerNight: values.pricePerNight,
            isAvailable: values.isAvailable,
          },
        });
      } else {
        // RoomCreateInput: περιλαμβάνει hotelId στο σώμα (το gateway θα το στείλει)
        await createMutation.mutateAsync({
          hotelId,
          roomNumber: values.roomNumber.trim(),
          type: values.type,
          pricePerNight: values.pricePerNight,
          isAvailable: values.isAvailable,
        } as any);
      }

      reset();
      onClose();
    } catch (e) {
      const err = e as Error & { status?: number; details?: any };
      // 409 → μοναδικότητα roomNumber στο ίδιο hotel
      if (err.status === 409 || /conflict|already/i.test(err.message)) {
        setError('roomNumber', { message: 'Το room number υπάρχει ήδη σε αυτό το ξενοδοχείο.' });
        return;
      }
      // 400 → αν ο server γυρνά field errors, “πέρασέ” τα στα πεδία
      const fieldErrors = err?.details?.errors as Record<string, string> | undefined;
      if (fieldErrors) {
        if (fieldErrors.roomNumber) setError('roomNumber', { message: fieldErrors.roomNumber });
        if (fieldErrors.type) setError('type', { message: fieldErrors.type });
        if (fieldErrors.pricePerNight) setError('pricePerNight', { message: fieldErrors.pricePerNight });
        return;
      }
      // 404/500 → καλύπτονται από τα toasts στα mutation hooks
    }
  };

  const submitting = isSubmitting || createMutation.isPending || updateMutation.isPending;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEdit ? 'Edit Room' : 'Add Room'}</ModalHeader>

        <ModalBody>
          <Stack gap={4}>
            <FormControl isInvalid={!!errors.roomNumber}>
              <FormLabel>Room Number</FormLabel>
              <Input
                placeholder="e.g. 101 or A2"
                {...register('roomNumber')}
                autoFocus
              />
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
              <Input
                type="number"
                {...register('pricePerNight', { valueAsNumber: true })}
              />
              <FormErrorMessage>{errors.pricePerNight?.message}</FormErrorMessage>
            </FormControl>

            <FormControl display="flex" alignItems="center">
              <FormLabel mb="0">Available</FormLabel>
              <Switch {...register('isAvailable')} isChecked={watch('isAvailable')} />
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={submitting}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit(onSubmit)} isLoading={submitting}>
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
