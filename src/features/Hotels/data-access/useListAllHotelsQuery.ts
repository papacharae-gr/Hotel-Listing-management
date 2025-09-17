import { useQuery } from '@tanstack/react-query';
import { getListings } from './gateway/hotel.gateway';
import type { Hotel } from '../domain/hotel.model';
import { useEffect } from 'react';

// Custom hook για να φέρνει όλα τα ξενοδοχεία (listings)
export function useListHotelsQuery(onErrorNotification?: (error: Error) => void) {
  const query = useQuery<Hotel[], Error, Hotel[], ['hotels']>({
    queryKey: ['hotels'],
    queryFn: getListings,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (query.error && onErrorNotification) {
      onErrorNotification(query.error);
    }
  }, [query.error, onErrorNotification]);

  return query;
}
