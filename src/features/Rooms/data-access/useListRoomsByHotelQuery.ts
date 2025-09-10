import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import type { Room } from '../domain/room.model';
import { getRoomsByHotel } from './gateway/room.gateway';

export function useListRoomsByHotelQuery(hotelId: string) {
  const toast = useToast();

  const query = useQuery<Room[], Error, Room[], ['rooms', string]>({
    queryKey: ['rooms', hotelId],
    queryFn: () => getRoomsByHotel(hotelId),
    enabled: Boolean(hotelId),
    refetchOnMount: 'always',
  });

  // Εμφάνισε toast σε error (ίδιο μοτίβο με Hotels)
  useEffect(() => {
    if (query.isError && query.error instanceof Error) {
      toast({
        title: 'Σφάλμα',
        description: query.error.message || 'Αποτυχία φόρτωσης δωματίων',
        status: 'error',
        duration: 3500,
        isClosable: true,
        position: 'top',
      });
    }
  }, [query.isError, query.error, toast]);

  return query;
}
