import { Box, Heading, Spinner, Text, Alert, AlertIcon } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useListRoomsByHotelQuery } from '../../data-access/useListRoomsByHotelQuery';

type Props = { hotelId: string };

export default function HotelRoomsSection({ hotelId }: Props) {
  const { data, isLoading, isError, error } = useListRoomsByHotelQuery(hotelId);

  // 🧪 Test: log τα δεδομένα για να βεβαιωθείς ότι “τρέχει”
  useEffect(() => {
    // Θα πρέπει να δεις στο console τα rooms του ξενοδοχείου
    console.log('Rooms for hotel', hotelId, data);
  }, [hotelId, data]);

  return (
    <Box mt={8}>
      <Heading size="md" mb={3}>Rooms</Heading>

      {isLoading && <Spinner />}

      {isError && (
        <Alert status="error">
          <AlertIcon />
          {error?.message || 'Αποτυχία φόρτωσης δωματίων'}
        </Alert>
      )}

      {!isLoading && !isError && (
        <Text color="gray.500">
          Βρέθηκαν {data?.length ?? 0} δωμάτια. (Δες το console για τα πραγματικά δεδομένα)
        </Text>
      )}
    </Box>
  );
}
