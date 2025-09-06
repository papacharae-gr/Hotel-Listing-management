import { useQuery } from '@tanstack/react-query';
import { getListing, getListings } from './gateway/listing.gateway';


// 1. Query for single listing by id
export function useListingQuery(id: string) {
    return useQuery({
        queryKey: ['listing', id],
        queryFn: () => getListing(id),
    });
}
// 2. Query for all listings
export function useGetListingsQuery() {
    return useQuery({
        queryKey: ['listings'],
        queryFn: () => getListings(),
    });
}



//gia ta post useMutate