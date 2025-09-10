import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import type { Room, RoomUpdateInput } from '../domain/room.model';
import { updateRoom } from './gateway/room.gateway';

type Vars = { roomId: string; data: RoomUpdateInput };

export function useUpdateRoomMutation(hotelId: string) {
  const qc = useQueryClient();
  const toast = useToast();

  return useMutation<Room, Error, Vars>({
    mutationFn: ({ roomId, data }) => updateRoom(roomId, data),
    onSuccess: () => {
      toast({
        title: 'Success',
        description: 'Το δωμάτιο ενημερώθηκε.',
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
        description: err.message || 'Αποτυχία ενημέρωσης δωματίου',
        status: 'error',
        duration: 3500,
        isClosable: true,
        position: 'top',
      });
    },
  });
}
