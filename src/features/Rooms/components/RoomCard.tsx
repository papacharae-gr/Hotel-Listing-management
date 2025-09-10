import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import type { Room } from '../domain/room.model';

type Props = {
  room: Room;
  onEdit?: (room: Room) => void;
  onDelete?: (room: Room) => void;
};

function formatPrice(value: number) {
  try {
    return new Intl.NumberFormat('el-GR', { style: 'currency', currency: 'EUR' }).format(value);
  } catch {
    return `€${value}`;
  }
}

export default function RoomCard({ room, onEdit, onDelete }: Props) {
  const border = useColorModeValue('gray.200', 'gray.700');
  const available = room.isAvailable;

  return (
    <Box borderWidth="1px" borderColor={border} borderRadius="lg" p={4}>
      <Flex align="center" justify="space-between" mb={2}>
        <Stack spacing={1}>
          <Flex align="center" gap={2}>
            <Heading size="sm">Room {room.roomNumber}</Heading>
            <Badge variant="subtle" colorScheme="blue">{room.type}</Badge>
            <Badge variant="subtle" colorScheme={available ? 'green' : 'red'}>
              {available ? 'Available' : 'Unavailable'}
            </Badge>
          </Flex>
          <Text fontSize="sm" color="gray.500">
            {formatPrice(room.pricePerNight)} / night
          </Text>
        </Stack>

        <Flex gap={2}>
          <Button size="sm" onClick={() => onEdit?.(room)}>Edit</Button>
          <Button size="sm" colorScheme="red" variant="outline" onClick={() => onDelete?.(room)}>
            Delete
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
