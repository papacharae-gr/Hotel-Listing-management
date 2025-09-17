import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Room, RoomCreateInput } from '../domain/room.model';
import { createRoom } from './gateway/room.gateway';

export function useCreateRoomMutation(hotelId: string) {
  const qc = useQueryClient();
  // TODO: Integrate MUI Snackbar for notifications

  return useMutation<Room, Error, RoomCreateInput>({
    mutationFn: (values) => createRoom(hotelId, values),
    onSuccess: () => {
      // TODO: Show MUI Snackbar for success
      qc.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
    onError: () => {
      // TODO: Show MUI Snackbar for error
    },
  });
}
