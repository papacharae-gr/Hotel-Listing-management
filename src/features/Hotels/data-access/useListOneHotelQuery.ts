import { useQuery } from '@tanstack/react-query';
import { getListing } from './gateway/hotel.gateway';
import { useToast } from '@chakra-ui/react';

import { useEffect } from 'react';

export function useListingQuery(id: string) {
    const toast = useToast();
    const queryResult = useQuery({
        queryKey: ['listing', id],
        queryFn: () => getListing(id),
    });

    useEffect(() => {
        if (queryResult.isError && queryResult.error instanceof Error) {
            toast({
                title: 'Σφάλμα',
                description: queryResult.error.message || 'Αποτυχία φόρτωσης ξενοδοχείου',
                status: 'error',
                duration: 3500,
                isClosable: true,
                position: 'top',
            });
        }
    }, [queryResult.isError, queryResult.error, toast]);

    return queryResult;
}