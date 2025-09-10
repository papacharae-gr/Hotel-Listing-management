import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@chakra-ui/react';
import { deleteRoom } from './gateway/room.gateway';

export function useDeleteRoomMutation(hotelId: string) {
  const qc = useQueryClient();
  const toast = useToast();

  return useMutation<void, Error, string>({
    mutationFn: (roomId) => deleteRoom(roomId),
    onSuccess: () => {
      toast({
        title: 'Deleted',
        description: 'Το δωμάτιο διαγράφηκε.',
        status: 'success',
        duration: 2500,
        isClosable: true,
        position: 'top',
      });
      qc.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
    onError: (err) => {
      toast({
        title: 'Σφάλμα',
        description: err.message || 'Αποτυχία διαγραφής δωματίου',
        status: 'error',
        duration: 3500,
        isClosable: true,
        position: 'top',
      });
    },
  });
}
