import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRoom } from './gateway/room.gateway';

export function useDeleteRoomMutation(
  hotelId: string,
  onSuccessNotification?: () => void,
  onErrorNotification?: (error: Error) => void
) {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (roomId) => deleteRoom(roomId),
    onSuccess: () => {
      if (onSuccessNotification) onSuccessNotification();
      queryClient.invalidateQueries({ queryKey: ['rooms', hotelId] });
    },
    onError: (err) => {
      if (onErrorNotification) onErrorNotification(err);
    },
  });
}
