import { useQuery } from '@tanstack/react-query';
import { getListings } from './gateway/listing.gateway';
import type { Listing } from '../domain/listing.model';

// Custom hook για να φέρνει όλα τα ξενοδοχεία (listings)
export function useListHotelsQuery() {
  return useQuery<Listing[]>({
    queryKey: ['listings'],
    queryFn: getListings,
  });
}
