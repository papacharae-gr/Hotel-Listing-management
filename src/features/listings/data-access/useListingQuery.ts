import { useQuery } from '@tanstack/react-query';
import { getListing } from './gateway/listing.gateway';


export function useListingQuery(id: string) {
return useQuery({
queryKey: ['listing', id],
queryFn: () => getListing(id),
});
}