import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Room, RoomUpdateInput } from '../domain/room.model';
import { updateRoom } from './gateway/room.gateway';

type Vars = { roomId: string; data: RoomUpdateInput };

export function useUpdateRoomMutation(
  hotelId: string,
  onSuccessNotification?: () => void,
  onErrorNotification?: (error: Error) => void
) {
  const queryClient = useQueryClient();
  return useMutation<Room, Error, Vars>({
    mutationFn: ({ roomId, data }) => updateRoom(roomId, data),
    onSuccess: () => {
      if (onSuccessNotification) onSuccessNotification();
      queryClient.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
    onError: (err) => {
      if (onErrorNotification) onErrorNotification(err);
    },
  });
}
