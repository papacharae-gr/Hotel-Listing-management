import {
  Box,
  Heading,
  Badge,
  Flex,
  Button,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  Text,
  Divider,
} from '@chakra-ui/react';
import { useMemo } from 'react';
import { useListRoomsByHotelQuery } from '../data-access/useListRoomsByHotelQuery';
import RoomCard from './RoomCard';
import type { Room } from '../domain/room.model';

type Props = { hotelId: string };

function sortRooms(rooms: Room[]) {
  // Ταξινόμηση με “έξυπνη” σειρά: αν το roomNumber είναι αριθμός, ταξινόμησε αριθμητικά,
  // αλλιώς αλφαβητικά.
  return [...rooms].sort((a, b) => {
    const na = Number(a.roomNumber);
    const nb = Number(b.roomNumber);
    const aNum = !Number.isNaN(na);
    const bNum = !Number.isNaN(nb);
    if (aNum && bNum) return na - nb;
    if (aNum && !bNum) return -1;
    if (!aNum && bNum) return 1;
    return a.roomNumber.localeCompare(b.roomNumber, undefined, { numeric: true, sensitivity: 'base' });
  });
}

export default function RoomsList({ hotelId }: Props) {
  const { data, isLoading, isError, error } = useListRoomsByHotelQuery(hotelId);

  const sorted = useMemo(() => (data ? sortRooms(data) : []), [data]);

  if (isLoading) {
    return (
      <Stack align="center" py={6}>
        <Spinner />
        <Text>Loading rooms…</Text>
      </Stack>
    );
  }

  if (isError) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error?.message || 'Αποτυχία φόρτωσης δωματίων'}
      </Alert>
    );
  }

  return (
    <Box>
      <Flex align="center" justify="space-between" mb={3}>
        <Flex align="center" gap={2}>
          <Heading size="md">Rooms</Heading>
          <Badge colorScheme="teal" variant="subtle">{sorted.length}</Badge>
        </Flex>

        <Button
          colorScheme="blue"
          size="sm"
          onClick={() => {
            // Θα συνδεθεί με RoomForm στο Step 3
            console.log('Add Room clicked for hotel:', hotelId);
          }}
        >
          Add Room
        </Button>
      </Flex>

      <Divider mb={3} />

      {sorted.length === 0 ? (
        <Box py={6} textAlign="center" color="gray.500">
          Δεν υπάρχουν δωμάτια — πρόσθεσε το πρώτο.
        </Box>
      ) : (
        <Stack gap={3}>
          {sorted.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onEdit={(r) => console.log('Edit room:', r)}
              onDelete={(r) => console.log('Delete room:', r)}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
}
