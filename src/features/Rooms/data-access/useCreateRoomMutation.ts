import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import type { Room, RoomCreateInput } from '../domain/room.model';
import { createRoom } from './gateway/room.gateway';

export function useCreateRoomMutation(hotelId: string) {
  const qc = useQueryClient();
  const toast = useToast();

  return useMutation<Room, Error, RoomCreateInput>({
    mutationFn: (values) => createRoom(hotelId, values),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Το δωμάτιο δημιουργήθηκε.',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
      qc.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
    onError: (err) => {
      toast({
        title: 'Σφάλμα',
        description: err.message || 'Αποτυχία δημιουργίας δωματίου',
        status: 'error',
        duration: 3500,
        isClosable: true,
        position: 'top',
      });
    },
  });
}
