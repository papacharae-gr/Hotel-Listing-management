import { useQuery } from '@tanstack/react-query';
import { getListing } from './gateway/listing.gateway';


// 1. Query for single listing by id
export function useListingQuery(id: string) {
    return useQuery({
        queryKey: ['listing', id],
        queryFn: () => getListing(id),
    });
}



//gia ta post useMutate