import { useQuery } from '@tanstack/react-query';
import { getListings } from './gateway/hotel.gateway';
import type { Hotel } from '../domain/hotel.model';
import { useToast } from '@chakra-ui/react';
import { useEffect } from 'react';

// Custom hook για να φέρνει όλα τα ξενοδοχεία (listings)
export function useListHotelsQuery() {
  const toast = useToast();
  const query = useQuery<Hotel[], Error, Hotel[], ['hotels']>({
    queryKey: ['hotels'],
    queryFn: getListings,
    refetchOnMount: 'always',
  });

  useEffect(() => {
    if (query.error) {
      toast({
        title: 'Σφάλμα',
        description: query.error.message || 'Αποτυχία φόρτωσης ξενοδοχείων',
        status: 'error',
        duration: 3500,
        isClosable: true,
        position: 'top',
      });
    }
  }, [query.error, toast]);

  return query;
}
