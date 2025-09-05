import { useQuery } from '@tanstack/react-query';
import { getListing,getListingById,getListings} from './gateway/listing.gateway';


export function useListingQuery(id: string) {
return useQuery({
queryKey: ['listing', id],
queryFn: () => getListing(id),
});
}
//2 Πας να κάνεις το call me thn getListingss
export function useGetListingsQuery(){
    return useQuery({
        queryKey:['listings'],
        queryFn: () => getListings()
    })
}



//gia ta post useMutate