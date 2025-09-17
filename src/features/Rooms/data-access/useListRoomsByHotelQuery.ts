import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { Room } from '../domain/room.model';
import { getRoomsByHotel } from './gateway/room.gateway';

export function useListRoomsByHotelQuery(
  hotelId: string,
  onErrorNotification?: (error: Error) => void
) {
  const query = useQuery<Room[], Error, Room[], ['rooms', string]>(
    {
      queryKey: ['rooms', hotelId],
      queryFn: () => getRoomsByHotel(hotelId),
      enabled: Boolean(hotelId),
      refetchOnMount: 'always',
    }
  );

  useEffect(() => {
    if (query.isError && query.error && onErrorNotification) {
      onErrorNotification(query.error);
    }
  }, [query.isError, query.error, onErrorNotification]);

  return query;
}
