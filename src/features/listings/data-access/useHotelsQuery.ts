import { http } from '../../../lib/httpClient';
import { useQuery } from '@tanstack/react-query';
import type { Listing } from '../domain/listing.model';
export function useHotelsQuery() {
  return useQuery<Listing[]>({
    queryKey: ['hotels'],
    queryFn: async () => {
      const res = await http.get('/hotels');
      // Try to get the array from res.data.data, fallback to res.data
      if (Array.isArray(res.data)) return res.data;
      if (Array.isArray(res.data.data)) return res.data.data;
      return [];
    },
  });
}