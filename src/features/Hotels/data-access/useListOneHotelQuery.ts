import { useQuery } from '@tanstack/react-query';
import { getListing } from './gateway/hotel.gateway';
import type { Hotel } from '../domain/hotel.model';
import { useEffect } from 'react';

// Custom hook για να φέρνει ένα ξενοδοχείο (listing)
export function useListOneHotelQuery(id: string, onErrorNotification?: (error: Error) => void) {
        const queryResult = useQuery<Hotel, Error, Hotel, [string, string]>(
            {
                queryKey: ['hotel', id],
                queryFn: () => getListing(id),
                enabled: !!id,
            }
        );

    useEffect(() => {
        if (queryResult.isError && queryResult.error && onErrorNotification) {
            onErrorNotification(queryResult.error);
        }
    }, [queryResult.isError, queryResult.error, onErrorNotification]);

    return queryResult;
}